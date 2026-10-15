### Analytics

Set `REVIEWABLE_ANALYTICS_URL` (see [configuration](config.md#monitoring)) to receive JSON events for client and server actions. Reviewable queues events and POSTs them to this endpoint. `REVIEWABLE_ANALYTICS_EVENT_WHITELIST_REGEX`, when set, filters event names before delivery.

Delivery failures are retried, up to five delivery attempts. A failure to enqueue an event is logged and the event is dropped. Delivery is best effort: events may be duplicated, delayed, or arrive out of order. Use `eventId` to deduplicate retries of the same queued event. Separate events caused by the same action can still have different IDs. A successful receiver must return a 2xx response.

Events resemble the [Segment tracking spec](https://segment.com/docs/spec/track/), but require a receiver that understands Reviewable's payloads:

```ts
interface Event {
  type: 'track';
  event: string;
  eventId: string;      // persistent analytics queue key; only sent to REVIEWABLE_ANALYTICS_URL
  properties: object;  // documented below
  sentAt: string;      // ISO 8601 timestamp when the event was issued, before queuing/delivery
  userId?: string;     // associated identity, e.g. github:NNNN or ghagent:NNNN-NNNN
  anonymousId?: string; // transient client identity when signed out
  context: {
    active: boolean;   // direct user action (true) or background/server activity (false)
    userAgent?: string; // present on client events
    traits?: {
      avatar?: string | null;
      email?: string | null;
      name?: string | null;
      username?: string;
    };
  };
}
```

Server events may have no user identity. Server-side traits are looked up at delivery time; client traits are captured when enqueuing. An agent type is not reported: some server requests retain only the acting user ID, so a replicant acting as its owner cannot reliably be distinguished from that owner.

All client events also carry `path` (the client route) and `build` (the client build). Events issued on a loaded review page also carry the common PR properties below, unless they explicitly reference another repository or PR. These appear in client analytics sinks and action breadcrumbs as well. The URL sink's `eventId` is not added to other sinks or breadcrumbs.

Repository references use `owner` and `repo`. Pull request events use these common properties:

```ts
{
  owner: string;
  repo: string;
  prNumber: number;
  userIsAuthor: boolean; // whether the associated user acts as the PR author
  lastRevision: string | null; // latest Reviewable revision key at event issuance, not a commit SHA
}
```

Author agents count as authors on their owner's PRs, while reviewer agents have their own identity. `userIsAuthor` is false for events with no associated user, including `Updated Review Status`. `lastRevision` is null if no revision has been captured yet, as when a review is first created. The common PR properties below are in addition to each event's listed fields. Legacy property aliases remain in payloads for compatibility; new consumers should use the names documented here.

##### Signed up
The user signed in to Reviewable for the first time. No additional properties.

##### Signed in
The user signed in through the server authentication flow. No additional properties.

##### Agent signed in
An agent authenticated. The associated `userId` identifies its owner.

```ts
{ agentKey: string; agentUsername: string; }
```

##### Created Review
A review was created for a pull request. The associated user is the requester or the account whose credentials were used for background synchronization. Includes common PR properties.

```ts
{
  private: boolean;
  origin: 'request' | 'event' | 'poll'; // direct navigation, connected repo, or enrollment
}
```

##### Authored Review
Emitted alongside `Created Review`, associated with the PR author instead. Includes common PR properties (`userIsAuthor: true`) and the same `private` and `origin` fields. Usually a consumer needs only one of these two events.

##### Published Comments
The user successfully published a review, including publication through the headless interface. This can publish review marks and other actions without any comments. Queuing a publication to wait for a push does not emit this event. Includes common PR properties.

```ts
{
  sanction: 'approved' | 'changes_requested' | 'commented';
  numDrafts: number;             // legacy total draft count, including private/unsent drafts
  numPublishableDrafts: number; // comments in the published actions summary
  numMarks: number;             // files with pending review marks, including virtual Commits
  numFullMarks: number;         // files whose pending marks fully review their latest revision
  numFilesReviewed: number;     // published summary's reviewed-file count, excluding Commits
  commitsReviewed: boolean;    // whether all commit messages at the latest revision were marked
  numRoleChanges: number;       // disposition changes without a comment
  numAcknowledgements: number; // acknowledgements without a comment
  numDismissals: number;        // individual participant dismissals
  numDiscussionsResolved: number; // newly resolved discussions, excluding the top discussion
  numDiscussionsDismissed: number; // distinct discussions with participant dismissals
  numParticipantsDismissed: number; // distinct users dismissed across those discussions
  numUnreviewedFiles: number;   // projected remaining files, including virtual Commits
  emojis: string[];             // normalized names from the sentiment records being published
  completed?: boolean;         // projected review completion
  numUnresolvedDiscussions?: number; // projected unresolved discussions, excluding the top one
  designation?: 'user' | 'team' | 'anyone' | null;
  latency: number;             // elapsed publication time in milliseconds
}
```

Action counts, sanction, designation, and projected status are captured before publication consumes the drafts and marks. Partial file reviews are included in `numFilesReviewed`; compare `numMarks` with `numFullMarks` to distinguish a partial review. The shared PR properties describe the review when the success event is issued.

`emojis` matches the names written to `review.sentiments`, in write order, including repeated names. Code and quoted blocks are excluded using the same extraction as sentiment storage; it is not a list of emoji images or Unicode characters.

`designation` reports the user's most specific applicable file-review designation: explicit user, then team membership, then anyone, or null if none applies. Fulfilled designations still count. Team and anyone designations exclude authors unless they explicitly include them. It is omitted while the required model or team membership is unknown. Projected completion fields are omitted if unavailable (for example, with an older server).

##### Sent Comment
The user successfully sent an individual comment using its send button. Includes common PR properties and:

```ts
{
  emojis: string[];
  completed?: boolean;
  numUnresolvedDiscussions?: number;
  designation?: 'user' | 'team' | 'anyone' | null;
}
```

These fields have the same meanings as above, except the completion projection applies only this send and its directives, without publishing other pending drafts or marks. A failed projection does not prevent sending the comment; its completion fields are omitted.

##### Ready for Review
The user changed a draft PR to ready for review from Reviewable. Includes common PR properties.

##### Merged Branch
The user successfully merged the PR from Reviewable. Does not track merges performed elsewhere. Includes common PR properties and:

```ts
{
  deleted: boolean; // whether the head branch was deleted
  flavor: 'merge' | 'squash' | 'rebase' | 'fastForward';
}
```

##### Queued Merge
The user added the PR to GitHub's merge queue or applied the repository's configured merge label from Reviewable. Includes common PR properties and `jump?: boolean`, indicating a request to move to the front of GitHub's queue. `jump` is absent for label-based queuing.

##### Canceled Queued Merge
The user removed the PR from GitHub's merge queue or removed the configured merge label from Reviewable. Includes common PR properties.

##### Updated Review Status
A server event with no associated user. Includes common PR properties and:

```ts
{
  prState: 'open' | 'merged' | 'closed';
  draft: boolean;
  completed: boolean;
  description: string;
  pendingUsernames: string[]; // normalized GitHub usernames being waited on
  unreadUsernames: string[];  // users with unread comments who are not being waited on
}
```

This uses the same notification path as [review status webhooks](../docs/admincenter.md#webhook), even if no webhook URL is configured. Notifications are debounced for ten seconds. Changes to the description, pending/unread users, draft state, latest revision, labels, requested teams, or review stage can trigger delivery; short-lived intermediate states may be coalesced. Some of these triggers are not themselves fields in the analytics payload. Draft and revision comparisons begin once a notification has established a baseline after upgrading. This event is sent only to `REVIEWABLE_ANALYTICS_URL`.

##### Compacted Revisions
The user compacted a review's revisions. Includes common PR properties, with the revision key after compaction, and:

```ts
{ numOriginalRevisions: number; numCompactedRevisions: number; }
```

##### Viewed … Page
Navigation emits `Viewed <pageClass> Page`, with route properties, `title`, `windowWidth`, and `windowHeight`. Page classes include `home-page`, `dashboard-page`, `admin-page`, `review-page`, `goodbye-page`, `difftest-page`, `playground-page`, `encrypt-page`, and `headless-page`.

Scoped dashboard/admin routes include `owner` and optionally `repo`. Review routes include common PR properties and may include `filePath`. Review page events wait for the review to load and are skipped if navigation leaves first. Query/hash-only navigation does not produce another page event.

##### Loaded Page
Sampled production client performance telemetry. Carries `page`, either `extLatency` (initial load) or `intLatency` (in-app navigation), and available phase timings such as `connect`, `load`, `init`, `boot`, `diffFirst`, `diffRest`, `prep`, `list`, or `show`, in milliseconds. Optional counters and flags depend on the page. Currently the effective sampling rate is 5% for both initial and subsequent loads.

##### Listed Open Reviews
The dashboard's review counts changed. Sampled at 25% of changes.

```ts
{
  numReviews: number;
  includesPrivate: boolean;
  includesPushableRepos: boolean;
  listType: 'personal' | 'org' | 'repo';
  owner?: string; // organization/repository lists
  repo?: string;  // repository lists
  numDistinctOwners?: number; // global/personal list only
  numDistinctRepos?: number;  // global/personal list only
}
```

Counts describe the dashboard's current items, not a separate inventory of every PR on GitHub.

##### Listed Repositories
The repositories list loaded.

```ts
{ numOwners: number; numRepositories: number; includesPrivate: boolean; }
```

##### Customized review completion
The user saved a custom completion condition. Properties: `owner`, `repo`. Each saved repository is reported separately.

##### Connected Repo / Disconnected Repo
The server completed the user's connect/disconnect request. Properties: `owner`, `repo`.

##### Disassociated Repos
The user disassociated an owner's repositories through the goodbye page, disconnecting them and attempting to remove Reviewable badges. Properties: `owner` and `count` (repositories processed).

##### Reconnected Repos
Connections were retried after an account problem was addressed. Properties: `errorCode` (the internal problem code) and `count` (repositories processed).

##### Reconciled
The server completed a repository reconciliation request. Properties: `owner`, `repo`, and `numReconciled` (review statuses where an update was attempted).

##### Enrolled / Unenrolled
The user enabled/disabled automatic connection of repositories. Property `type` is `'public'` (their PRs in public repos), `'private'` (their PRs in private repos), or `'personal'` (all their current and future repos).

##### Looked at Guide
The contextual guide opened. Properties: `onboardingKey` (snippet ID), `from` (usually `'app'` for direct access or `'map'` for the guide outline), and optional `completed` (the user's previous onboarding flag).

##### Opened user guide
The user opened the documentation. Property `from` is `'subscription'` or `'support'`.

##### Opened Email Us / Opened Issues
The user clicked the support email or GitHub issues link. Property `from` is `'support'`.

##### Opened Chatroom
The user opened support chat (or its fallback link). `from: 'support'` is present for the header action; the chat integration can also emit this event without `from`.

##### Opened Demo
The user opened the demo from the dashboard. Property `from` is `'dashboard'`. Not applicable to Enterprise installations.

##### Opened Subscription
The user opened the subscription panel from a review. Property `from` is `'review'`. Not applicable to Enterprise installations.

##### Checking out
The user began subscription checkout. Properties: `owner`, `priceId`, and `quantity`. Not applicable to Enterprise installations.

##### Contacted sales
The user attempted to open the sales chat. Properties: `owner`, `subject`, and `failedToOpenChat` (boolean). Not applicable to Enterprise installations.

##### Detected enterprise customer
A server-side subscription/feature mismatch was detected for a SaaS organization. Properties: `owner`, `feature`, and optional `productName`. No associated user.

Older versions also emitted events such as `Trialed`, `Subscribed`, `Failed to map language`, `Disassociated Repo`, `Opened all file in new tabs`, `Edited auxiliary draft instance`, `Opened Blog`, and `Read Blog`. These are no longer emitted by the current client/server.
