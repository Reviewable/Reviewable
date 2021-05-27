### Analytics

If you set the `REVIEWABLE_ANALYTICS_URL` (see the [configuration docs](https://github.com/Reviewable/Reviewable/blob/master/enterprise/config.md#monitoring)) Reviewable will POST analytics event to the endpoint for many user- and server-side actions that occur in your instance.

The events will be JSON objects that follow the schema documented below, which is pretty similar to the [Segment tracking spec](https://segment.com/docs/spec/track/).  However, you will likely need to implement a custom server or pipeline to gather and interpret these events.  If posting an event fails, both the client and server will log the error to the console (to aid in debugging) but otherwise ignore it &mdash; no retries.

All events have the following top-level structure:
```
interface Event {
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
```

The following sections document the events that can be emitted from clients and servers.  The heading is the `event` type name, followed by a short explanation of when the event is emitted and the schema for its `properties`.

##### Opened user guide
The user clicked a link to the user guide (docs.reviewable.io).
```
{
  from: 'connections' | 'subscription'  // are of the product where they found the link
}
```

##### Looked at Guide
The user opened the contextual help overlay.
```
{
  onboardingKey: string,  // the internal id of the help snippet they opened
  from: 'app' | 'map'     // app = direct from page, map = picked from summary overlay
}
```

##### Merged Branch
The user successfully merged the PR's branch from within Reviewable.  This will not track merges done in GHE, from the command line, etc.
```
{
  owner: string,     // owner name of repository
  repo: string,      // repo name of the repository
  deleted: boolean,  // whether the head branch was deleted after the merge, by Reviewable or GHE
  flavor: 'merge' | 'squash' | 'rebase' | 'fastForward'  // which flavor of merge was used
}
```

##### Failed to map language
The syntax highlighter failed to map a filename extension to a known language parser.  This event is sampled at 10% of actual occurrences.
```
{
  lang?: string,  // the language Reviewable guessed from file contents, if any
  ext: string     // the filename extension
}
```

##### Signed up
The user signed in to Reviewable for the first time.  No extra properties.

##### Listed Open Reviews
The user listed reviews on the dashboard.  This event reports some size stats regarding the list and can be emitted repeatedly as the dashboard updates the list.  It's sampled at 25% of actual occurrences.

(Note that this event doesn't send correct counts as of v3024.4796.)
```
{
  numReviews: number,                    // total number listed, including stalled or filtered out
  includesPrivate: boolean,              // whether the user has authorized access to private repos
  includesPushableRepos: boolean,        // state of "show PRs from all repos to which you can push" toggle
  listType: 'personal' | 'org' | 'repo', // whether for all repos, scoped to an org, or scoped to a repo
  numDistinctOwners?: number,            // number of distinct owners in listed reviews
  numDistinctRepos?: number              // number of distinct repos in listed reviews
}
```

##### Customized review completion
The user saved a custom review completion condition.
```
{
  owner: string,            // owner of the repo whose settings were edited
  repo: string,             // name of the repo whose setting were edited
  numReposModified: number  // total number of repos affected in case of multi-target save
}
```

##### Listed Repositories
The user loaded the Repositories page.
```
{
  numOwners: number,        // number of distinct owners for repos listed
  numRepositories: number,  // total number of repos listed
  includesPrivate: boolean  // whether the user has authorized access to private repos
}
```

##### Published Comments
The user published comments by clicking the Publish button on a review page.
```
{
  numDrafts: number,            // number of drafts published
  numMarks: number,             // number of review marks published
  numRoleChanges: number,       // number of disposition changes with no comment published
  numAcknowledgements: number,  // number of acknowledgements with no comment published
  numDismissals: number,        // number of dismissals from discussion published
  owner?: string,               // the owner of the PR
  repo?: string,                // the repo name of the PR
  pullRequest?: number,         // the PR number
  latency: number               // how long the publishing took in milliseconds
}
```
