This is the release log for Reviewable's Enterprise branch.  Each release has a two-part version number (_server.client_) with a corresponding tag on the Docker image.  Note that once you've deployed a given release you'll only be able to deploy releases with version components at least equal to its _min_ version number, which may constrain your rollbacks.

New releases are announced on the [reviewable-enterprise-announce mailing list](https://groups.google.com/forum/#!forum/reviewable-enterprise-announce).

#### Known issues
- Avatar images use a procedurally generated fallback in some (but not all) installations of GHE running in private mode.  This is a bug with how GHE handles authentication cookies and can only be fixed from their side.  See [issue #770](https://github.com/Reviewable/Reviewable/issues/770).
- See also the public [list of bugs](https://github.com/Reviewable/Reviewable/labels/bug) for Reviewable.

#### Upcoming changes (min 3340.5125 GHE 2.19+ or 3.0+)
- Upd: use the SVG format badge in comments as well, as GitHub now appears to be supporting this.
- Upd: start sampling certain too-common Sentry events meant for debugging.  If you have Reviewable hooked up to Sentry you'll see an apparent drastic reduction in some high volume events.
- Upd: support `maintain` and `triage` permission levels and add `maintain` as option for discussion dismissal authority. You may need to wait 30-60 minutes after deploying this release before user permissions get refreshed and the new levels become usable.
- Upd: allow `triage` permission level to use various add/remove directives in comments.
- Fix: publish only comment text when sending ad-hoc top level comments.  The original fix in v3512.5320 didn't work right.
- Fix: guard against crashes when creating a discussion on the base revision of a file that was renamed multiple times within one pull request.
- Fix: correctly handle rename chains where a file two or more renames away gets reintroduced into the pull request.  Previously, this could cause such a reintroduced file to get stuck with no default diff bounds, and no way to set any.
- Fix: don't insert random `null`s into code block diffs.  This regression was introduced in v3550.5439.
- Fix: set the focus to the draft after clicking Approve or LGTM.
- Fix: delete the draft altogether if you clear all text from the review summary and click out of the field.
- Fix: ensure that clicking LGTM in the review summary always inserts the LGTM into the draft.
- Fix: show the same number of unresolved discussions in the review summary counter as we do in the toolbar.  (The bottom number wasn't taking into account the drafts about to be sent.)

#### Release 3550.5439 (min 3340.5125 GHE 2.19+ or 3.0+) 2022-08-15
- New: add the ability to write a review summary and publish the review from the bottom of the page. For more information, see [the docs](https://docs.reviewable.io/reviews.html#publishing-your-review).
- New: detect vendored files (based on simple path heuristics) and give them special treatment:  put them into a group that's collapsed by default, and exclude them from renamed file matching.  See [announcement](https://headwayapp.co/reviewable-changes/vendored-files-support-240076).
- Upd: add a badge condition setting to limit the circumstances under which a Reviewable badge will be added to the PR, even in a connected repository.
- Upd: display a message in the diff when a file has been reverted to base at its last revision.
- Upd: add an icon to the approve / block specifier that shows in the Publish button.
- Upd: increase the threshold for "show just one file at a time" mode from 25 to 50 visible diffs.  If this doesn't lead to performance issues we'll probably increase it further.
- Fix: prevent "review missing last revision" errors.
- Fix: ensure that all participants being waited on are shown to the right of the pointing hand on the dashboard page, even if they haven't started working on the review yet.
- Fix: don't remove empty lines when rendering code blocks in comments.
- Fix: avoid rare but persistent permission denied error when updating a review's completion status that would cause the update to get stuck, potentially forever.
- Fix: when loading a review link with an anchor to a discussion made on a base revision, scroll to the discussion instead of locking out the file with a spinner.
- Fix: guard against some rare transient crashes on the client, on the review page and on the dashboard.

#### Release 3542.5405 (min 3340.5125 GHE 2.19+ or 3.0+) 2022-07-31
- Upd: prevent file matrix bulk diff bound selection from diffing files in collapsed groups, unless they need to remain displayed (e.g., they're unreviewed or have discussions).  This can help with hiding grouped files from the page while retaining the ability to quickly manipulate the diff bounds of remaining ones.
- Fix: allow in-comment badges to be created in unconnected repositories even if the publishing user isn't the author and doesn't have admin rights.
- Fix: refresh the review after publishing in unconnected repositories.
- Fix: successfully complete review completion condition tasks in connected repositories even if the connecting user's token has disappeared.
- Fix: add breakpoints for wrapping long branch names in the commits section of the Changes panel. 
- Fix: fix visual glitch in file headers where the revision cells were partially obstructed.
- Fix: address lack of text overflow handling in the codeblock viewer that made long lines inaccessible.
- Fix: be more tolerant when trying to unarchive reviews with slightly malformed data.
- Fix: exclude bots from "new messages for" lists in webhook notifications.
- Fix: when selecting bounds by dragging in the file matrix header, include files that may not be present in the PR at the bounds' exact revision, but do have changes in between.  (This fix also ironed out a bunch of other edge cases having to do with missing revisions.)
- Fix: distinguish between one's own and other people's review marks in later revisions when in "personally review every file" mode.  (The two states are still visually conflated, both being represented by a grey button with green rim, but are now treated differently internally when appropriate.)

#### Release 3537.5352 (min 3340.5125 GHE 2.19+ or 3.0+) 2022-07-09
- Upd: let all GHE site admins access the license details panel on the Repositories, not just the designated license admin.  At this point, the designated license admin account is only needed as a fallback for "anonymous" GitHub requests when GHE is running in private mode.
- Upd: when configured with `REVIEWABLE_UPLOADS_PROVIDER=gcs`, optionally use ambient GCP credentials instead of a private key.
- Upd: subdivide `statsd` counter names by action for tasks on the `requests` queue, and if a request times out report its action in the error message on the client.  Also add a new `task_waiting_time` timer that measures how long a task was waiting in the queue before getting picked up (the first time only, so we don't measure retries).
- Upd: add comment/copy actions in a command palette that appears when text is selected inside a diff block.
- Upd: add `?debug=firebase` for debugging of the low-level Firebase protocol.
- Fix: back off mergeability sync retry interval up to 15 minutes in case it's taking a long time to settle on GitHub.  Also capped retries at 1 hour; after that, the user can force a sync by visiting a review.
- Fix: avoid a vicious feedback loop that could occur if events were received for merged or closed PRs in archived repos.
- Fix: don't HTML-escape the inside of code blocks in a pull request title.
- Fix: fix 'no end-of-file newline' icons so they appear properly.
- Fix: eliminate erroneous copying of the small, light-colored declaration that appears after collapsed regions when a user makes a selection that overlaps it.

#### Release 3512.5323 (min 3340.5125 GHE 2.19+ or 3.0+) 2022-06-08
- Upd: add `?debug=navigation` debugging mode.
- Fix: allow license admin to load Repositories page without causing a permission denied crash.
- Fix: guard against a handful of client crashes caused by very rare conditions.

#### Release 3512.5320 (min 3340.5125 GHE 2.19+ or 3.0+) 2022-06-02
**WARNING**: access to the Repositories page by the license admin is broken in this release.
- New: add support for HSTS with `REVIEWABLE_STRICT_TRANSPORT_SECURITY`.  It defaults to off for backwards compatibility, but you can set it to any valid header value (e.g., `max-age=31536000`) to turn it on.
- Upd: respect GitHub hidden comments in Reviewable.
- Upd: switch to a more comprehensive icon set and update some icons.
- Upd: add `Referrer-Policy: strict-origin-when-cross-origin` header to all responses.
- Upd: upgrade to Sentry SDK v7.0  If you have a self-hosted deployment of Sentry you need to upgrade it to at least v20.6.0.
- Upd: add `?debug=crash` to log more information to the console in case of a "broken goggles" crash.
- Fix: escape Markdown-sensitive characters in file paths when publishing comments.
- Fix: explicitly increment parent counters for `statsd` and fix `github.request.*` names to reflect queues, not task IDs.
- Fix: show function/class headers when part of the block is collapsed in a diff. (It's not entirely clear when this regression was introduced -- possibly as far back as mid-2021.)
- Fix: make the review summary draft area in the bunny drop-down menu work properly again.
- Fix: publish only comment text when sending ad-hoc top level comments.
- Fix: allow old reviews to be opened (and unarchived, if necessary) in archived repos.
- Fix: fix some small bugs with editing coverage report fetch settings.
- Fix: notice unclosed extended code fences in comments (more than 3 backticks) and close them properly when forming batch message.

#### Release 3477.5231 (min 3340.5125 GHE 2.19+ or 3.0+) 2022-04-17
- New: add support for tracking `spr` stacked pull requests. Please see [the announcement](https://headwayapp.co/reviewable-changes/support-for-git-spr-(stacked-pull-requests)-228260) for more details.
- Upd: be more aggressive about hiding files that the user doesn't need to review.
- Upd: use `reviewed` flags set by custom completion condition when computing default result values, including `completed` and `pendingReviewers`.
- Upd: switch to CSS-native hyphenation, which should be more reliable nowadays than the JS module we've been using so far.
- Fix: log exceptions properly when neither Sentry nor a log sink are set up.
- Fix: check license team constraints correctly.  This got broken in v3415.5193 such that every membership check returned false.
- Fix: set default disposition correctly when it's already set as the discussion's disposition.
- Fix: ensure that mentioning a user in a Reviewable comment makes the review show up on their dashboard.
- Fix: don't hide significant whitespace deltas by default (e.g., whitespace changes in string literals).
- Fix: don't insert random `null`s into code block diffs.

#### Release 3424.5210 (min 3340.5125 GHE 2.19+ or 3.0+) 2022-03-31
- Upd: mark files that have open discussion with a small icon in the file matrix.
- Upd: don't snapshot revisions when a bot comments on the PR.  (See [here](https://docs.reviewable.io/tips.html#ignore-comments-by-bots) for how we detect whether a user is a bot.)
- Fix: reduce logged exception false alarms originating from status / check events.
- Fix: save repository settings even if unchanged when selecting multiple repositories to apply to.
- Fix: fall back to procedurally generated avatar images if the real ones fail to load due to [issue #770](https://github.com/Reviewable/Reviewable/issues/770) or because the user is not signed in to GitHub.
- Fix: remove extra dot from trailing whitespace decoration.
- Fix: allow one-off send of a comment with only code blocks and no text.
- Fix: correctly display suggestion code blocks that delete all of the original code.
- Fix: lower query chunk size when running searches from the Reviews page to (hopefully) avoid 502 errors.
- Fix: don't add a horizontal rule to the message when doing an immediate send of a single comment.
- Fix: wrap long branch names at the edge of the Changes panel.

#### Release 3415.5195 (min 3340.5125 GHE 2.19+ or 3.0+) 2022-03-09
- Fix **SECURITY**: encrypt data used to keep track of AWS Lambda functions in Reviewable's database.  If you use AWS Lambda for custom condition execution and ran any version of Reviewable between 3256.5037 and 3415.5193 (inclusive) with encryption enabled, then some repository names were exposed unencrypted in the database.  No other data was exposed, and thanks to our two-level security setup (encryption + security rules) it's extremely unlikely that anybody actually saw anything.  This release will gradually fix things up over the week after you install it, but you can manually delete `/lastExecutionTimestampByContainerName` in the Firebase console if you'd like instead.

#### Release 3415.5193 (min 3340.5125 GHE 2.19+ or 3.0+) 2022-03-07
- Upd: allow requested reviewers, assignees, and labels to be added directly in the Github PR description. Note this follows the same convention as used on Reviewable.
- Upd: add ability to reverse iteration of files, comments, and drafts by using `⇧ + click` on respective counters in the status bar.
- Upd: try to grab Firebase credentials from ambient sources if none of the Reviewable-specific environment variables are set.
- Upd: upgrade AWS SDK to v3 to reduce distro size.
- Fix: migrate team constraint checking away from deprecated GitHub API.
- Fix: don't swamp GitHub with requests when a review has a lot of image files.
- Fix: avoid a very rare server-side failure when updating review state.
- Fix: improve processing and display of exception stack traces when executing completion conditions in AWS Lambda.

#### Release 3391.5185 (min 3340.5125 GHE 2.19+ or 3.0+) 2022-02-08
- New: introduce guest passes to make license seat management more flexible.  If a user is prevented from obtaining a normal seat -- whether because they're all allocated to others or because there's a team constraint applied to the license -- they're given a temporary guest pass seat instead.  A guest pass is valid for 14 days, doesn't count against the licensed seats, and there's no limit to how many can be handed out.  However, once a user has signed in (whether to a full or guest seat) they'll only be eligible for another guest pass after 90 days, so this is not an alternative to getting a normal licensed seat for long term users.  We hope this helps others in your organization try out Reviewable without having to worry about exhausting your license!
- New: support executing completion conditions in Azure Functions.  For details see the newly added [instructions](https://github.com/Reviewable/Reviewable/blob/master/enterprise/config.md#user-code-execution) for the `azurefns` executor option.
- Upd: add buttons to copy filename in file and discussion headers.
- Upd: darken link underlines in comments to make them easier to spot.
- Fix: fix the `vm2` code executor that was broken in v3371.5161.
- Fix: implement a failsafe to prevent getting stuck with a dead stickied file header when switching files in single-file mode.
- Fix: allow marking a group as reviewed even if some files are diffed at a different right bound, as long as they have no valid revisions between their bound and the dominant revision.  This is especially useful for the Reverted group since files there won't have any revisions after the reversion.

#### Release 3371.5161 (min 3340.5125 GHE 2.19+ or 3.0+) 2022-02-02
**WARNING**: the `vm2` executor is broken in this release.
- New: add a new "pondering" disposition that prevents a draft from being published.  Useful for notes-to-self while reviewing that you'll delete or flesh out before sending.
- Upd: include reviews where the user is blocking (i.e., in `pendingReviewers`) on the dashboard even if they're not involved with the pull request from GitHub's point of view.  This is helpful for custom completion conditions that assign pending reviewers from a hardcoded list, rather than just managing the users already participating in the review.
- Upd: support omitting "Reviewable" badges in public repos.
- Upd: update server build process.  There should be no impact on vanilla deployments.  If you customized things please note that the new image entrypoint is `node dist/main.js` and the server code is now minified.
- Upd: update syntax highlighting library with improvements to many language definitions.
- Upd: improve browser caching behavior when serving the page.
- Upd: note on startup when Sentry is active and capture an info message to help in debugging the configuration.
- Fix: replace astral plane Unicode characters with a placeholder before posting a custom completion description to Reviewable's GitHub status, as GitHub can't handle them.  Remember kids, fancy emojis are all fun and games until you run into a database that only supports UCS-2!
- Fix: avoid crashing when creating a comment after a text selection in the diff has disappeared but is still active.
- Fix: allow reviews with codeblocks sourced from a different file than the parent discussion to be unarchived correctly.
- Fix: prevent rare crash when deleting a draft codeblock.

#### Release 3359.5145 (min 3340.5125 GHE 2.19+ or 3.0+) 2021-12-22
- New: let reviewers suggest code changes, with a mini code editor to make writing them easier and a mini diff to show what changed.  Please see [the announcement](https://headwayapp.co/reviewable-changes/code-suggestions-216787) for more details.
- Upd: omit pull requests in archived repositories from the reviews dashboard.
- Upd: show a "go to next file" button at the bottom of previously reviewed diffs when operating in "too many files" mode.  This lets you easily page through a long review even after you've marked everything reviewed.
- Upd: use a more efficient GraphQL query for finding pull requests matching a commit SHA when processing status events.
- Upd: put deferred reviews where the user has at least one "working" disposition into a new "working on it" section on the dashboard, rather than the generic "being reviewed by me" section.
- Fix: don't crash when making some specific kinds of edits to the code coverage settings.
- Fix: snapshot the current revision when creating a new top level draft comment.  In edge cases, if the pull request author created such a comment and left the revision provisional, the review could get into an invalid state and fail to update.
- Fix: query PRs much more efficiently when you have "Also show pull requests you're not involved with from all repos to which you can push" checked on the dashboard and limited to one or both of starred or watched repositories.
- Fix: correctly update which revisions are obsolete when squashing commits with no other changes.  This affects the commits shown in the virtual Commits file when diffing against base.
- Fix: drop status update events when fetching a list of checks and statuses results in repeated 502 errors from GitHub.
- Fix: avoid getting into an infinite loop of refreshing permissions when a user is signed in on the client but their token is missing server-side.  This shouldn't happen under normal circumstances.

#### Release 3340.5125 (min 3107.4890 GHE 2.17+ or 3.0+) 2021-11-25
- New: display code coverage in diffs using a thin color bar.  You'll need to configure access to coverage reports on each repository's settings page.  To start with we're only support the Codecov report format but are open to adding more.  See [the docs](https://docs.reviewable.io/repositories.html#code-coverage) for details.
- Upd: don't update archived reviews in response to GitHub webhooks. Closed reviews are archived within 30-60 days after they're created or last accessed by a user, and open reviews within 180-210 days.  This means that the completion condition won't be triggered on archived reviews even if the state changes, and the GitHub status won't be updated either.  A visit to the review will automatically unarchive it and bring everything up to date again.
- Upd: automatically add an `[archived]` annotation to the GitHub status of reviews when they're archived.
- Upd: hide editor and GitHub links behind the line number in discussion headers.
- Upd: when evaluating the completion condition, use internally available data to map usernames to user IDs when possible instead of always fetching it from GitHub.
- Upd: if the completion condition sets the `reviewed` flag for (a revision of) the synthetic commits file, don't require users to mark it as reviewed.  This will turn the red mark reviewed button to a green-rimmed one and ensure that the file doesn't cause review deferral.
- Upd: add "typo" to the list of prefixes that will change the disposition to "discussing".
- Fix: keep better track of requested reviewers in Reviewable, updating more eagerly and avoiding false positives in computing pending reviewers.
- Fix: process `check_run` and `check_suite` events.  They were being dropped by mistake, though the checks status was still refreshed when the review was loaded.
- Fix: don't crash when clicking on link to GitHub (though this often went unnoticed since clicking the link navigates away from Reviewable).
- Fix: sync drafts correctly between tabs.
- Fix: improve styling for images in comments, removing the underline.
- Fix: escape pull request / review titles for display.  This wasn't a security issue because the values were sent through `DOMPurify` but if your title included HTML-like tags they wouldn't show up properly.

#### Release 3291.5093 (min 3107.4890 GHE 2.17+ or 3.0+) 2021-11-04
**NOTE**: if you're using AWS Lambda for executing completion conditions, you need to grant the user (or role) the `lambda:GetFunctionConfiguration` permission, on top of the other ones it already needs.  Until this permission is granted the first execution of a condition in a repository will fail, and subsequent ones may very rarely fail as well with an `AccessDeniedException`.
- Upd: increase timeouts related to handling interactive client requests on the server from 5s to 15s.
- Upd: display instructions for adding/removing labels, assignees and reviewers in the corner of the top level draft while it's empty.
- Upd: improve editor link settings section to be easier to use without having to refer to docs.
- Upd: change the discussion line links into two separate icon links to GitHub and the editor.
- Upd: upgrade HighlightJS to the latest version. This has resulted in some strange crashes on page load reported for reviewable.io but after extensive investigation we believe they're false positives.  Please let us know if you run into trouble, though!
- Upd: allow other ways to inject AWS credentials into Reviewable for Lambda and S3 besides specifying `AWS_ACCESS_KEY_ID` and `AWS_SECRET_ACCESS_KEY`.  Using these environment variables will continue to work, though if you forget to set them (and don't have any other means for the SDK to get credentials) the error message might not be as clear.
- Fix: don't erroneously consider a file reviewed if it has been reverted and newer revisions created in the review.
- Fix: set max-width on videos to 100% to avoid overflow.
- Fix: allow user to correctly select and copy lines near the beginning or end of a diff.
- Fix: don't snapshot revisions when the PR author is looking at the review unless required for data integrity.  Provisional revisions should now remain provisional more reliably until a reviewer visits the review.
- Fix: wait for Lambda function to become active before invoking it.
- Fix: if a completion condition sets `syncRequestedReviewers` but we can't find an admin account associated with the repo to do the work, fail the status check with an error rather than getting stuck in an infinite retry loop.

#### Release 3268.5067 (min 3107.4890 GHE 2.17+ or 3.0+) 2021-10-19
- Upd: indicate in synthetic `commits file` that commits were added to a revision if they didn't affect files in the pull request.
- Upd: display warning indicator when avatar images aren't loading and suggest signing in to GitHub again.
- Fix: don't escape Markdown characters between code blocks or backticks in pull request title.
- Fix: improve performance when a review has lots of drafts open.
- Fix: preserve branch name when the branch has been deleted.
- Fix: escape spaces and other reserved characters in a filepath when forming links to GitHub or an external editor.

#### Release 3256.5037 (min 3107.4890 GHE 2.17+ or 3.0+) 2021-10-02
- Upd: upgrade to Node 16.
- Upd: support Lodash 4.x in custom completion conditions.  Note: please don't advertise Lodash 4.x support until you're confident you won't need to roll back to avoid conditions running against the older 3.x module. See [announcement post](https://headwayapp.co/reviewable-changes/lodash-4-x-support-206733) for details.
- Upd: move completion condition examples out of the app and into a repository, replacing the examples dropdown with a link.  This will make them easier to reference and maintain.
- Upd: allow multiple Reviewable instances (e.g., production and staging) to use the same AWS Lambda instance for condition execution without stepping on each other's toes.
- Upd: increase timeout and improve stagger logic for permission-checking requests to GHE.  This should help avoid spurious permission check failures if your GHE instance is overloaded an unable to reliably respond within 3 seconds.
- Upd: improve error message when Reviewable refuses to create a review because it found an existing review link in the PR, and tweak a bunch of code around there to make it easy for a user to recover from this state.
- Upd: when following a link to a discussion, diff all the files instead of just the discussion's host file. Skipping file diffs can make the page load faster but it's confusing, and not really necessary on modern machines.
- Upd: parse language identifiers out of shell script shebang lines to select correct syntax highlighting.
- Upd: switch from using just the Firebase identifier (`REVIEWABLE_FIREBASE`) to using the whole URL (`REVIEWABLE_FIREBASE_URL`) to support regions outside the US.  Configurations with `REVIEWABLE_FIREBASE` will also continue to work indefinitely, however.
- Fix: improve how the default pending reviewers logic deals with author-initiated discussion with no other participants, and with completely unreviewed files.  Also ensure that all of GitHub's requested reviewers will be added to the pending reviewers list.  If you have completion conditions that customize `pendingReviewers` you might want to look at the updated example and consider backporting the changes.
- Fix: close unterminated code blocks and render LGTM emojis when quoting parent comment for the batched post to GitHub.
- Fix: avoid spiking Firebase load (sometimes to the point of a DoS) when unarchiving a review.  This may only be an issue once you hit a very large number of archived reviews like on reviewable.io but it tends to creep up on you.
- Fix: include all discussions / drafts when navigating through them while in single file mode.  Before this fix, it was possible for the navigation cycle to skip some items depending on the order they were created in and their locations.
- Fix: don't crash if we failed to load the emoji table from GitHub.

#### Release 3200.4991 (min 3107.4890 GHE 2.17+ or 3.0+) 2021-09-16
- Upd: show revision timestamps in the local timezone in the Commits virtual file.
- Fix: glom merge commit onto the last revision if it doesn't affect any files in the PR, even if the last revision has been snapshotted.  Note that this means a reviewed revision of the virtual commit messages file might get a new merge commit appended without further review.  This seems like a reasonable trade-off to forcing another round of review just for merging from the target branch prior to merging to it.  (This likely got broken back in v2997.4729.)
- Fix: improve rebased revision matching heuristics to de-prioritize distance in favor of other signals.
- Fix: don't mistake reviewed files for unreviewed in situations where the current user isn't meant to review them.
- Fix: don't show the Done button if the pull request author is caught up on a discussion.  This was unnecessary and could lead to mistaken repeated "Done" replies.
- Fix: don't send out "short of GitHub quota" notifications too often.  This only applies if you have API quotas turned on in GHE.
- Fix: correctly restore commit lists when unarchiving a review.  This bug could cause some reviews to fail to unarchive due to follow-on errors.
- Fix: avoid crashing when review creation failed in some cases.

#### Release 3179.4975 (min 3107.4890 GHE 2.17+ or 3.0+) 2021-08-29
- New: support commit message reviewing (only in reviews created after this release is installed).  See [changelog](https://headwayapp.co/reviewable-changes) for more details.
- Upd: render code blocks in PR titles.
- Upd: support `mp4` and `mov` video uploads in comments, with a maximum upload size of 100MB.
- Upd: expose `participant.read` flag for discussions in custom review completion condition input.
- Upd: remove `sandcastle` executor.  If you still have it set, we'll default to the (pretty much equivalent) `vm2` executor instead.
- Fix: report internal errors to client when ad-hoc review creation fails.
- Fix: let users with only read permissions sync a review to a PR by caching other users' permissions for a repo to correctly filter GitHub review approvals.  This was accidentally removed in v3063.4836 but likely isn't relevant to most Enterprise deployments as only people with write permissions will be using a repo.
- Fix: don't consider commits as equivalent if their messages differ, unless the more recent is a merge commit (in which case ignore its message).  We normally glom new commits that don't change any of the files in the review onto the last revision, even if it's already been snapshotted, to avoid creating (pointless) empty revisions.  However, this logic was too aggressive and would also skip over commits where only the message was changed.
- Fix: fix layout of dismissal confirmation message.
- Fix: make navigation between files work properly while a review is deferred.
- Fix: create a placeholder status check on the main branch when connecting a repo so that Reviewable can be selected in branch protection settings.  This was a regression from pretty long ago!
- Fix: make sure we don't cut off comments when posting to a discussion with media in it.  This was a regression introduced in v3049.4825.
- Fix: ensure that errors during on-demand review creation are reported back to the browser.

#### Release 3107.4890 (min 1992.2986 GHE 2.17+ or 3.0+) 2021-07-15
- New: automatically defer further action on a review when publishing with red counters remaining.  See the [announcement post](https://headwayapp.co/reviewable-changes/deferred-reviews-199866) for details.
- Upd: improve heuristics for matching rebased revisions to their priors and make use of Gerrit-style `Change-Id` headers in commit messages.
- Upd: tweak user activity status icons in the main review discussion footer.
- Upd: track an `Updated Review Status` event in analytics.  You can use this to analyze a review's state changes over time, including who was being waited on.
- Fix: don't copy UI text when the user's selection extends past the end of a discussion.
- Fix: consistently insert selected text when replying to a discussion.
- Fix: when changing license manager ID, don't break the Repositories page for the previous manager.

#### Release 3086.4857 (min 1992.2986 GHE 2.17+ or 3.0+) 2021-06-29
- Upd: show diff selection extension as soon as mouse button is released, rather than only doing so when copying to the clipboard.
- Fix: don't retry webhook requests that fail with a 4xx status, so the error will be reported immediately to admins for faster debugging.
- Fix: in a two column diff, fairly consider both sides when deciding on which side to place a discussion.  This should improve placement accuracy in some situations.
- Fix: correct layout of discussion corner labels for double-digit revision numbers with a base suffix.
- Fix: don't hold back on a diff (e.g., because it's really big) when a user explicitly requested it, by dragging out the bounds for a specific file or by clicking on a discussion's corner label.
- Fix: don't turn (soft) snapshotted revisions back into provisional ones in connected repos.  This bug didn't appear to actually affect how the revisions were formed, just reset their state back to provisional.
- Fix: allow files that were renamed then reintroduced at least two revisions later to be diffed and marked as reviewed.
- Fix: mitigate occasional notification webhooks that report the pull request as merged but still show people being waited on.
- Fix: update line links immediately when the line link template is changed in the profile dropdown.
- Fix: respect last selected organization when clicking on Reviews in the page header.

#### Release 3063.4836 (min 1992.2986 GHE 2.17+ or 3.0+) 2021-06-20
- Upd: log more information about GraphQL requests when using `REVIEWABLE_LOG_GITHUB_API_LATENCY`, since `POST /graphql` really doesn't tell you much about what it was actually doing.
- Upd: if rate limiting is turned off in GHE stop checking for it after the first probe request.  This means that if you decide to turn rate limiting on you'll have to restart Reviewable's servers to make them rate limiting aware again.
- Fix: stop fetching collaborators where possible, or move the fetch into the background.  When there are a lot of collaborators in a repo fetching them can be quite slow.  We'll now use more targeted fetches where possible (more individual requests, but each is much cheaper), or when not possible take collaborator fetches out of the critical path.
- Fix: when selecting alternative admins due to rate limiting poll them one-by-one (in random order) to reduce the likely load of the operation.  Until now, if the user who connected the repository didn't have enough API quota remaining we would always check every other repository admin to find the "best" one to substitute, which resulted in an optimal pick being made but was slow and expensive.
- Fix: correctly identify the language of files without a file extension that are nested in a directory (e.g., `foo/Makefile` or `bar/BUILD`).
- Fix: prevent "unable to capture head commit" errors that could temporarily leave a review in a broken state.

#### Release 3049.4825 (min 1992.2986 GHE 2.17+ or 3.0+) 2021-06-14
- New: automatically group in the file matrix files that are reverted (at the latest revision) and files that are just renamed.  This takes priority over custom grouping imposed by the completion condition but the user can dissolve the automatic groups from the file matrix, putting files back in their original spots.
- Upd: update Lambda completion condition executor to use NodeJS 14.
- Upd: show more clearly if a user approved or requested changes in the participants area below the main discussion, and add icons to make information readable at a glance.
- Upd: log latency metrics for PR sync tasks, to help isolate performance issues.
- Fix: invoke webhook in a timely fashion for merged PRs, and ensure it doesn't have bogus "waiting on" information.  This should also fix some cases where the review completion function is called either too often or too early.
- Fix: ensure review overlap strategy dropdown shows up even if there's currently only one reviewer, but the current user could potentially be a reviewer too.
- Fix: attach new discussion to the correct revision when changing diff bounds between revisions that have the same file SHAs.  The bug was usually innocuous but strange things started to happen if revisions with the same file SHAs were separated by a revision with different ones!
- Fix: detect badges that point to the wrong review (e.g., because of copy/paste between PR descriptions) and correct them when syncing a review.
- Fix: mark file revisions as reverted even if the reversion is caused solely by a change to base (e.g., retargeting the PR).
- Fix: trim issue autocompletion caches to the most recent 30k entries during monthly database sweeps.  This will prevent clients from trying to load too many entries in very large repos.
- Fix: don't show disposition prefix shortcut instructions in main discussion drafts, since you can't set a disposition in the main discussion.
- Fix: emit correct values in the dashboard PR list analytics event.
- Fix: tweak the max width of top level comments to better match GitHub's, so fancy Markdown layouts (with images) are more likely to display as intended.

#### Release 3024.4796 (min 1992.2986 GHE 2.17+ or 3.0+) 2021-05-19
- New: add an option to review every file personally, replacing the previous "Include changes in files previously reviewed only by others" checkbox with a three-option dropdown.  See [this post](https://headwayapp.co/reviewable-changes/new-overlap-strategy-193348) for details.
- Upd: add a placeholder graphic to make it clear when the "Awaiting my action" section of the dashboard is empty, rather than leaving out the section altogether.
- Upd: open up the option of limiting review creation to PRs with authors on a given team to Enterprise installations.  This gets encoded into the license key (for legacy reasons) so please get in touch with us if you'd like to take advantage of this feature.  It's probably only useful when doing a phased rollout of Reviewable, though.
- Fix: reinstate compatibility with GHE 2.x; this was accidentally broken in v2963.4700.
- Fix: try even harder to not randomly delete drafts.  There was an even more rare race condition that could cause this when navigating between files in single-file mode.
- Fix: work around a recently introduced GitHub bug that renders a clipboard button in comments next to code blocks.
- Fix: allow 0.1% of a file to be control characters before deeming it to be a binary file and turning off diffs.

#### Release 2997.4729 (min 1992.2986 GHE 3.0+) 2021-04-15
- New: add support for `vm2` sandboxed environment to safely run user code by setting `REVIEWABLE_CODE_EXECUTOR` environment variable to `vm2`.  **The `sandcastle` executor is DEPRECATED** and will be removed in a future release.
- Upd: don't hide reverted files in the client until they've been reviewed.  See [this post](https://headwayapp.co/reviewable-changes/improvements-to-reverted-and-rebased-files-191026) for some details.
- Upd: feed all files into the custom review completion condition, no longer leaving out reverted ones, to align with the new client logic above.  See [this post](https://headwayapp.co/reviewable-changes/reverted-files-in-custom-review-completion-conditions-191987), which also explains how to fix some broken code you might have inherited from old examples, and take advantage of more recent changes to completion condition semantics.
- Upd: display an inner status color in rebased revision cells relative to the matched revision, which might not be the preceding one. See the [docs](https://docs.reviewable.io/files.html#rebasing) for details.
- Upd: display a `reverted` icon in the cell when a file revision has been altered back to base.
- Upd: autocomplete markdown list syntax for bullets, numbers, and tasks when hitting `enter`.
- Upd: include new comments notifications in webhook contents even if the review isn't waiting on the users who have new comments to read.
- Fix: adapt to new GitHub OAuth token format.  This fixes "Unable to decrypt token with any key" errors.  You do _not_ need to change or fix your token encryption private key.
- Fix: reduce Docker image size back to <90MB.  The previous release accidentally bloated it a bit.
- Fix: ensure that critical file diffs are proposed, even if the prior revision was modified to base. [See issue #342](https://github.com/Reviewable/Reviewable/issues/342).
- Fix: removed a bad race condition when updating the review status that could cause updates to be skipped, or errors to be ignored.
- Fix: correctly list PRs when the dashboard is constrained to an organization with spaces in its name.  (Apparently, GHE will sometimes insert spaces into an organization slug to make it look nicer!)

#### Release 2963.4700 (min 1992.2986 GHE 3.0+) 2021-04-01
- New: add a `webhook` output property for custom review completion conditions, where Reviewable will send notifications of the review status changing (e.g., to Slack).  See the [public post](https://headwayapp.co/reviewable-changes/review-status-notifications-webhook-188778) for details.
- Upd: show all active reviewers in avatar lists on dashboard, but visually separate blocking from non-blocking ones.  Also improve avatar elision logic when running in a small window.
- Upd: group concluded PRs in their own section near the bottom of the list on the dashboard.
- Upd: optimize GitHub API requests issued when processing a status or check update.
- Upd: add support for Google Cloud Storage uniform permissions and private ACLs.
- Upd: show the Done button for the PR author as long as the discussion is unresolved (and as long as nobody else is Working), even if they're already satisfied.  This should help smooth out the workflow where the author responds Done but the reviewer isn't satisfied and requests further changes.
- Fix: prompt the user to grant organizations read scope from the dashboard organization dropdown if missing.  Also stop trying to fetch the user's organizations if we know the request is bound to fail.
- Fix: collapse sequences of matching revisions when the files in the PR haven't been changed.  This is specially useful when rebasing in commit-by-commit review mode as it will avoid forcing a review of lots of empty diffs.
- Fix: in the crash dialog, correctly identify whether a fatal crash was caused by Reviewable or by a browser extension.
- Fix: when diffing two revisions with different bases, do a better job of deciding which lines are base changes and which are not.  Previously, if a line was added/removed in a revision, it could get marked as being a base change even though it clearly wasn't.
- Fix: drop bogus `check_run` and `check_suite` events from forked repos that GitHub insists on sending to us.  This should further decrease the load both on Reviewable and GHE if you use forked repos in your organization.  Note that I don't know when the field we use to detect if the event is bogus was introduced; it definitely exists in GHE 2.21 and I suspect it goes back much earlier, but GitHub's docs don't say.
- Fix: don't randomly delete drafts when changing revision bounds or navigating between files in single-file view!  This was an extremely rare race condition but it seemed to affect some users much more than others, likely due to their machine's performance characteristics.  It would result in irrecoverable loss of draft comment text.

#### Release 2899.4660 (min 1992.2986 GHE 2.12+ or 3.0+) 2021-03-10
- **HOTFIX** for GHE 3.0: sync large PRs. GHE 3.0 made a subtle change to one of their APIs that made Reviewable fail when syncing PRs with very large diffs.
- New: allow the user to constrain the dashboard review list to a specific organization, and persist the setting across page reloads.  This is more efficient than a filter query.
- Upd: optimize dashboard PR query structure to reduce first page load latency a bit.
- Upd: track more granular statsd counters of requests made to GHE, segmenting by queue and GitHub event type.
- Fix: prevent client and server from sending out harmless but annoying requests to `localhost` when the Sentry connection is not configured.
- Fix: diff SVG files again, instead of treating them as images.
- Fix: avoid error with image files when user is not signed in.
- Fix: correctly load the repo's labels dictionary even if user is not signed in.
- Fix: prevent a rare crash with an error related to `borrowElement`.
- Fix: trigger re-evaluation of the review completion condition when a PR's statuses are updated, in case the condition relies on this data (introduced in v2183.3776).
- Fix: render tables in comments posted from GitHub.
- Fix: fix a regression that prevented the crash dialog from showing in some cases, making it look like the page just froze.

#### Release 2765.4558 (min 1992.2986 GHE 2.12+ or 3.0+) 2021-02-13
- **HOTFIX**: make custom review completion conditions work again.  These got broken back in 2630.4363 for both the Sandcastle executor (completely) and for AWS Lambda (for new repos only).
- Upd: migrate from raven-js SDK to Sentry SDK v6.0.3.  This should have no impact on you unless you connected your instance to Sentry.
- Fix: prevent severe performance degradation on page load when a review used a _lot_ of emojis.
- Fix: make sure "Show on GiHub" button in a diff always links to a valid page that will show the file in question, even if the diff bounds don't cover any changes.
- Fix: avoid fetching image files in a PR on the client (based on filename), since we can't diff them anyway.
- Fix: successfully continue updating Reviewable's issue autocompletion cache even when it grows very large (avoiding a `write_too_big` error).
- Fix: don't erroneously treat files as deleted if the entire PR is reverted back to base (but remains open).
- Fix: support `done` and `fail` callbacks for asynchronous custom review completion conditions in the Sandcastle executor.

#### Release 2696.4504 (min 1992.2986 GHE 2.12+) 2021-02-01
**WARNING**: custom review completion condition may not execute correctly in this release.
- New: offer a quick link to dismiss dissenting participants from a discussion.  This shows up next to the dispositions rollout if the user is satisfied, has a draft open, other participants are blocking or working, and the user is able to dismiss them.
- Upd: open external support links with non-reviewable domain in a new tab.
- Upd: ignore autogenerated gRPC stubs.
- Upd: support validation of `x-hub-signature-256` in webhook requests.
- Upd: respect `prefers-reduced-motion` setting unless overridden in account settings.
- Upd: add absolute timestamps in tooltips most everywhere we show relative "N days ago"-style descriptions.
- Fix: make next/prev (personally) unreviewed file navigation shortcuts work correctly in various edge cases again.
- Fix: avoid requesting review from yourself when using the default completion condition, syncing requested reviewers on publish, and having one or more files that were never marked reviewed in the PR.
- Fix: fix 'View on github' button to scroll to correct file on recent versions of GHE by switching the hash from MD5 to SHA-256.
- Fix: open comment images in a new tab to match GitHub's behavior.
- Fix: don't fail with a "GitHub disregarded the 'raw' media type" error when dealing with binary files on new versions of GHE.
- Fix: raise or remove some queue concurrency constraints.  This should let Reviewable take better advantage of CPU resources instead of artificially throttling itself.  It probably won't affect your deployment but if you have CPU-based scaling triggers set up you may want to capture a new baseline and adjust them.

#### Release 2630.4363 (min 1992.2986 GHE 2.12+) 2020-12-09
**WARNING**: custom review completion condition may not execute correctly in this release.
- Upd: upgrade to Node 14.
- Upd: if a PR is ready to merge and there are no other blocking users, designate the PR's autor as the blocking user so the PR will show up in the "Awaiting my action" section on their dashboard.
- Upd: add `review.pullRequest.target.branchProtected` flag to custom review completion condition input data.
- Upd: render emojis in PR labels.
- Fix: don't show disabled merge button on dashboard if PR is ready to merge but the user doesn't have permission to do so.
- Fix: avoid expensive load of file information for a review on the dashboard if it looks like it has a lot of files.  This could result in locking up the dashboard for everyone that had the PR in their list until it was closed and fell outside the query's closed PR horizon.  PRs impacted by this fix will show `???` as their files counter.
- Fix: match unreview file navigation logic to counter logic, otherwise it was possible to get into a situation where navigating would select files that did not, in fact, need to be reviewed.
- Fix: display correct unreviewed file counts on dashboard when negative file reviewed overrides are generated by the review completion condition.
- Fix: work around a GitHub API bug that would sometimes make polls for new PRs fail for users who toggled on "My PRs in any public/private repo" on the Repositories page.
- Fix: tolerate empty check run names.
- Fix: update base of subsequent PRs to the head's base before merging and deleting the head branch.
- Fix: prevent crashes in some very rare race condition edge cases.

#### Release 2580.4292 (min 1992.2986 GHE 2.12+) 2020-11-04
- Fix: **HOTFIX** fix handling of paginated GraphQL requests when running against GHE.  This has been broken since day one but mostly worked fine since requests that require paginating are pretty rare.  However, as we've been replacing REST with GraphQL over time the issue has grown worse and we finally tracked it down.  You're most likely to notice it with assignee and reviewer autocomplete not listing the right users, or with mysterious failures when publishing a review with assignee or reviewer changes.
- Fix: tolerate empty check run names.

#### Release 2569.4290 (min 1992.2986 GHE 2.12+) 2020-11-01
- Upd: fully support syntax highlighting of `.tsx` files.
- Fix: show all PRs where the user was mentioned on the reviews dashboard, working around a GitHub bug where @-mentions in reviews aren't indexed properly.  See [issue comment](https://github.com/Reviewable/Reviewable/issues/636#issuecomment-696902568) for limitations.
- Fix: work around stricter browser security restrictions in the sign-in popup window that would sometimes cause Reviewable to fall back to a less convenient redirect auth flow.  (For anybody stuck in the redirect flow, clearing cookies from Reviewable's site will reset the flag.)
- Fix: fix a regression in automatically setting requested reviewers on a review.
- Fix: truncate participant avatars field in review list so it doesn't overflow and leave no space for the PR title.
- Fix: avoid some very rare crashes when clicking outside the review area.
- Fix: fix a regression in extending code selection in diff to beginning/end of line.

#### Release 2487.4249 (min 1992.2986 GHE 2.12+) 2020-09-22
- Upd: point GitHub link button directly to the file of interest rather than just the diff of interest.
- Upd: add a small icon to the Publish button indicating approval / blocking when the text gets removed due to small page width.
- Upd: add `action` property to file revisions in the custom review completion condition input structure, to indicate whether the file was added, removed, modified, or renamed at that revision.
- Upd: add a `nextDiscussionWithDisposition(disposition)` keyboard binding, along with previous/first/last variants.
- Fix: correct a race condition that resulted in comments with images sometimes being cut off on the page.
- Fix: resize resolved discussion "bar" placeholders when changing the diff's column width.
- Fix: correctly render PR labels that get cut off on the reviews dashboard.
- Fix: avoid sometimes locking up on load in reviews with a renamed-then-reintroduced file when using review-each-commit style.
- Fix: stop syntax highlighter from getting confused in some cases (e.g., when using `Foo.class` in a Java file).

#### Release 2411.4117 (min 1992.2986 GHE 2.12+) 2020-08-12
- Upd: make [Reviewable docs](https://docs.reviewable.io) indexable by Google Search.
- Upd: add `review.pullRequest.target.headCommitSha` to the review completion condition input data.
- Fix: make sure publishing comments works even if an organization has many thousands of potential assignees.
- Fix: correct a bunch of issues related to autocomplete in drafts, including inconsistent search logic, behavior in the face of user logout, etc.
- Fix: don't try to automatically connect archived repositories.
- Fix: ignore self-mentions in comments instead of showing an error or freezing.
- Fix: prevent accidental DoS-by-regex on certain malformed PR descriptions and other user-controlled input.

#### Release 2351.4070 (min 1992.2986 GHE 2.12+) 2020-06-22
- Upd: check more often that the user who originally connected a repository still has admin access to it, and send a warning email if not.
- Fix: autosize draft text area consistently when the comment contains `>` quotes.
- Fix: resize comment area correctly when expanding/collapsing quoted blocks.
- Fix: in two column diffs, prevent blank (filler) lines from appearing in text copied from the diff.
- Fix: don't allow a race condition to cause some values like mergeStyle to flutter when review completion code is run.
- Fix: ignore another category of bogus errors that appear to mostly come from the Grammarly extension.  Sigh.
- Fix: avoid locking up when trying to preview or send a comment in some forked repos.

#### Release 2330.4029 (min 1992.2986 GHE 2.12+) 2020-04-29
- Fix: don't crash when a bogus "ResizeObserver loop limit exceeded" error occurs.  This appears to be caused by the somewhat popular Grammarly extension.
- Fix: remove one more spot that used deprecated GitHub API authentication methods, though it likely wasn't affecting most installations.
- Fix: make "unresolved discussion" navigation keyboard shortcuts work again.

#### Release 2326.4025 (min 1992.2986 GHE 2.12+) 2020-04-16
- New: treat file mode changes as modifications and display them when diffing.  Also notify when a file is a symbolic link.
- Upd: offer option to insert Reviewable badge at the top of the pull request description, rather than at the bottom.
- Fix: correctly handle commit authors and committers that are not GHE users.
- Fix: show correct defaults when opening repository settings a second time after applying some edits.
- Fix: don't trigger a run of the custom review completion condition when background-syncing a closed pull request.  Doing so could result in spammy notifications when performing batch admin actions on a repo in GHE, and Reviewable generally doesn't automatically update the completion condition for closed PRs anyway.
- Fix: avoid breaking review list page when user is a member of more than 100 teams.
- Fix: respect the "automatically delete head branches" setting in GitHub, by forcing the "delete" option in the merge options dropdown and letting GitHub do the deed rather than racing with it.

#### Release 2269.3960 (min 1992.2986 GHE 2.12+) 2020-03-08
- Upd: add warning about draft PR to mergeability status check that shows up in Reviewable.  Before then, if a PR was in draft but otherwise ready to merge, you'd end up in a state where everything looked OK but the merge button just wouldn't show up.
- Upd: reduce false positive reports of "Repeatedly failed to process event".
- Upd: stop using the recently deprecated `access_token` authentication method for GitHub requests on the client.  This will impact performance since it requires an additional "preflight" request for most every `GET` sent to GitHub, but GitHub's engineers weren't receptive to this argument against the change.  Oh well.
- Upd: switch to a new HTTP request library on both client and server.  Should have no noticeable effects, but last time we tried upgrading the old library it broke servers seemingly at random, so noting the change here just in case.
- Upd: add `author` and `committer` to revision commits info in review completion condition input structure.
- Upd: add `markFileReviewedAndRetreat` bindable command, for those who like to start their reviews at the bottom.
- Fix: note when a review is broken on the Reviews dashboard and skip loading detailed data for it.  This doesn't happen often (e.g., if the number of files in a review exceeds 8000) but when it does the data might be in an invalid state and cause the page to get stuck.
- Fix: when `syncRequestedReviewers` is set in a custom completion condition, update requested reviewers whenever `pendingReviewers` changes, even if no review was published (e.g., when a PR is first created).
- Fix: ensure the Reviews button in the header always goes back to the most recently viewed list of reviews.  It would sometimes go back to a specific review instead!
- Fix: work around a recent change in GitHub's API that would cause reviews with a commit that touched >100 files to be unable to sync.
- Fix: prevent some UI issues that would occur when only part of a file's revision history belonged to a renamed file, but the rest remained as part of the original.  This could result in weird diff bounds being picked or marking revisions as reviewed affecting multiple files in the matrix.
- Fix: allow for ambiguous path to file mappings when interpreting review completion condition results.  This happens in the same "partially assimilated file" conditions as for the fix above.
- Fix: when creating a discussion, ensure that the other revision in the diff gets snapshotted too so we can reproduce the exact diff later.  Otherwise, we can end up with a discussion with a dangling revision reference, which can cause crashes in rare circumstances.
- Fix: guard against a bug in GHE that occasionally returns a supposedly internal completion state for a check run.

#### Release 2227.3878 (min 1992.2986 GHE 2.12 - 2.20) 2020-01-06
- Upd: improve diff algorithm to keep indentation-only deltas clean rather than sometimes pulling in short unchanged line contents.
- Upd: allow horizontal scrolling of file header when revision cells overflow available space.  Scroll bar is not visible but you can use the middle mouse button (or whatever your OS of choice allows) instead.
- Upd: embed RSA key rolling feature in the monthly user table cron job if multiple keys are passed to the server.  This is more reliable than using a separate script.
- Upd: switch RSA encryption to native Node libraries for a boost in performance.
- Fix: prevent very rare "undefined function closest" crash.
- Fix: prevent permission denied errors when stale user records are automatically cleaned up when they're still referenced by other data.
- Fix: prevent servers getting stuck processing a GitHub event forever if the repo it refers to was deleted at just the wrong moment.
- Fix: deal gracefully with pull requests that have no commits.  This can happen if the source repo gets deleted.
- Fix: support thousands of repos on the Repositories page.

#### Release 2210.3860 (min 1992.2986 GHE 2.12 - 2.20) 2019-11-21
- New: support monitoring via `statsd`.  This is just a first cut at the feature and subject to change as I gather feedback from people who actually use `statsd` and such.  Please see the [config doc](https://github.com/Reviewable/Reviewable/blob/master/enterprise/config.md#monitoring) for details on the extra environment variables you need to set this up, but if you already happen to have `DD_AGENT_HOST` defined in your environment then the feature will turn on automatically.
- Upd: add `draft` state to pull request list query language.
- Upd: upgrade Lambda executor to use NodeJS 10 environment for user scripts.
- Fix: work around a regression in the Lambda API that caused all errors to show up as "internal executor error".
- Fix: use custom monospace font for code embedded inside comments too.
- Fix: avoid getting into a situation where (among other things) newly opened reply drafts would fail to get focus and get deleted on the next click.  This seems to have only affected some Firefox installations but could've had much more widespread effects.  All browsers should benefit from a performance boost for reviews with many discussions where users often change diff bounds.
- Fix: when setting automatic diff bounds in commit-by-commit review style, don't set bounds for files if it would result in diffing a revision against itself (resulting in a nil diff).  This was a no-op, but messed up the algorithm that estimated whether the bounds of all the file diffs were consistent.
- Fix: don't over-extend diff selection on copy if the selection ends exactly at the beginning of a new line.
- Fix: prevent occasional crash with "unmatched diff release" error message.

#### Release 2200.3821 (min 1992.2986 GHE 2.12 - 2.20) 2019-10-10
- New: add a repository setting to constrain who can dismiss participants from a discussion, either anyone with write access (the default) or only repository admins.
- Upd: update to Node 12.
- Upd: no longer run server as `root` to improve security.
- Upd: slim down Docker image from 392MB to 105MB.
- Upd: only offer "Resolve" as the primary action on a discussion if the user is already an active participant or the PR author.  Always offering it made it too easy to accidentally resolve a discussions when there are multiple reviewers.
- Upd: capture both diff bounds when a new discussion is created in a file, and restore both if the user clicks on a discussion's revision corner label.  Previously, only the discussion's target revision was stored, not the other side of the diff.
- Upd: include commit titles (first line of commit message) in custom review completion condition input data.
- Upd: treat files under `__generated__` directory as generated.
- Fix: treat Unicode line and page separators as newlines when parsing text.
- Fix: avoid minor layout issues on dashboard page and in review participants summary section.
- Fix: don't fetch branch list of current repo until user starts editing the target branch (which happens quite rarely).
- Fix: if a file was renamed, then reintroduced under its original name, ensure the reintroduced one is actually included in the review.
- Fix: don't show an error if trying to delete a branch that's already gone after a merge.

#### Release 2183.3776 (min 1992.2986 GHE 2.12 - 2.20) 2019-09-13
- New: display old/new file size (and delta) for binary files.
- Upd: split quoted replies to Reviewable's combined messages that originate from GitHub's web UI into separate threads, just like we always did for email.
- Upd: respect disposition-setting keywords (such as "FYI" or "OK") at the beginning of a draft even if they are preceded by quoted lines.
- Upd: add syntax highlighting for HCL/Terraform files.
- Upd: show the checks status icon on the dashboard if the summary state is `missing` or `pending` even if the review is in progress and other status counters are non-zero.  Previously, these states used to be elided from the dashboard to avoid information overload but they can be helpful in deciding which reviews to tackle and which to postpone.
- Upd: include `review.pullRequest.mergeability` and `review.pullRequest.checks` in custom review completion condition input data.
- Upd: don't mark synthesized revision comments (that list the commits that make up a revision) as unread if a commit was added to one that didn't affect any of the files in the PR, usually as the result of a merge or rebase operation.  (The commit is still processed and added to the revision as before, just without further notification as there's nothing new to review anyway.)
- Upd: when deciding whose action a discussion is awaiting, if the PR author's disposition is Blocking and all participants are up-to-date on all comments, then the PR author will be the only one selected as being waited on (even if others are Blocking too).  This is an unusual scenario since the PR author would typically be Working instead but this logic tweak should accord better with intuition.
- Fix: work around a bug in a dependency that manifests itself as GitHub API calls sometimes timing out with an "Aborted" message.  The error was probably introduced in 2140.3674, and was usually innocuous as the call would be automatically retried but in some situations (such as a highly loaded GHE instance) could become fatal and render Reviewable virtually unusable.
- Fix: prevent a user record with ID `undefined` from being written to the datastore.  This is likely the result of a buggy response from GitHub's API, but once in the datastore it breaks some downstream code.
- Fix: make a middle mouse click work properly most anywhere within a dashboard row, not just on the PR name.
- Fix: recognize click on mark reviewed button when text is selected on the page in Firefox.
- Fix: take GitHub review comments made on multiple comments into account correctly when deciding how to group commits into revisions.
- Fix: don't allow repo config button in checks dropdown panel to be clicked when disabled.
- Fix: correctly manage text selection within diffs in Firefox.  Previously, the last line of the selection was sometimes dropped.
- Fix: respect `reviewed: false` flag set by custom review completion condition on file revisions by counting files as unreviewed and styling mark buttons appropriately.  Previously, it was possible for the `false` value to be overridden by reviews of subsequent revisions.
- Fix: roll back HTTP request library to work around weird timeout problems on cached fetches.  The issue did not present consistently, appearing without provocation on a given instance and sometimes going away by itself as well.  If you're seeing a lot of "Aborted" or "Timeout" errors you'll want to update to this version.

#### Release 2148.3676 (min 1992.2986 GHE 2.12 - 2.20) 2019-07-24
- Fix: **HOTFIX** remain compatible with older GHE versions by removing reference to `Mannequin` from GraphQL queries.
- Fix: deal correctly with non-lowercase usernames when inferring list of users for "sync requested reviewers" publishing option.

#### Release 2140.3674 (min 1992.2986 GHE 2.12 - 2.20) 2019-07-11
This version is broken on some older GHE versions, it's strongly recommended that you skip to the next one (2148.3676).
- Upd: indicate draft PRs on dashboard and review pages (GHE 2.17+).  You need to use GitHub to declare a draft PR "ready for review" for the time being; that functionality will be added later, along with a UI redo.
- Upd: support `±label:<name>` query terms in review list.
- Upd: improve selection of base commit when diffing renamed files (favoring the original file when possible).
- Fix: don't ignore errors when merging, and don't delete the branch if the merge failed.
- Fix: make sure the merge completes before deleting the source branch.
- Fix: don't get stuck waiting for a merge commit message (with a spinner that never goes away) if user clears out the text box.
- Fix: avoid rare crash when deleting a comment with images in its preview mode.
- Fix: avoid another rare crash when using the review preview dropdown and editing a comment immediately thereafter.
- Fix: don't crash with a bogus permission denied error when trying to access an unarchived review with special characters in the owner or repository name.
- Fix: track focused draft correctly for targeting keyboard shortcuts.  A bug caused the first draft that had a keyboard shortcut applied to it to become the target of all future shortcuts.
- Fix: ignore review comments with no author (not sure how that can happen, but observed one such case!).
- Fix: clip long directory paths in file matrix.  This is a quick fix to prevent the layout from jumping around when moving the mouse around the matrix, but may result in some long paths getting clipped even when _not_ hovering over them if all filenames are short and there aren't many revisions.

#### Release 2113.3608 (min 1992.2986 GHE 2.12 - 2.20) 2019-05-16
- New: add a `mergeStyle` field to review completion condition output.  You can use this to dynamically force a specific merge style for a review even if the repo is configured to allow others.  Only enforced in Reviewable.
- Fix: make custom diff font settings actually work again.
- Fix: prevent an extremely rare series of occurrences from permanently corrupting a review such that it won't update with any further commits.  This bug has been present in the code since day one and I just observed it for the first time in 5 years...
- Fix: don't offer to "show more concluded reviews" when searching for a single PR by URL in review list.
- Fix: don't crash when some PR filepaths differ only in case in specific ways.
- Fix: don't use data derived from a stale review state when racing to create a new review (very rarely).  This could've resulted in aspects of a review being temporarily out of sync with the PR, but should've fixed itself automatically as the review was visited and resynced.
- Fix: deal gracefully with racing server shutdown requests, instead of crashing out early.

#### Release 2093.3571 (min 1992.2986 GHE 2.12 - 2.20) 2019-04-16
- New: add a `disableBranchUpdates` flag to review completion condition output.
- New: add `defaultMergeCommitMessage` and `defaultSquashCommitMessage` fields to review completion condition output.  Also include `title` and `body` in `review.pullRequest` input state.
- Upd: on initial load, keep the review list's spinner up until _all_ the data has been loaded, to prevent having rows move around as more information streams in.  Note that this is a live list so rows may still shift position later as reviews' states change, but this should improve the first-load experience at the expense of a bit more latency before the list shows up.
- Upd: upgrade AWS Lambda custom review completion condition runtime environment to Node 8 (applied lazily as conditions are modified).  This is technically a major version change but it's very unlikely to affect the kind of code written for completion conditions.
- Upd: raise GitHub API socket timeouts.  This should help reduce spurious errors when the GitHub server is under high load and slow to respond.
- Upd: tweak semantics for the red "unreplied" counter and "awaited" users so that if you are awaited for a review due to a discussion, it will always show up as unreplied for you.  Previously, there were edge cases in multi-party discussions where you were awaited but a passive follower got the red unreplied state instead.
- Upd: remove a workaround for GitHub's API bug that reset the "allow maintainers to modify PR" flag when applying an unrelated patch.  Unfortunately, they've tightened up the validation such that it's not possible to even specify the existing flag value unless you're the PR author, and Reviewable needs to call the API through various identities.  It's not clear when the API bug was fixed, so if you're still using an old version of GHE then Reviewable might start resetting the flag again.  If this happens, please either upgrade your GHE or downgrade Reviewable.
- Upd: show full name in review participants status area, instead of just the avatar.
- Fix: don't consider a branch fast-forwardable if GitHub says it can't be rebased, even if analysis of the commit chain indicates that it ought to be.
- Fix: line up diff stats correctly to the right of the file matrix when a file has no last reviewer.
- Fix: correctly generate publication preview when user switches approval flag while the preview is being generated.
- Fix: prevent some very rare crashes in data race condition edge cases.
- Fix: don't crash if a GitHub app files a status check with an empty-string context.
- Fix: don't crash with permission denied error when collapsing or expanding a file group whose name has periods in it.
- Fix: prevent crashes when trying to redirect in Edge.
- Fix: prevent clicks on a merge button in the pull requests list from navigating to the review.

#### Release 2071.3450 (min 1992.2986 GHE 2.12 - 2.20) 2019-03-11
- New: allow grouping (and reordering) files in a review via new `group` property for files in the custom review completion condition.  See the docs on [setting it up](https://docs.reviewable.io/#/repositories?id=condition-output) and [how it looks in the UI](https://docs.reviewable.io/#/files?id=file-list) for details.
- Upd: lay out the file matrix as a directory tree rather than a flat list of files.
- Fix: **HOTFIX** avoid a crash when loading Reviewable on an encrypted instance in private mode while already signed in with the error "Encryption not set up".  This regression was introduced in the previous release, v2066.3418.
- Fix: correctly display and expand/contract long paths in file headers.
- Fix: don't show file matrix until file renames have been mapped.
- Fix: improve text copy from diff to correctly extend selection to full lines when dragging backwards with mouse, and to exclude blank line space placeholders from the copied text.
- Fix: stop requiring `REVIEWABLE_FIREBASE_AUTH`, which hasn't been needed since v1994.2998.
- Fix: prevent a crash on loading the reviews list if server hasn't properly set the GHE version in Firebase yet.  The root cause is likely a bad auth for the subscription admin user, which will log `Unable to initialize generic GitHub access` on the server at startup along with a specific error message.
- Fix: don't flash a prompt to sign in when loading a review page on an encrypted instance in private mode while already signed in.

#### Release 2066.3418 (min 1992.2986 GHE 2.12 - 2.20) 2019-02-28
**KNOWN ISSUE** This version breaks badly in environments running in `REVIEWABLE_PRIVATE_MODE`.  You almost certainly want to skip over it.
- New: let user temporarily see more concluded (closed or merged) pull requests on the dashboard by clicking a link.
- Upd: upgrade to NodeJS 10.
- Upd: upgrade email module.  **WARNING** It now uses `dns.resolve` instead of `dns.lookup` when resolving `REVIEWABLE_SMTP_URL`, which will query the DNS server directly and bypass some local configs such as `/etc/hosts` (i.e., it doesn't use `getaddrinfo(3)`).
- Upd: lower the diff threshold to consider a file pair as renamed by 5%.
- Fix: ignore @-mentions that can't be resolved.
- Fix: detect when the authorization has been upgraded in other tabs, and force user to re-authenticate to prevent an authorization skew between the permissions on the server and in the tab.  This was not a security issue but could result in unexpected errors.
- Fix: lock out sign-in/sign-out during authentication (to avoid racing multiple auth requests) and when publishing (to avoid accidentally signing out and breaking the process halfway).
- Fix: fix minor visual issues with set default query link on dashboard.
- Fix: prevent crash in rare cases when setting diff bounds in file matrix header.
- Fix: put pending reviewers list back in the checks dropdown.
- Fix: don't request reviewer twice if user is self-requesting.  This is a no-op but looks ugly in GitHub's timeline.

#### Release 2056.3350 (min 1992.2986 GHE 2.12 - 2.20) 2019-02-07
- New: give option to sync GitHub's requested reviewers from Reviewable's awaited reviewers when publishing.  See [docs](https://docs.reviewable.io/#/reviews?id=sync-requested-reviewers) for details.  Great for integration with [Pull Reminders](https://pullreminders.com) if you use Slack!
- Fix: allow users to login in multiple browsers / profiles without forcing all but the latest one offline.  This was a regression introduced in 2033.3283.  Note that this is a temporary fix that reintroduces the auth ugprade race condition handled by the broken fix.  A better permanent fix will come in the next release, after a whole lot of testing.
- Fix: remedy race condition when triggering completion condition evaluation in response to PR review events. Previously, it was possible for the condition to be triggered before the review state correctly reflected the new approvals.
- Fix: improve forced logout on page load when session is close to expiring to be less likely to cause spurious errors.
- Fix: if a review's style hasn't been set yet and the user lacks write permissions, temporarily initialize it locally to avoid potential breakage (and a blank dropdown in the UI).
- Fix: don't show merge button if user lacks push permissions, even if PR is mergeable.
- Fix: substitute ghost user for deleted users during completion condition evaluation if unable to find or fetch their old info.  Previously, the evaluation task would get into an infinite failure loop instead.
- Fix: correctly render dismissed user status icon on dashboard.
- Fix: truncate very long GitHub comments when syncing (current cutoff is 100KB) to avoid running afoul of Firebase's hard limits on data size.  (If the limits are exceeded it can get tricky to recover.)
- Fix: keep drafts locked while generating publish preview to avoid async edits that would not be reflected in the preview, or that can sometimes cause a crash.
- Fix: don't misinterpret a `±reviewer:@username` directive as an @-mention.
- Fix: don't offer PR author as a completion for `+reviewer:@` directive.
- Fix: include pending changes to approval, assignees, reviewers, labels, etc. when evaluating the completion condition before publishing.  This didn't affect status accuracy (since the condition gets evaluated again after everything is published and committed) but could result in a bogus completion description being shown in the preview and posted in the GitHub message.
- Fix: don't walk revision description message timestamps forward by 1ms every time the review gets synced in certain circumstances.  This could result in requiring users to regularly re-acknowledge those comments.
- Fix: restore hotkey indicators in certain contextual help blurbs.

#### Release 2033.3283 (min 1992.2986 GHE 2.12 - 2.20) 2019-01-21
- New: publish a complete user guide at https://docs.reviewable.io.  This has all the content from the online help system and more, organized to be both readable and searchable.  It will stay up to date with the current version of the app running on reviewable.io, so it may reference features that are not yet available to Enterprise, or that you have not yet deployed.  If this turns out to be a major issue we'll figure out a solution, but for now think of it as an additional incentive to update often!
- Upd: fill in missing properties in the result of a custom review completion condition with values from the output of the built-in default condition.  This will make it easier to tweak things without having to take on maintenance of the full condition.
- Upd: support `refreshTimestamp` in completion condition output structure, to determine when it should be re-evaluated.  Also add `lastActivityTimestamp` to discussion participants and `timestamp` to file reviewer marks (the latter will not be available for marks made in older versions).  See the new user guide for a full explanation of how this works!
- Upd: add `review.pullRequest.requestedTeams` to the review state data made available to custom review completion conditions.  Old reviews are _not_ eagerly backfilled, but will gain the property when synced for any reason (e.g., being visited in the browser).
- Upd: regularly delete stale cached info for users who never signed in to Reviewable.  This will help reduce the size of the users collection, which can eventually cause performance problems.
- Upd: add `showHideAllComments` bindable command.
- Fix: make the warning icon show up correctly in merge button.
- Fix: update Reviewable's cached mergeability state promptly if Reviewable status check is required in GitHub.  Prior to this fix, actions that changed the review's completion status would not be reflected in the mergeability state until the user reloaded the review page or something else triggered a sync.
- Fix: if review creation fails on visit, display error correctly in the browser.
- Fix: immediately recognize GitHub auth upgrades (new OAuth scopes) instead of getting stuck and requiring the user to reload the page.
- Fix: eliminate a race condition on GitHub auth upgrades where some GitHub API calls would be issued too early (with the old token) and fail.
- Fix: ensure that GitHub auth upgrades don't accidentally switch to a different account, if the user signed in with a different username to GitHub but not Reviewable.
- Fix: prevent spurious server shutdowns when fetching very long lists of items to process during background sweeps.
- Fix: resize comment area if details element expanded (e.g., "Quoted NN lines of code...").

#### 2017.3170 (min 1992.2986 GHE 2.12 - 2.20) 2018-12-14
- Upd: show a yellow warning sign on the merge button if non-required checks are failing, instead of a red one which is now reserved for admin overrides of required checks.
- Fix: correctly compute height of file matrix when concealing/revealing obsolete files.
- Fix: when navigating to a file in a review, avoid animating the header multiple times if the user has visited multiple review pages during the session.
- Fix: in the "mark reviewed and go to next file" button, hitting the small red button will now also advance to the next file instead of only marking it as reviewed.  This was a regression from a version or two ago.
- Fix: avoid a "not ready" crash when clicking on a disabled Merge button.
- Fix: compute mergeability status correctly and in a timely fashion in all (or at least more) situations when branch protection is turned on.
- Fix: don't lock up the dashboard when user types a partial URL into the search box.
- Fix: in markdown comments, don't treat multiple triple-backticks on the same line as an unclosed code block since GitHub renders them as if though they were inline single-backticks instead.
- Fix: respect no-animation setting in merge options dropdown.

#### 2003.3043 (min 1992.2986 GHE 2.12 - 2.20) 2018-11-28
- Upd: remove "butterfly" onboarding mechanism, to be replaced by a more conventional (and less hate-inspiring) checklist as part of the Vue rework at a later date.
- Upd: exclude merged and closed PRs from the "Awaiting my action" section on the dashboard.
- Upd: adjust sorting order of blocking avatars on the dashboard to be easier to parse visually.
- Fix: correctly send sample review data if no PR selected when editing custom review completion condition.
- Fix: reinstate rebased revision matching arcs above the file matrix and file header revision cells.  If the source branch was rebased, these show Reviewable's guess at how the revisions match up.  They disappared a while back and are now back as part of the Vue migration.
- Fix: make issue (`#`) autocomplete work in comments again.
- Fix: protect against breakage if a username, organization name, or repository name happens to match a built-in property name.
- Fix: render markdown checkboxes in comments as checked when they are.
- Fix: avoid extremely rare internal error crash when diffing.
- Fix: gracefully handle situation where a user who turned on an organization's "All current and future repos" toggle loses admin permissions but still has pull permissions.
- Fix: ensure that the second and later runs of background cron tasks start from the beginning, rather than mistakenly resuming at the last checkpoint of the previous run.

#### 1994.2998 (min 1992.2986 GHE 2.12 - 2.20) 2018-11-19
- Upd: prevent rollbacks to version that use the old Firebase SDK.  It's now safe to remove the `REVIEWABLE_FIREBASE_AUTH` environment variable from your configuration, and revoke the legacy secret(s) if you'd like to do so.
- Fix: avoid bogus "offline" state with pending writes that never goes away, caused by an unfixable false positive in the shared web worker client abandonment detection logic.  The trade-off is that now if a Reviewable tab exits abruptly, some resources in the shared worker won't be released.  However, closing _all_ Reviewable tabs will always dispose of the worker, so it's a good thing to try if you find your browser resource usage creeping up inexplicably.
- Fix: correctly treat the "Show pull requests not yet connected to Reviewable" toggle on the dashboard as being on by default, if the user never toggled it manually.  Previous versions used to show it as on, but behaved as if it was off.
- Fix: on the dashboard, don't show a status spinner forever for unconnected pull requests.  (Esthetic fix only, as there's nothing more to show anyway.)
- Fix: prevent the merge button from getting stuck disabled when in Squash merge mode.  This change moves fetching the commits from GitHub to generate the automatic merge commit message to later in the process, so if this phase fails the merge will fail with an appropriate error message rather than the button getting stuck.
- Fix: avoid a crash when the user signs out halfway through merging a PR.
- Fix: work around corrupted Firebase state when the client crashes with an `InvalidStateError`.  Prior to this fix, all subsequent page loads would fail with permission denied errors until the user closed _all_ Reviewable tabs to flush the shared worker.
- Fix: raise timeout when checking permissions on all of the user's repos, to allow for a large number of repos even if the GitHub API server is pretty busy.
- Fix: don't crash if a bulk permission check fails and a targeted permission check returns false.

#### 1992.2986 (min 1975.2968 GHE 2.12 - 2.20) 2018-10-31
- New: automatically archive old reviews to save space and prevent the monthly sweep from overloading Firebase.  Closed reviews are archived aggressively, while seemingly abandoned open reviews will be archived after a longer period of time, based on the time of last access (or review creation if never accessed).  Archived reviews remain in Firebase (and encrypted) and will be transparently restored as needed.  The only place where this feature is visible to users is on the reviews dashboard, where archived reviews will show their status as "Archived" until restored via a visit and may not show up in the correct category.
- Upd: switch the client to the current version of the Firebase SDK.  All users will be signed out the first time they load a Reviewable page with this version, but currently open pages from the previous version will not be interrupted.  No config updates required beyond those from the previous version.
- Fix: don't list reviews where the user is just a mentionee under the "being reviewed by you" category on the dashboard, but do list self-reviews there.  A side-effect of this fix is that some older reviews will show up in a category lower than "being reviewed by you" until somebody visits them again, but this shouldn't be a problem going forward.
- Fix: include files that were renamed with no other changes in the review state passed to the custom review completion condition.
- Fix: supply correct sentiment timstamp to custom review completion condition when executing in a preview or pre-publication context.  Since version 1831.2835, conditions were sometimes given a bogus object instead of a timestamp that could cause the condition to fail or produce inaccurate results.
- Fix: prevent batch cron jobs from disturbing the Firebase cache.
- Fix: address even more edge cases when rebasing to avoid ending up with a broken review.
- Fix: avoid some crashes when user signs in and out very quickly.  This should pretty much never occur in real usage, but did during github.com's recent breakdown where they were handing out auth tokens but immediately refusing to accept them!
- Fix: defuse race condition that could let users try to create a line comment after signing in but before their review state was loaded, resulting in a crash.

#### 1975.2968 (min 1866.2875 GHE 2.12 - 2.20) 2018-10-19
- Upd: **CONFIG UPDATE REQUIRED** switch the server to the current version of the Firebase SDK.  The new SDK addresses some long-standing Firebase bugs, in particular greatly ameliorating (but not quite fixing) the stuck transactions that cause Reviewable servers to restart themselves frequently under load.  However, this new SDK **requires different credentials** to initialize the connection to Firebase.  Please check the updated [config docs](https://github.com/Reviewable/Reviewable/blob/master/enterprise/config.md) for instructions on where to find the bits you'll need in the Firebase console and how to set the `REVIEWABLE_FIREBASE_WEB_API_KEY` and `REVIEWABLE_FIREBASE_CREDENTIALS_FILE` environment variables.  Please keep the old `REVIEWABLE_FIREBASE_AUTH` around for now, until the client gets updated to the new SDK as well in an upcoming release.  In case you have a very twitchy firewall, note that the new Firebase SDK will send requests to various subdomains of `googleapis.com` as part of the updated auth token management mechanism.
- Upd: update syntax highlighting library, review and update file extension mappings, and subset library to a more commonly used set of languages based on analytics data from reviewable.io.  If you find that some file types are no longer highlighted correctly, please let me know and I'll add them to the next release.
- Fix: handle even rarer edge cases when rebasing to avoid ending up with a broken review.
- Fix: prevent rare permission denied crash when loading an uninitialized review.
- Fix: prevent permission denied crash when creating a comment on a base revision of a renamed file where the original source file had been recreated in the PR at or before that revision.  The comment will now be created on the nearest possible equivalent base revision instead.
- Fix: avoid rare crash due to race condition in the contextual help subsystem.
- Fix: invite user to sign in when landing on a review page they have permission for but where the review hasn't been created yet, instead of getting stuck.
- Fix: avoid false negative liveness checks that cause an automated server restart when a cron job is starting up.

#### 1911.2952 (min 1866.2875 GHE 2.12 - 2.20) 2018-10-08
- New: allow user to set a default query for the Reviews page
- Upd: add `±starred` and `±watched` filters for use in Reviews queries.
- Upd: migrate Merge button from AngularJS to VueJS.  There should be no user-visible differences, except perhaps an incidental fix to a rare bug in applying default settings.  This is just the first step in the migration of the entire UI to VueJS; unlike the big-bang model migration and attendant beta, this one will proceed piecemeal over the coming months.  I won't call out further VueJS updates in the changelog unless they have user-visible effects.
- Fix: accept `check_run` and `check_suite` events.
- Fix: correctly abandon processing of comment events if the comment still can't be found after an hour.
- Fix: correctly handle some edge cases when a branch gets rebased onto one of its own commits, where previously this could result in a permanently broken review.
- Fix: don't crash when the user requests a preview of the outgoing drafts, then edits one of them at just the wrong moment.
- Fix: don't get stuck waiting forever for data when the user switches pages at just the right time to trigger a race condition.  This could happen most easily when switching from Reviews to Repositories and back before the Repositories page fully loaded, but could have affected other transitions as well.
- Fix: remove top discussion draft area from bunny dropdown when user not signed in (otherwise typing in it would cause a crash).

#### 1883.2928 (min 1866.2875 GHE 2.12 - 2.20) 2018-09-09
- Upd: don't count participation in resolved dicussions towards inclusion in the "being reviewed by me" section on the dashboard.
- Upd: restart the server if Firebase liveness check fails for more than about a minute.  This can help reset zombie connections to Firebase in some edge cases.
- Upd: removed many rarely used languages from the syntax highlighting library pack to significantly reduce code size.
- Fix: set correct font for draft text boxes.  This regression caused draft boxes to be sized incorrectly, which made long messages harder to input.
- Fix: back off the retry interval when dealing with GitHub's 422 bug for setting refs, and log retries to make this situation easier to debug.
- Fix: ensure that the "unresolved N" toolbar button (for N > 0) will always navigate to a discussion.  Previously, it was bound to navigate to the next discussion _without a draft_.  Also introduce new commands for the two navigation variants and rebind default keys to the new semantics.
- Fix: bring back the "draft saved" indicator when editing draft comments.
- Fix: eliminate rare crash when publishing comments due to rendered value being `undefined`.
- Fix: prevent some rare crashes when quickly navigating to a review from the dashboard and back.
- Fix: prevent some permission denied errors that could occur if the connection dropped while publishing.

#### 1872.2918 (min 1866.2875 GHE 2.12 - 2.20) 2018-08-25
- Upd: mark stalled reviews with an icon in the reviews list.
- Upd: raise LOC thresholds for considering a diff "big" and hiding it by default.
- Fix: dynamically back off pull request list request size when we run into GitHub's GraphQL bug.  The request size used to be a static value picked to work "most of the time", but could still result in incomplete results sometimes (with a warning shown to the user).  This new approach should be more reliable.
- Fix: for the `sandcastle` custom completion condition executor, fix error formatting and add support for `require`ing a hardcoded list of built-in modules.
- Fix: better tolerate malformed custom line link templates, and show any errors in the settings dropdown.
- Fix: support double-click text selection in diffs, as best as possible.  It still races with discussion creation and, if animated transitions are on, will sometimes immediately deselect the text.
- Fix: make `setCurrentDiscussionDisposition` work properly when editing a draft reply.
- Fix: increase reliability of redirect flavor of sign-in flow, and make it work in Edge.
- Fix: ensure that tooltips (e.g., on the toolbar counts) don't show stale descriptions sometimes.
- Fix: correctly compute unresolved / unreplied discussions when dismissals are pending.
- Fix: prevent UI elements (e.g., the Publish button) from occasionally disappearing when transition animations are turned off.
- Fix: promptly update mergeability and show merge button when branch protection is turned on in a repo.
- Fix: correctly style implicit code snippets in markdown, instantiated automatically by GitHub in response to a blob line range link.

#### 1868.2890 (min 1866.2875 GHE 2.12 - 2.20) 2018-08-04
- New: add a "Mark reviewed and go to next file / diff next revision" button at the bottom of diffs that need reviewing.  Also add a bindable command for this action (not bound by default).
- Upd: change the semantics of the "to review" counter in the toolbar to "to review in the current diffs" (as originally planned), and fix the Changes box in the toolbar to turn the revision red when there are more files to review at a different revision.
- Fix: correctly enforce min versions.  The last few releases will not automatically enforce the minimum rollback versions listed here, but please make sure to respect them nonetheless if you need to roll back.
- Fix: include commit status context name in the description shown in the Checks dropdown.
- Fix: make sure disposition dropdowns don't layer under another file's revision cells.
- Fix: avoid race condition when preparing the Merge Branch button that would sometimes result in user's settings being ignored.
- Fix: don't collapse a discussion as soon as a draft reply is created, but rather wait until it's sent.
- Fix: correctly handle repos with dots in their name on the Repositories page.
- Fix: force a permission refresh if a newly created repo is detected on the Repositories page.
- Fix: prevent crash when repeatedly editing settings of repos in multiple organizations on the Repositories page.
- Fix: update evaluated value when editing completion condition while an evaluation is already in progress.

#### 1866.2875 (min 1831.2835 GHE 2.12 - 2.20) 2018-07-24
- New: if a user is mentioned in a discussion (other than the main top-level thread), don't treat them as a reviewer unless they've taken review-like actions, e.g., marked a file as reviewed or started a new discussion.  This way, if you come into a review because somebody mentioned you to ask for spot advice, you won't see all files as to be reviewed and many discussions as to reply.
- New: disable "Approve" and "Request changes" publication options if custom review completion condition sets `disableGitHubApprovals` to `true` in its return value.  This is useful for teams that have an LGTM-centric workflow and don't want the confusion of GitHub approvals (even if they're ignored).
- New: added REVIEWABLE_LOG_GITHUB_API_LATENCY and REVIEWABLE_GITHUB_CACHE_SIZE environment variables.  See [configuration docs](https://github.com/Reviewable/Reviewable/blob/master/enterprise/config.md) for details.
- Upd: make review synchronization more efficient for repositories with large file trees.  This especially impacts cases where a directory has a lot (1000+) of immediate subdirectories, which could previously bring the server to a virtual standstill.
- Fix: use commit timestamp instead of authoring timestamp when sorting commits or generating revision descriptions in top-level thread.  While these timestamps are usually the same, in some rebase or merging scenarios they can drift apart, and using the original authoring timestamp can result in new revision descriptions being considered "read".
- Fix: ensure constrast slider shows up in correct position when settings dropdown is opened.
- Fix: fix sample review completion condition for counting approvals; the previous code wouldn't actually do so.  Oops.
- Fix: allow repo admins to merge when GitHub's branch protection would normally block it but admins are exempted.
- Fix: display correct loading message when waiting for a review to be created (usually only in a disconnected repo).
- Fix: guard against various failures when `REVIEWABLE_LOGGING_URL` is specified.
- Fix: avoid producing temporarily invalid review structures when some events get handled out of order.  This could result in a "permission denied" message on the client while waiting for the review creation to finish.

#### 1844.2857 (min 1831.2835 GHE 2.12 - 2.20) 2018-07-14
- New: integrate with GitHub's review approval system.  When publishing from Reviewable you can set whether to approve, request changes, or just comment, with Reviewable picking a default state based on your discussion dispositions and file review marks.  This state gets published to GitHub and will be used by the branch protection system's required reviews option.  Reviewers' current effective state is also reflected in Reviewable (in the reviews list and on the review page) and available for use in custom review completion conditions.  ([Full changelog entry](https://headwayapp.co/reviewable-changes/github-reviews-integration-64906))
- New: add "Trust but verify" user setting.  When turned on, discussions where the user is _Discussing_ and that get resolved with no further comment will be treated as unreplied.  The new setting panel can be accessed from any disposition dropdown via a small gear icon.  ([Full changelog entry](https://headwayapp.co/reviewable-changes/trust-but-verify-65292))
- Upd: moved time-ago comment dividers ("N days ago", etc.) to be above the corresponding time period, rather than below, in a nod to widespread convention.
- Upd: if branch protection is turned on then defer to GitHub's mergeability determination, since we can't accurately duplicate the logic.  Note that this may result in Reviewable offering the option to merge earlier than it used to, if branch protection is set up more loosely than Reviewable's old built-in logic.
- Fix: update PR mergeability status in Reviewable on all events that could affect it, and do so in a timely manner.
- Fix: correctly use a default emoji if custom LGTM button output text is complex.
- Fix: make toolbar dropdowns (checks, changes) show up correctly when page is scrolled down.
- Fix: correctly list commits within diff bounds for current file in changes dropdown.

#### 1831.2835 (min 1801.2799 GHE 2.12 - 2.20) 2018-07-02
- New: allow user to tweak the app's visual contrast (e.g., of diff highlighting) through account settings dropdown.
- Upd: emit the server-side review status (including a custom review completion condition, if so configured) when publishing a review.
- Fix: work around a GitHub GraphQL bug that causes PRs to be randomly omitted from the review list when the list gets long.
- Fix: in review list, correctly fetch requested reviewers for PRs that don't yet have connected reviews.
- Fix: avoid permission denied error in the client when loading a review that hasn't yet been created.
- Fix: avoid permission denied error if the client gets disconnected at just the wrong moment when publishing comments, then reconnects.
- Fix: snapshot revisions when user acknowledges, changes disposition, or dismisses a participant.
- Fix: prevent disposition dropdown from disappearing under another layer in rare cases.
- Fix: improve auto-recovery from wrong webhook secret.

#### 1801.2799 (min 1785.2755 GHE 2.12 - 2.20) 2018-06-10
- New: overhaul discussion semantics, including disposition, resolution, unreplied counts, etc.  See [this post](https://headwayapp.co/reviewable-changes/discussion-semantics-overhaul-61097) for a summary, and [issue #510](https://github.com/Reviewable/Reviewable/issues/510) for details.  The most intrusive UX change is that _all_ state changes are created as drafts and must now be published to take effect, including acknowledgements, disposition changes, and dismissals.  Otherwise, I've done as much as possible to ensure that reviews in progress won't be disrupted and that users with old clients still loaded can collaborate with those who have the new version, but there may still be some minor bumps during the transition.
- Upd: added `±am:author`, `±am:assigned`, and `±am:requested` filters to the reviews list.
- Fix: correctly calculate number of marks and reviewed files in the presence of renames.
- Fix: re-enable rebase merging, got disabled by accident.
- Fix: don't crash when client gets disconnected in the middle of a transaction.
- Fix: keep better track of currently focused file (for applying keyboard shortcuts).
- Fix: greatly improve loading performance for reviews with many files (hundreds or higher), especially if a lot of files were renamed.

#### 1785.2755 (min 1755.2561 GHE 2.12 - 2.20) 2018-05-26
- Upd: remove automatically generated :shipit: emoji from published messages as it could be confusing in multi-reviewer situations.
- Upd: add `review.pullRequest.creationTimestamp` to completion condition data; not backfilled but should populate pretty quickly.
- Upd: tolerate new discussion semantics (coming in the next release!) in case of rollback.
- Fix: if user grants new permissions when sending comments, actually use those permissions when sending.
- Fix: correctly process label directives for labels that have a description.
- Fix: restore last-reviewer avatars in the file matrix.
- Fix: correctly configure merge button to delete or retain branch based on user settings and permissions.
- Fix: avoid unnecessarily updating the review when syncing a PR.
- Fix: correctly handle the "include administrators" branch protection flag.
- Fix: avoid occasional permission denied error when reconnecting to the network after a long time offline.
- Fix: address some very rare client crashes caused by race conditions and data edge cases.
- Fix: actually sort the repository lists on the Repositories page; they were only (mostly) sorted by accident before.

#### 1777.2720 (BETA, min 1755.2561 GHE 2.12 - 2.20) 2018-04-26
- New: enforce a minimum supported GHE version, starting with the relatively recent GHE 2.12.  This lets Reviewable take advantage of new APIs sooner, in particular new additions to GraphQL data.  The policy is to always support the two most recent GHE versions and the three most recent if possible.
- New: this release includes a complete rewrite of the client's data / logic layer for improved performance and consistency.  One extra bonus is that communication with Firebase is moved into a worker thread, offloading all the crypto to where it doesn't block the UI.  When using Chrome or Firefox the worker is shared between tabs, improving bootstrap time on subsequent tabs due to the connection already being established, and providing a shared data cache.
- New: offer option to load all diffs when any were skipped for any reason (e.g., throttling, too many files, etc.).
- New: make requested reviewers available to review completion conditions and update the samples to prefer requested reviewers over assignees when set.  If your users have custom review completion conditions for their repos they may want to tweak them as well.
- New: make available a new directive (`±reviewer:@username`) to manage requested reviewers, via any comment (in Reviewable, via GitHub, or via email).
- New: display how long ago each participant in a review last interacted with the review, and whether they have any drafts pending.  (Note that clients prior to this version don't report this information, so people who are hoarding an old Reviewable page will appear to be idle and have no pending drafts.)
- New: support `Merge manually by overwriting target` label to improve diffs in forked repos being synced with upstream changes; see [this changelog entry](https://headwayapp.co/reviewable-changes/reviews-in-forked-repos-that-track-upstream-changes-57413) for details.
- Upd: allow filter negation in reviews list and add more filters.
- Upd: reduce reviews list request and bandwidth requirements, and show labels and milestones even for unconnected PRs (thanks GraphQL!).
- Upd: add "waiting on me" and "being reviewed by me" sections to reviews list, and show blocking users instead of assignees next to the pointing hand.
- Upd: include reviews requested from your teams in the "involving my teams" section, and consider ancestor teams as well in all team-related queries.
- Upd: make review list search field bigger, and combine with pull request URL jump field.
- Upd: sort C/C++ header files before their corresponding implementation files.
- Upd: add support for label descriptions, when available.
- Upd: move "show full diff" button lower in the Changes box and make it available all the time.
- Upd: if a GitHub `pull_request` event was missed for a connected repository for some reason, create the review if any auxiliary events come in for it later.  This was already the case for comments, but now works for `push` and `status` events too.
- Fix: don't crash when adding a comment to the base of certain revisions of a renamed file.
- Fix: take diff regions that are collapsed by default (e.g., whitespace, base changes) into consideration when computing the size of the diff to decide whether it's too big to show.
- Fix: expand multi-line diff selections to include full first and last lines, and adjust rendering of collapsed quoted code to work with the latest GitHub Markdown renderer.
- Fix: work around a bug in Firefox where up/down cursor keys wouldn't work in a reply to a discussion until it was blurred and refocused.
- Fix: work around rare bug where page scrolled to the top and stayed stuck there after clicking Acknowledge (possibly limited to Firefox).
- Fix: prevent disabled dropdowns from getting re-enabled after display help overlay.

#### 1761.2574 (min 1664.2314) 2018-03-18
- Fix: deal correctly with rate limiting on GHE (whether turned on or off).

#### 1757.2561 (min 1664.2314) 2018-03-15
- Fix: use correct URL for GHE GraphQL queries.

#### 1745.2527 (min 1664.2314) 2018-03-11
- Upd: respect Go's standard "generated file" marker.
- Upd: use GraphQL when handling `push` events on the server instead of search API.
- Upd: prefer requested reviewers if set instead of assignees when determining who is needed to review a PR in the default review completion condition.  This change is on the server only and sets the stage for matching client-side changes coming in a follow-up release.
- Fix: add hard timeouts when checking queue health, to ensure that the process can never get stuck even if Firebase is down and its SDK is buggy.  This _should_ prevent Reviewable processes from going zombie in extreme and rare circumstances, where they're still alive but not doing any useful work.
- Fix: catch and handle some rare top-level exceptions that could cause a server process to go zombie.
- Fix: gracefully handle hiccups during comment sending that cause a duplicate write.
- Fix: don't die when a commit has more than 100 different status contexts.
- Fix: reset repeating cron job counters between runs.
- Fix: prevent error when connecting an empty repo.

#### 1694.2348 (min 1664.2314) 2018-01-17
- New: sweep database every 30 days to fix things up and delete stale redundant data, reducing long-term storage requirements.  Deleted data will be automatically refetched from GHE if needed later. WARNING: while a sweep is setting up, the instance will be temporarily locked out of doing other work for up to a few minutes. Please make sure you have at least 2 instances running at all times to avoid outages.
- Upd: remove `/_ah/start` and `/_ah/stop` handlers, add `/_ah/ready` handler, and listen to `SIGTERM` for graceful shutdown.  If you were using those handlers or are using health checks on your instances, please see the [updated configuration docs](https://github.com/Reviewable/Reviewable/blob/master/enterprise/config.md#container-configuration).
- Upd: replace `REVIEWABLE_GITHUB_CERT_FILE` config option with `NODE_EXTRA_CA_CERTS`.
- Fix: if a large tree fetch from GHE fails to parse incomplete data, treat it as a truncated result and fall back on manually recursing smaller fetches.  This should reduce transient errors when syncing reviews.

#### 1678.2324 (min 1664.2314) 2018-01-10
- Fix: sweep all reviews to correct broken owner/repo properties from renamed organizations and repositories.
- Fix: correctly compute review state on the server when faced with complex file rename chains.  This affects both the built-in review completion computation and custom completion conditions.
- Fix: bootstrap correctly on first install (again).

#### 1664.2314 (min 1549.2198) 2017-12-11
- Upd: update server to Node 8.
- Fix: correctly adjust reviews' owner/repo properties when processing an organization or repository name change.  Badly adjusted reviews will have some properties still pointing to the old owner/repo, which can cause permission grants to fail and users to be improperly denied access to the reviews.  This fixes the problem going forward, and a later change will fix the properties of reviews previously created in subsequently renamed repositories.
- Fix: don't overwrite disposition changes on discussions with comments imported from GitHub.

#### 1655.2258 (min 1549.2198) 2017-12-01
- New: add REVIEWABLE_GITHUB_CERT_FILE config option, for GHE servers with self-signed TLS certs.
- Fix: reduce number of GitHub status updates to avoid running into hardcoded limit in API.
- Fix: omit files whose revisions are all obsolete from proposed diffs, preventing the "each-commit" review workflow from getting "stuck" after marking all files reviewed.
- Fix: bootstrap correctly on first install when there are no reviews yet.
- Fix: correctly parse "Last, First" format names when sending emails; this format is sometimes used by user directory sync systems.
- Fix: avoid resetting `maintainer_can_modify` on PRs, due to a GitHub API bug.

#### 1638.2247 (min 1549.2198) 2017-10-08
- Fix: correctly deal with bot users introduced by the new(ish) GitHub Apps API.
- Fix: when collapsing a discussion (e.g., by clicking Acknowledge) whose top is off-screen, prevent the page from seeming to "jump down" to unrelated content.
- Fix: mark revisions as `obsolete` in data structure passed to custom review completion conditions.  You'll likely need to [update your condition code](https://headwayapp.co/reviewable-changes/completion-conditions-and-obsolete-revisions-35080), especially if you use force pushes in your workflow.

#### 1619.2237 (min 1549.2198) 2017-08-16
- New: added `REVIEWABLE_CONSOLE_MULTILINE_SEPARATOR` config option for environments that expect one-message-per-line console output.  See [config docs](https://github.com/Reviewable/Reviewable/blob/master/enterprise/config.md#monitoring) for more details.
- Upd: change AWS Lambda environment for review completion function execution from Node 4.3 to Node 6.10.
- Fix: detect errors caused by a suspended account and treat as a permanent issue (send email, disable repo connection).
- Fix: ensure resolved discussions stay collapsed when layout triggered (e.g., due to window resize).
- Fix: ensure expanded diff regions stay expanded when layout triggered (e.g., due to window resize).
- Fix: detect `CRLF` line-ending style and don't highlight `CR`s as trailing whitespace.
- Fix: correctly discriminate between "no basis for comparison between HEAD and BASE" and "all revisions are obsolete" errors when syncing a PR.

#### 1607.2231 (min 1549.2198) 2017-07-18
- Fix: improve large diff suppression by estimating a diff's impact on UI performance more accurately, and considering the sum total of all showing diffs rather than each file separately.
- Fix: short-circuit mergeability check on closed PRs to avoid waiting for a GitHub flag that never settles.
- Fix: correctly send warning emails about failures to parse user emails with Reviewable directives.
- Fix: deal gracefully with commits reverted via force push when no new commits are pushed at the same time.
- Fix: correctly diagnose errors with in-comment-badge author settings, sending emails to repo connector.
- Fix: change no-final-EOL glyph in diffs to be non-combining, to work around a Chrome rendering bug.

#### 1592.2216 (min 1549.2198) 2017-06-07
- Upd: create a sample Reviewable commit status when connecting a repo so that it's visible when configuring branch protection settings in GitHub before creating a PR.
- Upd: update syntax highlighting module and add Kotlin source file extension mappings.
- Fix: correctly enforce minimum version requirements; the previous logic was too strict and would disallow rollbacks that should've been permitted.

#### 1575.2214 (min 1549.2198) 2017-05-20
- New: allow organization owners to request automatic connection of all newly created repos to Reviewable.  You can find the new toggles on the Repositories page.  You can do it for personal repos as well, but the reaction to a new repo may be delayed by up to 2 minutes (since there's no webhook for personal repo creation).
- Upd: upgrade all connected repos to listen to _all_ GitHub webhook events.  This process will kick off automatically within minutes of starting up the new version and continue (with checkpoints) until finished, probably within a few minutes and definitely in less than 30 minutes.  (If you're doing a rolling upgrade, it may get delayed or start right away &mdash; either one is fine.)  While running, the upgrade process will keep one instance pretty busy so you might not want to upgrade during peak hours.  If you want to follow along, look for log lines with the token "migrate1549" for (minimal) status updates, and a final summary log line starting with "Migrated NNN legacy repositories" that indicates completion.  It's OK even if there's a few failures, as any repo that isn't completely idle will get updated the next time it sends a webhook anyway.  This upgrade process just hurries things along.
- Fix: prevent occasional "permission denied" crash when upgrading OAuth scopes on the Reviews or Repositories page.
- Fix: prune obsolete webhooks more aggressively in case they got migrated from github.com to GHE.

#### 1555.2206 (min 1313.2023) 2017-05-09
- Fix: use correct ghost user ID for GHE (substituted when a user account has disappeared for some reason).
- Fix: prevent spurious @-mentions of organizations or people with no access to repo from adding participants to a discussion.
- Fix: if a repo's GitHub status updates are set to "if review visisted", and a status was posted for a review, and a new PR/review was created for the same commit, then keep updating the status even if the new review wasn't visited yet.  The previous logic changed the status to "disabled by admin" which was confusing and incorrect.
- Fix: prevent a client crash when running in private mode and navigating directly to a review page before signing in (regression).

#### 1549.2198 (min 1313.2023) 2017-04-30
- New: show list of users occupying licensed seats when clicking on "M of N seats in use" in license info box on Repositories page.
- New: support migrating review data from reviewable.io to new enterprise instance, in case of migration from github.com to GHE.
- Upd: listen to _all_ GitHub webhook events for connected repos. This change will allow Reviewable to more easily support new GitHub features while remaining backwards-compatible with older GHE versions. It does mean that Reviewable instances will have to handle a higher load of incoming requests so you'll want to check your performance metrics after upgrading if you're not auto-scaling. (But unwanted events are dropped very quickly, so I don't expect a big impact.) For now, webhooks are updated to the new format opportunistically; a future release will sweep up any remainders.
- Upd: always hide the file matrix on load if >200 files to improve performance, overriding the user's preference.  You can still toggle the file matrix open after the page loads if you want.
- Fix: if popup auth gets stuck (seems to happen in some mobile browsers?) time out after 2 seconds and switch to using the redirect method instead.
- Fix: fix a time-of-check vs time-of-use bug when syncing a review with its PR that could result in bogus revisions being created in rare cases.
- Fix: make bindable `setCurrentDiscussionDisposition()` command work on newly created discussions that only have a draft comment.
- Fix: allow opening review files whose names start with a `.` in a new tab.

#### 1531.2183 (min 1313.2023) 2017-04-18
- New: add `REVIEWABLE_LOGGING_URL` setting to capture all console and exception logs in JSON format (if you don't want to set up Sentry and manually capture the server console); details in [config docs](https://github.com/Reviewable/Reviewable/blob/master/enterprise/config.md#monitoring).
- New: add button to copy the head branch name to the clipboard, and offer a bindable command for same.
- Fix: properly cancel comment file upload when progress placeholder deleted.
- Fix: render correct style in unchanged diff block due to changes in enclosing comments (two-column diffs only).
- Fix: don't crash server on startup if both encryption and local file uploads enabled.

#### 1517.2159 (min 1313.2023) 2017-02-18
- Upd: opportunistically fix webhooks when `REVIEWABLE_GITHUB_SECRET_TOKEN` is changed.
- Fix: reduce Firebase bandwidth usage again (regression).
- Fix: prevent occasional permission denied error when revision being snapshotted gets deleted mid-transaction.
- Fix: deal correctly with repos deleted and recreated multiple times with the same name.

#### 1491.2156 (min 1313.2023) 2017-01-23
- Upd: tighten up security headers when serving static files: `X-Content-Type-Options`, `X-Frame-Options`, and `X-XSS-Protection`.
- Fix: further improve workaround for Firebase transaction flakiness.  Detection is now more accurate and won't restart instances unnecessarily if other servers are picking up the load on affected keys.
- Fix: controlled instance restarts are now much faster (typically 5-10 seconds, max 60 seconds), whereas before they often timed out only after 5 minutes.

#### 1445.2150 (min 1313.2023) 2017-01-15
- New: support `REVIEWABLE_ANALYTICS_URL` to allow for tracking of major user actions and customized stats.  Please see the [config guide](https://github.com/Reviewable/Reviewable/blob/master/enterprise/config.md#monitoring) for details.
- New: enable subscription admin to restrict Reviewable users to members of a set of teams.  (The default is to continue to allow any GHE user to sign in.)
- Upd: upgrade server environment to Node v6.
- Upd: remove support for `GAE_MODULE_INSTANCE`, as the new GAE flex environment no longer provides this value and AFAIK no other container runner provides an ordinal instance number either.
- Upd: have server log errors with full stack traces to console if Sentry monitoring not set up.
- Fix: improve workaround for Firebase stuck transaction bug.  The condition will now be detected earlier, reducing thrashing, and can now recover without restarting the instance in many cases.
- Fix: set correct disposition on button-initiated "Done" reply when the user is the PR author and also a reviewer due to marking files as reviewed.  (Yes, all of those conditions are necessary to trigger the bug!)
- Fix: handle mixed-case emoji tokens correctly.
- Fix: handle a repo renaming corner case correctly (repo renamed then original recreated).

#### 1394.2104 (min 1313.2023) 2016-12-09
- Fix: switch client's production flag back on; it got accidentally turned off in 1390.2098, but the only effect was a slight performance degradation and a bit of extra monitoring UI in the lower-right corner

#### 1390.2098 (min 1313.2023) 2016-12-08
- New: respect `.gitattributes` `diff` attributes to suppress diffing of, e.g., generated files, or force diffing / pick syntax highlighting language
- Upd: allow specifying which user account should be the author of badge comments
- Upd: auto-fit diff width to window in finer increments
- Fix: eliminate bogus unhandled rejection errors on the server
- Fix: eliminate sporadic permission denied errors on the client due to `fillIssues` request contention
- Fix: limit elided file expansion hover target to just the path itself

#### 1362.2058 (min 1313.2023) 2016-11-29
- Fix: allow acknowledging discussions when disposition is "withdrawn"
- Fix: correctly render quoted text in batched comment messages (workaround for change in GitHub's Markdown parser)

#### 1360.2047 (min 1313.1977) 2016-11-14
- New: add option to put badge into a comment instead of PR description (control in repo settings panel)
- Fix: correcty check admin permissions for newly added repos on Repositories page
- Fix: don't require branch update if strict status checks turned on but no required status checks selected
- Fix: restore ability to sign in with Edge and Internet Explorer
- Fix: don't throw bogus fatal exception when user without push permissions visits a review in some conditions
- Fix: work around a GitHub bug where the API returns inconsistent data about a PR's commits
- Fix: detect hard AWS Lambda timeouts and return a better error message
- Fix: close malformed code blocks when publishing, so they don't corrupt the rest of the message

#### 1340.2023 (min 1313.1977) 2016-11-04
- Upd: use internal auth server in all environments, and shift some post-login processing from client to server
- Fix: allow new users to sign in!
- Fix: reduce memory usage when syncing large PRs
- Fix: capture more information for some exceptions
- Fix: get rid of most bogus exceptions (on server, not user-visible) when syncing GitHub status
- Fix: work around draft watermark rendering bug in Chrome and Safari on recent versions of Mac OS

#### 1313.2011 (min 1273.1977) 2016-10-29
- New: add `?debug=latency` for debugging page loading latency issues
- Upd: switch to a new promise/coroutine framework on the server for minor performance improvements
- Upd: add prefetch and preconnect directives to the page to improve initial load performance
- Upd: add syntax highlighting for CMake
- Fix: unreplied discussions counter for PR author no longer includes discussions with unsent drafts
- Fix: tighten up security to mitigate repo existence info leak by probing for other people's permission tickets
- Fix: determine fast-forward merge availability and "out-of-date" PR correctly
- Fix: speed up permission checks in various ways, and recommend using a 2048 bit RSA key for `REVIEWABLE_ENCRYPTION_PRIVATE_KEYS`
- Fix: tweak queue health alerting thresholds to reduce false positives, especially when running with a single instance
- Fix: fix various task lease issues that could lead to false positive error reports in Sentry
- Fix: fix minor issues with crash overlay
- Fix: fix minor layout issue with target branch editor in Firefox

#### 1277.1987 (min 1273.1977) 2016-10-14
- Fix: correctly grant permissions in an encrypted datastore for repos whose names need escaping
- Fix: take care of some query handling bugs exposed by the limited issue prefetch

#### 1275.1985 (min 1273.1977) 2016-10-13
- New: if the `X-Forwarded-Proto` header is set to `http`, and REVIEWABLE_HOST_URL has an `https` address, then issue a permanent redirect to the secure version of the requested URL
- Fix: unbreak Edge, which also has a non-compliant Web Crypto implementation
- Fix: unbreak Chrome when page served over HTTP
- Fix: make "My PRs in any public/private repo" connections work again (will retroactively connect past PRs)
- Fix: better support the rename-then-recreate repo workflow
- Fix: only prefetch the most recent 100 issues for autocompletion on page load to reduce latency; fetch all issues only when #-autocomplete triggered

#### 1273.1981 (min 1273.1977) 2016-10-11
- Fix: unbreak Safari, which was completely unable to load Reviewable once signed in due to a broken Web Crypto implementation

#### 1273.1979 (min 1273.1977) 2016-10-10
- Upd: support Web Crypto for encrypting GitHub tokens; use new REVIEWABLE_WEB_CRYPTO_REQUIRED config to force
- Fix: integrate fix for performance regression in AES crypto routines

#### 1273.1977 (min 1259.1971) 2016-10-10
- New: support rebase & merge and delegate merge style allowability to GitHub (if supported in GHE)
- Upd: prepare to support Web Crypto for encrypting GitHub tokens
- Upd: add bindable nextPersonallyUnreviewedFile (etc.) command
- Fix: ensure controlled shutdown actually exits the process, regardless of secondary failures
- Fix: use correct condition to determine whether branch can be fast forward merged
- Fix: resync PR after merge if repo not connected, to avoid merge button being enabled on page reload

#### 1259.1971 (min 1152.1875) 2016-10-03
- Upd: update syntax higlighting and code editor libraries
- Upd: prepare support for rebase & merge
- Fix: detect stuck transactions (due to Firebase SDK bug) and shut down so server can be restarted
- Fix: guard against a rare condition where a closed PR sync fails repeatedly
- Fix: allow uppercase chars in assignee directive usernames
- Fix: don't send low quota warning emails when there were transient errors looking for alternative admins

#### 1243.1957 (min 1152.1875) 2016-09-21
- New: [AES encryption key rotation tool](https://www.npmjs.com/package/firecrypt-tools) now available, along with [ops use instructions](https://github.com/Reviewable/Reviewable/blob/master/enterprise/operations.md#aes-encryption-key-rotation)
- New: [RSA encryption key rotation tool](https://www.npmjs.com/package/reviewable-enterprise-tools) now available, along with [ops use instructions](https://github.com/Reviewable/Reviewable/blob/master/enterprise/operations.md#rsa-encryption-key-rotation)
- Upd: add REVIEWABLE_DUMP_ENV to dump environment variables as Reviewable sees them, for debugging
- Upd: add REVIEWABLE_UPLOADS_PROVIDER to explicitly set uploads destination; requires config change if you're using file uploads!
- Upd: add REVIEWABLE_LAMBDA_EXECUTOR_ROLE and REVIEWABLE_LAMBDA_VPC_CONFIG to further configure AWS Lambda executor
- Upd: elide file path segments with ellipses only if extra space is needed for revision cells
- Upd: improve who will see a discussion as "unreplied", when everyone has seen the latest message but discussion is still unresolved
- Fix: ensure client always shows latest data from datastore; in some edge cases, it got stuck showing local "fake" values
- Fix: deal correctly with user username changes
- Fix: compute file path width correctly (it used to grow by 13px with each recomputation!) and don't waste space in single-file mode
- Fix: list all PRs on Reviews page when more than 100 in a single API request
- Fix: don't busy loop in extreme error situations when checking permissions

#### 1225.1935 (min 1152.1875) 2016-09-12
- New: show license details on Repositories page (for license admin user only)
- New: add maintenance mode that locks out the datastore for bulk updates (see new [ops playbook](https://github.com/Reviewable/Reviewable/blob/master/enterprise/operations.md) for instructions)
- Upd: verify session encryption key on the client and sign out if stale to enable key rotation
- Upd: share diff worker process between tabs (improves source code caching)
- Fix: pasting bug in recent versions of Firefox
- Fix: make automatic lease extension work in more cases
- Fix: work around stuck connections that force the user offline due to "stale writes"

#### 1203.1910 (min 1152.1875) 2016-09-02
- Fix: clean up more alternative admin selection corner cases
- Fix: improve error event grouping in Sentry
- Fix: make long-running tasks (e.g., large PR syncs) more reliable by automatically extending lease
- Fix: correctly parse broken up discussion URLs in emails
- Fix: adjust some regexes to deal with GHE URLs

#### 1193.1907 (min 1152.1875) 2016-08-31
- Fix: stop sending bogus "your authorization is broken" emails
- Fix: many issues related to all-organizations licenses

#### 1186.1905 (min 1152.1875) 2016-08-30
- Fix: balance GitHub calls among other admins for connected repositories when API quota gets low
- Fix: guesstimate GitHub burst quota usage and postpone or reassign tasks that might trigger an abuse warning
- Fix: set GitHub request timeouts based on remaining task lease time
- Fix: don't query `/rate_limit` on GitHub Enterprise instances

#### 1168.1901 (min 1152.1875) 2016-08-25
- New: optional encryption of user-controlled text properties in the datastore
- New: private mode option for server
- New: expose ability to switch a PR's base branch
- Upd: mark outdated revisions, simplify rebase arcs visualization, and improve auto-diff bound picks when using "review each commit" style
- Fix: undo regression in schema validation constraints
- Fix: make review page somewhat usable on mobile devices
- Fix: [#388](https://github.com/Reviewable/Reviewable/issues/388), [#389](https://github.com/Reviewable/Reviewable/issues/389)

#### 1158.1885 (min 1152.1875) 2016-08-15
- Upd: improved styling of wrapped lines in diff and fixed some line length computation bugs
- Upd: turned on gzip compression in the web server
- Fix: security issue fix part 2
- Fix: [#385](https://github.com/Reviewable/Reviewable/issues/385)

#### 1152.1875 (min 1063.1721) 2016-08-08
- Upd: improved detection of Go declaration headers
- Fix: split reply emails into separate discussions
- Fix: security issue fix part 1

#### 1146.1862 (min 1063.1721) 2016-08-07
- Fix: automated detection and reconnection of renamed repos and organizations
- Fix: improved scaling in the face of very high GitHub event rates
- Fix: fixed a number of bugs around drafts, markdown rendering, and publishing (some of which could cause you to get stuck or, in rare cases, data loss)
- Fix: properly force branch "retain" mode in merge button, and ensure button will be enabled on reviews dashboard
- Fix: [#366](https://github.com/Reviewable/Reviewable/issues/366), [#367](https://github.com/Reviewable/Reviewable/issues/367), [#368](https://github.com/Reviewable/Reviewable/issues/368), [#369](https://github.com/Reviewable/Reviewable/issues/369), [#371](https://github.com/Reviewable/Reviewable/issues/371)

#### 1130.1815 (min 1063.1721) 2016-07-20
- New: squash and fast-forward merges, editing of merge commit message
- New: update source branch from target
- Upd: removed REVIEWABLE_GITHUB_VIRGIN_USERNAME env var as it's no longer needed
- Upd: [#359](https://github.com/Reviewable/Reviewable/issues/359)
- Fix: [#308](https://github.com/Reviewable/Reviewable/issues/308), [#358](https://github.com/Reviewable/Reviewable/issues/358)

#### 1117.1791 (min 1063.1721) 2016-07-14
- New: all repo settings now available in a single panel
- New: new repos can now inherit settings from a prototype repo
- Upd: [#350](https://github.com/Reviewable/Reviewable/issues/350)
- Fix: adapt to non-backwards-compatible change in Firebase authentication server
- Fix: [#340](https://github.com/Reviewable/Reviewable/issues/340), [#341](https://github.com/Reviewable/Reviewable/issues/341), [#352](https://github.com/Reviewable/Reviewable/issues/352), [#357](https://github.com/Reviewable/Reviewable/issues/357)

#### 1104.1771 (min 1063.1721) 2016-06-25
- Fix: bootstrap when license has a username instead of a user id
- Fix: support GitHub multiple assignees (when the feature shows up in GHE, at least)
- Fix: lots of small things on both client and server

#### 1087.1754 (min 1063.1721) 2016-05-30
- New: support GitHub Enterprise
- New: use GitHub OAuth directly for authentication instead of delegating to Firebase.
- Upd: autoquote selected text on reply.
- Upd: support per-file determination of reviewed status in custom condition.
- Upd: collapse large quoted code blocks in comments.
- Upd: read configuration from file instead of env vars.
- Fix: hover bug on lower-right-corner indicators.
- Fix: not fully treating PR author as reviewer after they've marked a file as reviewed.
- Fix: welcome offered to users who aren't members of any subscribed org.

#### 1077.1739 (min 1063.1721) 2016-05-20
- New: welcome message for new org members with one all-in authorization button.
- Upd: show who a review is waiting on, and support in custom conditions.
- Upd: shorten default GitHub status message to fit in 50 chars.
- Upd: revised semantics for "discussing" disposition, and OK/FYI intent support.
- Fix: rare undefined value bug in client.
- Fix: hide buttons and text related to private repos if license is public-only.
- Fix: don't add code quote if other quote already included in comment.
- Fix: other minor fixes for rare client crashes.

#### 1065.1721 (min 1063.1721) 2016-05-10
- Initial public release.
