This is the release log for Reviewable's Enterprise branch.  Each release has a two-part version number (_server.client_) with a corresponding tag on the Docker image.  Note that once you've deployed a given release you'll only be able to deploy releases with version components at least equal to its _min_ version number, which may constrain your rollbacks.

New releases are announced on the [reviewable-enterprise-announce mailing list](https://groups.google.com/forum/#!forum/reviewable-enterprise-announce).

#### Known issues
- Web client crashes on startup in Safari 10.1 if the database is encrypted, due to a regression in their JS engine.  It works fine in Safari 10.0 and 10.2 (technology preview).  No fix planned for Reviewable.
- See also the public [list of bugs](https://github.com/Reviewable/Reviewable/labels/bug) for Reviewable.

#### Upcoming changes (min 1992.2986 GHE 2.12+)
- Upd: missing properties in the result of a custom review completion condition will now be filled in with values from the output of the built-in default condition.  This will make it easier to tweak things without having to take on maintenance of the full condition.
- Upd: add `review.pullRequest.requestedTeams` to the review state data made available to custom review completion conditions.  Old reviews are _not_ eagerly backfilled, but will gain the property when synced for any reason (e.g., being visited in the browser).
- Fix: make the warning icon show up correctly in merge button.
- Fix: update Reviewable's cached mergeability state promptly if Reviewable status check is required in GitHub.  Prior to this fix, actions that changed the review's completion status would not be reflected in the mergeability state until the user reloaded the review page or something else triggered a sync.
- Fix: if review creation fails on visit, display error correctly in the browser.

#### 2017.3170 (min 1992.2986 GHE 2.12+) 2018-12-14
- Upd: show a yellow warning sign on the merge button if non-required checks are failing, instead of a red one which is now reserved for admin overrides of required checks.
- Fix: correctly compute height of file matrix when concealing/revealing obsolete files.
- Fix: when navigating to a file in a review, avoid animating the header multiple times if the user has visited multiple review pages during the session.
- Fix: in the "mark reviewed and go to next file" button, hitting the small red button will now also advance to the next file instead of only marking it as reviewed.  This was a regression from a version or two ago.
- Fix: avoid a "not ready" crash when clicking on a disabled Merge button.
- Fix: compute mergeability status correctly and in a timely fashion in all (or at least more) situations when branch protection is turned on.
- Fix: don't lock up the dashboard when user types a partial URL into the search box.
- Fix: in markdown comments, don't treat multiple triple-backticks on the same line as an unclosed code block since GitHub renders them as if though they were inline single-backticks instead.
- Fix: respect no-animation setting in merge options dropdown.

#### 2003.3043 (min 1992.2986 GHE 2.12+) 2018-11-28
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

#### 1994.2998 (min 1992.2986 GHE 2.12+) 2018-11-19
- Upd: prevent rollbacks to version that use the old Firebase SDK.  It's now safe to remove the `REVIEWABLE_FIREBASE_AUTH` environment variable from your configuration, and revoke the legacy secret(s) if you'd like to do so.
- Fix: avoid bogus "offline" state with pending writes that never goes away, caused by an unfixable false positive in the shared web worker client abandonment detection logic.  The trade-off is that now if a Reviewable tab exits abruptly, some resources in the shared worker won't be released.  However, closing _all_ Reviewable tabs will always dispose of the worker, so it's a good thing to try if you find your browser resource usage creeping up inexplicably.
- Fix: correctly treat the "Show pull requests not yet connected to Reviewable" toggle on the dashboard as being on by default, if the user never toggled it manually.  Previous versions used to show it as on, but behaved as if it was off.
- Fix: on the dashboard, don't show a status spinner forever for unconnected pull requests.  (Esthetic fix only, as there's nothing more to show anyway.)
- Fix: prevent the merge button from getting stuck disabled when in Squash merge mode.  This change moves fetching the commits from GitHub to generate the automatic merge commit message to later in the process, so if this phase fails the merge will fail with an appropriate error message rather than the button getting stuck.
- Fix: avoid a crash when the user signs out halfway through merging a PR.
- Fix: work around corrupted Firebase state when the client crashes with an `InvalidStateError`.  Prior to this fix, all subsequent page loads would fail with permission denied errors until the user closed _all_ Reviewable tabs to flush the shared worker.
- Fix: raise timeout when checking permissions on all of the user's repos, to allow for a large number of repos even if the GitHub API server is pretty busy.
- Fix: don't crash if a bulk permission check fails and a targeted permission check returns false.

#### 1992.2986 (min 1975.2968 GHE 2.12+) 2018-10-31
- New: automatically archive old reviews to save space and prevent the monthly sweep from overloading Firebase.  Closed reviews are archived aggressively, while seemingly abandoned open reviews will be archived after a longer period of time, based on the time of last access (or review creation if never accessed).  Archived reviews remain in Firebase (and encrypted) and will be transparently restored as needed.  The only place where this feature is visible to users is on the reviews dashboard, where archived reviews will show their status as "Archived" until restored via a visit and may not show up in the correct category.
- Upd: switch the client to the current version of the Firebase SDK.  All users will be signed out the first time they load a Reviewable page with this version, but currently open pages from the previous version will not be interrupted.  No config updates required beyond those from the previous version.
- Fix: don't list reviews where the user is just a mentionee under the "being reviewed by you" category on the dashboard, but do list self-reviews there.  A side-effect of this fix is that some older reviews will show up in a category lower than "being reviewed by you" until somebody visits them again, but this shouldn't be a problem going forward.
- Fix: include files that were renamed with no other changes in the review state passed to the custom review completion condition.
- Fix: supply correct sentiment timstamp to custom review completion condition when executing in a preview or pre-publication context.  Since version 1831.2835, conditions were sometimes given a bogus object instead of a timestamp that could cause the condition to fail or produce inaccurate results.
- Fix: prevent batch cron jobs from disturbing the Firebase cache.
- Fix: address even more edge cases when rebasing to avoid ending up with a broken review.
- Fix: avoid some crashes when user signs in and out very quickly.  This should pretty much never occur in real usage, but did during github.com's recent breakdown where they were handing out auth tokens but immediately refusing to accept them!
- Fix: defuse race condition that could let users try to create a line comment after signing in but before their review state was loaded, resulting in a crash.

#### 1975.2968 (min 1866.2875 GHE 2.12+) 2018-10-19
- Upd: **CONFIG UPDATE REQUIRED** switch the server to the current version of the Firebase SDK.  The new SDK addresses some long-standing Firebase bugs, in particular greatly ameliorating (but not quite fixing) the stuck transactions that cause Reviewable servers to restart themselves frequently under load.  However, this new SDK **requires different credentials** to initialize the connection to Firebase.  Please check the updated [config docs](https://github.com/Reviewable/Reviewable/blob/master/enterprise/config.md) for instructions on where to find the bits you'll need in the Firebase console and how to set the `REVIEWABLE_FIREBASE_WEB_API_KEY` and `REVIEWABLE_FIREBASE_CREDENTIALS_FILE` environment variables.  Please keep the old `REVIEWABLE_FIREBASE_AUTH` around for now, until the client gets updated to the new SDK as well in an upcoming release.  In case you have a very twitchy firewall, note that the new Firebase SDK will send requests to various subdomains of `googleapis.com` as part of the updated auth token management mechanism.
- Upd: update syntax highlighting library, review and update file extension mappings, and subset library to a more commonly used set of languages based on analytics data from reviewable.io.  If you find that some file types are no longer highlighted correctly, please let me know and I'll add them to the next release.
- Fix: handle even rarer edge cases when rebasing to avoid ending up with a broken review.
- Fix: prevent rare permission denied crash when loading an uninitialized review.
- Fix: prevent permission denied crash when creating a comment on a base revision of a renamed file where the original source file had been recreated in the PR at or before that revision.  The comment will now be created on the nearest possible equivalent base revision instead.
- Fix: avoid rare crash due to race condition in the contextual help subsystem.
- Fix: invite user to sign in when landing on a review page they have permission for but where the review hasn't been created yet, instead of getting stuck.
- Fix: avoid false negative liveness checks that cause an automated server restart when a cron job is starting up.

#### 1911.2952 (min 1866.2875 GHE 2.12+) 2018-10-08
- New: allow user to set a default query for the Reviews page
- Upd: add `±starred` and `±watched` filters for use in Reviews queries.
- Upd: migrate Merge button from AngularJS to VueJS.  There should be no user-visible differences, except perhaps an incidental fix to a rare bug in applying default settings.  This is just the first step in the migration of the entire UI to VueJS; unlike the big-bang model migration and attendant beta, this one will proceed piecemeal over the coming months.  I won't call out further VueJS updates in the changelog unless they have user-visible effects.
- Fix: accept `check_run` and `check_suite` events.
- Fix: correctly abandon processing of comment events if the comment still can't be found after an hour.
- Fix: correctly handle some edge cases when a branch gets rebased onto one of its own commits, where previously this could result in a permanently broken review.
- Fix: don't crash when the user requests a preview of the outgoing drafts, then edits one of them at just the wrong moment.
- Fix: don't get stuck waiting forever for data when the user switches pages at just the right time to trigger a race condition.  This could happen most easily when switching from Reviews to Repositories and back before the Repositories page fully loaded, but could have affected other transitions as well.
- Fix: remove top discussion draft area from bunny dropdown when user not signed in (otherwise typing in it would cause a crash).

#### 1883.2928 (min 1866.2875 GHE 2.12+) 2018-09-09
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

#### 1872.2918 (min 1866.2875 GHE 2.12+) 2018-08-25
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

#### 1868.2890 (min 1866.2875 GHE 2.12+) 2018-08-04
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

#### 1866.2875 (min 1831.2835 GHE 2.12+) 2018-07-24
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

#### 1844.2857 (min 1831.2835 GHE 2.12+) 2018-07-14
- New: integrate with GitHub's review approval system.  When publishing from Reviewable you can set whether to approve, request changes, or just comment, with Reviewable picking a default state based on your discussion dispositions and file review marks.  This state gets published to GitHub and will be used by the branch protection system's required reviews option.  Reviewers' current effective state is also reflected in Reviewable (in the reviews list and on the review page) and available for use in custom review completion conditions.  ([Full changelog entry](https://headwayapp.co/reviewable-changes/github-reviews-integration-64906))
- New: add "Trust but verify" user setting.  When turned on, discussions where the user is _Discussing_ and that get resolved with no further comment will be treated as unreplied.  The new setting panel can be accessed from any disposition dropdown via a small gear icon.  ([Full changelog entry](https://headwayapp.co/reviewable-changes/trust-but-verify-65292))
- Upd: moved time-ago comment dividers ("N days ago", etc.) to be above the corresponding time period, rather than below, in a nod to widespread convention.
- Upd: if branch protection is turned on then defer to GitHub's mergeability determination, since we can't accurately duplicate the logic.  Note that this may result in Reviewable offering the option to merge earlier than it used to, if branch protection is set up more loosely than Reviewable's old built-in logic.
- Fix: update PR mergeability status in Reviewable on all events that could affect it, and do so in a timely manner.
- Fix: correctly use a default emoji if custom LGTM button output text is complex.
- Fix: make toolbar dropdowns (checks, changes) show up correctly when page is scrolled down.
- Fix: correctly list commits within diff bounds for current file in changes dropdown.

#### 1831.2835 (min 1801.2799 GHE 2.12+) 2018-07-02
- New: allow user to tweak the app's visual contrast (e.g., of diff highlighting) through account settings dropdown.
- Upd: emit the server-side review status (including a custom review completion condition, if so configured) when publishing a review.
- Fix: work around a GitHub GraphQL bug that causes PRs to be randomly omitted from the review list when the list gets long.
- Fix: in review list, correctly fetch requested reviewers for PRs that don't yet have connected reviews.
- Fix: avoid permission denied error in the client when loading a review that hasn't yet been created.
- Fix: avoid permission denied error if the client gets disconnected at just the wrong moment when publishing comments, then reconnects.
- Fix: snapshot revisions when user acknowledges, changes disposition, or dismisses a participant.
- Fix: prevent disposition dropdown from disappearing under another layer in rare cases.
- Fix: improve auto-recovery from wrong webhook secret.

#### 1801.2799 (min 1785.2755 GHE 2.12+) 2018-06-10
- New: overhaul discussion semantics, including disposition, resolution, unreplied counts, etc.  See [this post](https://headwayapp.co/reviewable-changes/discussion-semantics-overhaul-61097) for a summary, and [issue #510](https://github.com/Reviewable/Reviewable/issues/510) for details.  The most intrusive UX change is that _all_ state changes are created as drafts and must now be published to take effect, including acknowledgements, disposition changes, and dismissals.  Otherwise, I've done as much as possible to ensure that reviews in progress won't be disrupted and that users with old clients still loaded can collaborate with those who have the new version, but there may still be some minor bumps during the transition.
- Upd: added `±am:author`, `±am:assigned`, and `±am:requested` filters to the reviews list.
- Fix: correctly calculate number of marks and reviewed files in the presence of renames.
- Fix: re-enable rebase merging, got disabled by accident.
- Fix: don't crash when client gets disconnected in the middle of a transaction.
- Fix: keep better track of currently focused file (for applying keyboard shortcuts).
- Fix: greatly improve loading performance for reviews with many files (hundreds or higher), especially if a lot of files were renamed.

#### 1785.2755 (min 1755.2561 GHE 2.12+) 2018-05-26
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

#### 1777.2720 (BETA, min 1755.2561 GHE 2.12+) 2018-04-26
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
