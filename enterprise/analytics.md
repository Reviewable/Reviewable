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
    active: boolean,    // true if caused by a direct user action, false if background action
    userAgent?: string, // the browser's userAgent if originated from the client
    traits?: {          // some details about the user if available
      avatar: string | null,
      email: string | null,
      name: string | null,
      username: string
    }
  }
}
```

The following sections document the events that can be emitted from clients and servers.  The heading is the `event` type name, followed by a short explanation of when the event is emitted and the schema for its `properties`.  Common properties include:
* `owner`, which is an owner (user or organization) name,
* `repo`, which is the name of a repo, always qualified with an `owner`,
* `prNumber`, which is a PR number, and
* `from`, which indicates from which area of the product the user initiated a common action.

If there are extra properties you'd like to see, or you'd like Reviewable to track other actions, please get in touch and we'll likely be able to accommodate your request!

##### Signed up
The user signed in to Reviewable for the first time.  No extra properties.

##### Signed in
The user signed in.  No extra properties.

##### Created Review
A review was created due to an action by the indicated user.
```
{
  owner: string,
  repo: string,
  prNumber: number,
  private: boolean  // whether this PR is in a private repository
  origin: 'request' | 'event' | 'poll'  // caused by direct navigation, a connected repo, or an enrollment
}
```

##### Authored Review
A review was created for a PR authored by the indicated user.  This will always be emitted together with the `Created Review` event above but potentially connected to a different user.  This odd reporting structure is due to some legacy decisions &mdash; typically you'll only use one or the other event.
```
{
  owner: string,
  repo: string,
  prNumber: number,
  private: boolean  // whether this PR is in a private repository
  origin: 'request' | 'event' | 'poll'  // caused by direct navigation, a connected repo, or an enrollment
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
  owner?: string,
  repo?: string,
  pullRequest?: number,
  latency: number               // how long the publishing action took in milliseconds
}
```

##### Sent Comment
The user sent an individual comment by clicking the ad-hoc send button.
```
{
  owner?: string,
  repo?: string,
  pullRequest?: number
}
```

##### Merged Branch
The user successfully merged the PR's branch from within Reviewable.  This will not track merges done in GHE, from the command line, etc.
```
{
  owner: string,
  repo: string,
  deleted: boolean,  // whether the head branch was deleted after the merge, by Reviewable or GHE
  flavor: 'merge' | 'squash' | 'rebase' | 'fastForward'  // which flavor of merge was used
}
```

##### Updated Review Status
The status of a review was updated for some reason.  This event is not user-specific and will be triggered every time any of the properties below changes for a review.  Note that this event is debounced (with a 10 second timeout as of this writing) so events will be slightly delayed and you may not receive events at all for short-lived intermediate states.
```
{
  owner: string,
  repo: string,
  prNumber: number,
  prState: 'open' | 'merged' | 'closed',  // the state of the PR
  completed: boolean,                     // whether the review has been completed or not
  description: string,                    // a human-readable description of the review status
  pendingUsernames: string[],             // list of GitHub usernames that we are waiting for
  unreadUsernames: string[]               // list of GitHub usernames that have new comments to read
                                          // but that we're not waiting for
}
```

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

##### Listed Repositories
The user loaded the Repositories page.
```
{
  numOwners: number,        // number of distinct owners for repos listed
  numRepositories: number,  // total number of repos listed
  includesPrivate: boolean  // whether the user has authorized access to private repos
}
```

##### Customized review completion
The user saved a custom review completion condition.
```
{
  owner: string,
  repo: string,
  numReposModified: number  // total number of repos affected in case of multi-target save
}
```

##### Failed to map language
The syntax highlighter failed to map a filename extension to a known language parser.  This event is sampled at 10% of actual occurrences and used to prioritize adding more language definitions to the highlighter.
```
{
  lang?: string,  // the language Reviewable guessed from file contents, if any
  ext: string     // the filename extension
}
```

##### Connected Repo
The user connected a repository to Reviewable.
```
{
  owner: string,
  repo: string
}
```

##### Disconnected Repo
The user disconnected a repository from Reviewable.
```
{
  owner: string,
  repo: string
}
```

##### Disassociated Repo
The user disassociated a repository from Reviewable via the `/goodbye` page.  This disconnects the repo and attempts to remove all Reviewable badges from the PRs.
```
{
  owner: string,
  repo: string
}
```

##### Enrolled
The user turned on one of the auto-connect toggles for their account on the Repositories page.  In this context, 'public' corresponds to "my PRs in any public repo", 'private' to "my PRs in any private repo", and 'personal' to "all current and future repos".
```
{
  type: 'public' | 'private' | 'personal'
}
```

##### Unenrolled
The user turned off one of the auto-connect toggles for their account on the Repositories page.
```
{
  type: 'public' | 'private' | 'personal'
}
```

##### Opened all file in new tabs
The user clicked the button in the file matrix header that opens all files in new tabs.  (Yes, there's a typo in the event type.)
```
{
  numFiles: number  // the total number of files opened this way
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

##### Edited auxiliary draft instance
The user edited a reply to the main review discussion from the toolbar's bunny dropdown panel.  No extra properties &mdash; this was used to track internally whether the feature was actually being used.

##### Reconnected Repos
Some repositories with broken connections were automatically reconnected after the user fixed some issue with their account.
```
{
  errorCode: string,  // the internal error code that was fixed
  count: number       // number of repos reconnected
}
```

##### Backfilled
Some reviews were updated in response to the user setting a repository-wide review style (aggregated commits or commit-by-commit).
```
{
  owner: string,
  repo: string,
  filter: 'noRevisionSplitStrategy',
  numBackfilled: number  // number of reviews where an update was attempted
}
```

##### Reconciled
Some review statuses were updated in response to the user changing the review completion condition.
```
{
  owner: string,
  repo: string,
  numReconciled: number  // the number of review statuses where an update was attempted
}
```

##### Opened user guide
The user clicked a link to the user guide (docs.reviewable.io).
```
{
  from: 'connections' | 'subscription' | 'support'
}
```

##### Opened Blog
The user clicked the link to the blog.
```
{
  from: 'footer'
}
```

##### Opened Twitter
The user clicked the link to Twitter.
```
{
  from: 'footer' | 'support'
}
```

##### Opened Email Us
The user clicked the email us link.
```
{
  from: 'footer' | 'support'
}
```

##### Opened Issues
The user clicked the link to the GitHub issues page.
```
{
  from: 'support'
}
```

##### Opened Chatroom
The user clicked the link to the Gitter chat room.
```
{
  from: 'support'
}
```

##### Read Blog
The user clicked a link to a third party blog post from the home page.
```
{
  author: 'Justin Abrahms' | 'Jaime Buelta'
}
```

##### Opened Demo
The user opened the demo review.  Not applicable to Enterprise installs.
```
{
  from: 'dashboard' | 'onboarding' | 'screenshot' | 'link'
}
```

##### Opened Subscription
The user opened the subscription panel.  Not applicable to Enterprise installs.
```
{
  from: 'review'
}
```

##### Trialed
The user started an automatic free trial.  Not applicable to Enterprise installs.
```
{
  organization: string
}
```

##### Subscribed
The user updated their SaaS subscription.  Not applicable to Enterprise installs.
```
{
  organization: string,
  oldPlanId?: string,
  newPlanId?: string,
  coverage: 'all' | 'solo'
  updatedCard: boolean
}
```


