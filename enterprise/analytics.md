### Analytics

Set `REVIEWABLE_ANALYTICS_URL` (see [configuration](config.md#monitoring)) to receive JSON events for client and server actions. Reviewable queues events and POSTs them to this endpoint. `REVIEWABLE_ANALYTICS_EVENT_WHITELIST_REGEX`, when set, filters event names before delivery.

Delivery failures are retried, up to five delivery attempts. Persistent delivery failures are logged and the event is dropped; client-side enqueue failures are silently dropped. Analytics failures do not affect user actions. Delivery is best effort: events may be duplicated, delayed, or arrive out of order. Use `eventId` to deduplicate retries of the same queued event. Separate events caused by the same action can still have different IDs. A successful receiver must return a 2xx response.

Events resemble the [Segment tracking spec](https://segment.com/docs/spec/track/), but require a receiver that understands Reviewable's payloads:

```ts
interface Event {
  type: 'track';
  event: string;
  eventId: string;       // persistent analytics queue key
  properties: object;    // documented below
  sentAt: string;        // ISO 8601 timestamp when the event was issued, before queuing/delivery
  userId?: string;       // associated identity, e.g. github:NNNN or ghagent:NNNN-NNNN
  anonymousId?: string;  // transient client identity when signed out
  context: {
    active: boolean;     // direct user action (true) or background/server activity (false)
    userAgent?: string;  // present on client events
    traits?: {
      avatar?: string | null;
      email?: string | null;
      name?: string | null;
      username?: string;
      agent?: 'author' | 'reviewer' | 'replicant';
    };
  };
}
```

Events may have no user identity, including client events issued while signed out. Server-side traits are looked up at delivery time; client traits use the session that issued the event (or the session resolved during initialization). `context.traits.agent` identifies the acting agent's type, including replicants whose `userId` remains their owner's identity. It is omitted for human activity and when agent attribution is unavailable.

All client events also carry these properties:

```ts
{
  path: string;   // client route
  build: number;  // client build
}
```

Events about a review carry the common PR properties below; generic actions do not inherit review data from the current page.

Repository references use `owner` and `repo`. Pull request events use these common properties in addition to each event's listed fields:

```ts
{
  owner: string;
  repo: string;
  prNumber: number;
  userIsAuthor?: boolean;       // whether the associated user acts as the PR author; only with userId
  lastRevision: string | null;  // latest Reviewable revision key at event issuance, not a commit SHA
}
```

Author agents count as authors on their owner's PRs. `userIsAuthor` is omitted for events with no associated user, including `Updated Review Status`. `lastRevision` is null if no revision has been captured yet, as when a review is first created.

##### Signed up
The user signed in to Reviewable for the first time. No additional properties.

##### Signed in
The user signed in through the server authentication flow. No additional properties.

##### Agent signed in
An agent authenticated. The associated `userId` identifies its owner.

```ts
{
  agentKey: string;
  agentUsername: string;
}
```

##### Created Review
A review was created for a pull request. The associated user is the requester or the user whose enrollment discovered the PR. Creation through a repository connection has no associated user, so `userId`, `userIsAuthor`, and acting agent traits are omitted. Includes common PR properties.

```ts
{
  private: boolean;
  origin: 'request' | 'event' | 'poll';  // direct navigation, connected repo, or enrollment
}
```

##### Authored Review
Emitted alongside `Created Review`, associated with the PR author instead of the user or agent that discovered the PR. Includes common PR properties and the same fields as `Created Review`. Usually a consumer needs only one of these two events.

```ts
{
  userIsAuthor: true;
  private: boolean;
  origin: 'request' | 'event' | 'poll';
}
```

##### Published Comments
The user successfully published a review, either directly or automatically after a push. This can publish review marks and other actions without any comments. Queuing a publication to wait for a push does not emit this event; successful publication does. Includes common PR properties.

```ts
{
  trigger: 'user' | 'push';            // direct publication or automatic publication after a push
  sanction: 'approved' | 'changes_requested' | 'commented';
  numPublishedDrafts: number;         // comments in the published actions summary
  numMarks: number;                   // files with published review marks, including virtual Commits
  numFullMarks: number;               // files whose published marks fully review their latest revision
  numFilesReviewed: number;           // published summary's reviewed-file count, excluding Commits
  commitsReviewed: boolean;           // whether all commit messages at the latest revision were marked
  numUnreviewedFiles?: number;        // projected remaining files, including virtual Commits
  numDispositionChanges: number;      // disposition changes without a comment
  numAcknowledgements: number;        // acknowledgements without a comment
  numDismissals: number;              // individual participant dismissals
  numDiscussionsResolved: number;     // newly resolved discussions
  numDiscussionsDismissed: number;    // distinct discussions with participant dismissals
  numParticipantsDismissed: number;   // distinct users dismissed across those discussions
  numUnresolvedDiscussions?: number;  // projected unresolved discussions
  emojis: string[];                   // normalized names of emojis in the published comments
  completed?: boolean;                // projected review completion
  designation?: 'user' | 'team' | 'anyone' | null;
  latency: number;                    // elapsed publication attempt time in ms, excluding waiting for a push
}
```

Action counts, sanction, designation, and projected status are captured before publication consumes the drafts and marks. Partial file reviews are included in `numFilesReviewed`; compare `numMarks` with `numFullMarks` to distinguish a partial review. The shared PR properties describe the review when this event is issued after publication.

For publication triggered by a push, action counts, sanction, emojis, designation, and projected status are snapshots taken when the publication was queued. They may be outdated by the time publication occurs, particularly after the push changes the review. `lastRevision` and `latency` describe the actual publication attempt.

`emojis` contains normalized emoji names, including repeated names. Emojis in code and quoted blocks are excluded. The entries are names, rather than emoji images or Unicode characters.

`designation` reports the user's most specific applicable file-review designation: explicit user, then team membership, then anyone, or null if none applies. Fulfilled designations still count. Team and anyone designations exclude authors by default. The `designation` property and projected properties may be omitted if the data needed to compute them is not available at publication time.

##### Sent Comment
The user successfully sent an individual comment using its send button. Includes common PR properties and:

```ts
{
  emojis: string[];
  numUnresolvedDiscussions?: number;
  designation?: 'user' | 'team' | 'anyone' | null;
}
```

These fields have the same meanings as above. The unresolved count adjusts the current total for the discussion being sent, including newly started discussions, without applying other pending drafts. Review completion is not evaluated or included for individual sends.

##### Ready for Review
The user changed a draft PR to ready for review from Reviewable. Includes common PR properties.

##### Merged Branch
The user successfully merged the PR from Reviewable. Does not track merges performed elsewhere. Includes common PR properties and:

```ts
{
  deleted: boolean;  // whether the head branch was deleted
  flavor: 'merge' | 'squash' | 'rebase' | 'fastForward';
}
```

##### Queued Merge
The user added the PR to GitHub's merge queue or applied the repository's configured merge label from Reviewable. Includes common PR properties and:

```ts
{
  jump?: boolean;  // request to move to the front of GitHub's queue; absent for label-based queuing
}
```

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
  pendingUsernames: string[];  // normalized GitHub usernames being waited on
  unreadUsernames: string[];   // users with unread comments who are not being waited on
}
```

This uses the same notification path as [review status webhooks](../docs/admincenter.md#webhook), even if no webhook URL is configured. Notifications are debounced for ten seconds. Changes to the description, pending/unread users, labels, requested teams, or review stage can trigger delivery; short-lived intermediate states may be coalesced. Some of these triggers are not themselves fields in the analytics payload. Draft transitions change the description; a new revision alone does not trigger delivery.

##### Compacted Revisions
The user compacted a review's revisions. Includes common PR properties and:

```ts
{
  numOriginalRevisions: number;
  numCompactedRevisions: number;
}
```

##### Viewed Page
Navigation emits `Viewed Page`. Page classes include `home-page`, `dashboard-page`, `admin-page`, `review-page`, `goodbye-page`, `difftest-page`, `playground-page`, `encrypt-page`, and `headless-page`.

```ts
{
  pageClass: string;
  title: string;
  windowWidth: number;
  windowHeight: number;
  owner?: string;
  repo?: string;
  prNumber?: number;
  filePath?: string;
}
```

Scoped dashboard/admin routes include `owner` and optionally `repo`. Review routes include `owner`, `repo`, `prNumber`, and optionally `filePath`. `userIsAuthor` and `lastRevision` are absent, including on review pages. Query/hash-only navigation does not produce another page event.

##### Loaded Page
Sampled production client performance telemetry. Currently the effective sampling rate is 5% for both initial and subsequent loads. Timings are in milliseconds; optional counters and flags depend on the page. Review-page timings include common PR properties when the review is available.

```ts
{
  page: string;
  extLatency?: number;  // initial load
  intLatency?: number;  // in-app navigation
  connect?: number;
  load?: number;
  init?: number;
  boot?: number;
  perm?: number;
  fetch?: number;
  diffFirst?: number;
  diffRest?: number;
  prep?: number;
  list?: number;
  show?: number;
  numReviews?: number;
  numFiles?: number;
  numNonTrivialFiles?: number;
  singleFilePage?: boolean;
  signedIn?: boolean;
  subscriptionLink?: boolean;
  linkDiscussion?: boolean;
  error?: boolean;
}
```

##### Listed Open Reviews
The dashboard's review counts changed. Sampled at 25% of changes.

```ts
{
  numReviews: number;
  includesPrivate: boolean;
  includesPushableRepos: boolean;
  listType: 'personal' | 'org' | 'repo';
  owner?: string;              // organization/repository lists
  repo?: string;               // repository lists
  numDistinctOwners?: number;  // global/personal list only
  numDistinctRepos?: number;   // global/personal list only
}
```

Counts describe the dashboard's current items, not a separate inventory of every PR on GitHub.

##### Listed Repositories
The repositories list loaded.

```ts
{
  numOwners: number;
  numRepositories: number;
  includesPrivate: boolean;
}
```

##### Customized review completion
The user saved a custom completion condition. Each saved repository is reported separately.

```ts
{
  owner: string;
  repo: string;
}
```

##### Connected Repo
The server completed the user's connect request.

```ts
{
  owner: string;
  repo: string;
}
```

##### Disconnected Repo
The server completed the user's disconnect request.

```ts
{
  owner: string;
  repo: string;
}
```

##### Disassociated Repos
The user disassociated an owner's repositories through the goodbye page, disconnecting them and attempting to remove Reviewable badges.

```ts
{
  owner: string;
  count: number;  // repositories processed
}
```

##### Enrolled
The user enabled automatic connection of repositories. `public` and `private` cover their PRs in public or private repositories, respectively. `personal` includes all their current and future repositories.

```ts
{
  type: 'public' | 'private' | 'personal';
}
```

##### Unenrolled
The user disabled automatic connection of repositories. The type has the same meanings as for `Enrolled`.

```ts
{
  type: 'public' | 'private' | 'personal';
}
```

##### Looked at Guide
The contextual guide opened.

```ts
{
  onboardingKey: string;  // snippet ID
  from: string;           // usually 'app' for direct access or 'map' for the guide outline
  completed?: boolean;    // the user's previous onboarding flag
}
```

##### Reconnected Repos
Connections were retried after an account problem was addressed.

```ts
{
  errorCode: string;  // internal problem code
  count: number;      // repositories processed
}
```

##### Reconciled
The server completed a repository reconciliation request.

```ts
{
  owner: string;
  repo: string;
  numReconciled: number;  // review statuses where an update was attempted
}
```

##### Opened user guide
The user opened the documentation.

```ts
{
  from: 'subscription' | 'support';
}
```

##### Opened Email Us
The user clicked the support email link.

```ts
{
  from: 'support';
}
```

##### Opened Issues
The user clicked the GitHub issues link.

```ts
{
  from: 'support';
}
```

##### Opened Chatroom
The user opened support chat (or its fallback link).

```ts
{
  from?: 'support';  // present for the header action, absent for the chat integration
}
```

##### Opened Demo
The user opened the demo from the dashboard. Not applicable to Enterprise installations.

```ts
{
  from: 'dashboard';
}
```

##### Opened Subscription
The user opened the subscription panel from a review. Not applicable to Enterprise installations.

```ts
{
  from: 'review';
}
```

##### Checking out
The user began subscription checkout. Not applicable to Enterprise installations.

```ts
{
  owner: string;
  priceId: string;
  quantity: number;
}
```

##### Contacted sales
The user attempted to open the sales chat. Not applicable to Enterprise installations.

```ts
{
  owner: string;
  subject: string;
  failedToOpenChat: boolean;
}
```

Older versions also emitted events such as `Trialed`, `Subscribed`, `Failed to map language`, `Disassociated Repo`, `Opened all file in new tabs`, `Edited auxiliary draft instance`, `Opened Blog`, and `Read Blog`. These are no longer emitted by the current client/server.
