import { DataSource } from 'typeorm';
import { Event, User } from './entities';

// From: https://github.com/Reviewable/Reviewable/blob/master/enterprise/analytics.md
export interface ReviewableEvent {
  type: 'track';
  event: string;
  eventId?: string;      // absent on events from older Reviewable versions
  properties: any;
  sentAt: string;        // ISO 8601 timestamp when the event was issued
  userId?: string;       // associated identity, e.g. github:NNNN or ghagent:NNNN-NNNN
  anonymousId?: string;
  context: {
    active: boolean;
    userAgent?: string;
    traits?: {
      avatar?: string | null;
      email?: string | null;
      name?: string | null;
      username?: string;
      agent?: 'author' | 'reviewer' | 'replicant';
    };
  };
}

export async function storeReviewableEvent(
  dataSource: DataSource, reviewableEvent: ReviewableEvent
): Promise<Event> {
  const event = new Event();
  if (reviewableEvent.userId) {
    const user = new User();
    user.userId = reviewableEvent.userId;
    const traits = reviewableEvent.context.traits;
    if (traits?.avatar) user.avatar = traits.avatar;
    if (traits?.email) user.email = traits.email;
    if (traits?.name) user.name = traits.name;
    if (traits?.username) user.username = traits.username;
    // Finish the user write before inserting the event's foreign key.
    await dataSource.getRepository(User).upsert(user, ['userId']);
    event.user = user;
  }
  event.eventId = reviewableEvent.eventId;
  event.event = reviewableEvent.event;
  event.sentAt = new Date(reviewableEvent.sentAt);
  event.anonymousId = reviewableEvent.anonymousId;
  event.userAgent = reviewableEvent.context.userAgent;
  event.active = reviewableEvent.context.active;
  event.properties = reviewableEvent.properties;
  // Agent type belongs to the event: replicants share their owner's user identity.
  event.agent = reviewableEvent.context.traits?.agent;

  // The unique eventId column makes concurrent retries safe. Legacy events with a
  // null ID remain separate rows, as PostgreSQL allows multiple nulls in a unique column.
  await dataSource.getRepository(Event).createQueryBuilder()
    .insert().values(event).orIgnore().execute();
  return event;
}
