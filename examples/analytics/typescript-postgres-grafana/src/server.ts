import 'reflect-metadata';
import express from 'express';
import { DataSource, type DataSourceOptions } from 'typeorm';
import { Event, User } from './entities';
import ormconfig from './ormconfig';

const dataSourceConfig = {
  ...ormconfig,
  // This can cause data loss if you change the entities in the ormconfig. Set
  // based on process.env.NODE_ENV if you're doing development to avoid data
  // loss.
  synchronize: true,
  entities: [Event, User],
};
const dataSource = new DataSource(dataSourceConfig);
const dataSourceReady = dataSource.initialize();
dataSourceReady.catch((err) => {
  console.error('Error during data source init:', err)
})

const app = express();
const port = 9000;

// Middleware to parse JSON request bodies
app.use(express.json());

// From: https://github.com/Reviewable/Reviewable/blob/master/enterprise/analytics.md
interface ReviewableEvent {
  type: 'track',
  event: string,        // one of the event type names listed below
  properties: any,      // the event payload, documented for each event type below
  sentAt: string,       // a timestamp in ISO 8601 format for when the event was sent
  userId?: string,      // the github:NNNN id of the user associated with the event, if any
  anonymousId?: string, // if no user is signed in on the client this will be a unique transient id
  context: {
    active: boolean,    // true if caused by a direct user action, false if originated from server
    userAgent?: string, // the browser's userAgent if active is true
    traits?: {          // some details about the user if they're signed in on the client
      avatar: string | null,
      email: string | null,
      name: string | null,
      username: string
    }
  }
}

function convertReviewableTraitsToUser(userId: string, traits: ReviewableEvent['context']['traits']) : User {
  const user = new User();
  user.userId = userId;
  if (traits) {
    if (traits.avatar)
      user.avatar = traits.avatar;
    if (traits.email)
      user.email = traits.email;
    if (traits.name)
      user.name = traits.name;
    user.username = traits.username;
  }
  return user;
}

function convertReviewableEventToEvent(reviewableEvent: ReviewableEvent): Event {
  const userRepository = dataSource.getRepository(User);

  const event = new Event();
  if (reviewableEvent.userId) {
    const user = convertReviewableTraitsToUser(reviewableEvent.userId, reviewableEvent.context.traits);
    userRepository.upsert(user, ['userId']);
    event.user = user;
  }
  event.event = reviewableEvent.event;
  event.sentAt = new Date(reviewableEvent.sentAt);
  event.anonymousId = reviewableEvent.anonymousId;
  event.userAgent = reviewableEvent.context.userAgent;
  event.active = reviewableEvent.context.active;
  event.properties = reviewableEvent.properties;

  return event;
}

// Handler for the '/' route
app.post('/', async (req, res) => {
  try {
    const { sentAt } = req.body;

    // Create a new entity instance
    const entity = convertReviewableEventToEvent(req.body as ReviewableEvent);
    console.log(`Handling event: ${entity.event}`);

    // Save the entity to the database
    const events = dataSource.getRepository(Event);
    const event = await events.create(entity);
    const results = await events.save(event);

    res.json(entity);
  } catch (error: any) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
});

// Start the server and establish the database connection
app.listen(port, async () => {
  console.log('Server starting up');
  await dataSourceReady;
  console.log(`Server is running on port ${port}`);
});

