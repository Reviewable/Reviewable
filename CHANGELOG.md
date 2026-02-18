<sub>Upcoming</sub>

- <kbd>Upd:</kbd> custom review completion conditions can now output a list of users who LGTM'd the review. <!-- server -->
  > While completion conditions have always been able to interpret `:lgtm:` emojis as they see fit,
- <kbd>Fix:</kbd> don't switch Reviewable's GitHub status to a "disabled by admin" failure after a pull request is merged or closed. <!-- server -->

<sub>2026 - 02</sub>

- <kbd>Fix:</kbd> prevent autocomplete from activating inside code blocks. <!-- client 7803 -->
- <kbd>Fix:</kbd> clean up styling of the dimmer when sending a command. <!-- client 7802 -->
- <kbd>Upd:</kbd> omit `@` when listing users being waited on in the review summary that's posted to GitHub. <!-- client 7802 -->
  > The `@` effectively mentioned all the users, generating spurious notifications.  Without it GitHub won't recognize them as usernames.
  > This doesn't change who's being waited on or how anything works in Reviewable, only how GitHub parses the message.
- <kbd>Upd:</kbd> support async custom review completion conditions. <!-- server 4879 -->
  > Completion conditions are now `async` functions that can `await` calls and otherwise return a promise.
  > The traditional approaches of immediately returning a result or returning `undefined` and calling `done` or `fail` later are still supported as well.
- <kbd>Adm:</kbd> upgrade to Node 24. <!-- server 4878 -->
- <kbd>Fix<i>(enterprise)</i>:</kbd> prevent the client from going "offline" due to a web worker occasionally entering an infinite loop. <!-- client 7800 -->
- <kbd>Fix:</kbd> re-enable client-side in-memory caching of pull request files. <!-- client 7800 -->
- <kbd>Fix<i>(saas)</i>:</kbd> make sure file header rev cells have a top border. <!-- client 7800 -->
- <kbd>Fix:</kbd> avoid rare crash when navigating to files/discussions. <!-- client 7800 -->
- <kbd>Upd:</kbd> refresh the visual design of the file matrix. <!-- client 7799 -->
- <kbd>Fix:</kbd> make file state boxes look clickable after they've been disabled then enabled again. <!-- client 7799 -->
- <kbd>Fix:</kbd> when the Reviewable status is required and it's the last status to become successful, ensure that a spurious "pull request needs all required checks to pass" message doesn't get left behind in the Checks panel. <!-- server 4876 -->
- <kbd>Fix:</kbd> avoid getting stuck in a loop mapping renamed files when in a bogus authentication state. <!-- client 7798 -->
- <kbd>Fix:</kbd> don't go into an endless loop if a file lacks the revisions requested in the URL. <!-- client 7798 -->
  > This can happen for files introduced in later revisions or for reverted ones, but will
- <kbd>Fix:</kbd> request the right diff when opening a file diffed against base in a new tab. <!-- client 7798 -->
- <kbd>Fix:</kbd> avoid extremely rare crash when leaving a review page at just the wrong time. <!-- client 7798 -->

<sub>**Enterprise release 4875.7797** (min 3340.5125 GHE ^2.19 || ^3) 2026-02-04 <!-- enterprise 4875.7797 --></sub>

<sub>2026 - 01</sub>

- <kbd>Fix:</kbd> fix minor visual issues in the file matrix. <!-- client 7797 -->
- <kbd>Fix<i>(saas)</i>:</kbd> prevent `worker terminated` crashes. <!-- client 7795 -->
- <kbd>Fix:</kbd> use a more reliable method for detecting binary files. <!-- client 7794 -->
  > The previous heuristic could generate false positives on files with a high proportion of foreign text.
- <kbd>Fix:</kbd> correctly process pushes to branches that include a `%` in their name. <!-- server 4875 -->
- <kbd>Fix:</kbd> don't update Reviewable's GitHub commit status if the pull request is merged or closed. <!-- server 4874 -->
- <kbd>Adm<i>(enterprise)</i>:</kbd> add support for `REVIEWABLE_REPORTING_ENDPOINT`, to receive error reports directly from browsers. <!-- server 4874 -->
- <kbd>Adm:</kbd> fix font preloading in browser. <!-- client 7788 -->
- <kbd>Adm:</kbd> stop using the deprecated `unload` event on the client.  When this event is removed from browsers, using older Reviewable versions may leak resources and Firebase bandwidth. <!-- client 7787 -->
- <kbd>Fix:</kbd> report an error when GitHub creates an inactive webhook that it claims is "successful" while connecting a repository. <!-- server 4872 -->
- <kbd>Fix:</kbd> don't bring retracted discussions to the pull request author's attention. <!-- client 7782 -->
  > Also don't list the pull request author as a participant in such discussions in the custom review completion condition input data.
- <kbd>Fix:</kbd> Prevent spurious publication failures in the rare cases where Firebase doesn't compensate correctly (or overcompensates) for local clock skew. <!-- client 7781 -->
- <kbd>Fix:</kbd> Publishing drafts with a lot of inline replies have to be split into multiple requests. <!-- client 7780 -->

<sub>2025 - 12</sub>

- <kbd>Fix:</kbd> guard against a very rare crash on the review page. <!-- client 7778 -->
- <kbd>Fix<i>(enterprise)</i>:</kbd> definitely fix all remaining `Encryption not set up` errors. <!-- client 7778 -->
- <kbd>Fix<i>(enterprise)</i>:</kbd> don't get stuck on a blank page when signing out and back in on an instance in private mode with encryption enabled. <!-- client 7778 -->
- <kbd>Fix:</kbd> ship fallback emoji font for users whose OS doesn't supply one. <!-- client 7774 -->
- <kbd>Upd:</kbd> improve wording of the review actions summary at the top of batched reviews published on GitHub. <!-- client 7774 -->
  > The old action summary was confusing for some because it sounded too much like a review status.  The new summary should be clearer and includes more action types.
- <kbd>Fix:</kbd> correctly count the number of review marks to be published when dealing with renamed files. <!-- client 7774 -->
- <kbd>Fix:</kbd> invalidate the publish preview whenever the action summary changes. <!-- client 7774 -->
- <kbd>Fix:</kbd> don't get stuck in a retry loop if `github-status.creator` is set on an unconnected repository but doesn't have permission to access it. <!-- server 4870 -->
- <kbd>Adm:</kbd> avoid triggering "repeatedly failed to process event" warnings for pull requests whose mergeability GitHub just won't settle. <!-- server 4869 -->
- <kbd>Fix:</kbd> update the algorithm that computes `review.deferringReviewers` for the custom completion condition to match the one used on the client. <!-- server 4869 -->

<sub>**Enterprise release 4867.7771** (min 3340.5125 GHE ^2.19 || ^3) 2025-12-14 <!-- enterprise 4867.7771 --></sub>

- <kbd>Fix:</kbd> don't retain a stale "waiting for mergeability to settle to see whether pull request satisfies branch protection rules" message when a pull request is merged or closed. <!-- server 4867 -->
- <kbd>Fix:</kbd> ensure the Publish button remains busy until it's safe to close the page. <!-- client 7771 -->
- <kbd>Fix:</kbd> Prevent crash when matrix renders before rows are computed. <!-- client 7771 -->
- <kbd>Fix:</kbd> Prevent duplicate-key crash when rendering the file matrix. <!-- client 7771 -->
- <kbd>Fix:</kbd> persevere past `IndexedDB` errors when using it as a cache. <!-- client 7771 -->
- <kbd>Fix<i>(enterprise)</i>:</kbd> don't filter out the `github.com`-only `web-flow` account from review participants. <!-- client 7771 -->
- <kbd>Fix:</kbd> consistently recognize various Copilot accounts as a single bot. <!-- server 4866 -->
  > This helps eliminate apparent duplicates in the participants panel and prevents Copilot from being listed as a pending reviewer, which could trigger misguided attempts by Copilot to "fix" the pull request.
- <kbd>Adm<i>(saas)</i>:</kbd> further reduce Firebase storage and bandwidth usage by automatically compressing data. <!-- server 4865 -->
- <kbd>Fix:</kbd> don't keep a spinner on the merge button forever in repositories that were never connected or had custom settings applied. <!-- client 7769 -->
- <kbd>Fix:</kbd> don't reload the page when following the "Review list" link in the Conclusion panel. <!-- client 7768 -->
- <kbd>Fix:</kbd> reevaluate the completion condition when publishing on a merged or closed pull request. <!-- client 7768 -->
  > While we don't usually care about the review completion state of merge or closed pull requests, this could prevent webhooks from being called, resulting in stale statuses in external systems.
- <kbd>Fix:</kbd> guard against rare crash when a review includes workflow files but the user hasn't authorized `workflow` scope. <!-- client 7767 -->
- <kbd>Fix:</kbd> last selected dashboard organization/repository was not peristed across page loads. <!-- client 7767 -->
- <kbd>Fix:</kbd> don't assign missing revisions as "rebased from" in compacted reviews. <!-- server 4863 -->
- <kbd>Upd:</kbd> if `CODEOWNERS` are required by branch protection, don't designate `anyone` to review matching files by default. <!-- server 4863 -->
- <kbd>Fix:</kbd> don't include virtual Commits file in `CODEOWNERS` checks. <!-- server 4863 -->

<sub>2025 - 11</sub>

- <kbd>Fix:</kbd> correctly evaluate the consequences of starting a new discussion before it's published. <!-- client 7763 -->
- <kbd>Upd:</kbd> infer a conservative [inputs pragma](https://docs.reviewable.io/repositories#pragmas) from the completion condition code if it's not explicitly specified. <!-- server 4861 -->
- <kbd>Fix:</kbd> guard against a rare crash when the file matrix is showing reviewers. <!-- client 7759 -->
- <kbd>Fix:</kbd> prevent rare crash on the dashboard. <!-- client 7759 -->
- <kbd>Fix:</kbd> guard against some Firebase writes getting stuck forever, and recover correctly from some varieties of transaction failures. <!-- client 7758 -->
- <kbd>Adm<i>(saas)</i>:</kbd> reduce size of Stripe subscription object in Firebase by keeping only the necessary properties. <!-- server 4860 -->
- <kbd>Fix:</kbd> improve the low GitHub API quota notification to explain why some admins are not eligible to handle the event. <!-- server 4860 -->
- <kbd>Fix:</kbd> automatically collapse large file matrix to improve initial load times. <!-- client 7755 -->
- <kbd>Adm:</kbd> reduce unnecessary pull request syncs. <!-- server 4857 -->
- <kbd>Fix:</kbd> update the review's status (and potentially the badge in the pull request) in a more timely fashion when publishing an approval or request for changes without also changing labels, assignees or reviewers. <!-- server 4857 -->
- <kbd>Adm:</kbd> reduce number of GitHub API queries when using publish on push. <!-- client 7754 -->
- <kbd>Adm:</kbd> further reduce the amount of Firebase bandwidth used when syncing status / check / workflow updates. <!-- server 4850 -->
- <kbd>Fix:</kbd> synchronize check state more reliably in some timing edge cases. <!-- server 4850 -->
- <kbd>Fix:</kbd> remove approval and mergeability virtual checks once a pull request has been merged or closed. <!-- server 4850 -->
- <kbd>Fix<i>(saas)</i>:</kbd> keep PR panel review branch from wrapping. <!-- client 7752 -->
- <kbd>Adm:</kbd> stop bouncing client requests after a short timeout as it should no longer be needed to make the server notice them. <!-- client 7751 -->
  > This was a workaround for a Firebase bug that we're now dealing with in a different way.
  > It could also make things worse if the server wasn't prompt enough in answering the request.
- <kbd>Fix:</kbd> prevent a rare crash after staying on a review page for a long time. <!-- client 7751 -->
- <kbd>Fix:</kbd> prioritize `linguist-*` attributes over more generic ones. <!-- client 7750 -->

<sub>**Enterprise release 4848.7748** (min 3340.5125 GHE ^2.19 || ^3) 2025-11-11 <!-- enterprise 4848.7748 --></sub>

- <kbd>Upd:</kbd> highlight syntax in `.cu` and `.cuh` files. <!-- client 7747 -->
- <kbd>Fix:</kbd> don't crash when encountering literal commas in `.gitattributes` patterns. <!-- server 4847 -->
- <kbd>Upd:</kbd> respect `-text` attributes in `.gitattributes` to indicate that a file is binary. <!-- client 7735 -->
- <kbd>Fix:</kbd> guard against rare crash in publish preview. <!-- client 7735 -->
- <kbd>Adm<i>(enterprise)</i>:</kbd> avoid locking up completion condition execution after a push to base if there are many open pull requests in the repository. <!-- server 4846 -->
- <kbd>Fix:</kbd> set user's preferred disposition when importing comments from GitHub. <!-- server 4846 -->
- <kbd>Fix:</kbd> retry 401 errors for a couple minutes before flagging a repository connection as broken. <!-- server 4845 -->
- <kbd>Adm:</kbd> handle pushes to the same branch in quick succession more efficiently. <!-- server 4845 -->
- <kbd>Adm:</kbd> reduce amount of Firebase bandwidth consumed when syncing status and check updates.  (Regression introduced in v4835.7725.) <!-- server 4844 -->
- <kbd>Adm:</kbd> reduce time and GitHub API quota used when syncing a pull request with many comments that didn't originate from Reviewable. <!-- server 4843 -->
- <kbd>Adm:</kbd> don't restart servers too quickly if a `ping` task gets stuck on a queue. <!-- server 4843 -->
- <kbd>Fix:</kbd> tweak position of the thin delta notification lines in two-column diffs so they don't overlap the contents. <!-- client 7728 -->
- <kbd>Fix:</kbd> Guard against rare overlay crash. <!-- client 7728 -->
- <kbd>Fix:</kbd> improve link contrast in dark mode. <!-- client 7728 -->
- <kbd>Fix:</kbd> tighten up hover target for pull request title links. <!-- client 7728 -->

<sub>2025 - 10</sub>

- <kbd>Adm<i>(saas)</i>:</kbd> use a cache when checking membership in a contributor team constraining a subscription.  This should greatly reduce GitHub API quota usage in cases where the contributor team is small compared to the number of other contributors in a connected repository.. <!-- server 4841 -->
- <kbd>Upd:</kbd> improve heuristic mapping of prior revisions for interactive rebases with fixups. <!-- server 4841 -->
- <kbd>Fix:</kbd> don't corrupt the review structure when compacting certain reviews with renamed files, and recover from such corruption if it occurred previously. <!-- server 4841 -->
  > No data was lost in the corrupted reviews but it could cause the completion condition to always crash.
- <kbd>Adm:</kbd> log more timing details when syncing a pull request. <!-- server 4841 -->
- <kbd>Fix:</kbd> center arcs on revision cells in file headers. <!-- client 7727 -->
- <kbd>Fix:</kbd> force all files to show when following a review URL with embedded diff bounds. <!-- client 7727 -->
- <kbd>Adm:</kbd> fix branch protection caching, so it actually reduces GitHub API calls as promised. <!-- server 4840 -->
- <kbd>Adm:</kbd> fix the Firebase connection liveness check to work in Enterprise.  While at it, double the frequency to 15s, tighten the timeout to 60s, and bounce the connection instead of restarting the server if it fails. <!-- server 4840 -->
- <kbd>Adm:</kbd> limit concurrency when processing a long list of pull requests, to avoid triggering Firebase timeouts. <!-- server 4838 -->
- <kbd>Fix:</kbd> Disposition changes via email replies were ignored <!-- server 4838 -->
- <kbd>Upd:</kbd> sync bot dispostion to "satisfied" if thread is resolved on GitHub. <!-- server 4833 -->

<sub>**Enterprise release 4835.7725** (min 3340.5125 GHE ^2.19 || ^3) 2025-10-22 <!-- enterprise 4835.7725 --></sub>

- <kbd>Fix<i>(enterprise)</i>:</kbd> populate the dashboard with reviews in GHES 3.17.6 (and possibly other 3.17.x versions too). <!-- client 7725 -->
- <kbd>Fix:</kbd> keep the panel width stable when changing diff bounds in the file matrix in its popup form. <!-- client 7725 -->
- <kbd>Adm<i>(enterprise)</i>:</kbd> make seat exhaustion warnings configurable via `REVIEWABLE_SEATS_WARNING_THRESHOLD` environment variable. <!-- server 4832 -->
- <kbd>Fix:</kbd> avoid a serious (and sometimes fatal) client-side performance degradation in reviews with many revisions, renamed files, and review marks. <!-- client 7723 -->
- <kbd>Fix:</kbd> ensure the various state watermarks (`DRAFT`, etc.) don't get cut off. <!-- client 7723 -->
- <kbd>Fix:</kbd> don't crash on the Repositories page if the user's username was recently changed. <!-- client 7723 -->
- <kbd>Fix:</kbd> don't retry forever when a `github-status.creator` lacks permission to update Reviewable's GitHub status.  Instead, indicate the error in Reviewable's own Checks panel. <!-- server 4829 -->
- <kbd>Fix:</kbd> execute the completion condition correctly when branch protection or mergeability cannot be determined, or when input pragmas are present. <!-- server 4829 -->
- <kbd>Fix:</kbd> set review completion to "Checking review status..." in a timely manner after publishing. <!-- server 4829 -->
- <kbd>Adm:</kbd> delete old, corrupted review stubs instead of trying to archive them. <!-- server 4828 -->
- <kbd>Adm:</kbd> process status and check updates more efficiently, most of which should now require no GitHub API calls. This new code will only kick in after the first reviews sweep post-deployment (within 30 days). <!-- server 4824 -->
- <kbd>Fix:</kbd> archive reviews that were always in an error state. <!-- server 4824 -->
- <kbd>Fix<i>(enterprise)</i>:</kbd> cut off another source of "encryption not set up" errors. <!-- client 7720 -->
- <kbd>Fix:</kbd> ensure that the completion condition is executed if multiple users race when publishing comments. <!-- server 4823 -->
- <kbd>Adm:</kbd> skip bulk mergeability or condition syncs for stale (> 4 weeks) unmergeable reviews.  These are likely abandoned so they're not worth wasting time on.  They'll be refreshed if somebody visits them. <!-- server 4823 -->
- <kbd>Adm:</kbd> reduce burst GitHub API request pressure when automatically archiving reviews. <!-- server 4823 -->
- <kbd>Fix:</kbd> avoid duplicate `[archived]` prefix on archived review status. <!-- server 4823 -->
- <kbd>Adm<i>(saas)</i>:</kbd> avoid triggering reconciliation every time we check mergeability. <!-- server 4822 -->
- <kbd>Fix<i>(saas)</i>:</kbd> Allow custom completion conditions to run for personal private repositories. <!-- server 4821 -->
- <kbd>Upd:</kbd> allow `#rM..rN` revision bounds on all review links (not just specific-file ones) and support `base` and `last` as valid bound names. <!-- client 7719 -->
- <kbd>Fix:</kbd> don't crash with an internal error when a file in a provisional revision changes between being reverted and not reverted. <!-- client 7719 -->
- <kbd>Fix:</kbd> collapse file matrix row component and improve render time by roughly 25%. <!-- client 7719 -->
- <kbd>Fix:</kbd> don't crash when a pull request review lacks an author. <!-- client 7718 -->
- <kbd>Upd:</kbd> process pull request mergeability updates in a timely manner, even if there was a recent push to the base branch. <!-- server 4819 -->
  > While at it, we also tweaked bulk mergeability sync throttling to depend on how recently a review was accessed.
  > This should allow for faster updates for active reviews without overwhelming GitHub with requests.
- <kbd>Adm:</kbd> fix a bug that made ref trimming ineffective. Missed refs will be trimmed in the next monthly sweep. <!-- server 4818 -->
- <kbd>Fix:</kbd> cache team memberships to significantly reduce GitHub API requests, especially in connected repositories. <!-- server 4817 -->
- <kbd>Fix:</kbd> avoid unnecessarily splitting revisions to accommodate GitHub-originated comments that have already been captured. <!-- server 4817 -->
  > This could sometimes cause multiple revisions to be formed for a batch of commits pushed together, even if the review was set to "combine commits for review" style.
- <kbd>Fix:</kbd> be more diligent about updating Reviewable's status for pull requests in the merge queue. <!-- server 4817 -->
- <kbd>Fix<i>(saas)</i>:</kbd> don't crash when trying to connect a repo without a `.github/workflows` directory. <!-- client 7715 -->
- <kbd>Fix<i>(saas)</i>:</kbd> don't crash when navigating to a newly created review that hasn't determined its mergeability state yet. <!-- client 7714 -->
- <kbd>Fix:</kbd> don't cross out bots in the participants panel. <!-- client 7712 -->
- <kbd>Fix:</kbd> eliminate duplicate status checks that ran against the same commit, keeping only the latest one. <!-- server 4815 -->
- <kbd>Fix:</kbd> prefix duplicate status check names with the workflow or app name to disambiguate them. <!-- server 4815 -->
- <kbd>Upd:</kbd> Enable publish on push for reviews with only (non-passive) bot reviewers <!-- client 7710 -->
- <kbd>Fix:</kbd> request the `workflow` OAuth scope when needed to deal correctly with any pull requests that contain workflow files. <!-- client 7710 -->
- <kbd>Fix:</kbd> remove horizontal scrollbar from the Pull Request panel in its popup form. <!-- client 7710 -->

<sub>2025 - 09</sub>

<sub>**Enterprise release 4814.7709** (min 3340.5125 GHE ^2.19 || ^3) 2025-09-30 <!-- enterprise 4814.7709 --></sub>

- <kbd>Fix<i>(saas)</i>:</kbd> don't erroneously mark certain unmodified revisions as needing review. <!-- server 4814 -->
- <kbd>Fix<i>(saas)</i>:</kbd> don't crash if a unknown language is encountered when diffing (and a few other random cases besides). <!-- client 7709 -->
- <kbd>Fix:</kbd> avoid rare crash when a renamed revision changes while looking at its diff. <!-- client 7709 -->
- <kbd>Fix<i>(saas)</i>:</kbd> don't keep unnecessary revisions around when changing a review's revision mapping. <!-- server 4812 -->
- <kbd>New:</kbd> highlight all diff lines that have changes with addition or removal bars in two column mode <!-- client 7706 -->
  > Prevents small deltas from being overlooked, even when they appear alongside large blocks of changes.
- <kbd>Fix:</kbd> make sure all single character deltas get special highlighting. <!-- client 7706 -->
- <kbd>Adm:</kbd> improve recovery from Firebase transaction bugs that can cause tasks to get stuck until the server is restarted. <!-- server 4811 -->
  > Servers now ignore the tasks they're stuck on and restart only if no other servers step up and handle those tasks instead.
  > This improves server uptime and avoids some rare situations where all servers repeatedly and simultaneously restart themselves because Firebase is returning incorrect data for a task.
- <kbd>Fix:</kbd> Allow using hotkeys when focused element is a radio or checkbox input. <!-- client 7705 -->
- <kbd>Fix:</kbd> don't get stuck syncing a review if its head commit is not present in the pull request's repository. <!-- server 4810 -->
- <kbd>Fix:</kbd> Handle error when attempting to cancel publish on push (or "publish now") after the push already happened. <!-- client 7704 -->
- <kbd>Fix:</kbd> show correct emoji for `:+1:` in the autocomplete popup. <!-- client 7704 -->
- <kbd>Adm<i>(enterprise)</i>:</kbd> make private mode detection more robust. <!-- server 4808 -->
- <kbd>Fix<i>(saas)</i>:</kbd> prevent crash when the base mode of a file changed while the head mode remains unchanged, and the modes don't match. <!-- client 7703 -->
- <kbd>Upd:</kbd> make the `+@username` and `-@username` directive autocompletion menu switchable between add/removing assignees and requesting/unrequesting reviewers, so each user can configure this shortcut to take the action they most frequently need. <!-- client 7703 -->
  > The autocompletion will output either `±a:@username` (for assignees) or `±r:@username` (for reviewers).  You can also type these in manually and the full length `±assignee:@username` and `±reviewer:@username` still work as well.  Watch out, though: if you type in `±@username` manually without using the autocompletion it'll be ignored!
- <kbd>Fix:</kbd> prevent the pull request author from being requested as reviewer. <!-- client 7703 -->
- <kbd>Fix:</kbd> correctly parse label directives for labels that start with a digit or some symbols. <!-- client 7703 -->
- <kbd>Fix:</kbd> don't highlight stray HTML tags in quoted blocks in drafts. <!-- client 7703 -->
- <kbd>Fix:</kbd> don't hide the autocompletion popup while holding down a modifier key. <!-- client 7703 -->
- <kbd>Fix:</kbd> don't treat some revisions as having base changes only when they weren't actually checked for such. <!-- client 7703 -->
- <kbd>Fix:</kbd> correct text selection in Firefox so both displayed selection and copied diff text are accurate. <!-- client 7703 -->
- <kbd>Upd:</kbd> warn about unresolved merge conflicts in the diff. <!-- client 7703 -->
- <kbd>Fix:</kbd> guard against rare crash on review page after reconnecting to the network. <!-- client 7703 -->
- <kbd>Fix:</kbd> avoid marking a file revision as unchanged if only the base changed and file wasn't reverted. <!-- server 4805 -->
  > This could result in a file being mistakenly added to the Reverted group and the file revision not being included in the completion condition input.
- <kbd>Upd:</kbd> set `baseChangesOnly` to `undefined` in the custom review completion condition input data structure if we don't know for sure yet whether it's true or false. <!-- server 4805 -->
  > This is broadly backwards-compatible with previous behavior (previously it would've been set to `false`, and `undefined` is also falsy) but lets you detect the situation and handle it differently.  For example, if your condition depends on this value, you could make the author pending and request (via the status description) that they visit the review so that the matter will be settled one way or the other.
- <kbd>New:</kbd> detect base changes between file revisions and distinguish between cleanly integrated ones (green), cleanly integrated with extra unrelated edits (grey), and potentially badly integrated (orange). <!-- client 7700 -->
  > Until now we used to only mark cleanly integrated revisions with a small grey ⊥ corner but failed to distinguish between the other two scenarios or no base changes at all.  This changes the old symbol to green and adds two more cases that should help you review rebased revisions with confidence!
- <kbd>Fix:</kbd> consider file mode when determining whether base changes were cleanly integrated or not. <!-- client 7700 -->
- <kbd>Fix:</kbd> make `ctrl+backspace` work correctly in code snippet editors. <!-- client 7698 -->
- <kbd>Upd:</kbd> add a `merge.mechanism` repository setting that directs Reviewable to adapt to an off-GitHub merge process. <!-- server 4802 -->
- <kbd>Upd:</kbd> add an `inputs` pragma for completion conditions that lets you declare that certain properties are unused, which Reviewable can take advantage of to curtail upstream processing early. <!-- server 4802 -->
- <kbd>Fix:</kbd> run the completion condition when a pull request's mergeability status or branch protection flag change. <!-- server 4802 -->
- <kbd>Fix:</kbd> wait until all items are ready before displaying the list on the dashboard. <!-- client 7697 -->
- <kbd>Fix:</kbd> remove extra gap between merge/publish buttons and window edge. <!-- client 7697 -->
- <kbd>Fix:</kbd> ensure that the last revision is never obsolete.  Previously this may have required an extra review sync to settle into the right state. <!-- server 4801 -->
- <kbd>Fix:</kbd> if a provisional revision is rolled back, remove it from the review rather than just marking it as obsolete.  This could have caused the last revision in a review to not be the current one. <!-- server 4801 -->
- <kbd>Fix:</kbd> when copy/pasting an enhanced issue link from a comment, paste it as just the issue number. <!-- client 7696 -->
- <kbd>Fix:</kbd> hide the file rename message when switching the diff from a clean rename to a preceding unchanged revision. <!-- client 7696 -->
- <kbd>Fix:</kbd> show the pull request title and description when there's odd whitespace characters in the title. <!-- client 7696 -->
- <kbd>Fix:</kbd> ensure that the user's teams are resolved correctly when switching quickly between the review page and the dashboard (or vice-versa) on page load. <!-- client 7696 -->
- <kbd>Fix:</kbd> deal correctly with users being a member of more than 100 teams when executing a custom review completion condition or checking code owners. <!-- server 4800 -->
- <kbd>Fix:</kbd> don't mix up a user's team memberships between organizations. <!-- server 4800 -->
- <kbd>Adm:</kbd> log "review too large" errors instead of sending them to Sentry. <!-- server 4800 -->

<sub>**Enterprise release 4799.7695** (min 3340.5125 GHE ^2.19 || ^3) 2025-09-08 <!-- enterprise 4799.7695 --></sub>

- <kbd>Fix<i>(enterprise)</i>:</kbd> don't crash when trying to display upcoming changes in the changelog. <!-- client 7695 -->
- <kbd>Fix<i>(saas)</i>:</kbd> correctly place delta symbols shown in accessibility mode. <!-- client 7694 -->
- <kbd>Fix:</kbd> avoid extremely rare crash when loading a review. <!-- client 7694 -->
- <kbd>Fix:</kbd> avoid another very rare crash when loading a review page. <!-- client 7693 -->
- <kbd>Fix<i>(saas)</i>:</kbd> don't crash when leaving review page while merge victory bunny is animating out. <!-- client 7693 -->
- <kbd>Fix:</kbd> show Participants panel contents even if there are no reviewers yet, so the author's action menu is accessible. <!-- client 7692 -->
- <kbd>Fix:</kbd> prevent a repository's file-based settings from being reset if a change to the settings races a pull request sync. <!-- server 4798 -->
- <kbd>Upd:</kbd> set off pull request metadata with a bit of background shading, to make it easier to visually jump to the description below. <!-- client 7691 -->
- <kbd>Fix:</kbd> avoid rare crash when visiting review page and leaving right away. <!-- client 7690 -->
- <kbd>Fix:</kbd> don't crash if you leave the page right after requesting a "preview publish". <!-- client 7690 -->
- <kbd>Fix<i>(enterprise)</i>:</kbd> don't crash when loading certain reviews with rate limiting disabled in GHES.  (Regression introduced in v4787.7681.) <!-- client 7690 -->

<sub>2025 - 08</sub>

- <kbd>Fix:</kbd> improve `Multiple PRs on commit` status error message to include instructions for resolving. <!-- server 4796 -->
- <kbd>Fix:</kbd> load more than 100 status checks from GitHub. <!-- server 4796 -->
- <kbd>Fix:</kbd> always let the license admin sign in, even if all seats are full. <!-- server 4796 -->
- <kbd>Fix:</kbd> correctly apply the "max diffs displayed" preference when a review has many files but a smaller number are actually diffed. <!-- client 7689 -->
- <kbd>Fix:</kbd> restore clicking in participant cell dropdowns while still hiding them when mouse leaves the cell. <!-- client 7689 -->
- <kbd>Fix:</kbd> address app wide style recalculation when diff width changes. <!-- client 7689 -->
  > Margin changes and sidebar (beta) drags are now over 95% faster, with up to 99% fewer elements recalculated for smoother, more responsive reviews.
- <kbd>Upd:</kbd> improve performance throughout the frontend, including making some previously O(n^2) computations O(n) instead.  The effects will be particularly noticeable in large reviews with hundreds or thousands of files. <!-- client 7688 -->
  > The improvements are due to better ordering of implicitly dependent computations.  The optimum order is continually inferred and applied dynamically at the platform level, so things in this layer should stay snappy going forward with no further effort needed on our part as we continue building out Reviewable.  Yay!
- <kbd>Fix:</kbd> keep header and account settings open when guide overlay is showing. <!-- client 7688 -->
- <kbd>Fix:</kbd> detect if an attempt was made to queue a pull request for merge when it was already queued (but Reviewable wasn't aware of this yet) and suppress the error. <!-- client 7687 -->
- <kbd>Fix:</kbd> prevent the Merge Options subpanel from spinning forever when expanded while the pull request isn't ready to merge. <!-- client 7687 -->
- <kbd>Fix:</kbd> show the merge commit message field in the Merge Options subpanel even when the pull request isn't yet ready to merge. <!-- client 7687 -->
- <kbd>Upd:</kbd> enable custom styling of watermarks (see [docs](https://docs.reviewable.io/tips#watermarks)). <!-- client 7687 -->
- <kbd>Upd:</kbd> include username as sentence subject when summarizing review actions. <!-- client 7687 -->
- <kbd>Fix:</kbd> don't highlight HTML tags in drafts when they're inside code fences. <!-- client 7686 -->
- <kbd>Fix:</kbd> skip over inline comments when parsing `CODEOWNERS` files. <!-- server 4795 -->
- <kbd>Fix:</kbd> request `repo:org` GitHub authorization scope if it's missing when trying to open repository settings instead of spinning forever. <!-- client 7685 -->
- <kbd>Adm:</kbd> validate duration-valued environment variables at startup. <!-- server 4794 -->
- <kbd>Fix:</kbd> when suggesting changes to a line with no deltas in single column diff mode, place the draft comment on the right line. <!-- client 7683 -->
- <kbd>Fix:</kbd> make sure revision arcs in file headers are visible in dark mode. <!-- client 7683 -->
- <kbd>Upd:</kbd> improve file matrix performance on mouse enter / mouse leave when there's a large number of files. <!-- client 7683 -->
- <kbd>Fix:</kbd> guard against rare race condition crash on the dashboard. <!-- client 7683 -->
- <kbd>Fix:</kbd> avoid triggering a false positive "API access suspended" error that disconnects the repository when GitHub's `rate_limit` API returns a bogus response. <!-- server 4790 -->
- <kbd>Fix:</kbd> Prevent more than 60 inline replies to avoid exceeding GitHub API limits. <!-- client 7682 -->
- <kbd>Fix:</kbd> When publishing fails any pending pull request review that was created in the process is now automatically deleted. <!-- client 7682 -->

<sub>**Enterprise release 4787.7681** (min 3340.5125 GHE ^2.19 || ^3) 2025-08-06 <!-- enterprise 4787.7681 --></sub>

- <kbd>Fix:</kbd> allow copying the pull request description. <!-- client 7681 -->
- <kbd>Fix:</kbd> ensure the account settings dropdown works well on small screens. <!-- client 7681 -->

<sub>2025 - 07</sub>

- <kbd>Upd:</kbd> switch to the advanced search API for populating the dashboard, resulting in significantly lower quota usage and slightly better performance. <!-- client 7679 -->
  > The results should be exactly the same as before, but if you suspect otherwise you can force usage of the old search API by appending `?debug=dashboardLegacySearch` to the URL.
  >
  > Note that this feature will be automatically enabled in GitHub Enterprise Server once the advanced API is supported, likely in release 3.18 or later.
- <kbd>Fix:</kbd> stagger condition executions when resyncing the whole repository. <!-- server 4787 -->
- <kbd>Fix:</kbd> show completions on `+assignee:@` and `-assignee:@`. <!-- client 7677 -->
- <kbd>Fix:</kbd> avoid crash when clicking on LGTM too soon after a review loaded. <!-- client 7677 -->
- <kbd>Upd:</kbd> include line stats for deleted files. <!-- client 7677 -->
- <kbd>Fix:</kbd> guard against crash when animation finishes after draft is removed. <!-- client 7676 -->
- <kbd>Adm:</kbd> allow selective logging of server-side GitHub request latencies for specific users. <!-- server 4784 -->
- <kbd>Fix:</kbd> avoid posting duplicate messages to GitHub in some rare partial failure cases when using publish on push. <!-- client 7675 -->
- <kbd>Upd:</kbd> inject `.gitattributes` maps into the custom review completion condition input data structure, normalized and matched to each file. <!-- server 4783 -->
- <kbd>Upd:</kbd> make single character diffs more visible in two column mode. <!-- client 7675 -->
- <kbd>Fix:</kbd> fill the completion condition's `review.sentiments` with the right emoji names, even if a comment contains raw emoji characters. <!-- client 7674 -->
- <kbd>Fix:</kbd> prevent rare crash in publish preview when draft data is unavailable. <!-- client 7673 -->
- <kbd>Upd:</kbd> support shift+click to mark file reviewed and retreat to previous unreviewed file. <!-- client 7673 -->
- <kbd>Fix:</kbd> hide tooltip as soon as the mouse moves off a participant cell. <!-- client 7673 -->
- <kbd>Upd:</kbd> if a `github-status.creator` is specified for a repository, also use this account when applying `requestedTeams` from a custom review completion condition. <!-- server 4779 -->
- <kbd>Upd:</kbd> when adding the Reviewable badge to a pull request description, default to using the account of the user who connected the repository (even if an alternative admin was selected to handle the event). <!-- server 4779 -->
- <kbd>Upd:</kbd> use the designated commenter (or repository connector) when updating badge comments too, not just when creating them. <!-- server 4779 -->
- <kbd>Fix:</kbd> detect and work around otherwise invisible errors that GitHub sometimes triggers in response to a dashboard query.  These used to result in a "list of reviews may be incomplete" warning message and potentially a lot of missing reviews. <!-- client 7672 -->
- <kbd>New:</kbd> add support for GitHub's merge queue. <!-- client 7671 -->

<sub>**Enterprise release 4776.7669** (min 3340.5125 GHE ^2.19 || ^3) 2025-07-01 <!-- enterprise 4776.7669 --></sub>

<sub>2025 - 06</sub>

- <kbd>Fix:</kbd> address font scaling issues that break diff layout in mobile browsers. <!-- client 7669 -->
- <kbd>Fix:</kbd> correctly report whether pull request approvals can be bypassed by admins. <!-- server 4775 -->
- <kbd>Upd:</kbd> include `stage` in webhook data, and ensure that the webhook fires if labels or stage change (even if the review state's description doesn't). <!-- server 4773 -->
- <kbd>Fix:</kbd> don't report an internal error when trying to apply bogus directives. <!-- client 7667 -->
- <kbd>Upd:</kbd> Reviewable can now send custom headers (e.g. `Authorization`) when fetching [code coverage reports](https://docs.reviewable.io/reviews#code-coverage) configured via file-based settings using the `coverage.headers` option. <!-- server 4771 -->
- <kbd>Upd:</kbd> focus main scroll context to immediately enable Page Up/Down keys. <!-- client 7666 -->
- <kbd>Upd:</kbd> let users cap how much of their GitHub API quota Reviewablewill use for background requests.  This is particularly useful if you're a member of an organization subscribed to GitHub Enterprise Cloud and also use personal access tokens. <!-- client 7665 -->
- <kbd>Fix:</kbd> keep diff expand button under mouse pointer when expanding. <!-- client 7665 -->
- <kbd>Fix:</kbd> don't enter an endless retry loop when a completion condition returns a bogus username in some contexts. <!-- server 4769 -->
- <kbd>Fix:</kbd> avoid duplicated teams in completion condition input if a user is a member of a team both directly and indirectly. <!-- server 4768 -->
- <kbd>Upd:</kbd> include the workflow name when displaying checks more often, while still omitting it when clearly redundant. <!-- server 4768 -->
- <kbd>Fix:</kbd> correctly interpret `.gitattributes` patterns that don't start with a `/`.  Previously these would fail to match as expected. <!-- client 7664 -->
- <kbd>Fix:</kbd> always select nearest non-blank line when initiating code suggestion. <!-- client 7663 -->
- <kbd>Fix:</kbd> clarify UI when waiting on push to publish drafts. <!-- client 7662 -->
- <kbd>Fix:</kbd> correctly match required check names to checks when their names are not unique. <!-- server 4766 -->
- <kbd>Upd:</kbd> Restrict publish on push to reviews with active non-bot reviewer participants <!-- client 7658 -->
- <kbd>Fix:</kbd> avoid possible crash when opening merge options too quickly after the review page was loaded. <!-- client 7657 -->
- <kbd>Fix:</kbd> don't shift things up/down when editing the merge commit message with the pull request panel open as a dialog. <!-- client 7657 -->
- <kbd>Fix:</kbd> display placeholders for all files when no diffs showing at all. <!-- client 7657 -->
- <kbd>Upd:</kbd> support a `pending` code coverage error level, which will be indicated with an hourglass icon. <!-- client 7656 -->
- <kbd>Fix:</kbd> prevent very rare crash after opening contextual help. <!-- client 7656 -->
- <kbd>Fix:</kbd> fix occasional crash when loading review page. <!-- client 7656 -->
- <kbd>Fix:</kbd> Handle when publish on push task no longer exists when being canceled <!-- client 7656 -->
- <kbd>Fix:</kbd> don't crash when setting the review style fails. <!-- client 7656 -->

<sub>**Enterprise release 4765.7655** (min 3340.5125 GHE ^2.19 || ^3) 2025-06-02 <!-- enterprise 4765.7655 --></sub>

<sub>2025 - 05</sub>

- <kbd>Fix:</kbd> improve quoting of formatted comments, especially tables. <!-- client 7655 -->
- <kbd>Fix<i>(saas)</i>:</kbd> don't include command field in unresolved discussions navigation cycle. <!-- client 7655 -->
- <kbd>Fix:</kbd> don't close dialog when a mouse drag ends outside. <!-- client 7654 -->
- <kbd>Fix<i>(saas)</i>:</kbd> fix minor layout issues in the pull request panel. <!-- client 7654 -->
- <kbd>Fix<i>(saas)</i>:</kbd> Restrict publish on push to open pull requests. <!-- client 7653 -->
- <kbd>Fix:</kbd> include command field in drafts navigation cycle. <!-- client 7653 -->
- <kbd>Fix<i>(saas)</i>:</kbd> make changelog notifier clickable on non-review pages. <!-- client 7652 -->
- <kbd>Fix<i>(saas)</i>:</kbd> respect "apply directives without sending comment" command setting for pull request authors.
- <kbd>Upd:</kbd> move the pull request description below the metadata lines, as it can get quite long and make the branch and label information hard to locate quickly. <!-- client 7651 -->
- <kbd>Upd:</kbd> make the button that marks all discussions as read and files as reviewed bigger and clearer in the Conclusion panel. Also make it clear what will happen if you don't click it. <!-- client 7651 -->
- <kbd>Fix:</kbd> avoid layout shift when opening panel overlays. <!-- client 7651 -->
- <kbd>Fix:</kbd> trigger recomputation of completion for all reviews when a master completion condition file is edited. <!-- server 4763 -->
- <kbd>Fix<i>(saas)</i>:</kbd> avoid crashing on signout when showing publish options. <!-- client 7649 -->
- <kbd>Upd:</kbd> include sanction timestamps in custom review completion condition input. <!-- server 4762 -->
- <kbd>Upd:</kbd> include pull request labels in the webhook's payload. <!-- server 4762 -->
- <kbd>Fix<i>(saas)</i>:</kbd> send an individual message immediately rather than waiting for the next push as pull request author. <!-- client 7647 -->
- <kbd>Fix<i>(saas)</i>:</kbd> don't create revisions with no commits listed. <!-- server 4758 -->
- <kbd>Fix:</kbd> avoid locking up and spinning the CPU when trying to report certain errors on the client. <!-- client 7644 -->
- <kbd>Upd:</kbd> move publish preview to conclusions panel. <!-- client 7642 -->
- <kbd>Fix:</kbd> smooth out file visit animations triggered from within an overlay. <!-- client 7642 -->
- <kbd>New:</kbd> display updates made to Reviewable inside the app. <!-- client 7642 -->
  > Over the years we tried various kinds of changelogs but none stuck.  We think this in-app one will be both more convenient for you to check and for us to update — win-win!
- <kbd>Fix:</kbd> make autocomplete popups work properly in some panels. <!-- client 7642 -->
- <kbd>Upd:</kbd> show an icon in the Publish button if you'll be blocking a discussion after publishing, and aren't either approving the pull request or requesting changes. <!-- client 7642 -->
  > This can be helpful to let you know that you'll (still) be blocking the review in workflows that use discussion resolution rather than GitHub approvals.
- <kbd>Fix:</kbd> make completion condition output selectable. <!-- client 7642 -->
- <kbd>Fix:</kbd> prevent a rare crash related to `nearestUnkeptRaw`. <!-- client 7642 -->
- <kbd>Fix:</kbd> improve interaction latency on large pages. <!-- client 7642 -->
- <kbd>Fix:</kbd> fix minor visual discrepancies related to dropdowns. <!-- client 7642 -->
- <kbd>Fix:</kbd> re-enable contextual help in dropdowns. <!-- client 7642 -->
- <kbd>New:</kbd> Introduce [publish on push](https://docs.reviewable.io/reviews#publish-on-push) workflow. <!-- client 7642 -->
  > If the repository is connected, by default, Reviewable will now schedule pull request author's review updates to be published next time they push a new revision to the pull request's branch. This helps sync your feedback with code updates, making reviews more coherent and easier to follow.
  >
  > Prefer the old behavior? No problem — just uncheck the *Publish on push* setting in the publish options to have your drafts published immediately instead. This setting is saved globally for your account.
  > Check out the [announcement post](https://www.reviewable.io/blog/publish-on-next-push-is-finally-here/) for more details.
- <kbd>Fix:</kbd> recover gracefully when GitHub changes its mind about what commits belong to a PR for a given head/base pair. <!-- server 4751 -->

<sub>2025 - 04 (and earlier)</sub>

<sub>**Enterprise release 4750.7641** (min 3340.5125 GHE ^2.19 || ^3) 2025-04-29 <!-- enterprise 4750.7641 --></sub>

- <kbd>Upd:</kbd> Don't consider bots as pending reviewers. <!-- server 4750 -->
- <kbd>Adm:</kbd> migrate to an integrated SaaS/Enterprise changelog. <!-- server 4749 -->
- <kbd>Upd:</kbd> avoid unnecessarily fetching refs when syncing a newly created pull request, as this can get expensive in some environments. <!-- server 4749 -->
- <kbd>Upd:</kbd> indicate the currently focused file in the file matrix. <!-- client 7640 -->
- <kbd>Upd:</kbd> show most recent previous reviewers separately from older ones in the file state information popup.
  > This can make it easier to find the right person to nag for a re-review.
- <kbd>Upd:</kbd> make the pull request link in the pull request panel a bit more prominent.
- <kbd>Upd:</kbd> display the pull request's creation and merge/close date.
- <kbd>Adm<i>(enterprise)</i>:</kbd> add `REVIEWABLE_DISABLE_GUEST_PASSES` flag to turn off guest passes.
- <kbd>Fix<i>(enterprise)</i>:</kbd> avoid occasionally crashing with an "Encryption not set up" error when the user signs out from an instance running in private mode.
- <kbd>Fix:</kbd> show correct bunny animation in conclusion panel on publish.
- <kbd>Fix:</kbd> always treat `.pbtxt` files as text.

<sub>**Enterprise release 4743.7616** (min 3991.6302 GHE 2.19+ or 3.0+) 2025-04-02 <!-- enterprise 4743.7616 --></sub>

- <kbd>Upd:</kbd> add `?scopes=...` option to explicitly request authorization of extra scopes for the current user.  This can help work around some GitHub API bugs in specific circumstances.
- <kbd>Upd:</kbd> change the default review completion condition to treat mentioned users as waited-on.
- <kbd>Upd:</kbd> respect `binary` macros in `.gitattributes`.
- <kbd>Upd:</kbd> move pull request address and link to the top of the pull request panel to make it easier to find.
- <kbd>Upd:</kbd> include specific completion condition evaluation error in the toast that shows up.
- <kbd>Upd:</kbd> offer the option to apply directives from the pull request panel's command field without sending a comment.
- <kbd>Upd:</kbd> Always sync comments from bots with Discussing disposition
- <kbd>Upd:</kbd> remove the green "continue review" button and add a "cancel deferral" item to the user's action menu in the participants panel.
- <kbd>Upd:</kbd> always show the main review discussion, even if there are no comments yet.
- <kbd>Fix:</kbd> put the review into an error state when GitHub refuses to fetch pull request data due to "too many changed files".
- <kbd>Fix:</kbd> update review status promptly when publishing a review (or sending a message) with a mention.
- <kbd>Fix:</kbd> guard against very rare crash when loading review page.
- <kbd>Fix:</kbd> improve client rendering performance.
- <kbd>Fix:</kbd> fix rendering of the "more participants" (ellipsis) tooltip on the dashboard.
- <kbd>Fix:</kbd> don't crash when sending a command while the review is deferred.
- <kbd>Fix:</kbd> don't include authors from obsolete commits in the completion condition's `review.pullRequest.coauthors` input property.
- <kbd>Fix:</kbd> create a new revision when the target (base) branch of a pull request is changed. Before this fix, files would continue to be diffed against the old base branch's commit until a new commit was pushed to the pull request branch.
- <kbd>Fix:</kbd> show the GitHub icon in the right spot when hovering over a branch name that wrapped in the pull request panel.
- <kbd>Fix:</kbd> smooth out animations when creating a new discussion or changing diff bounds.
- <kbd>Fix:</kbd> work around a GitHub API bug that consistently returns 500 when attempting to pin refs in specific pull requests if the token lacks `workflow` scope.  After retrying a few times Reviewable will give up and capture a message in Sentry (if configured, otherwise log to the console) that looks like `Repeatedly failed to POST /repos/:owner/:repo/git/refs` (with the actual owner and repo substituted).  If you see this message you should have the connecting admin authorize the `workflow` scope by visiting Reviewable with `?scope=workflow` appended to the URL.
- <kbd>Fix:</kbd> restore the "mark all files as reviewed" keyboard shortcut, and have it undo the marks if used twice in a row. (Regression introduced in v4718.7540.)
- <kbd>Fix:</kbd> reflect unreviewed file state forced by the completion condition in later revisions with no changes.

<sub>**Enterprise release 4719.7563** (min 3991.6302 GHE 2.19+ or 3.0+) 2025-03-17 <!-- enterprise 4719.7563 --></sub>

- <kbd>Upd:</kbd> distinguish between active and inactive requested reviewers.
- <kbd>Upd:</kbd> update `highlight.js` to v11.11.1.
- <kbd>Upd:</kbd> retain up to 10 merged/closed pull requests on the dashboard by default.
- <kbd>Upd:</kbd> make directory rows less tall in the file matrix.
- <kbd>Upd:</kbd> improve dark mode default contrast in diffs and gutter icons.
- <kbd>Fix:</kbd> avoid potentially showing duplicate comment time-ago dividers in a discussion where you engaged in back-and-forth without leaving the page.
- <kbd>Fix:</kbd> reduce false positives when detecting minified files.
- <kbd>Fix:</kbd> remove auto-merge warning icon if the pull request isn't open.
- <kbd>Fix:</kbd> don't crash on load in Safari if strict privacy settings are on.
- <kbd>Fix:</kbd> fix client performance regression in Chrome 134.
- <kbd>Fix:</kbd> use proper dark mode colors including in truncated PR description and in selected text in code blocks.

<sub>**Enterprise release 4718.7540** (min 3991.6302 GHE 2.19+ or 3.0+) 2025-03-05 <!-- enterprise 4718.7540 --></sub>

- <kbd>New:</kbd> add a Diffs panel that centralizes control over the diff bounds of all files, and adjust the toolbar button to navigate to it instead of opening the Changes dropdown.
- <kbd>New:</kbd> add a way to diff against the last revision reviewed by anyone with one click.
- <kbd>New:</kbd> let the user specify their preferred initial diff bounds and the threshold at which Reviewable switches to showing just one file at a time.
- <kbd>New:</kbd> add a Pull Request panel that combines parts of the main discussion and the Changes panel.
- <kbd>New:</kbd> add a command input bar to the pull request panel.
- <kbd>Upd:</kbd> put the "continue review" button into its new place in the top right corner in preparation for removing the Changes panel.
- <kbd>Upd:</kbd> remove the Changes panel, as all its functionality has now been moved to other spots.
- <kbd>Upd:</kbd> redesign the algorithm that determines whether a revision has probably been rebased, and from what corresponding original revision. The new logic is simpler and should do a better job in common situations, but may exhibit a different pattern of false positives and negatives in more complex ones.
- <kbd>Upd:</kbd> group checks into required, optional, and successful sections.
- <kbd>Upd:</kbd> log the clock correction offset we're applying (courtesy of Firebase) at startup, to make clock skew issues easier to debug.  Also check license expiry against the corrected clock.
- <kbd>Upd:</kbd> allow uploads of `webp` images.
- <kbd>Upd:</kbd> show diff layout and line length preferences in a more discoverable spot.  (The old "margin notch" still works too, though!)
- <kbd>Upd:</kbd> give users the option to show diffs since the last review by a specific reviewer, from both the Diffs panel and the file matrix.
- <kbd>Upd:</kbd> add a new header button to the file matrix that lets users diff since the last review by anyone.
- <kbd>Upd:</kbd> start indexing active and broken repository connections, in preparation for a new admin center design.
- <kbd>Upd:</kbd> allow linking to a file without entering isolated file mode.
- <kbd>Upd:</kbd> keep commits list open after clicking links.
- <kbd>Fix:</kbd> highlight contextual help hotspots correctly in dialogs.
- <kbd>Fix:</kbd> report the correct last reviewed revision in the file matrix reviewer avatar tooltip.
- <kbd>Fix:</kbd> correctly describe a diff against the user's last reviewed revision(s).
- <kbd>Fix:</kbd> don't rediff all files when expanding or collapsing a group in the file matrix.
- <kbd>Fix:</kbd> report the correct participants and number of messages for the `-top` discussion in the completion condition input data structure.  Before this fix some synthetic messages that don't show up in the review on the client were mistakenly included.
- <kbd>Fix:</kbd> always offer the mark all reviewed/read button in the Conclusion panel.
- <kbd>Fix:</kbd> ensure that (potential) changes to a pull request's mergeability status that occur close together aren't missed.
- <kbd>Fix:</kbd> don't unnecessarily retain some files at `r1` when overwriting a provisional revision.  This can lead to nonsensical diffs when using `r1` as the left hand side.  (Regression introduced in v4668.7438.)
- <kbd>Fix:</kbd> don't show an ellipsis at the beginning of every path in the diff panel headers.
- <kbd>Fix:</kbd> clear out some review-specific toasts when leaving a review page.  This can also prevent crashes if the toast offers an action related to the current review.
- <kbd>Fix:</kbd> proactively shut down the server when its license expires.  Previously, a server would refuse to start up with an expired license yet would happily keep running, which was confusing.
- <kbd>Fix:</kbd> allow organization owners to change settings for all repos, even if not explicitly an admin for them.
- <kbd>Fix:</kbd> don't crash after failing to set review revision mapping style.
- <kbd>Fix:</kbd> avoid rare crash when loading a review page due to a race condition.
- <kbd>Fix:</kbd> improve multiselect inputs to expand gracefully in all contexts.
- <kbd>Fix:</kbd> when reviewing against your last reviewed revision, keep the diff description unchanged even as you mark some files reviewed.
- <kbd>Fix:</kbd> include explicit dependencies line in suggested completion condition file export if needed.
- <kbd>Fix:</kbd> disallow searching in subscription billing manager dropdown.
- <kbd>Fix:</kbd> avoid incorrectly syncing valid users as `ghost` when running in an EMU enterprise instance.
- <kbd>Fix:</kbd> guard against connect / disconnect actions racing a repository sweep, which could result in deriving the wrong "does the organization have connected repositories" flag.
- <kbd>Fix:</kbd> fix a number of issues with compacting revisions that could cause compaction to fail, or could cause temporary server panics after restoring a review from backup.  None of the issues compromised review integrity, though.
- <kbd>Fix:</kbd> flag connections as broken due to the connecting user being suspended when GitHub enforces rate limits.

<sub>**Enterprise release 4668.7438** (min 3991.6302 GHE 2.19+ or 3.0+) 2025-01-31 <!-- enterprise 4668.7438 --></sub>

- <kbd>New:</kbd> allow users to compact revisions in a review by eliminating and combining redundant ones.
- <kbd>Upd:</kbd> render color swatch in comments for color codes in inline code.
- <kbd>Upd:</kbd> move diff overflow warning to a toast.
- <kbd>Upd:</kbd> add link to Conclusion panel to the toolbar.
- <kbd>Upd:</kbd> respect the "require linear history" branch protection setting.
- <kbd>Upd:</kbd> stop tracking whether a user can bypass branch protections, as this is much harder to do with rulesets.  Instead, offer a checkbox to everyone to try to bypass them and let GitHub decide.
- <kbd>Upd:</kbd> respect the completion condition's `mergeStyle` output property even if it conflicts with GitHub settings and results in no valid merge styles.
- <kbd>Upd:</kbd> support rulesets as a method of branch protection, including respecting any constraints they impose on merge methods.
- <kbd>Upd:</kbd> move the review style selector to the `Commits` file.
- <kbd>Upd:</kbd> raise default per-push revision limits.
- <kbd>Upd:</kbd> move commits list from changes dropdown to file header.
- <kbd>Fix:</kbd> don't crash when using a keyboard shortcut bound to `markFileReviewedAndAdvance()` with only one file left to review.
- <kbd>Fix:</kbd> fix alignment of send error message.
- <kbd>Fix:</kbd> make sure LGTM is centered in participants panel status (regression introduced in v4548.7221).
- <kbd>Fix:</kbd> correctly request a review by the current user when sending an ad-hoc comment.
- <kbd>Fix:</kbd> ensure that writing and sending comments works even if `IndexedDB` reports an error.
- <kbd>Fix:</kbd> make sure GitHub related file actions are accessible on touch devices.
- <kbd>Fix:</kbd> don't show grey spacer lines in single-column diffs.
- <kbd>Fix:</kbd> reduce incidence of "review not found, likely archived" errors when editing review completion conditions in repository settings.
- <kbd>Fix:</kbd> don't force a line break after an `:lgtm:` emoji.
- <kbd>Fix:</kbd> ensure that reviewers are not requested if publication failed and the "sync requested reviewers" flag was turned off before trying again.
- <kbd>Fix:</kbd> immediately reflect automatically synced requested reviewers in the review after publication.
- <kbd>Fix:</kbd> force "sync requested reviewers" to off if the current user isn't allowed to request reviewers.
- <kbd>Fix:</kbd> don't crash when publishing and quickly navigating to another review before publishing has completed.
- <kbd>Fix:</kbd> align revision cell arcs in file headers.
- <kbd>Fix:</kbd> consistently sync branch protection settings; previously, some changes could be accidentally ignored.
- <kbd>Fix:</kbd> don't crash when encountering bogus issue or pull request links in comments.
- <kbd>Fix:</kbd> avoid poor comment line mapping in the virtual commit file in some situations.
- <kbd>Fix:</kbd> ensure that the last revision is never obsolete in some edge cases.
- <kbd>Fix:</kbd> avoid generating spurious "commits that don't affect files in this pull request..." messages for the Commits file.
- <kbd>Fix:</kbd> recognize missing 2FA GitHub error messages.
- <kbd>Fix:</kbd> prevent crash when saving repository settings with REVIEWABLE_ENCRYPTION_PRIVATE_KEYS unset.
- <kbd>Fix:</kbd> don't get stuck when attempting to merge a pull request that includes a GitHub workflow file when the user authentication lacks `workflow` scope.
- <kbd>Fix:</kbd> try to refresh "Deleted user" records more frequently in case the user was added (back) to GitHub.
- <kbd>Fix:</kbd> fix unarchiving of some very old reviews.

<sub>**Enterprise release 4623.7332** (min 3991.6302 GHE 2.19+ or 3.0+) 2024-12-15 <!-- enterprise 4623.7332 --></sub>

- <kbd>New:</kbd> add a `github-status.creator` setting to force a specific account to post all GitHub review status updates.
- <kbd>New:</kbd> show reviewer avatars in file matrix.
- <kbd>Upd:</kbd> improve GitHub request latency timing to account for paged requests.
- <kbd>Upd:</kbd> highlight HTML tags in comments, as they're likely not intended as such.
- <kbd>Upd:</kbd> accept plural variants of relevant disposition keywords in comments.
- <kbd>Upd:</kbd> reduce number of requests to GitHub when syncing a pull request.
- <kbd>Upd:</kbd> reduce number of ref queries issued when syncing a review, as these can get expensive in large repositories.  Also immediately unpin revisions that were reverted without being replaced.
- <kbd>Fix:</kbd> remove the ability to set the default review style for the repository from the Changes panel, as it's incompatible with file-based repository settings.  It can still be set normally via repository settings (either UI or file-based).
- <kbd>Fix:</kbd> don't show "customize" button in Checks panel if file-based settings are being used.
- <kbd>Fix:</kbd> don't highlight disposition keywords in draft preview mode.
- <kbd>Fix:</kbd> don't crash if a `CODEOWNERS` line has duplicate users/teams.
- <kbd>Fix:</kbd> allow directory paths to overflow the file matrix on hover.
- <kbd>Fix:</kbd> correctly delete refs according to `REVIEWABLE_REFS_DELETION_DELAY`.  (Regression introduced in v4424.6998.)
- <kbd>Fix:</kbd> add a `badge.commenter` option in file-based settings
- <kbd>Fix:</kbd> correctly handle pull requests leaving the merge queue.

<sub>**Enterprise release 4586.7295** (min 3991.6302 GHE 2.19+ or 3.0+) 2024-11-27 <!-- enterprise 4586.7295 --></sub>

- <kbd>New:</kbd> post replies to discussion threads that were started on GitHub as replies in the respective thread.
- <kbd>New:</kbd> introduce a `REVIEWABLE_DISPOSITION_DEFAULTS` configuration that allows you to specify disposition defaults for users in various scenarios.  See the [docs](https://github.com/Reviewable/Reviewable/blob/master/enterprise/config.md#ui-customization) for details.
- <kbd>Upd:</kbd> move the checks dropdown into a panel in the main flow.
- <kbd>Upd:</kbd> give the option of rebasing to update the pull request branch (on `github.com` and GHE 3.11+ only).
- <kbd>Upd:</kbd> make the pull request branch update button harder to trigger accidentally.
- <kbd>Upd:</kbd> remove list of waited-on participants from the checks panel; use the participants panel instead.
- <kbd>Upd:</kbd> make review panels more mobile friendly, among other minor mobile improvements.
- <kbd>Upd:</kbd> make participants panel usable on mobile, make alignment more consistent, and show its top-level guide.
- <kbd>Upd:</kbd> add bindings for file and discussion dropdown menu commands.
- <kbd>Upd:</kbd> fetch organization and repository data on the server throttled to at most once every 15 minutes.  The data is used for autocomplete functionality when editing drafts and for validating drafts about to be published.  It's cached both on the server and the client, which should make for a more lightweight, faster experience, at the expense of extra update latency when the data changes if the repository is not connected.
- <kbd>Upd:</kbd> use a hard-coded table of emojis rather than fetching it from GitHub at every page load.
- <kbd>Upd:</kbd> add `REVIEWABLE_DISABLE_MY_PRS_ENROLLMENTS` flag.  When set, "My PRS in any public/private repo" and "All current and future repos" toggles (see [docs](https://docs.reviewable.io/repositories#create-reviews-for-your-own-prs)) will be unavailable for personal repositories, and will no longer be checked if previously turned on.  (Organization-level "All current and future repos" toggles are unaffected.)
- <kbd>Upd:</kbd> cache branch protection rules, listen to a webhook to update them and resync reviews proactively.  This will improve update latency when the rules change and reduce the number of requests to GitHub.  The cache expires after 15 minutes, in case a webhook is missed or the repository is not connected.
- <kbd>Fix:</kbd> guard against crash when quickly visiting and leaving a review page.
- <kbd>Fix:</kbd> fix animation when expanding and collapsing panels.
- <kbd>Fix:</kbd> guard against crash when quickly visiting and leaving the repositories page.
- <kbd>Fix:</kbd> consider requests for changes if branch protection requires a pull request for merging, even if it doesn't require actual approvals.
- <kbd>Fix:</kbd> restart server in case of an uncaught top-level exception, which otherwise could get it stuck in a "healthy" state but not doing any work.
- <kbd>Fix:</kbd> make sure to use proper GitHub formatting for pasted permalinks in comments.
- <kbd>Fix:</kbd> adjust all doc links to new URL schema.
- <kbd>Fix:</kbd> show correct unreviewed file count on the dashboard when a user hasn't visited the review yet.
- <kbd>Fix:</kbd> reliably publish non-comment drafts (e.g., review marks) when no draft comments are pending. There was a race condition that caused publishing to silently abort in such cases if some background requests hadn't completed yet.
- <kbd>Fix:</kbd> maintain continuity of toast borders at arrow.
- <kbd>Fix:</kbd> improve indentation in the code block editor when breaking a line in the middle of an indent.
- <kbd>Fix:</kbd> include a final newline when copying a suggestion.
- <kbd>Fix:</kbd> guard against rare crash when picking labels from autocomplete popup.
- <kbd>Fix:</kbd> allow users with `triage` (but not `write`) permissions to request reviewers.
- <kbd>Fix:</kbd> guard against very rare crash when leaving a review page with renamed files.
- <kbd>Fix:</kbd> don't request `/rate_limit` when handling a 429 error and GHE rate limiting is turned off.

<sub>**Enterprise release 4548.7221** (min 3991.6302 GHE 2.19+ or 3.0+) 2024-11-02 <!-- enterprise 4548.7221 --></sub>

- <kbd>Upd:</kbd> render autolinks in Markdown with an underline.
- <kbd>Upd:</kbd> show just the last comment when revealing resolved discussions, rather than expanding all comments immediately.
- <kbd>Upd:</kbd> improve dark mode colors for some warning messages.
- <kbd>Upd:</kbd> pop up a toast when a warning indicator appears in the lower right corner.
- <kbd>Upd:</kbd> warn the user when a navigation cycle (e.g., "next unresolved discussion") would skip over some items because they're not currently displayed, and offer to show them all.
- <kbd>Upd:</kbd> add syntax highlighting for ERB files.
- <kbd>Upd:</kbd> add options for VSCode over SSH and VSCode via WSL to the external editor link template dropdown in the account settings.
- <kbd>Upd:</kbd> change the default diff font to Liberation Mono, as it has much better glyph coverage compared to Droid Sans Mono, and add font weight and height controls to the settings.
- <kbd>Upd:</kbd> improve overall app performance in reviews with that have both a lot of files and dozens of revisions.
- <kbd>Upd:</kbd> improve overall performance in large reviews, and improve instrumentation to capture more potential causes of slowness.
- <kbd>Fix:</kbd> stop failing with bogus "review state must be an object" messages in the completion condition playground.  (Regression likely introduced in v4479.7067.)
- <kbd>Fix:</kbd> avoid crashing in situations where a renamed file is reverted in a provisional revision while the review page is open.
- <kbd>Fix:</kbd> guard against a rare crash when a provisionally reintroduced file disappears.
- <kbd>Fix:</kbd> clean up the animation when expanding a fully collapsed discussion.
- <kbd>Fix:</kbd> make sure header toggle always works on review pages.
- <kbd>Fix:</kbd> guard against a crash when navigating to a file and immediately leaving the review page.
- <kbd>Fix:</kbd> don't crash if `IndexedDB` is disabled in Safari (!?).
- <kbd>Fix:</kbd> avoid rare crash due to an undefined `comments` property.
- <kbd>Fix:</kbd> avoid unnecessary animations and scrollbars in the participants panel in overlay mode.
- <kbd>Fix:</kbd> ensure the close button in overlays doesn't overlap the scrollbar.
- <kbd>Fix:</kbd> guard against rare client crash caused by a race condition.

<sub>**Enterprise release 4497.7119** (min 3991.6302 GHE 2.19+ or 3.0+) 2024-09-28 <!-- enterprise 4497.7119 --></sub>

- <kbd>New:</kbd> add `Reviewable.resetSession()` console API to work around "resuming session" issues.
- <kbd>New:</kbd> add colorblind accessibility settings.
- <kbd>Upd:</kbd> show repository errors to admins at bottom of reviews.
- <kbd>Upd:</kbd> indicate participants with no access to the repository by crossing them out in the participants panel.
- <kbd>Fix:</kbd> turn off Sentry breadcrumbs in server events, as they are useless and can leak auth tokens into Sentry.
- <kbd>Fix:</kbd> make sure conclusions panel never obscures dispositions dropdown.
- <kbd>Fix:</kbd> attempt a workaround for Safari occasionally getting stuck while resuming the session.
- <kbd>Fix:</kbd> be more efficient and thorough when checking whether an @-mention is valid, but also block @-mentions that we can't verify (e.g., due to timeouts) instead of letting them through.  (@-decorators in unquoted code often result in such mentions and could display bogus participants in the review, even though those "participants" had no access and weren't notified.)
- <kbd>Fix:</kbd> enable Publish button when all drafts are bare suggestions.
- <kbd>Fix:</kbd> show Conclusion panel when the user clicks "mark reviewed and go to conclusion" in single file mode.
- <kbd>Fix:</kbd> consistently display master repository name and indicator on the repositories page, if the user has permission to see them.
- <kbd>Fix:</kbd> guard against very rare crash due to missing locator in the Conclusion panel.
- <kbd>Fix:</kbd> don't crash with "Encryption not setup" error on page load when Reviewable is running in private mode and the user isn't signed in.  (Regression likely introduced in v3935.6189.)

<sub>**Enterprise release 4479.7067** (min 3991.6302 GHE 2.19+ or 3.0+) 2024-09-01 <!-- enterprise 4479.7067 --></sub>

- <kbd>New:</kbd> add an API for managing Enterprise team constraints.  ([API docs](https://github.com/Reviewable/Reviewable/blob/master/enterprise/api.md))
- <kbd>New:</kbd> support reading settings from a `.reviewable` directory in the repository and inheriting from a master settings file.  See the [announcement](https://www.reviewable.io/blog/announcing-the-reviewable-settings-directory/) for more details.
- <kbd>Upd:</kbd> make more panels collapsible on the review page.
- <kbd>Upd:</kbd> add shortcut button for the file matrix to the toolbar.
- <kbd>Upd:</kbd> add "TODO" as magic keyword for "working" disposition
- <kbd>Upd:</kbd> replace `memory.ghSocketsCreated` and `memory.ghRequestsIssued` in the logs with a more informative `memory.ghRequests` object, and add `github.sockets.free` and `github.sockets.busy` gauges to `statsd` stats.
- <kbd>Upd:</kbd> add a new option to show badge only if the review has been requested.
- <kbd>Fix:</kbd> don't cut off panel drop shadow when expanding/collapsing.
- <kbd>Fix:</kbd> if all files are hidden but the review is updated, offer to show proposed diffs instead of full diffs in the diffs panel.
- <kbd>Fix:</kbd> keep close button in top right corner when a collapsed file matrix is popped up in a dialog and scrolled horizontally.
- <kbd>Fix:</kbd> guard against rare crash when rendering comment list.
- <kbd>Fix:</kbd> wrap diffs at correct column even if last character is a space.
- <kbd>Fix:</kbd> make sure bunny button is covered by contextual help overlay.
- <kbd>Fix:</kbd> include just-published discussion in unresolved discussions navigation loop.
- <kbd>Fix:</kbd> make sure account settings open when editor link needs attention.
- <kbd>Fix:</kbd> always link to account settings from discussion level actions even when the editor link is bad.
- <kbd>Fix:</kbd> ensure bunny graphics in the Conclusion panel don't get cut off.
- <kbd>Fix:</kbd> don't fetch bot information via GitHub's users API, as that appears to have stopped working at some point and will prevent PRs from syncing.
- <kbd>Fix:</kbd> guard against very rare permission denied error when marking all files as reviewed.
- <kbd>Fix:</kbd> avoid a rare crash when signing out.
- <kbd>Fix:</kbd> avoid rare crash due to a race condition in the UI.

<sub>**Enterprise release 4424.6998** (min 3991.6302 GHE 2.19+ or 3.0+) 2024-07-16 <!-- enterprise 4424.6998 --></sub>

- <kbd>New:</kbd> dark mode at long last! Also respects system (OS/browser) settings.
- <kbd>Upd:</kbd> tweak presentation of GitHub-related actions in the file and discussion dropdown menus, and offer separate actions for "view diff" vs "open file".
- <kbd>Upd:</kbd> inactive window text selection color set for all major browsers (only partial support before).
- <kbd>Upd:</kbd> improve renamed file notifications.  These messages are now specific to the selected diff, highlight the deltas between the old and new filenames, and add a warning if the renamed file was recreated later on.  Recreated files also get a warning as this is often accidental.
- <kbd>Upd:</kbd> use most up to date GitHub styling in rendered markdown.
- <kbd>Upd:</kbd> remove "more content" indicator.
- <kbd>Fix:</kbd> guard against missing scroll context/margin counter reference errors.
- <kbd>Fix:</kbd> encrypt owner, repo, and ref values in ref cleanup queue.
- <kbd>Fix:</kbd> improve safeguards against buggy pull request query results occasionally returned by GitHub.
- <kbd>Fix:</kbd> guard against rare crash caused by a race condition in accessing `isLocked`.
- <kbd>Fix:</kbd> guard against bogus API return values when sweeping old refs.
- <kbd>Fix:</kbd> consistently fully render the checks donut on page load.
- <kbd>Fix:</kbd> don't crash when first webhook callback for a repository fails.
- <kbd>Fix:</kbd> avoid falling into a potentially endless loop of trying to fetch file contents if the fetch fails but was needed to find the right location for a discussion in a diff.
- <kbd>Fix:</kbd> only capture webhook failures if they're new.
- <kbd>Fix:</kbd> guard against rare race condition and crash when computing disposition keyword highlight.
- <kbd>Fix:</kbd> maintain delta alignment when page is zoomed.
- <kbd>Fix:</kbd> avoid rare crash when creating a code block.
- <kbd>Fix:</kbd> guard against rare crash when selecting text in review.
- <kbd>Fix:</kbd> correctly identify renamed revisions if a file was renamed, recreated, then renamed again.
- <kbd>Fix:</kbd> don't be overeager about marking some no-change revisions of a renamed file as "base changes only".
- <kbd>Fix:</kbd> ensure that guide overlays are interactive on non-review pages.
- <kbd>Fix:</kbd> keep PR labels from flickering on hover.
- <kbd>Fix:</kbd> make sure contextual help button is visible when chat button is shown.

<sub>**Enterprise release 4370.6910** (min 3991.6302 GHE 2.19+ or 3.0+) 2024-05-30 <!-- enterprise 4370.6910 --></sub>

- <kbd>New:</kbd> add a completion condition [example](https://github.com/Reviewable/Reviewable/blob/master/examples/conditions/pull_approve.js) that shows how to codify a complex, multi-stage approval process similar to what's possible with Pull Approve.
- <kbd>New:</kbd> added a new configuration option `REVIEWABLE_REFS_DELETION_DELAY` to clean up potentially unneeded `git` refs.  See the [docs](https://github.com/Reviewable/Reviewable/blob/master/enterprise/config.md#core-configuration) for details.  If you've been using Reviewable at scale for a while, you might want to control the rate at which refs are cleaned up by starting with a high delay and ratcheting it down towards the desired value month by month.  Note also that the ref wipes can cause branch deletion notifications to be emitted by GitHub even though they're not branches.
- <kbd>Upd:</kbd> refresh the styling of panels on review pages and update the page header layout.  This may not look like much but it includes a lot of cleanup and upgrades under the hood, setting us up to make more impactful UI changes in the near future!  (Yes, the sidebar is on its way.)
- <kbd>Upd:</kbd> treat `skipped` commit checks as successful.
- <kbd>Upd:</kbd> add `repository` and `coauthors` to `review.pullRequest` for completion condition input, and support `requestedTeams` in the output to adjusted the teams from whom a review is requested.
- <kbd>Upd:</kbd> add a `fallback: true` flag to `review.pendingReviewers` users selected solely due to having no reviewers pending due to organic causes.
- <kbd>Upd:</kbd> track a per-review `stage` property and allow the completion condition to set it.
- <kbd>Upd:</kbd> allow no-scope uses of the `{builtin: 'fulfilled'}` designation to indicate that the default scope has been fulfilled.
- <kbd>Upd:</kbd> allow uploads of SVG images into comments.
- <kbd>Upd:</kbd> replace dragging of the margin notch with keyboard input of the desired number of columns.
- <kbd>Upd:</kbd> move file mode change indicator from file header to a dedicated message.
- <kbd>Fix:</kbd> restore support for GHE 3.8 and older, broken in v4320.6839.
- <kbd>Fix:</kbd> tolerate broken GitHub GraphQL status check responses.
- <kbd>Fix:</kbd> guard against a very rare crash when renamed files are present in the review.
- <kbd>Fix:</kbd> restore `copyHeadBranch` and `editBaseBranch` keyboard binding commands.
- <kbd>Fix:</kbd> diff files where the user is a designated reviewer even if "skip files claimed by others" is on and would otherwise indicate that they should be skipped.
- <kbd>Fix:</kbd> display a more accurate post-publishing file status when publishing would change its nature rather than just making the file reviewed.
- <kbd>Fix:</kbd> respect `omitBaseChanges: true` on `builtin: 'anyone'` designations.
- <kbd>Fix:</kbd> correctly infer review status on a file when `omitBaseChanges: true` is specified on a designation and the file has revisions with no changes.
- <kbd>Fix:</kbd> fail more gracefully if repository not accessible when processing user request on the backend.
- <kbd>Fix:</kbd> include the `teams` property in all user objects that are part of the completion condition input structure.
- <kbd>Fix:</kbd> avoid logging clipboard errors.
- <kbd>Fix:</kbd> guard against missing context error.
- <kbd>Fix:</kbd> don't crash when encountering more than one invalid directive.
- <kbd>Fix:</kbd> guard against very rare crash when clicking inside a draft.
- <kbd>Fix:</kbd> address minor inconsistencies in file header styling when transitioning to the statusbar.

<sub>**Enterprise release 4320.6839** (min 3991.6302 GHE 2.19+ or 3.9+) 2024-04-17 <!-- enterprise 4320.6839 --></sub>

- <kbd>New:</kbd> allow instances running against GHEC to limit sign-ins to a given EMU username suffix.
- <kbd>New:</kbd> allow a local GHE Server status API implementation to be tied into Reviewable's GitHub status reporting UI via `REVIEWABLE_GITHUB_STATUS_URL`.
- <kbd>Upd:</kbd> adjust pull request links in comments to point to the corresponding review instead, if it exists.
- <kbd>Upd:</kbd> add support for `linguist-generated` and `linguist-language` attributes in `.gitattributes` files.
- <kbd>Upd:</kbd> support syntax highlighting for the `jsonc` "language".
- <kbd>Upd:</kbd> add syntax highlighting for VBA files.
- <kbd>Upd:</kbd> enabled support for merge queues in GHE 3.12+.
- <kbd>Fix:</kbd> don't repeatedly try to get anonymous permissions for a private repository.
- <kbd>Fix:</kbd> immediately clear private data from memory when signing out.
- <kbd>Fix:</kbd> reject Firebase tokens with no expiry date.  Some were accidentally issued a couple years ago and got grandfathered in for a while to avoid disruption, but it's long past time to stop accepting them.
- <kbd>Fix:</kbd> guard against crash when exiting review page while it's scrolling.
- <kbd>Fix:</kbd> prevent crash when permissions time out while on a review page.
- <kbd>Fix:</kbd> don't crash when license admin or instance owner visits the repositories page more than once without reloading the page.
- <kbd>Fix:</kbd> disallow time-based refreshing of a custom review completion condition if the pull request is merged or closed.  Condition output is rarely needed for non-open pull requests, and naïve conditions could end up looping this way forever.  Worse, if a pull request was closed and a new one opened on the same commit, the fix in v4186.6596 would be ineffective and a feedback loop that exhausts GitHub's per-commit status limit was likely to occur.
- <kbd>Fix:</kbd> raise maximum runtime of background sweep tasks for Sentry cron monitoring to avoid false alarms.

<sub>**Enterprise release 4302.6774** (min 3991.6302 GHE 2.19+ or 3.0+) 2024-02-27 <!-- enterprise 4302.6774 --></sub>

- <kbd>Upd:</kbd> ensure that the last revision always represents the pull request's current head, in case the branch was moved back to an earlier commit.  Before, it was possible for an obsolete revision to be last instead, which could be confusing and made some completion condition code more complicated.  It could also result in the revision being considered reviewed when that may not have been the reviewer's intention; we now carry forward review marks only when it is safe to do so.
- <kbd>Upd:</kbd> don't split revisions when the commit author changes, and indicate each commit's author in the virtual Commits file if necessary instead.
- <kbd>Upd:</kbd> expose `Reviewable.showAllComments()` and `Reviewable.hideAllComments()` functions in the console.
- <kbd>Upd:</kbd> report queue and cron job health to Sentry's cron monitoring feature at regular intervals (if a Sentry DSN was configured).  The monitors will be configured automatically as the servers are running though it might take up to a month before all the jobs show up.  Note that Sentry charges an extra fee for cron monitoring but it's pretty minimal.
- <kbd>Fix:</kbd> react immediately to custom font family and size being deleted in the settings dialog, instead of requiring a page reload.
- <kbd>Fix:</kbd> recognize blocked repositories when attempting to auto-connect.
- <kbd>Fix:</kbd> avoid spinning forever on "Resuming session" in Safari 17 and up.
- <kbd>Fix:</kbd> don't escape code as Markdown when pasting into a fenced code block in a draft comment.
- <kbd>Fix:</kbd> automatically switch to in-process worker if unable to resume session via the shared one.
- <kbd>Fix:</kbd> detect changed usernames when looking for personal repositories or personal pull requests to auto-connect.
- <kbd>Fix:</kbd> prevent tasks polling for new personal repositories or pull requests from exceeding their lease time.
- <kbd>Fix:</kbd> report errors encountered when auto-connecting a new repository.
- <kbd>Fix:</kbd> report broken repository connections in Reviewable's GitHub status check instead of leaving it empty or set to its last normal value.
- <kbd>Fix:</kbd> update Reviewable's GitHub status checks when reconnecting a repository, so they're not stuck on "repo disconnected" until something else forces an update.
- <kbd>Fix:</kbd> reinstate toggles for My PRs / All repos in connections panel.
- <kbd>Fix:</kbd> don't misparse team mentions as user mentions in comments.  This could cause the completion condition to fail with a bogus "...is a member of over 100 teams" error message.
- <kbd>Fix:</kbd> guard against rare crash when trying to publish while the review page is still loading.

<sub>**Enterprise release 4247.6681** (min 3991.6302 GHE 2.19+ or 3.0+) 2024-01-25 <!-- enterprise 4247.6681 --></sub>

- <kbd>New:</kbd> add an API to query information about seats and their occupants.  See the new [API docs](https://github.com/Reviewable/Reviewable/blob/master/enterprise/api.md) for details.
- <kbd>Upd:</kbd> margin notch is updated via manual or keyboard input and not dragging.
- <kbd>Upd:</kbd> add `review.pullRequest.sanctions` to completion condition input data.  This replaces the previous `approvals` proprety (which will continue to be supported, don't worry) with a richer data structure that includes user teams.
- <kbd>Upd:</kbd> highlight Cairo files as Rust.
- <kbd>Upd:</kbd> Remove support for `azurefns` (Azure Functions) from REVIEWABLE_CODE_EXECUTOR setting.
- <kbd>Upd:</kbd> use TypeScript syntax highlighter for `.mts` and `.cts` files.
- <kbd>Fix:</kbd> render :shipit: emoji properly.
- <kbd>Fix:</kbd> fix rendering of GitHub line links in comments to have the right link to the underlying commit.
- <kbd>Fix:</kbd> don't believe GitHub when it says that issues can't be fetched when syncing.
- <kbd>Fix:</kbd> show correct background color for code snippets in file-level discussions.
- <kbd>Fix:</kbd> don't ignore some normally spurious errors reported through the global error hook if they appear to originate from Reviewable.
- <kbd>Fix:</kbd> work around invalid GitHub image proxy links in comments.
- <kbd>Fix:</kbd> avoid a memory / CPU leak when switching between reviews without closing the tab.
- <kbd>Fix:</kbd> drain requests before exiting server.
- <kbd>Fix:</kbd> when following a link to a discussion within a review, scroll to that discussion.
- <kbd>Fix:</kbd> correct ribbon label positioning when showing new dispositions in a discussion.

<sub>**Enterprise release 4186.6596** (min 3991.6302 GHE 2.19+ or 3.0+) 2023-12-04 <!-- enterprise 4186.6596 --></sub>

- <kbd>New:</kbd> allow the custom review completion condition to designate per-file reviewers, display the review state of each file with a small icon, and provide full details of who reviewed / needs to review the file in a dropdown.  See [docs](https://docs.reviewable.io/files.html#file-review-state) for details.
- <kbd>Upd:</kbd> replace the Gitter chatroom link in the support menu with a built-in popup chat.  You can substitute your own link instead by setting REVIEWABLE_CHAT_URL to a URL of your choice (for example a Slack channel you're sharing with us!), or remove the menu item entirely by setting the environment variable to `off`.
- <kbd>Upd:</kbd> speed up publish, publish preview, and ad-hoc comment send functions.  Note that this will increase the number of evaluations of custom review completion conditions.
- <kbd>Upd:</kbd> clean up and simplify the review summary unreviewed files and unreplied discussions counters, and make it clear when publishing will defer the review.
- <kbd>Upd:</kbd> consistently remove the "new comment" ribbon when acknowledging or replying to a discussion.
- <kbd>Upd:</kbd> verify required `CODEOWNERS` in the pull request approval check, and list any that are missing.
- <kbd>Upd:</kbd> include team memberships for users in completion condition input.
- <kbd>Upd:</kbd> don't try to use the demo review structure as a sample completion condition input in the settings editor if no review can be found in the target repository.  This was causing too many problems and wasn't particularly useful.
- <kbd>Fix:</kbd> don't fail with a permission denied error when publishing a draft for a discussion where new comments were posted (and not acknowledged by the user) in more than the previous 10 seconds.
- <kbd>Fix:</kbd> insert badge link into pull request even if the review starts out broken.
- <kbd>Fix:</kbd> detect when multiple reviews share the same head commit and set a special error status in GitHub.  Otherwise, it was possible for the reviews to get into a feedback loop when updating the status and quickly exhaust GitHub's limit of 1000 statuses per commit.
- <kbd>Fix:</kbd> correctly coalesce and display groups of trivial files ("files hidden because...") in every situation, and hide the "+N more" link after it's been clicked.
- <kbd>Fix:</kbd> if navigating to a hidden file causes the page to switch into single-file mode, then display that file rather than the previously selected one.
- <kbd>Fix:</kbd> don't sync requested reviewers when sending ad-hoc comments, even if the option is checked in the publish options.
- <kbd>Fix:</kbd> eliminate some duplicate background rendering of draft comments.
- <kbd>Fix:</kbd> render avatars smoothly (regression introduced in v3424.5210).
- <kbd>Fix:</kbd> restore file matrix table striping (regression introduced in v4055.6359).
- <kbd>Fix:</kbd> handle some occasional bad data coming from GitHub's API more gracefully.
- <kbd>Fix:</kbd> always paint the checks donut correctly after animating changing check states.
- <kbd>Fix:</kbd> avoid some UI jitter when starting to type a review summary draft at the bottom of the page, or when deleting one from same.
- <kbd>Fix:</kbd> avoid a cumulative slowdown after deleting many drafts.
- <kbd>Fix:</kbd> ensure the review summary publishing bunny always animates when it should.
- <kbd>Fix:</kbd> prevent some (very) minor elements from animating when animations are turned off in the user's settings.
- <kbd>Fix:</kbd> slice off tail quotes from GitHub-originated messages only if they were sent over email. Comments written in GitHub's UI rarely use tail quoting, but do sometimes have actual useful quotes at the end.
- <kbd>Fix:</kbd> tighten up the layout of filename headers — they had accumulated a bunch of unnecessary whitespace over time.
- <kbd>Fix:</kbd> avoid logging bogus "Function already exist" errors in the Lambda executor.
- <kbd>Fix:</kbd> don't crash in edge cases when the file you're focused on in single-file mode gets renamed and deleted.
- <kbd>Fix:</kbd> keep magic keyword tooltip from becoming detached in the UI after updating the keyword.
- <kbd>Fix:</kbd> use consistent tooltip theme for magic keyword explanations (regression introduced in v4088.6442).
- <kbd>Fix:</kbd> don't crash in some situations when the user refuses to login or authorize scopes.
- <kbd>Fix:</kbd> when using the `vm2` or `azurefns` executors, correctly catch completion condition errors instead of failing out of the task.
- <kbd>Fix:</kbd> don't crash on startup if unable to access local storage.
- <kbd>Fix:</kbd> prevent crash when dropdown is opened and closed too quickly.

<sub>**Enterprise release 4088.6442** (min 3991.6302 GHE 2.19+ or 3.0+) 2023-10-16 <!-- enterprise 4088.6442 --></sub>

- <kbd>Upd:</kbd> expose a `merge()` command for binding to a keyboard shortcut.
- <kbd>Upd:</kbd> improve the merge button arming animation to be clearer.
- <kbd>Upd:</kbd> unmappable GitHub inline comments are now linked to the original comment on GitHub.
- <kbd>Upd:</kbd> update the tooltip system; no user-visible changes expected.
- <kbd>Fix:</kbd> remove a lookbehind regular expression that breaks in Safari <16.4.
- <kbd>Fix:</kbd> avoid icon render errors after state changes in participants panel.
- <kbd>Fix:</kbd> be more tolerant about using valid repo admin authorizations even when a repo's connection is broken.
- <kbd>Fix:</kbd> guard against some rare cases of elements not existing due to timing.
- <kbd>Fix:</kbd> don't lose diff delta highlights in some very old browsers. (Regression introduced in v4055.6359.)
- <kbd>Fix:</kbd> correctly highlight prior revision arcs in file headers for contextual help.
- <kbd>Fix:</kbd> correctly position contextual help highlights in pinned file headers.
- <kbd>Fix:</kbd> guard against crash when user logs out in the middle of a dashboard query.
- <kbd>Fix:</kbd> deduplicate check names (e.g., by the workflow that spawned them) to avoid inadvertently dropping checks from the list in the UI.
- <kbd>Fix:</kbd> if a pull request isn't eligible to be turned into a review due to contributor team constraints applied to the license or subscription, stop processing its events earlier.  This should significantly reduce unnecessary processing load and GitHub API quota usage in cases where the contributor team is small compared to the number of other contributors in a connected repository.
- <kbd>Fix:</kbd> accept clicks in file header dropdown when jumping from file matrix.
- <kbd>Fix:</kbd> stop treating `.bmp`, `.dib`, and `.xbm` as image files.  These are truly ancient formats that are almost never used and may conflict with more modern uses of the filename extensions.
- <kbd>Fix:</kbd> omit Sentry attachments for completion condition timeout errors.

<sub>**Enterprise release 4055.6359** (min 3991.6302 GHE 2.19+ or 3.0+) 2023-09-14 <!-- enterprise 4055.6359 --></sub>

- <kbd>Upd:</kbd> modernize the client's color system.  There should be no user-visible effect though the eagle-eyed may notice some slight changes in color here and there.  The new system should be compatible with existing stylesheet customizations.
- <kbd>Upd:</kbd> render Markdown-style links in coverage errors.
- <kbd>Fix:</kbd> don't break under GHE 3.10.  This regression was introduced in v3935.6189 and specifically affects _only_ GHE 3.10.

<sub>**Enterprise release 4046.6345** (min 3619.5594 GHE 2.19+ or 3.0+ but not 3.10) 2023-09-07 <!-- enterprise 4046.6345 --></sub>

- <kbd>Adm<i>(enterprise)</i>:</kbd> **WARNING** This version includes a fix to the task queuing system that is likely to result in a burst of task processing activity on first launch.  This may be high enough to temporarily overload Firebase, so we recommend that you schedule the upgrade for off-hours.
- <kbd>New:</kbd> reflect GitHub's pull request approval status (as regulated by branch protection) in a new entry in the checks dropdown panel.  (This doesn't reflect `CODEOWNERS` yet, but will in the next release.)
- <kbd>Upd:</kbd> add support for an `error` property in coverage reports.
- <kbd>Upd:</kbd> recognize Poetry lock files as generated files.
- <kbd>Upd:</kbd> send bad connection notification emails only if the connecting user is still a member of the organization.
- <kbd>Upd:</kbd> let `Reviewable.workOfflineAtMyOwnRisk()` take a boolean flag to make the setting sticky, and set `offline` class on `body` to enable custom styling.
- <kbd>Upd:</kbd> improve permission check frequency with adaptive timings and jitter, to reduce database load spikes.
- <kbd>Fix:</kbd> prevent HTML caching to avoid the browser trying to load JS and CSS files from a previous version that no longer exist, leading to a broken page.  (The HTML file is tiny and all other files are still cached aggressively, so this shouldn't affect load latency.)
- <kbd>Fix:</kbd> don't crash when attempting to send a draft with code blocks and a whitespace-only body.
- <kbd>Fix:</kbd> reduce the number of GitHub requests issued when syncing a review.
- <kbd>Fix:</kbd> don't highlight deltas in hunk header lines, and prevent them from wrapping.
- <kbd>Fix:</kbd> improve sticky file header positioning on refresh and review updates.
- <kbd>Fix:</kbd> clean up the layout of the checks dropdown panel.
- <kbd>Fix:</kbd> guard against nil file values returned by the completion condition.
- <kbd>Fix:</kbd> recognize `.cjs` and `.mjs` files as JavaScript for syntax highlighting.
- <kbd>Fix:</kbd> hide comment actions until the sign in process is fully completed.  Clicking on an action early would cause a crash.
- <kbd>Fix:</kbd> improve server queue handling so tasks don't get stuck for a long time.  This should reduce the number of occurrences of "waiting for permissions" or "request queued but server did not respond" errors, among other things.
- <kbd>Fix:</kbd> don't crash with `$digest already in progress` when navigating to a pull request that doesn't have a review yet from the dashboard while signed in without `public_repo` scope.
- <kbd>Fix:</kbd> bump client timeout for user-requested review syncs from 30s to 60s.  This should reduce false positive timeout errors on big pull requests.

<sub>**Enterprise release 3991.6302** (min 3619.5594 GHE 2.19+ or 3.0+ but not 3.10) 2023-08-03 <!-- enterprise 3991.6302 --></sub>

- <kbd>Upd:</kbd> make `pr` variable available in coverage data URL templates.
- <kbd>Upd:</kbd> stop extending diff selection to cover entire lines, and add a Copy Lines item to the selection command palette instead that does this only on demand.
- <kbd>Fix:</kbd> don't get stuck forever retrying the status sync task when a review's file rename map is out of date.
- <kbd>Fix:</kbd> prevent a spurious error about "stripe is not defined" from being logged when users load a page.
- <kbd>Fix:</kbd> allow organizations to be renamed.
- <kbd>Fix:</kbd> avoid rare participant cell animation crash and guard against cell flickering in Firefox.
- <kbd>Fix:</kbd> adjust padding on magic keyword highlights.
- <kbd>Fix:</kbd> drop empty beginning / end of line ranges from selection, as well as leading and trailing empty lines.  This should make it easier to make clean selections and place the command palette closer to the actual selection in some edge cases.
- <kbd>Fix:</kbd> eliminate a redundant completion condition execution on pushes to the base branch.
- <kbd>Fix:</kbd> guard against an error (that seems to cause crashes for some people, though it shouldn't) when the Reviewable instance is running in private mode and has the analytics hook enabled.  (Regression introduced in v3923.6172.)
- <kbd>Fix:</kbd> prevent an "encryption not set up" crash when loading Reviewable without being signed in on an encrypted instance.  (Regression introduced in v3935.6189.)

<sub>**Enterprise release 3980.6275** (min 3619.5594 GHE 2.19+ or 3.0+ but not 3.10) 2023-07-26 <!-- enterprise 3980.6275 --></sub>

- <kbd>New:</kbd> launch temporary UI Experiments at https://experiments.reviewable.io/ to generate custom CSS combinations
- <kbd>New:</kbd> add a `REVIEWABLE_HOST_INACCESSIBLE` flag to indicate that the Reviewable host is not accessible from GitHub.
- <kbd>Upd:</kbd> move participants panel actions from discussions cell to the user cell dropdown.
- <kbd>Upd:</kbd> include requested reviewer teams in the participants panel.
- <kbd>Upd:</kbd> automatically format links when pasting a URL onto a selection in a draft comment.
- <kbd>Upd:</kbd> remove stealth updates of URL hash to match clicked discussion -- please use the dropdown menu to copy the discussion's URL to the clipboard instead.  (We also enabled this menu on top-level discussions.)
- <kbd>Upd:</kbd> add support for Codecov's v2 API. The old API (and its data format) will continue to be supported indefinitely as well.
- <kbd>Upd:</kbd> improve args reporting when capturing Firebase exceptions in Sentry.
- <kbd>Upd:</kbd> add `+by:username` and `+with:username` query terms to the dashboard.
- <kbd>Upd:</kbd> auto-delete empty drafts on click outside discussion, `Esc`, or preview/publish.  We no longer auto-delete on blur, as this was both too aggressive and inconsistent.
- <kbd>Upd:</kbd> show declaration headers for scopes that continue after a collapsed diff section.
- <kbd>Fix:</kbd> correctly align diff bound brackets on revision cells.
- <kbd>Fix:</kbd> keep inline code formatting from overlapping in rendered markdown.
- <kbd>Fix:</kbd> don't lock out discussion navigation after spamming diff selection.
- <kbd>Fix:</kbd> ensure 'edit in GitHub' links land on the correct GitHub page.
- <kbd>Fix:</kbd> make sure that marking as reviewed in the file matrix doesn't send you to a new tab or down the page.
- <kbd>Fix:</kbd> show file path ellipses appropriately in the file header (regression introduced in v3923.6172).
- <kbd>Fix:</kbd> avoid copying/quoting extra spaces (regression introduced in 3842.6109).
- <kbd>Fix:</kbd> minor layout fixes in drafts including keeping the draft layout from shifting when toggling between write and preview modes.
- <kbd>Fix:</kbd> avoid rare "maximum call stack exceeded" crash on the server.
- <kbd>Fix:</kbd> try to recover automatically if multiple merge queue entries share a common commit SHA.
- <kbd>Fix:</kbd> avoid error on dashboard when we fail to fetch a repository's default branch name.
- <kbd>Fix:</kbd> don't scroll to a random spot on the page when the first click lands on a discussion.
- <kbd>Fix:</kbd> Ensure publish previews are not accidentally hidden.
- <kbd>Fix:</kbd> Make sure file header always stays fixed in place when scrolling.
- <kbd>Fix:</kbd> Support file dropdowns opening from the status bar in Safari.
- <kbd>Fix:</kbd> add contextual help for the "merge latest changes into branch" button.
- <kbd>Fix:</kbd> back off query size in response to a wider range of errors on the dashboard.  This should help prevent "something went wrong" warnings.

<sub>**Enterprise release 3955.6217** (min 3619.5594 GHE 2.19+ or 3.0+ but not 3.10) 2023-07-04 <!-- enterprise 3955.6217 --></sub>

- <kbd>New:</kbd> allow repository admins to override Reviewable's status check for broken reviews.
- <kbd>New:</kbd> add option to start a file-level discussion to the file dropdown menu.
- <kbd>New:</kbd> let users bow out of a discussion to void their resolution vote and avoid becoming awaited whenever new comments are posted.  This is equivalent to dismissing yourself but bypasses the permission constraint.
- <kbd>Upd:</kbd> include author, state and title when rendering issue and pull request references in comments.  Distinguish between completed/dropped and merged/closed states.  At the same time, align state icons and colors with GitHub, including in issue autocompletion popup.
- <kbd>Upd:</kbd> show pull requests merged with `spr` as merged rather than closed in references and autocompletion popup.  (Going forward only -- no backfill.)
- <kbd>Upd:</kbd> accept pasting of rich text into drafts, with automatic conversion to Markdown.
- <kbd>Upd:</kbd> keep new revisions provisional even if a reviewer has the review open, as long as the tab isn't active.
- <kbd>Fix:</kbd> restrict file matrix modifier icons to show only when matrix is hovered.
- <kbd>Fix:</kbd> enable usage of alt as a hotkey modifier inside of drafts.
- <kbd>Fix:</kbd> allow copying out plain text from discussion comments, without Markdown decorations or escaping.
- <kbd>Fix:</kbd> allow copying text out of draft previews.
- <kbd>Fix:</kbd> improve placement of the selection command palette (regression introduced in v3842.6109).
- <kbd>Fix:</kbd> guard against rare crash caused by missing scroll element.
- <kbd>Fix:</kbd> keep modifier icons from getting stuck after using find in page on a Mac.
- <kbd>Fix:</kbd> avoid redundant underlines in file matrix file names.
- <kbd>Fix:</kbd> don't crash on sign-in when running with encryption configured.  (Regression introduced in v3935.6189.)

<sub>**Enterprise release 3935.6189** (min 3619.5594 GHE 2.19+ or 3.0+ but not 3.10) 2023-06-20 <!-- enterprise 3935.6189 --></sub>

- <kbd>Adm<i>(enterprise)</i>:</kbd> **WARNING** this release breaks sign-in on installations that configured encryption.
- <kbd>Upd:</kbd> improve latency for auto-connecting repositories if the repository creation event somehow gets lost, by listening to other repository-related events as well.
- <kbd>Fix:</kbd> improve Firebase data caching behavior on the servers.
- <kbd>Fix:</kbd> allow dashboard filtering by clicks on bot users.
- <kbd>Fix:</kbd> in Chrome, keep user filtering working when bot users are displayed on any PRs.
- <kbd>Fix:</kbd> Ensure code quote selection handles cannot get stuck behind discussions.
- <kbd>Fix:</kbd> avoid persistent high CPU loads after repeatedly moving back-and-forth between a large review and the dashboard (regression introduced in v3717.5839).
- <kbd>Fix:</kbd> adjust minor layout issues in collapsed diff regions.
- <kbd>Fix:</kbd> handle AWS Lambda `ResourceConflictException` errors more gracefully.
- <kbd>Fix:</kbd> prevent new GraphQL query that checks for merge queue activity from breaking under older versions of GHE.
- <kbd>Fix:</kbd> ensure file dropdown is not hidden by a discussion.
- <kbd>Fix:</kbd> keep collapsed region settings dropdown from being obscured by discussions.

<sub>**Enterprise release 3923.6172** (min 3619.5594 GHE 3.11+) 2023-06-14 <!-- enterprise 3923.6172 --></sub>

- <kbd>Adm<i>(enterprise)</i>:</kbd> **WARNING** this release only works with GHE 3.11+.
- <kbd>New:</kbd> add actions dropdown to file and discussion headers, including 'link to discussion' and 'edit in GitHub' actions.
- <kbd>Upd:</kbd> add hints to line link template field in account settings.
- <kbd>Upd:</kbd> send all analytics events via a queue in the database, so only the server connects to `REVIEWABLE_ANALYTICS_URL`.  While at it, retry failed requests a few times to smooth over any transient errors.
- <kbd>Upd:</kbd> respect the "BTW" keyword only in a user's first comment of a discussion, to reduce the risk of inadvertent disposition changes in follow up comments.
- <kbd>Upd:</kbd> highlight `.toml` files.
- <kbd>Fix:</kbd> prevent a crash on the reviews dashboard when Safari disallows access to local storage.
- <kbd>Fix:</kbd> don't offer quoting via the selection palette to signed out users.
- <kbd>Fix:</kbd> make normal (short) clicks work consistently on the Publish button even if the page has been loaded for a very long time.
- <kbd>Fix:</kbd> guard against rare crash in code block editor.
- <kbd>Fix:</kbd> prevent review from loading forever for some ill-fated draft discussion states.
- <kbd>Fix:</kbd> collapse discussions upon resolving (regression introduced in v3657.5690).
- <kbd>Fix:</kbd> don't crash when displaying a review with a milestone assigned.  Also clean up styling a bit.
- <kbd>Fix:</kbd> prevent page from being closed if an operation is in progress.
- <kbd>Fix:</kbd> don't show empty avatar image placeholders where no image would be shown.
- <kbd>Fix:</kbd> prevent crashes when hovering over participant panel cells.
- <kbd>Fix:</kbd> make sure file headers don't move past the status bar when scrolling.
- <kbd>Fix:</kbd> don't remove words that match dispositions names (e.g., "blocking") from comments posted to the pull request outside Reviewable.
- <kbd>Fix:</kbd> post Reviewable's status checks for commits created by GitHub's merge queues.  There's also a new `review.pullRequest.mergeQueueCheck` boolean property that lets completion conditions know whether they're running on a merge queue commit or on a normal one.
- <kbd>Fix:</kbd> don't try to fetch commit statuses for an undefined SHA.
- <kbd>Fix:</kbd> prevent users from signing out in the middle of a merge operation.
- <kbd>Fix:</kbd> copy icon no longer shows above long paths in the file header.
- <kbd>Fix:</kbd> remove user display name and avatar from Reviewable if they're deleted from the GitHub profile.
- <kbd>Fix:</kbd> wait for session to be resumed before sending analytics events, so we don't send anonymous events when the user was actually signed in.
- <kbd>Fix:</kbd> make file serving for the local uploads provider work again (regression introduced in v3807.5940).

<sub>**Enterprise release 3842.6109** (min 3619.5594 GHE 2.19+ or 3.0+) 2023-05-15 <!-- enterprise 3842.6109 --></sub>

- <kbd>Upd:</kbd> revert the "thanks" keyword for the Informing disposition, as it's too generic and has proven error-prone in practice.
- <kbd>Upd:</kbd> improve `?debug=latency` to log much more comprehensive page load latency stats.
- <kbd>Upd:</kbd> implement filtering by participant or author on the dashboard (try clicking on an avatar!), and move the author avatar to the pull request title as it was feeling a bit lonely out there on the right.
- <kbd>Upd:</kbd> automatically collapse groups with 200+ files, and don't count files in collapsed groups towards the threshold used to automatically hide the file matrix.
- <kbd>Upd:</kbd> add diff (patch) syntax highlighting, and don't mark a leading space on an otherwise empty line with a red dot in diffs of such files.
- <kbd>Upd:</kbd> add a command palette to comment selections that allows for explicit quoting of selected text, and remove auto-quoting of the selection upon draft creation for both comments and the diff.
- <kbd>Upd:</kbd> retain Markdown styling in comment quotes.
- <kbd>Upd:</kbd> show failing checks that are not required in orange in the status bar checks ring.
- <kbd>Upd:</kbd> combine GitHub 401, 403, and 500+ errors caught on the client into one Sentry issue per error code.
- <kbd>Fix:</kbd> infer GitHub search timeout failures in dashboard queries and do our best to reshape the queries until they succeed.  This should reduce or eliminate "something went wrong" errors.
- <kbd>Fix:</kbd> avoid overwriting selected text in draft when uploading an image.
- <kbd>Fix:</kbd> ignore "go to file matrix" command if the page doesn't have a file matrix.
- <kbd>Fix:</kbd> count reverted files towards the threshold that switches the view to single-file mode.
- <kbd>Fix:</kbd> fix regression introduced in v3663.5716 causing small regions of collapsed lines to be rendered in diffs.
- <kbd>Fix:</kbd> avoid a rare crash when moving directly from the dashboard to a review with a discussion target in the URL.
- <kbd>Fix:</kbd> ensure that discussions with a draft are always displayed, even if they're replied and resolved. This should avoid the situation where you have a red non-zero draft counter but clicking it doesn't navigate to a discussion.
- <kbd>Fix:</kbd> show command palette if only non-delta content selected in single-column diff.
- <kbd>Fix:</kbd> don't mix added/removed lines when making a selection in a code block diff.
- <kbd>Fix:</kbd> treat a required failing PullApprove status check as potentially successful when deciding whether publishing might trigger auto merge.
- <kbd>Fix:</kbd> set custom contrast settings when the page loads, not when account settings menu is opened.
- <kbd>Fix:</kbd> when following a permalink to a comment in Reviewable that originated from GitHub, correctly jump to and focus the comment.
- <kbd>Fix:</kbd> add missing contextual help for the selection command palette.
- <kbd>Fix:</kbd> ensure the selection command palette doesn't show up offscreen.
- <kbd>Fix:</kbd> make major improvements to participants panel loading performance in reviews with many participants.

<sub>**Enterprise release 3827.6001** (min 3619.5594 GHE 2.19+ or 3.0+) 2023-04-11 <!-- enterprise 3827.6001 --></sub>

- <kbd>Upd:</kbd> recognize draft pull requests more reliably, and indicate draft state in review status description.
- <kbd>Upd:</kbd> distinguish draft reviewer role with a green icon in the participants panel.  The role will become permanent (and visible to other participants) once drafts are published.
- <kbd>Upd:</kbd> count posts in the main discussion toward discussions shown in participants panel.
- <kbd>Upd:</kbd> add "thanks" as a keyword to set disposition to Informing.  (Like other keywords for Informing, it only works in the first comment of a discussion.)
- <kbd>Upd:</kbd> include `headBranch` and `baseBranch` in the available custom line link variables.
- <kbd>Upd:</kbd> add link back to the reviews dashboard to the bottom of the review page.
- <kbd>Upd:</kbd> revamp the avatars column on the reviews dashboard: improve the iconography, indicate more statuses than just GitHub approval, and add a tooltip to the ellipsis listing the participants that didn't fit.
- <kbd>Upd:</kbd> drop events from disconnected repositories that still have a webhook enabled earlier, to improve server performance and reduce pressure on Firebase.
- <kbd>Upd:</kbd> make code coverage indicators customizable via custom stylesheets.
- <kbd>Fix:</kbd> improve mapping of comments from GitHub into Reviewable.  We now correctly separate multiple threads attached to the same line, and sync file-level comments and line comments where we couldn't map the line to the top of the file.
- <kbd>Fix:</kbd> guard against a rare crash when a provisional renamed file disappears from the pull request.
- <kbd>Fix:</kbd> refine schema constraints to guard against partial review structures being written.  In very rare cases, if a write was happening while a review was being automatically archived, this could lead to a broken review.
- <kbd>Fix:</kbd> remove unnecessary "no statuses fetched" warning from logs.
- <kbd>Fix:</kbd> fix style bug that caused inconsistent font size in participant panel dropdowns.
- <kbd>Fix:</kbd> avoid obscuring disposition dropdowns which would happen when empty drafts were collapsed after their dropdown was opened.
- <kbd>Fix:</kbd> address visual bug where new disposition ribbon spanned full width of discussions.
- <kbd>Fix:</kbd> work around a bug in GitHub's Markdown renderer that would render some text with unterminated HTML elements as an empty comment.  This was always a problem, but since v3807.5940 it would also cause permission denied errors when trying to post such comments as we tightened up the schema.
- <kbd>Fix:</kbd> prioritize generated file detection over other special file natures (long lines, etc.).
- <kbd>Fix:</kbd> ensure Android mobile login works even with GitHub app installed
- <kbd>Fix:</kbd> fix extremely rare race condition when computing file rename matches that could result in a crash.
- <kbd>Fix:</kbd> don't spam a user who connected a repository then lost access to it with endless entreaties to sign back in.
- <kbd>Fix:</kbd> be more selective about eliding a status check context in the checks dropdown if it also shows up in the check's description.
- <kbd>Fix:</kbd> ensure that unreplied discussions are always shown in the diff.  Prior to this fix, it was occasionally possible to have a non-zero red discussion counter that did nothing when clicked, as the unreplied discussions were collapsed into gutter icons likely due to a race condition.  Incidentally, this fix also addressed similar issues when toggling trust-and-verify mode on and off.
- <kbd>Fix:</kbd> limit the width of discussions that appear in a diff viewer when the diff is collapsed, which would previously span the entire column, no matter how wide.

<sub>**Enterprise release 3807.5940** (min 3619.5594 GHE 2.19+ or 3.0+) 2023-03-23 <!-- enterprise 3807.5940 --></sub>

- <kbd>New:</kbd> add support for disabled repository connections via the `REVIEWABLE_DISABLED_CONNECTIONS` environment variable.
- <kbd>New:</kbd> the maximum upload file size is now configurable via the `REVIEWABLE_MAX_UPLOAD_IMAGE_SIZE` and `REVIEWABLE_MAX_UPLOAD_VIDEO_SIZE` environment variables.
- <kbd>Upd:</kbd> respect nested language when syntax highlighting discussion code blocks.
- <kbd>Upd:</kbd> add date and time to last active column dropdown and improve formatting for cells with multiple icons in the participants panel.
- <kbd>Upd:</kbd> add a "new comments for me" section to the dashboard that surfaces reviews where you have unread comments (including concluded ones!) but that aren't awaiting your action.
- <kbd>Upd:</kbd> accept uploads of `webm` videos as comment attachments.
- <kbd>Upd:</kbd> upgrade to Node 18 and Debian 11.
- <kbd>Fix:</kbd> apply syntax highlighting on kept diff lines in single column mode.
- <kbd>Fix:</kbd> revert to center aligned merge/closed/archived notices in the dashboard.
- <kbd>Fix:</kbd> strip extra whitespace that was copied when selecting over empty diff lines.
- <kbd>Fix:</kbd> properly handle commit messages generated when using squash merge.
- <kbd>Fix:</kbd> correctly style notification emails.
- <kbd>Fix:</kbd> ensure that some rare permission / token errors are attributed to the right user and will correctly cause a repository to be disconnected.
- <kbd>Fix:</kbd> detect "no admin permissions" errors when a specific user is designated to post badge comments for a repository, and handle appropriately.
- <kbd>Fix:</kbd> don't send a notification to a user who connected a repository they no longer have access to every time they sign in.
- <kbd>Fix:</kbd> don't display a spurious warning on the dashboard when the user was mentioned in a pull request they no longer have access to.
- <kbd>Fix:</kbd> detect declaration lines in Go code again.  This was a regression, going perhaps as far back as v3291.5093.
- <kbd>Fix:</kbd> don't crash when switching a draft to Pondering disposition after previously switching the discussion to a different disposition.
- <kbd>Fix:</kbd> when sending an individual comment, apply and clear out any other draft state associated with the discussion.  This includes applying any pending dismissals, and clearing out any acknowledgement so that the sent comment doesn't appear as new to the sender (!).
- <kbd>Fix:</kbd> relax database schema to allow certain writes of review-dependent data after a review has been archived.  These writes don't occur in normal operation but can, for example, be issued when migrating to another instance.
- <kbd>Fix:</kbd> avoid infinite busy loop in some situations where the review is in commit-by-commit review style and a file has been renamed then reintroduced into the pull request.
- <kbd>Fix:</kbd> treat posts in the main discussion and active dispositions in resolved discussions as qualifying for the reviewer role (as shown in the participants panel, and indirectly on the dashboard).

<sub>**Enterprise release 3717.5839** (min 3619.5594 GHE 2.19+ or 3.0+) 2023-02-10 <!-- enterprise 3717.5839 --></sub>

- <kbd>New:</kbd> add participants panel for quickly viewing all user roles, status, other stats, and taking user-related actions.
- <kbd>Upd:</kbd> show account settings while scrolling so that visual setting updates can be seen in real time.
- <kbd>Upd:</kbd> update user contrast settings to allow for customizing diff background colors for better accessibility.
- <kbd>Upd:</kbd> add "tip" as a keyword for setting disposition to Informing.
- <kbd>Upd:</kbd> show requested review teams on the dashboard, and include such pull requests in `needs:reviewer` and `needs:me` filters as appropriate.
- <kbd>Upd:</kbd> refresh the list of pull requests when reloading a dashboard page, even if the last update falls below the normal refresh threshold.  This way, if you know there's a new pull request you can just reload the dashboard rather than waiting for the next automatic update.
- <kbd>Upd:</kbd> don't hide "obsolete" files.  We used to hide files that were reverted and reviewed altogether, but this was confusing and now that we have an automatic Reverted group in the file matrix we can just rely on that instead.
- <kbd>Fix:</kbd> don't count rate limiting-driven retries as task execution attempts for the first 2 hours, to lower the rate of false positive "Repeatedly failed to process event" errors.
- <kbd>Fix:</kbd> correctly handle the case when a pull request is missing its head commit.  This was a regression from some time ago.
- <kbd>Fix:</kbd> guard against a rare race condition that could lead to a crash when there are renamed files in the review.
- <kbd>Fix:</kbd> don't show the tip for Satisfied keywords when the user's disposition is Informing, as they're not useful.
- <kbd>Fix:</kbd> avoid continuously rewriting badge links if the organization or repository name contains uppercase characters.  This regression was introduced in v3690.5783 and could lead to quota exhaustion.
- <kbd>Fix:</kbd> display correct unreviewed file count when a custom review completion condition sets `reviewed: false` flags on some files.  Also fixed a bug that could lead to worse-than-expected unreviewed file count estimates for pull requests with renamed files.
- <kbd>Fix:</kbd> if a file was brought into the review with a provisional revision, and that revision is replaced with another one that doesn't modify the file, correctly remove the file from the review.
- <kbd>Fix:</kbd> don't misattribute GitHub errors encountered by the server when using a secondary account to a repository's primary connecting account.  If the secondary user was suspended, for example, this could cause the repository to disconnect even though the connecting user's credentials were perfectly fine.
- <kbd>Fix:</kbd> don't cross out disposition keyword if it matches the manually set disposition.  This happened most often when clicking "Done" in v3690.5783 and could be quite confusing.
- <kbd>Fix:</kbd> avoid crash on the Repositories page.  This was a regression introduced in v3690.5783 and affecting only the Enterprise installs -- sorry!
- <kbd>Fix:</kbd> avoid error message on the reviews dashboard when a cached pull request belongs to a repository the user no longer has access to.

<sub>**Enterprise release 3690.5783** (min 3619.5594 GHE 2.19+ or 3.0+) 2023-01-15 <!-- enterprise 3690.5783 --></sub>

- <kbd>Upd:</kbd> rewrite the Reviewable badge in the pull request if it points to the wrong review in the same Reviewable instance.  Previously, we'd keep the incorrect link and report an error, but this proved hard to notice and fix in the common case where a developer copies a description (with badge) from an old pull request to a new one.  This scenario should now be handled correctly automatically.
- <kbd>Upd:</kbd> log summaries of queue task execution outcome and performance in JSON format.  If you don't have `statsd` set up then you can parse and aggregate this data instead to get some pretty charts of Reviewable server performance.
- <kbd>Upd:</kbd> add support for turning off the LGTM/approve button in reviews.
- <kbd>Upd:</kbd> indicate with a colored ring when a user is changing their disposition to one that would block resolution, or one that would resolve the discussion.  We also removed the old "resolving" indicator (a tiny icon in the draft ribbon that likely nobody noticed) and added notes about becoming newly blocking to the dispositions dropdown.
- <kbd>Upd:</kbd> highlight disposition-changing keywords in drafts and pop up a tooltip explaining what's going on if needed.  If a keyword is being ignored, cross it out and explain why in the tooltip.
- <kbd>Upd:</kbd> introduce keywords to set a draft's disposition to Blocking ("bug", "major", and "hold on").
- <kbd>Upd:</kbd> show source and target branch for each pull request on the dashboard, and elide owner and repository name when not needed (e.g., in an organization-specific or repository-specific list).  The branch names are always shown in full in the (new) tooltip, and also inlined when the owner or repository are elided.
- <kbd>Upd:</kbd> cache dashboard query results to greatly improve page load times, and indicate result age under the header.
- <kbd>Upd:</kbd> offer link to a repository-specific dashboard (that shows all pull requests in the repository) when you enter something that looks like a repository name in the dashboard's query field.
- <kbd>Fix:</kbd> guard against review size getting blown out due to a multitude of long GitHub comments that nonetheless fall under the per-comment length cap.  This would result in the review trying to sync forever, and repeatedly causing regular Firebase disconnects.
- <kbd>Fix:</kbd> improve dashboard layout at low screen widths.
- <kbd>Fix:</kbd> prevent occasional endless failure loops when a review exceeds the max file limit.  The review should now be marked reliably as being in an error state.
- <kbd>Fix:</kbd> clear error message on dashboard after a successful fetch.
- <kbd>Fix:</kbd> avoid small visual hitch when activating organization dropdown on dashboard.
- <kbd>Fix:</kbd> request `workflow` scope from the user if merging a pull request with a file in `.github/workflows` fails, and retry.
- <kbd>Fix:</kbd> use the original casing of owner and repository names in badge and comment links.
- <kbd>Fix:</kbd> use the original casing of user and team names in `@` autocompletions in draft comments.
- <kbd>Fix:</kbd> guard against a rare crash when leaving a review page while a diff operation is in progress.
- <kbd>Fix:</kbd> avoid flash of unstyled content (FOUC) when loading reviewable and the icon font isn't cached.

<sub>**Enterprise release 3663.5716** (min 3619.5594 GHE 2.19+ or 3.0+) 2022-12-01 <!-- enterprise 3663.5716 --></sub>

- <kbd>Upd:</kbd> hide metadata-only diffs in the virtual Commits file when commits were rebased without changing the commit message.
- <kbd>Upd:</kbd> improve error message when GitHub returns an invalid response to a permissions query. Experience shows this is likely due to the user having received a bad OAuth token for some reason, so the new message recommends signing out and back in.
- <kbd>Upd:</kbd> ensure the file matrix is always wide enough to fit directory names, and let them extend past the edges on hover.
- <kbd>Fix:</kbd> prevent permission denied error when loading some reviews in repositories with mixed case names.
- <kbd>Fix:</kbd> prevent an extremely rare crash on the review page due to some review metadata being undefined.
- <kbd>Fix:</kbd> reinstate author and committer information in the completion condition's input data for review revisions.  This was a regression in v3619.5574.
- <kbd>Fix:</kbd> prevent "mergeable block range mismatch" errors when diffing files with complex base changes.  This was a regression in v3657.5690.
- <kbd>Fix:</kbd> eliminate a potential race condition in invalidating Reviewable pull request statuses when quickly disconnecting and reconnecting a repository.  This could've theoretically resulted in pull requests showing an error status of "Repo disconnected, unable to update review status", even though the repo had been reconnected.
- <kbd>Fix:</kbd> if a review enters an error state (e.g, because there are too many files in the pull request), set the head commit's status check to an error as well if needed.  Previously we left the last status check in place, or didn't set one on new commits at all.
- <kbd>Fix:</kbd> ignore account suspended errors emitted by GitHub when fetching user information, in an attempt to prevent unnecessary failures and repository disconnections.  It would appear that GitHub can return a 403 Account Suspended error on some API requests if the *target* is suspended, even thought the request's originator is fine.  This supersedes the attempted fix in v3619.5574, which was ineffective.
- <kbd>Fix:</kbd> avoid using `SharedWorker` in Safari 16, as their newly-added support is half-baked.
- <kbd>Fix:</kbd> guard against a rare crash with error `this.tracker.resolvedIf is undefined`.
- <kbd>Fix:</kbd> guard against a rare crash when trying to change the default review overlap strategy for a repository.
- <kbd>Fix:</kbd> guard against a rare crash on the dashboard when a pull request you were mentioned in has disappeared.
- <kbd>Fix:</kbd> guard against a rare crash in the code snippet editor, cause by a race condition when, e.g., switching diff bounds.

<sub>**Enterprise release 3657.5690** (min 3619.5594 GHE 2.19+ or 3.0+) 2022-11-04 <!-- enterprise 3657.5690 --></sub>

- <kbd>New:</kbd> track which apparently modified file revisions only have base changes, and make this information available to custom completion conditions.  See the [announcement](https://www.reviewable.io/blog/base-changes-only/) for details.
- <kbd>Upd:</kbd> update the discussion interface for showing/hiding old comments in the current discussion, current file, and across all files in a review.  Add a convenient control for showing just one more older comment while at it.
- <kbd>Upd:</kbd> allow image files to be drag-and-dropped directly onto a "Reply..." or "Follow up..." field, creating a draft automatically.
- <kbd>Upd:</kbd> add ability to double click a draft preview to return to write mode.
- <kbd>Fix:</kbd> correctly determine which lines in a diff have base changes only.  Before this fix, base changes flags could sometimes bleed into adjacent lines within the same block.
- <kbd>Fix:</kbd> do a better job of diffing around the transition from a base only change area to a normal change one.  Previously, it was possible for a line where the left and right sides were clearly a single edit to get split into two parts that weren't diffed together.
- <kbd>Fix:</kbd> bring back the participants overflow ellipsis on the dashboard.
- <kbd>Fix:</kbd> don't busy-spin forever on a file when it needs to be shown (e.g., because there's an unresolved discussion) but no diff bounds are set for some reason.  This was a regression introduced in v3542.5405.
- <kbd>Fix:</kbd> don't show the user's own main thread comment as new/unread if the pull request's branch was pushed to after the comment was drafted but before it was sent.
- <kbd>Fix:</kbd> work around more rare and invisible errors when setting the "user's last interaction with review" timestamp.
- <kbd>Fix:</kbd> correctly interpret merge message default settings in older versions of GHE (we think 3.6 and below), so that you don't end up with merge commits with the message `undefined`.  This was a regression introduced in the previous release.
- <kbd>Fix:</kbd> cull PR polling enrollments ("My PRs in any public repo", etc.) that are failing with errors more aggressively.
- <kbd>Fix:</kbd> lower the "review too large to process" threshold from 8000 to 4000 files.  We've seen instances of reviews with more than 4000 files falling into endless update timeout loops.

<sub>**Enterprise release 3644.5629** (min 3619.5594 GHE 2.19+ or 3.0+) 2022-10-16 <!-- enterprise 3644.5629 --></sub>

- <kbd>Upd:</kbd> add `REVIEWABLE_ENCRYPTION_AES_ENABLED` flag that you can set to tell Reviewable that you expect `REVIEWABLE_ENCRYPTION_AES_KEY` to be set as well.  This can help you detect cases where the key silently failed to be fetched from some vault system and prevent Reviewable from accidentally running without encryption.
- <kbd>Upd:</kbd> improve squash and merge commit messages to closely mirror Github defaults set for the repository.
- <kbd>Fix:</kbd> prevent client from getting stuck "Mapping renamed files".  This likely only affected old archived reviews.
- <kbd>Fix:</kbd> improve GitHub error identification in various spots, helping invalidate repository connections and organization-wide auto-connection earlier.
- <kbd>Fix:</kbd> address a Firefox bug where using the diff line selection button would lock down text selection inside discussions.
- <kbd>Fix:</kbd> prevent occasional `First argument contains undefined in property` errors that would happen on first click of a session.
- <kbd>Fix:</kbd> prevent "Resuming session" spinning forever when signing in from the home page in an instance running in private mode.
- <kbd>Fix:</kbd> don't show the "(Repository default)" annotation if the review overlap strategy dropdown isn't also showing.
- <kbd>Fix:</kbd> actually check the user's display name for "(bot)" when syncing comments, and sync the correct name into our database.
- <kbd>Fix:</kbd> optimize the number of queries used to fetch PRs the user was mentioned in on the dashboard.  Before this fix, if you were mentioned a lot in review comments on GitHub, we could potentially emit hundreds of requests!  This should be cut down to one or two now.
- <kbd>Fix:</kbd> guard against rare `Cannot destructure property 'preferredTitle'` crash.
- <kbd>Fix:</kbd> include new blocking discussion drafts in unresolved discussions count and navigation cycle.
- <kbd>Fix:</kbd> include `review.deferringReviewers` in completion condition sample input data.  This was always included in "real" evaluations of a condition, but accidentally omitted from the settings playground.
- <kbd>Fix:</kbd> work around rare (invisible) errors when setting the "user has drafts pending" flag, which gets shown in the participants panel.
- <kbd>Fix:</kbd> accept file uploads in the review summary draft when no text was entered.
- <kbd>Fix:</kbd> keep virtual `Commits` file contents stable in the face of unusual commit histories.  This could lead to discussions on the file being "lost", where they'd still be counted but fail to be displayed anywhere.
- <kbd>Fix:</kbd> prevent multiple scrollbars from showing up in long drafts, and correctly position DRAFT watermark and drag-and-drop landing area.

<sub>**Enterprise release 3619.5594** (min 3619.5594 GHE 2.19+ or 3.0+) 2022-09-22 <!-- enterprise 3619.5594 --></sub>

- <kbd>Adm<i>(enterprise)</i>:</kbd> **WARNING** a bug in recent older versions breaks rollbacks, so the minimum version here is set to prevent them.  If you really need to roll back please get in touch -- we know how to craft a workaround given a specific version to roll back to.
- <kbd>Fix:</kbd> don't break encryption when opening Reviewable in multiple tabs simultaneously (regression introduced in v3619.5574).

<sub>**Enterprise release 3619.5574** (min 3340.5125 GHE 2.19+ or 3.0+) 2022-09-20 <!-- enterprise 3619.5574 --></sub>

- <kbd>Adm<i>(enterprise)</i>:</kbd> **WARNING** this release is broken if you're using encryption.
- <kbd>New:</kbd> add visual warnings if auto-merge is enabled (wand icon in publish button and checked box in publish dropdown). Also require hold to arm when publishing a review that Reviewable thinks may trigger merging of the pull request.
- <kbd>New:</kbd> add a repository-level setting for the default review overlap strategy.  This will override personal settings, but can in turn be overridden by any user for themselves for a given review.
- <kbd>Upd:</kbd> modify some disposition keywords, used to infer your disposition when found at the beginning of a comment.  We now always map `FYI` to Informing and `BTW` to Discussing, whereas before their meaning was context-dependent (new discussion vs reply).  We also removed `OK` as it resulted in too many false positives when reviewers used it to start a longer sentence.  Previously inferred dispositions will remain unchanged, but if you edit a previously created draft in this release it will be re-interpreted under the new rules (even if you don't edit the keyword itself).
- <kbd>Upd:</kbd> add a per-user toggle to disable disposition inference from message keywords.  It's hiding in the disposition settings panel, accessible via the small gear in the top-right of any of your disposition dropdowns.
- <kbd>Upd:</kbd> when inferring a disposition from a keyword in the comment draft, shortly flash the disposition icon to attract the user's attention to the connection.
- <kbd>Upd:</kbd> change the default disposition for author-initiated discussions from Blocking to Discussing.  The old default was unintuitive, and often resulted in authors accidentally blocking their own reviews.  The disposition can still be changed explicitly, and each user can set a different personal default for this scenario, of course.
- <kbd>Upd:</kbd> list co-authors at the end of default merge commit messages. Note that these are aggregated per review and not per revision/commit.
- <kbd>Upd:</kbd> switch the completion condition editor to our own and remove the dependency on CodeMirror.  This should have no end-user impact but helps slim down the build.
- <kbd>Upd:</kbd> move the open source dependencies list and the licenses recitation to an in-app page.
- <kbd>Upd:</kbd> add `REVIEWABLE_SENTRY_DEBUG` config flag to turn on Sentry debug mode.
- <kbd>Upd:</kbd> add workarounds for GHE's propensity to declare a user suspended when under heavy load even though they're not.  There's a workaround that should work automatically, but if you're still seeing an issue with repositories getting disconnected with a bogus "GitHub account suspended" message please get in touch to learn how to set up a stronger mechanism.
- <kbd>Upd:</kbd> upgrade to the latest versions of the Firebase SDK, up by a couple major versions.
- <kbd>Fix:</kbd> implement workarounds for getting stuck waiting on permissions and "request queued but server did not respond" issues (that often blocked publishing).  The root cause lies in the Firebase SDK, but will need to be isolated (by us) and addressed by Google at some point.
- <kbd>Fix:</kbd> make the order of files in the page match the order of files in the matrix.  This was a regression introduced in v3550.5439.
- <kbd>Fix:</kbd> allow anonymous access to public repos again (broken in v3581.5517).
- <kbd>Fix:</kbd> allow users to continue deferred reviews that have been closed or merged by clicking the "Continue review now" button.
- <kbd>Fix:</kbd> prevent "Mark as reviewed and move to next and show next diff" from showing up at the bottom of a file.
- <kbd>Fix:</kbd> guard against a rare `parentNode is null` exception when creating a code block.
- <kbd>Fix:</kbd> respect Sentry DSNs configured via the `REVIEWABLE_CONFIG_FILE` instead of directly as env vars.
- <kbd>Fix:</kbd> don't overwrite newer database schema when rolling back.  It's not clear when this regression was introduced, but you should assume that recent versions will not roll back correctly.

<sub>**Enterprise release 3581.5517** (min 3340.5125 GHE 2.19+ or 3.0+) 2022-08-31 <!-- enterprise 3581.5517 --></sub>

- <kbd>New:</kbd> add ability to create single and multiline code suggestions from inside a comment draft and provide handles for manipulating line selection.
- <kbd>Upd:</kbd> use the SVG format badge in comments as well, as GitHub now appears to be supporting this.
- <kbd>Upd:</kbd> start sampling certain too-common Sentry events meant for debugging.  If you have Reviewable hooked up to Sentry you'll see an apparent drastic reduction in some high volume events.
- <kbd>Upd:</kbd> support `maintain` and `triage` permission levels and add `maintain` as an option for discussion dismissal authority. You may need to wait 30-60 minutes after deploying this release before user permissions get refreshed and the new levels become usable.
- <kbd>Upd:</kbd> allow `triage` permission level to use various add/remove directives in comments.
- <kbd>Upd:</kbd> display a warning message in the diff if a revision contains more commits than expected.
- <kbd>Fix:</kbd> enforce line wrapping at the correct character based on margin setting.  This used to wrap some lines early depending on their content (!).
- <kbd>Fix:</kbd> publish only comment text when sending ad-hoc top level comments.  The original fix in v3512.5320 didn't work right in some environments.
- <kbd>Fix:</kbd> guard against crashes when creating a discussion on the base revision of a file that was renamed multiple times within one pull request.
- <kbd>Fix:</kbd> correctly handle rename chains where a file two or more renames away gets reintroduced into the pull request.  Previously, this could cause such a reintroduced file to get stuck with no default diff bounds, and no way to set any.
- <kbd>Fix:</kbd> don't insert random `null`s into code block diffs.  This regression was introduced in v3550.5439.
- <kbd>Fix:</kbd> set the focus to the draft after clicking Approve or LGTM.
- <kbd>Fix:</kbd> delete the draft altogether if you clear all text from the review summary and click out of the field.
- <kbd>Fix:</kbd> ensure that clicking LGTM in the review summary always inserts the LGTM into the draft.
- <kbd>Fix:</kbd> show the same number of unresolved discussions in the review summary counter as we do in the toolbar.  (The bottom number wasn't taking into account the drafts about to be sent.)
- <kbd>Fix:</kbd> ensure that dashboard doesn't get stuck in a "Loading" state if some very old reviews are in the list.
- <kbd>Fix:</kbd> guard against rare "can't access dead object" error in Firefox.
- <kbd>Fix:</kbd> correctly track when the review's completion state was last computed.  This bug resulted in running completion and review state updates more frequently than necessary.

<sub>**Enterprise release 3550.5439** (min 3340.5125 GHE 2.19+ or 3.0+) 2022-08-15 <!-- enterprise 3550.5439 --></sub>

- <kbd>New:</kbd> add the ability to write a review summary and publish the review from the bottom of the page. For more information, see [the docs](https://docs.reviewable.io/reviews.html#publishing-your-review).
- <kbd>New:</kbd> detect vendored files (based on simple path heuristics) and give them special treatment:  put them into a group that's collapsed by default, and exclude them from renamed file matching.  See [announcement](https://www.reviewable.io/blog/identifying-vendored-files-using-custom-completion-conditions/).
- <kbd>Upd:</kbd> add a badge condition setting to limit the circumstances under which a Reviewable badge will be added to the PR, even in a connected repository.
- <kbd>Upd:</kbd> display a message in the diff when a file has been reverted to base at its last revision.
- <kbd>Upd:</kbd> add an icon to the approve / block specifier that shows in the Publish button.
- <kbd>Upd:</kbd> increase the threshold for "show just one file at a time" mode from 25 to 50 visible diffs.  If this doesn't lead to performance issues we'll probably increase it further.
- <kbd>Fix:</kbd> prevent "review missing last revision" errors.
- <kbd>Fix:</kbd> ensure that all participants being waited on are shown to the right of the pointing hand on the dashboard page, even if they haven't started working on the review yet.
- <kbd>Fix:</kbd> don't remove empty lines when rendering code blocks in comments.
- <kbd>Fix:</kbd> avoid rare but persistent permission denied error when updating a review's completion status that would cause the update to get stuck, potentially forever.
- <kbd>Fix:</kbd> when loading a review link with an anchor to a discussion made on a base revision, scroll to the discussion instead of locking out the file with a spinner.
- <kbd>Fix:</kbd> guard against some rare transient crashes on the client, on the review page and on the dashboard.

<sub>**Enterprise release 3542.5405** (min 3340.5125 GHE 2.19+ or 3.0+) 2022-07-31 <!-- enterprise 3542.5405 --></sub>

- <kbd>Upd:</kbd> prevent file matrix bulk diff bound selection from diffing files in collapsed groups, unless they need to remain displayed (e.g., they're unreviewed or have discussions).  This can help with hiding grouped files from the page while retaining the ability to quickly manipulate the diff bounds of remaining ones.
- <kbd>Fix:</kbd> allow in-comment badges to be created in unconnected repositories even if the publishing user isn't the author and doesn't have admin rights.
- <kbd>Fix:</kbd> refresh the review after publishing in unconnected repositories.
- <kbd>Fix:</kbd> successfully complete review completion condition tasks in connected repositories even if the connecting user's token has disappeared.
- <kbd>Fix:</kbd> add breakpoints for wrapping long branch names in the commits section of the Changes panel.
- <kbd>Fix:</kbd> fix visual glitch in file headers where the revision cells were partially obstructed.
- <kbd>Fix:</kbd> address lack of text overflow handling in the codeblock viewer that made long lines inaccessible.
- <kbd>Fix:</kbd> be more tolerant when trying to unarchive reviews with slightly malformed data.
- <kbd>Fix:</kbd> exclude bots from "new messages for" lists in webhook notifications.
- <kbd>Fix:</kbd> when selecting bounds by dragging in the file matrix header, include files that may not be present in the PR at the bounds' exact revision, but do have changes in between.  (This fix also ironed out a bunch of other edge cases having to do with missing revisions.)
- <kbd>Fix:</kbd> distinguish between one's own and other people's review marks in later revisions when in "personally review every file" mode.  (The two states are still visually conflated, both being represented by a grey button with green rim, but are now treated differently internally when appropriate.)

<sub>**Enterprise release 3537.5352** (min 3340.5125 GHE 2.19+ or 3.0+) 2022-07-09 <!-- enterprise 3537.5352 --></sub>

- <kbd>Upd:</kbd> let all GHE site admins access the license details panel on the Repositories, not just the designated license admin.  At this point, the designated license admin account is only needed as a fallback for "anonymous" GitHub requests when GHE is running in private mode.
- <kbd>Upd:</kbd> when configured with `REVIEWABLE_UPLOADS_PROVIDER=gcs`, optionally use ambient GCP credentials instead of a private key.
- <kbd>Upd:</kbd> subdivide `statsd` counter names by action for tasks on the `requests` queue, and if a request times out report its action in the error message on the client.  Also add a new `task_waiting_time` timer that measures how long a task was waiting in the queue before getting picked up (the first time only, so we don't measure retries).
- <kbd>Upd:</kbd> add comment/copy actions in a command palette that appears when text is selected inside a diff block.
- <kbd>Upd:</kbd> add `?debug=firebase` for debugging of the low-level Firebase protocol.
- <kbd>Fix:</kbd> back off mergeability sync retry interval up to 15 minutes in case it's taking a long time to settle on GitHub.  Also capped retries at 1 hour; after that, the user can force a sync by visiting a review.
- <kbd>Fix:</kbd> avoid a vicious feedback loop that could occur if events were received for merged or closed PRs in archived repos.
- <kbd>Fix:</kbd> don't HTML-escape the inside of code blocks in a pull request title.
- <kbd>Fix:</kbd> fix 'no end-of-file newline' icons so they appear properly.
- <kbd>Fix:</kbd> eliminate erroneous copying of the small, light-colored declaration that appears after collapsed regions when a user makes a selection that overlaps it.

<sub>**Enterprise release 3512.5323** (min 3340.5125 GHE 2.19+ or 3.0+) 2022-06-08 <!-- enterprise 3512.5323 --></sub>

- <kbd>Upd:</kbd> add `?debug=navigation` debugging mode.
- <kbd>Fix:</kbd> allow license admin to load Repositories page without causing a permission denied crash.
- <kbd>Fix:</kbd> guard against a handful of client crashes caused by very rare conditions.

<sub>**Enterprise release 3512.5320** (min 3340.5125 GHE 2.19+ or 3.0+) 2022-06-02 <!-- enterprise 3512.5320 --></sub>

- <kbd>Adm<i>(enterprise)</i>:</kbd> **WARNING** access to the Repositories page by the license admin is broken in this release.
- <kbd>New:</kbd> add support for HSTS with `REVIEWABLE_STRICT_TRANSPORT_SECURITY`.  It defaults to off for backwards compatibility, but you can set it to any valid header value (e.g., `max-age=31536000`) to turn it on.
- <kbd>Upd:</kbd> respect GitHub hidden comments in Reviewable.
- <kbd>Upd:</kbd> switch to a more comprehensive icon set and update some icons.
- <kbd>Upd:</kbd> add `Referrer-Policy: strict-origin-when-cross-origin` header to all responses.
- <kbd>Upd:</kbd> upgrade to Sentry SDK v7.0  If you have a self-hosted deployment of Sentry you need to upgrade it to at least v20.6.0.
- <kbd>Upd:</kbd> add `?debug=crash` to log more information to the console in case of a "broken goggles" crash.
- <kbd>Fix:</kbd> escape Markdown-sensitive characters in file paths when publishing comments.
- <kbd>Fix:</kbd> explicitly increment parent counters for `statsd` and fix `github.request.*` names to reflect queues, not task IDs.
- <kbd>Fix:</kbd> show function/class headers when part of the block is collapsed in a diff. (It's not entirely clear when this regression was introduced -- possibly as far back as mid-2021.)
- <kbd>Fix:</kbd> make the review summary draft area in the bunny drop-down menu work properly again.
- <kbd>Fix:</kbd> publish only comment text when sending ad-hoc top level comments.
- <kbd>Fix:</kbd> allow old reviews to be opened (and unarchived, if necessary) in archived repos.
- <kbd>Fix:</kbd> fix some small bugs with editing coverage report fetch settings.
- <kbd>Fix:</kbd> notice unclosed extended code fences in comments (more than 3 backticks) and close them properly when forming batch message.

<sub>**Enterprise release 3477.5231** (min 3340.5125 GHE 2.19+ or 3.0+) 2022-04-17 <!-- enterprise 3477.5231 --></sub>

- <kbd>New:</kbd> add support for tracking `spr` stacked pull requests. Please see [the announcement](https://www.reviewable.io/blog/support-for-git-spr-stacked-pull-requests/) for more details.
- <kbd>Upd:</kbd> be more aggressive about hiding files that the user doesn't need to review.
- <kbd>Upd:</kbd> use `reviewed` flags set by custom completion condition when computing default result values, including `completed` and `pendingReviewers`.
- <kbd>Upd:</kbd> switch to CSS-native hyphenation, which should be more reliable nowadays than the JS module we've been using so far.
- <kbd>Fix:</kbd> log exceptions properly when neither Sentry nor a log sink are set up.
- <kbd>Fix:</kbd> check license team constraints correctly.  This got broken in v3415.5193 such that every membership check returned false.
- <kbd>Fix:</kbd> set default disposition correctly when it's already set as the discussion's disposition.
- <kbd>Fix:</kbd> ensure that mentioning a user in a Reviewable comment makes the review show up on their dashboard.
- <kbd>Fix:</kbd> don't hide significant whitespace deltas by default (e.g., whitespace changes in string literals).
- <kbd>Fix:</kbd> don't insert random `null`s into code block diffs.

<sub>**Enterprise release 3424.5210** (min 3340.5125 GHE 2.19+ or 3.0+) 2022-03-31 <!-- enterprise 3424.5210 --></sub>

- <kbd>Upd:</kbd> mark files that have open discussion with a small icon in the file matrix.
- <kbd>Upd:</kbd> don't snapshot revisions when a bot comments on the PR.  (See [here](https://docs.reviewable.io/tips.html#ignore-comments-by-bots) for how we detect whether a user is a bot.)
- <kbd>Fix:</kbd> reduce logged exception false alarms originating from status / check events.
- <kbd>Fix:</kbd> save repository settings even if unchanged when selecting multiple repositories to apply to.
- <kbd>Fix:</kbd> fall back to procedurally generated avatar images if the real ones fail to load due to [issue #770](https://github.com/Reviewable/Reviewable/issues/770) or because the user is not signed in to GitHub.
- <kbd>Fix:</kbd> remove extra dot from trailing whitespace decoration.
- <kbd>Fix:</kbd> allow one-off send of a comment with only code blocks and no text.
- <kbd>Fix:</kbd> correctly display suggestion code blocks that delete all of the original code.
- <kbd>Fix:</kbd> lower query chunk size when running searches from the Reviews page to (hopefully) avoid 502 errors.
- <kbd>Fix:</kbd> don't add a horizontal rule to the message when doing an immediate send of a single comment.
- <kbd>Fix:</kbd> wrap long branch names at the edge of the Changes panel.

<sub>**Enterprise release 3415.5195** (min 3340.5125 GHE 2.19+ or 3.0+) 2022-03-09 <!-- enterprise 3415.5195 --></sub>

- <kbd>Fix<i>(enterprise)</i>:</kbd> **SECURITY** encrypt data used to keep track of AWS Lambda functions in Reviewable's database.  If you use AWS Lambda for custom condition execution and ran any version of Reviewable between 3256.5037 and 3415.5193 (inclusive) with encryption enabled, then some repository names were exposed unencrypted in the database.  No other data was exposed, and thanks to our two-level security setup (encryption + security rules) it's extremely unlikely that anybody actually saw anything.  This release will gradually fix things up over the week after you install it, but you can manually delete `/lastExecutionTimestampByContainerName` in the Firebase console if you'd like instead.

<sub>**Enterprise release 3415.5193** (min 3340.5125 GHE 2.19+ or 3.0+) 2022-03-07 <!-- enterprise 3415.5193 --></sub>

- <kbd>Upd:</kbd> allow requested reviewers, assignees, and labels to be added directly in the Github PR description. Note this follows the same convention as used on Reviewable.
- <kbd>Upd:</kbd> add ability to reverse iteration of files, comments, and drafts by using `⇧ + click` on respective counters in the status bar.
- <kbd>Upd:</kbd> try to grab Firebase credentials from ambient sources if none of the Reviewable-specific environment variables are set.
- <kbd>Upd:</kbd> upgrade AWS SDK to v3 to reduce distro size.
- <kbd>Fix:</kbd> migrate team constraint checking away from deprecated GitHub API.
- <kbd>Fix:</kbd> don't swamp GitHub with requests when a review has a lot of image files.
- <kbd>Fix:</kbd> avoid a very rare server-side failure when updating review state.
- <kbd>Fix:</kbd> improve processing and display of exception stack traces when executing completion conditions in AWS Lambda.

<sub>**Enterprise release 3391.5185** (min 3340.5125 GHE 2.19+ or 3.0+) 2022-02-08 <!-- enterprise 3391.5185 --></sub>

- <kbd>New:</kbd> introduce guest passes to make license seat management more flexible.  If a user is prevented from obtaining a normal seat -- whether because they're all allocated to others or because there's a team constraint applied to the license -- they're given a temporary guest pass seat instead.  A guest pass is valid for 14 days, doesn't count against the licensed seats, and there's no limit to how many can be handed out.  However, once a user has signed in (whether to a full or guest seat) they'll only be eligible for another guest pass after 90 days, so this is not an alternative to getting a normal licensed seat for long term users.  We hope this helps others in your organization try out Reviewable without having to worry about exhausting your license!
- <kbd>New:</kbd> support executing completion conditions in Azure Functions.  For details see the newly added [instructions](https://github.com/Reviewable/Reviewable/blob/master/enterprise/config.md#user-code-execution) for the `azurefns` executor option.
- <kbd>Upd:</kbd> add buttons to copy filename in file and discussion headers.
- <kbd>Upd:</kbd> darken link underlines in comments to make them easier to spot.
- <kbd>Fix:</kbd> fix the `vm2` code executor that was broken in v3371.5161.
- <kbd>Fix:</kbd> implement a failsafe to prevent getting stuck with a dead stickied file header when switching files in single-file mode.
- <kbd>Fix:</kbd> allow marking a group as reviewed even if some files are diffed at a different right bound, as long as they have no valid revisions between their bound and the dominant revision.  This is especially useful for the Reverted group since files there won't have any revisions after the reversion.

<sub>**Enterprise release 3371.5161** (min 3340.5125 GHE 2.19+ or 3.0+) 2022-02-02 <!-- enterprise 3371.5161 --></sub>

- <kbd>Adm<i>(enterprise)</i>:</kbd> **WARNING** the `vm2` executor is broken in this release.
- <kbd>New:</kbd> add a new "pondering" disposition that prevents a draft from being published.  Useful for notes-to-self while reviewing that you'll delete or flesh out before sending.
- <kbd>Upd:</kbd> include reviews where the user is blocking (i.e., in `pendingReviewers`) on the dashboard even if they're not involved with the pull request from GitHub's point of view.  This is helpful for custom completion conditions that assign pending reviewers from a hardcoded list, rather than just managing the users already participating in the review.
- <kbd>Upd:</kbd> support omitting "Reviewable" badges in public repos.
- <kbd>Upd:</kbd> update server build process.  There should be no impact on vanilla deployments.  If you customized things please note that the new image entrypoint is `node dist/main.js` and the server code is now minified.
- <kbd>Upd:</kbd> update syntax highlighting library with improvements to many language definitions.
- <kbd>Upd:</kbd> improve browser caching behavior when serving the page.
- <kbd>Upd:</kbd> note on startup when Sentry is active and capture an info message to help in debugging the configuration.
- <kbd>Fix:</kbd> replace astral plane Unicode characters with a placeholder before posting a custom completion description to Reviewable's GitHub status, as GitHub can't handle them.  Remember kids, fancy emojis are all fun and games until you run into a database that only supports UCS-2!
- <kbd>Fix:</kbd> avoid crashing when creating a comment after a text selection in the diff has disappeared but is still active.
- <kbd>Fix:</kbd> allow reviews with codeblocks sourced from a different file than the parent discussion to be unarchived correctly.
- <kbd>Fix:</kbd> prevent rare crash when deleting a draft codeblock.

<sub>**Enterprise release 3359.5145** (min 3340.5125 GHE 2.19+ or 3.0+) 2021-12-22 <!-- enterprise 3359.5145 --></sub>

- <kbd>New:</kbd> let reviewers suggest code changes, with a mini code editor to make writing them easier and a mini diff to show what changed.  Please see [the announcement](https://www.reviewable.io/blog/code-suggestions/) for more details.
- <kbd>Upd:</kbd> omit pull requests in archived repositories from the reviews dashboard.
- <kbd>Upd:</kbd> show a "go to next file" button at the bottom of previously reviewed diffs when operating in "too many files" mode.  This lets you easily page through a long review even after you've marked everything reviewed.
- <kbd>Upd:</kbd> use a more efficient GraphQL query for finding pull requests matching a commit SHA when processing status events.
- <kbd>Upd:</kbd> put deferred reviews where the user has at least one "working" disposition into a new "working on it" section on the dashboard, rather than the generic "being reviewed by me" section.
- <kbd>Fix:</kbd> don't crash when making some specific kinds of edits to the code coverage settings.
- <kbd>Fix:</kbd> snapshot the current revision when creating a new top level draft comment.  In edge cases, if the pull request author created such a comment and left the revision provisional, the review could get into an invalid state and fail to update.
- <kbd>Fix:</kbd> query PRs much more efficiently when you have "Also show pull requests you're not involved with from all repos to which you can push" checked on the dashboard and limited to one or both of starred or watched repositories.
- <kbd>Fix:</kbd> correctly update which revisions are obsolete when squashing commits with no other changes.  This affects the commits shown in the virtual Commits file when diffing against base.
- <kbd>Fix:</kbd> drop status update events when fetching a list of checks and statuses results in repeated 502 errors from GitHub.
- <kbd>Fix:</kbd> avoid getting into an infinite loop of refreshing permissions when a user is signed in on the client but their token is missing server-side.  This shouldn't happen under normal circumstances.

<sub>**Enterprise release 3340.5125** (min 3107.4890 GHE 2.17+ or 3.0+) 2021-11-25 <!-- enterprise 3340.5125 --></sub>

- <kbd>New:</kbd> display code coverage in diffs using a thin color bar.  You'll need to configure access to coverage reports on each repository's settings page.  To start with we're only support the Codecov report format but are open to adding more.  See [the docs](https://docs.reviewable.io/repositories.html#code-coverage) for details.
- <kbd>Upd:</kbd> don't update archived reviews in response to GitHub webhooks. Closed reviews are archived within 30-60 days after they're created or last accessed by a user, and open reviews within 180-210 days.  This means that the completion condition won't be triggered on archived reviews even if the state changes, and the GitHub status won't be updated either.  A visit to the review will automatically unarchive it and bring everything up to date again.
- <kbd>Upd:</kbd> automatically add an `[archived]` annotation to the GitHub status of reviews when they're archived.
- <kbd>Upd:</kbd> hide editor and GitHub links behind the line number in discussion headers.
- <kbd>Upd:</kbd> when evaluating the completion condition, use internally available data to map usernames to user IDs when possible instead of always fetching it from GitHub.
- <kbd>Upd:</kbd> if the completion condition sets the `reviewed` flag for (a revision of) the synthetic commits file, don't require users to mark it as reviewed.  This will turn the red mark reviewed button to a green-rimmed one and ensure that the file doesn't cause review deferral.
- <kbd>Upd:</kbd> add "typo" to the list of prefixes that will change the disposition to "discussing".
- <kbd>Fix:</kbd> keep better track of requested reviewers in Reviewable, updating more eagerly and avoiding false positives in computing pending reviewers.
- <kbd>Fix:</kbd> process `check_run` and `check_suite` events.  They were being dropped by mistake, though the checks status was still refreshed when the review was loaded.
- <kbd>Fix:</kbd> don't crash when clicking on link to GitHub (though this often went unnoticed since clicking the link navigates away from Reviewable).
- <kbd>Fix:</kbd> sync drafts correctly between tabs.
- <kbd>Fix:</kbd> improve styling for images in comments, removing the underline.
- <kbd>Fix:</kbd> escape pull request / review titles for display.  This wasn't a security issue because the values were sent through `DOMPurify` but if your title included HTML-like tags they wouldn't show up properly.

<sub>**Enterprise release 3291.5093** (min 3107.4890 GHE 2.17+ or 3.0+) 2021-11-04 <!-- enterprise 3291.5093 --></sub>

- <kbd>Adm<i>(enterprise)</i>:</kbd> **NOTE** if you're using AWS Lambda for executing completion conditions, you need to grant the user (or role) the `lambda:GetFunctionConfiguration` permission, on top of the other ones it already needs.  Until this permission is granted the first execution of a condition in a repository will fail, and subsequent ones may very rarely fail as well with an `AccessDeniedException`.
- <kbd>Upd:</kbd> increase timeouts related to handling interactive client requests on the server from 5s to 15s.
- <kbd>Upd:</kbd> display instructions for adding/removing labels, assignees and reviewers in the corner of the top level draft while it's empty.
- <kbd>Upd:</kbd> improve editor link settings section to be easier to use without having to refer to docs.
- <kbd>Upd:</kbd> change the discussion line links into two separate icon links to GitHub and the editor.
- <kbd>Upd:</kbd> upgrade HighlightJS to the latest version. This has resulted in some strange crashes on page load reported for reviewable.io but after extensive investigation we believe they're false positives.  Please let us know if you run into trouble, though!
- <kbd>Upd:</kbd> allow other ways to inject AWS credentials into Reviewable for Lambda and S3 besides specifying `AWS_ACCESS_KEY_ID` and `AWS_SECRET_ACCESS_KEY`.  Using these environment variables will continue to work, though if you forget to set them (and don't have any other means for the SDK to get credentials) the error message might not be as clear.
- <kbd>Fix:</kbd> don't erroneously consider a file reviewed if it has been reverted and newer revisions created in the review.
- <kbd>Fix:</kbd> set max-width on videos to 100% to avoid overflow.
- <kbd>Fix:</kbd> allow user to correctly select and copy lines near the beginning or end of a diff.
- <kbd>Fix:</kbd> don't snapshot revisions when the PR author is looking at the review unless required for data integrity.  Provisional revisions should now remain provisional more reliably until a reviewer visits the review.
- <kbd>Fix:</kbd> wait for Lambda function to become active before invoking it.
- <kbd>Fix:</kbd> if a completion condition sets `syncRequestedReviewers` but we can't find an admin account associated with the repo to do the work, fail the status check with an error rather than getting stuck in an infinite retry loop.

<sub>**Enterprise release 3268.5067** (min 3107.4890 GHE 2.17+ or 3.0+) 2021-10-19 <!-- enterprise 3268.5067 --></sub>

- <kbd>Upd:</kbd> indicate in synthetic `commits file` that commits were added to a revision if they didn't affect files in the pull request.
- <kbd>Upd:</kbd> display warning indicator when avatar images aren't loading and suggest signing in to GitHub again.
- <kbd>Fix:</kbd> don't escape Markdown characters between code blocks or backticks in pull request title.
- <kbd>Fix:</kbd> improve performance when a review has lots of drafts open.
- <kbd>Fix:</kbd> preserve branch name when the branch has been deleted.
- <kbd>Fix:</kbd> escape spaces and other reserved characters in a filepath when forming links to GitHub or an external editor.

<sub>**Enterprise release 3256.5037** (min 3107.4890 GHE 2.17+ or 3.0+) 2021-10-02 <!-- enterprise 3256.5037 --></sub>

- <kbd>Upd:</kbd> upgrade to Node 16.
- <kbd>Upd:</kbd> support Lodash 4.x in custom completion conditions.  Note: please don't advertise Lodash 4.x support until you're confident you won't need to roll back to avoid conditions running against the older 3.x module. See [announcement post](https://www.reviewable.io/blog/lodash-4-x-support/) for details.
- <kbd>Upd:</kbd> move completion condition examples out of the app and into a repository, replacing the examples dropdown with a link.  This will make them easier to reference and maintain.
- <kbd>Upd:</kbd> allow multiple Reviewable instances (e.g., production and staging) to use the same AWS Lambda instance for condition execution without stepping on each other's toes.
- <kbd>Upd:</kbd> increase timeout and improve stagger logic for permission-checking requests to GHE.  This should help avoid spurious permission check failures if your GHE instance is overloaded an unable to reliably respond within 3 seconds.
- <kbd>Upd:</kbd> improve error message when Reviewable refuses to create a review because it found an existing review link in the PR, and tweak a bunch of code around there to make it easy for a user to recover from this state.
- <kbd>Upd:</kbd> when following a link to a discussion, diff all the files instead of just the discussion's host file. Skipping file diffs can make the page load faster but it's confusing, and not really necessary on modern machines.
- <kbd>Upd:</kbd> parse language identifiers out of shell script shebang lines to select correct syntax highlighting.
- <kbd>Upd:</kbd> switch from using just the Firebase identifier (`REVIEWABLE_FIREBASE`) to using the whole URL (`REVIEWABLE_FIREBASE_URL`) to support regions outside the US.  Configurations with `REVIEWABLE_FIREBASE` will also continue to work indefinitely, however.
- <kbd>Fix:</kbd> improve how the default pending reviewers logic deals with author-initiated discussion with no other participants, and with completely unreviewed files.  Also ensure that all of GitHub's requested reviewers will be added to the pending reviewers list.  If you have completion conditions that customize `pendingReviewers` you might want to look at the updated example and consider backporting the changes.
- <kbd>Fix:</kbd> close unterminated code blocks and render LGTM emojis when quoting parent comment for the batched post to GitHub.
- <kbd>Fix:</kbd> avoid spiking Firebase load (sometimes to the point of a DoS) when unarchiving a review.  This may only be an issue once you hit a very large number of archived reviews like on reviewable.io but it tends to creep up on you.
- <kbd>Fix:</kbd> include all discussions / drafts when navigating through them while in single file mode.  Before this fix, it was possible for the navigation cycle to skip some items depending on the order they were created in and their locations.
- <kbd>Fix:</kbd> don't crash if we failed to load the emoji table from GitHub.

<sub>**Enterprise release 3200.4991** (min 3107.4890 GHE 2.17+ or 3.0+) 2021-09-16 <!-- enterprise 3200.4991 --></sub>

- <kbd>Upd:</kbd> show revision timestamps in the local timezone in the Commits virtual file.
- <kbd>Fix:</kbd> glom merge commit onto the last revision if it doesn't affect any files in the PR, even if the last revision has been snapshotted.  Note that this means a reviewed revision of the virtual commit messages file might get a new merge commit appended without further review.  This seems like a reasonable trade-off to forcing another round of review just for merging from the target branch prior to merging to it.  (This likely got broken back in v2997.4729.)
- <kbd>Fix:</kbd> improve rebased revision matching heuristics to de-prioritize distance in favor of other signals.
- <kbd>Fix:</kbd> don't mistake reviewed files for unreviewed in situations where the current user isn't meant to review them.
- <kbd>Fix:</kbd> don't show the Done button if the pull request author is caught up on a discussion.  This was unnecessary and could lead to mistaken repeated "Done" replies.
- <kbd>Fix:</kbd> don't send out "short of GitHub quota" notifications too often.  This only applies if you have API quotas turned on in GHE.
- <kbd>Fix:</kbd> correctly restore commit lists when unarchiving a review.  This bug could cause some reviews to fail to unarchive due to follow-on errors.
- <kbd>Fix:</kbd> avoid crashing when review creation failed in some cases.

<sub>**Enterprise release 3179.4975** (min 3107.4890 GHE 2.17+ or 3.0+) 2021-08-29 <!-- enterprise 3179.4975 --></sub>

- <kbd>New:</kbd> support commit message reviewing (only in reviews created after this release is installed).  See [changelog](https://www.reviewable.io/blog/commit-message-reviewing/) for more details.
- <kbd>Upd:</kbd> render code blocks in PR titles.
- <kbd>Upd:</kbd> support `mp4` and `mov` video uploads in comments, with a maximum upload size of 100MB.
- <kbd>Upd:</kbd> expose `participant.read` flag for discussions in custom review completion condition input.
- <kbd>Upd:</kbd> remove `sandcastle` executor.  If you still have it set, we'll default to the (pretty much equivalent) `vm2` executor instead.
- <kbd>Fix:</kbd> report internal errors to client when ad-hoc review creation fails.
- <kbd>Fix:</kbd> let users with only read permissions sync a review to a PR by caching other users' permissions for a repo to correctly filter GitHub review approvals.  This was accidentally removed in v3063.4836 but likely isn't relevant to most Enterprise deployments as only people with write permissions will be using a repo.
- <kbd>Fix:</kbd> don't consider commits as equivalent if their messages differ, unless the more recent is a merge commit (in which case ignore its message).  We normally glom new commits that don't change any of the files in the review onto the last revision, even if it's already been snapshotted, to avoid creating (pointless) empty revisions.  However, this logic was too aggressive and would also skip over commits where only the message was changed.
- <kbd>Fix:</kbd> fix layout of dismissal confirmation message.
- <kbd>Fix:</kbd> make navigation between files work properly while a review is deferred.
- <kbd>Fix:</kbd> create a placeholder status check on the main branch when connecting a repo so that Reviewable can be selected in branch protection settings.  This was a regression from pretty long ago!
- <kbd>Fix:</kbd> make sure we don't cut off comments when posting to a discussion with media in it.  This was a regression introduced in v3049.4825.
- <kbd>Fix:</kbd> ensure that errors during on-demand review creation are reported back to the browser.

<sub>**Enterprise release 3107.4890** (min 1992.2986 GHE 2.17+ or 3.0+) 2021-07-15 <!-- enterprise 3107.4890 --></sub>

- <kbd>New:</kbd> automatically defer further action on a review when publishing with red counters remaining.  See the [announcement post](https://www.reviewable.io/blog/deferred-reviews/) for details.
- <kbd>Upd:</kbd> improve heuristics for matching rebased revisions to their priors and make use of Gerrit-style `Change-Id` headers in commit messages.
- <kbd>Upd:</kbd> tweak user activity status icons in the main review discussion footer.
- <kbd>Upd:</kbd> track an `Updated Review Status` event in analytics.  You can use this to analyze a review's state changes over time, including who was being waited on.
- <kbd>Fix:</kbd> don't copy UI text when the user's selection extends past the end of a discussion.
- <kbd>Fix:</kbd> consistently insert selected text when replying to a discussion.
- <kbd>Fix:</kbd> when changing license manager ID, don't break the Repositories page for the previous manager.

<sub>**Enterprise release 3086.4857** (min 1992.2986 GHE 2.17+ or 3.0+) 2021-06-29 <!-- enterprise 3086.4857 --></sub>

- <kbd>Upd:</kbd> show diff selection extension as soon as mouse button is released, rather than only doing so when copying to the clipboard.
- <kbd>Fix:</kbd> don't retry webhook requests that fail with a 4xx status, so the error will be reported immediately to admins for faster debugging.
- <kbd>Fix:</kbd> in a two column diff, fairly consider both sides when deciding on which side to place a discussion.  This should improve placement accuracy in some situations.
- <kbd>Fix:</kbd> correct layout of discussion corner labels for double-digit revision numbers with a base suffix.
- <kbd>Fix:</kbd> don't hold back on a diff (e.g., because it's really big) when a user explicitly requested it, by dragging out the bounds for a specific file or by clicking on a discussion's corner label.
- <kbd>Fix:</kbd> don't turn (soft) snapshotted revisions back into provisional ones in connected repos.  This bug didn't appear to actually affect how the revisions were formed, just reset their state back to provisional.
- <kbd>Fix:</kbd> allow files that were renamed then reintroduced at least two revisions later to be diffed and marked as reviewed.
- <kbd>Fix:</kbd> mitigate occasional notification webhooks that report the pull request as merged but still show people being waited on.
- <kbd>Fix:</kbd> update line links immediately when the line link template is changed in the profile dropdown.
- <kbd>Fix:</kbd> respect last selected organization when clicking on Reviews in the page header.

<sub>**Enterprise release 3063.4836** (min 1992.2986 GHE 2.17+ or 3.0+) 2021-06-20 <!-- enterprise 3063.4836 --></sub>

- <kbd>Upd:</kbd> log more information about GraphQL requests when using `REVIEWABLE_LOG_GITHUB_API_LATENCY`, since `POST /graphql` really doesn't tell you much about what it was actually doing.
- <kbd>Upd:</kbd> if rate limiting is turned off in GHE stop checking for it after the first probe request.  This means that if you decide to turn rate limiting on you'll have to restart Reviewable's servers to make them rate limiting aware again.
- <kbd>Fix:</kbd> stop fetching collaborators where possible, or move the fetch into the background.  When there are a lot of collaborators in a repo fetching them can be quite slow.  We'll now use more targeted fetches where possible (more individual requests, but each is much cheaper), or when not possible take collaborator fetches out of the critical path.
- <kbd>Fix:</kbd> when selecting alternative admins due to rate limiting poll them one-by-one (in random order) to reduce the likely load of the operation.  Until now, if the user who connected the repository didn't have enough API quota remaining we would always check every other repository admin to find the "best" one to substitute, which resulted in an optimal pick being made but was slow and expensive.
- <kbd>Fix:</kbd> correctly identify the language of files without a file extension that are nested in a directory (e.g., `foo/Makefile` or `bar/BUILD`).
- <kbd>Fix:</kbd> prevent "unable to capture head commit" errors that could temporarily leave a review in a broken state.

<sub>**Enterprise release 3049.4825** (min 1992.2986 GHE 2.17+ or 3.0+) 2021-06-14 <!-- enterprise 3049.4825 --></sub>

- <kbd>New:</kbd> automatically group in the file matrix files that are reverted (at the latest revision) and files that are just renamed.  This takes priority over custom grouping imposed by the completion condition but the user can dissolve the automatic groups from the file matrix, putting files back in their original spots.
- <kbd>Upd:</kbd> update Lambda completion condition executor to use NodeJS 14.
- <kbd>Upd:</kbd> show more clearly if a user approved or requested changes in the participants area below the main discussion, and add icons to make information readable at a glance.
- <kbd>Upd:</kbd> log latency metrics for PR sync tasks, to help isolate performance issues.
- <kbd>Fix:</kbd> invoke webhook in a timely fashion for merged PRs, and ensure it doesn't have bogus "waiting on" information.  This should also fix some cases where the review completion function is called either too often or too early.
- <kbd>Fix:</kbd> ensure review overlap strategy dropdown shows up even if there's currently only one reviewer, but the current user could potentially be a reviewer too.
- <kbd>Fix:</kbd> attach new discussion to the correct revision when changing diff bounds between revisions that have the same file SHAs.  The bug was usually innocuous but strange things started to happen if revisions with the same file SHAs were separated by a revision with different ones!
- <kbd>Fix:</kbd> detect badges that point to the wrong review (e.g., because of copy/paste between PR descriptions) and correct them when syncing a review.
- <kbd>Fix:</kbd> mark file revisions as reverted even if the reversion is caused solely by a change to base (e.g., retargeting the PR).
- <kbd>Fix:</kbd> trim issue autocompletion caches to the most recent 30k entries during monthly database sweeps.  This will prevent clients from trying to load too many entries in very large repos.
- <kbd>Fix:</kbd> don't show disposition prefix shortcut instructions in main discussion drafts, since you can't set a disposition in the main discussion.
- <kbd>Fix:</kbd> emit correct values in the dashboard PR list analytics event.
- <kbd>Fix:</kbd> tweak the max width of top level comments to better match GitHub's, so fancy Markdown layouts (with images) are more likely to display as intended.

<sub>**Enterprise release 3024.4796** (min 1992.2986 GHE 2.17+ or 3.0+) 2021-05-19 <!-- enterprise 3024.4796 --></sub>

- <kbd>New:</kbd> add an option to review every file personally, replacing the previous "Include changes in files previously reviewed only by others" checkbox with a three-option dropdown.  See [this post](https://www.reviewable.io/blog/default-review-overlap-strategy/) for details.
- <kbd>Upd:</kbd> add a placeholder graphic to make it clear when the "Awaiting my action" section of the dashboard is empty, rather than leaving out the section altogether.
- <kbd>Upd:</kbd> open up the option of limiting review creation to PRs with authors on a given team to Enterprise installations.  This gets encoded into the license key (for legacy reasons) so please get in touch with us if you'd like to take advantage of this feature.  It's probably only useful when doing a phased rollout of Reviewable, though.
- <kbd>Fix:</kbd> reinstate compatibility with GHE 2.x; this was accidentally broken in v2963.4700.
- <kbd>Fix:</kbd> try even harder to not randomly delete drafts.  There was an even more rare race condition that could cause this when navigating between files in single-file mode.
- <kbd>Fix:</kbd> work around a recently introduced GitHub bug that renders a clipboard button in comments next to code blocks.
- <kbd>Fix:</kbd> allow 0.1% of a file to be control characters before deeming it to be a binary file and turning off diffs.

<sub>**Enterprise release 2997.4729** (min 1992.2986 GHE 3.0+) 2021-04-15 <!-- enterprise 2997.4729 --></sub>

- <kbd>New:</kbd> add support for `vm2` sandboxed environment to safely run user code by setting `REVIEWABLE_CODE_EXECUTOR` environment variable to `vm2`.  **The `sandcastle` executor is DEPRECATED** and will be removed in a future release.
- <kbd>Upd:</kbd> don't hide reverted files in the client until they've been reviewed.  See [this post](https://www.reviewable.io/blog/improvements-to-reverted-and-rebased-files/) for some details.
- <kbd>Upd:</kbd> feed all files into the custom review completion condition, no longer leaving out reverted ones, to align with the new client logic above.  See [this post](https://www.reviewable.io/blog/reverted-files-in-custom-review-completion-conditions/), which also explains how to fix some broken code you might have inherited from old examples, and take advantage of more recent changes to completion condition semantics.
- <kbd>Upd:</kbd> display an inner status color in rebased revision cells relative to the matched revision, which might not be the preceding one. See the [docs](https://docs.reviewable.io/files.html#rebasing) for details.
- <kbd>Upd:</kbd> display a `reverted` icon in the cell when a file revision has been altered back to base.
- <kbd>Upd:</kbd> autocomplete markdown list syntax for bullets, numbers, and tasks when hitting `enter`.
- <kbd>Upd:</kbd> include new comments notifications in webhook contents even if the review isn't waiting on the users who have new comments to read.
- <kbd>Fix:</kbd> adapt to new GitHub OAuth token format.  This fixes "Unable to decrypt token with any key" errors.  You do _not_ need to change or fix your token encryption private key.
- <kbd>Fix:</kbd> reduce Docker image size back to <90MB.  The previous release accidentally bloated it a bit.
- <kbd>Fix:</kbd> ensure that critical file diffs are proposed, even if the prior revision was modified to base. [See issue #342](https://github.com/Reviewable/Reviewable/issues/342).
- <kbd>Fix:</kbd> removed a bad race condition when updating the review status that could cause updates to be skipped, or errors to be ignored.
- <kbd>Fix:</kbd> correctly list PRs when the dashboard is constrained to an organization with spaces in its name.  (Apparently, GHE will sometimes insert spaces into an organization slug to make it look nicer!)

<sub>**Enterprise release 2963.4700** (min 1992.2986 GHE 3.0+) 2021-04-01 <!-- enterprise 2963.4700 --></sub>

- <kbd>New:</kbd> add a `webhook` output property for custom review completion conditions, where Reviewable will send notifications of the review status changing (e.g., to Slack).  See the [public post](https://www.reviewable.io/blog/review-status-notifications-webhook/) for details.
- <kbd>Upd:</kbd> show all active reviewers in avatar lists on dashboard, but visually separate blocking from non-blocking ones.  Also improve avatar elision logic when running in a small window.
- <kbd>Upd:</kbd> group concluded PRs in their own section near the bottom of the list on the dashboard.
- <kbd>Upd:</kbd> optimize GitHub API requests issued when processing a status or check update.
- <kbd>Upd:</kbd> add support for Google Cloud Storage uniform permissions and private ACLs.
- <kbd>Upd:</kbd> show the Done button for the PR author as long as the discussion is unresolved (and as long as nobody else is Working), even if they're already satisfied.  This should help smooth out the workflow where the author responds Done but the reviewer isn't satisfied and requests further changes.
- <kbd>Fix:</kbd> prompt the user to grant organizations read scope from the dashboard organization dropdown if missing.  Also stop trying to fetch the user's organizations if we know the request is bound to fail.
- <kbd>Fix:</kbd> collapse sequences of matching revisions when the files in the PR haven't been changed.  This is specially useful when rebasing in commit-by-commit review mode as it will avoid forcing a review of lots of empty diffs.
- <kbd>Fix:</kbd> in the crash dialog, correctly identify whether a fatal crash was caused by Reviewable or by a browser extension.
- <kbd>Fix:</kbd> when diffing two revisions with different bases, do a better job of deciding which lines are base changes and which are not.  Previously, if a line was added/removed in a revision, it could get marked as being a base change even though it clearly wasn't.
- <kbd>Fix:</kbd> drop bogus `check_run` and `check_suite` events from forked repos that GitHub insists on sending to us.  This should further decrease the load both on Reviewable and GHE if you use forked repos in your organization.  Note that I don't know when the field we use to detect if the event is bogus was introduced; it definitely exists in GHE 2.21 and I suspect it goes back much earlier, but GitHub's docs don't say.
- <kbd>Fix:</kbd> don't randomly delete drafts when changing revision bounds or navigating between files in single-file view!  This was an extremely rare race condition but it seemed to affect some users much more than others, likely due to their machine's performance characteristics.  It would result in irrecoverable loss of draft comment text.

<sub>**Enterprise release 2899.4660** (min 1992.2986 GHE 2.12+ or 3.0+) 2021-03-10 <!-- enterprise 2899.4660 --></sub>

- <kbd>Fix<i>(enterprise)</i>:</kbd> **HOTFIX** for GHE 3.0: sync large PRs. GHE 3.0 made a subtle change to one of their APIs that made Reviewable fail when syncing PRs with very large diffs.
- <kbd>New:</kbd> allow the user to constrain the dashboard review list to a specific organization, and persist the setting across page reloads.  This is more efficient than a filter query.
- <kbd>Upd:</kbd> optimize dashboard PR query structure to reduce first page load latency a bit.
- <kbd>Upd:</kbd> track more granular statsd counters of requests made to GHE, segmenting by queue and GitHub event type.
- <kbd>Fix:</kbd> prevent client and server from sending out harmless but annoying requests to `localhost` when the Sentry connection is not configured.
- <kbd>Fix:</kbd> diff SVG files again, instead of treating them as images.
- <kbd>Fix:</kbd> avoid error with image files when user is not signed in.
- <kbd>Fix:</kbd> correctly load the repo's labels dictionary even if user is not signed in.
- <kbd>Fix:</kbd> prevent a rare crash with an error related to `borrowElement`.
- <kbd>Fix:</kbd> trigger re-evaluation of the review completion condition when a PR's statuses are updated, in case the condition relies on this data (introduced in v2183.3776).
- <kbd>Fix:</kbd> render tables in comments posted from GitHub.
- <kbd>Fix:</kbd> fix a regression that prevented the crash dialog from showing in some cases, making it look like the page just froze.

<sub>**Enterprise release 2765.4558** (min 1992.2986 GHE 2.12+ or 3.0+) 2021-02-13 <!-- enterprise 2765.4558 --></sub>

- <kbd>Fix:</kbd> **HOTFIX** make custom review completion conditions work again.  These got broken back in 2630.4363 for both the Sandcastle executor (completely) and for AWS Lambda (for new repos only).
- <kbd>Upd:</kbd> migrate from raven-js SDK to Sentry SDK v6.0.3.  This should have no impact on you unless you connected your instance to Sentry.
- <kbd>Fix:</kbd> prevent severe performance degradation on page load when a review used a _lot_ of emojis.
- <kbd>Fix:</kbd> make sure "Show on GiHub" button in a diff always links to a valid page that will show the file in question, even if the diff bounds don't cover any changes.
- <kbd>Fix:</kbd> avoid fetching image files in a PR on the client (based on filename), since we can't diff them anyway.
- <kbd>Fix:</kbd> successfully continue updating Reviewable's issue autocompletion cache even when it grows very large (avoiding a `write_too_big` error).
- <kbd>Fix:</kbd> don't erroneously treat files as deleted if the entire PR is reverted back to base (but remains open).
- <kbd>Fix:</kbd> support `done` and `fail` callbacks for asynchronous custom review completion conditions in the Sandcastle executor.

<sub>**Enterprise release 2696.4504** (min 1992.2986 GHE 2.12+) 2021-02-01 <!-- enterprise 2696.4504 --></sub>

- <kbd>Adm<i>(enterprise)</i>:</kbd> **WARNING** custom review completion condition may not execute correctly in release 2696.4504.
- <kbd>New:</kbd> offer a quick link to dismiss dissenting participants from a discussion.  This shows up next to the dispositions rollout if the user is satisfied, has a draft open, other participants are blocking or working, and the user is able to dismiss them.
- <kbd>Upd:</kbd> open external support links with non-reviewable domain in a new tab.
- <kbd>Upd:</kbd> ignore autogenerated gRPC stubs.
- <kbd>Upd:</kbd> support validation of `x-hub-signature-256` in webhook requests.
- <kbd>Upd:</kbd> respect `prefers-reduced-motion` setting unless overridden in account settings.
- <kbd>Upd:</kbd> add absolute timestamps in tooltips most everywhere we show relative "N days ago"-style descriptions.
- <kbd>Fix:</kbd> make next/prev (personally) unreviewed file navigation shortcuts work correctly in various edge cases again.
- <kbd>Fix:</kbd> avoid requesting review from yourself when using the default completion condition, syncing requested reviewers on publish, and having one or more files that were never marked reviewed in the PR.
- <kbd>Fix:</kbd> fix 'View on github' button to scroll to correct file on recent versions of GHE by switching the hash from MD5 to SHA-256.
- <kbd>Fix:</kbd> open comment images in a new tab to match GitHub's behavior.
- <kbd>Fix:</kbd> don't fail with a "GitHub disregarded the 'raw' media type" error when dealing with binary files on new versions of GHE.
- <kbd>Fix:</kbd> raise or remove some queue concurrency constraints.  This should let Reviewable take better advantage of CPU resources instead of artificially throttling itself.  It probably won't affect your deployment but if you have CPU-based scaling triggers set up you may want to capture a new baseline and adjust them.

<sub>**Enterprise release 2630.4363** (min 1992.2986 GHE 2.12+) 2020-12-09 <!-- enterprise 2630.4363 --></sub>

- <kbd>Adm<i>(enterprise)</i>:</kbd> **WARNING** custom review completion condition may not execute correctly in release 2630.4363.
- <kbd>Upd:</kbd> upgrade to Node 14.
- <kbd>Upd:</kbd> if a PR is ready to merge and there are no other blocking users, designate the PR's autor as the blocking user so the PR will show up in the "Awaiting my action" section on their dashboard.
- <kbd>Upd:</kbd> add `review.pullRequest.target.branchProtected` flag to custom review completion condition input data.
- <kbd>Upd:</kbd> render emojis in PR labels.
- <kbd>Fix:</kbd> don't show disabled merge button on dashboard if PR is ready to merge but the user doesn't have permission to do so.
- <kbd>Fix:</kbd> avoid expensive load of file information for a review on the dashboard if it looks like it has a lot of files.  This could result in locking up the dashboard for everyone that had the PR in their list until it was closed and fell outside the query's closed PR horizon.  PRs impacted by this fix will show `???` as their files counter.
- <kbd>Fix:</kbd> match unreview file navigation logic to counter logic, otherwise it was possible to get into a situation where navigating would select files that did not, in fact, need to be reviewed.
- <kbd>Fix:</kbd> display correct unreviewed file counts on dashboard when negative file reviewed overrides are generated by the review completion condition.
- <kbd>Fix:</kbd> work around a GitHub API bug that would sometimes make polls for new PRs fail for users who toggled on "My PRs in any public/private repo" on the Repositories page.
- <kbd>Fix:</kbd> tolerate empty check run names (again).
- <kbd>Fix:</kbd> update base of subsequent PRs to the head's base before merging and deleting the head branch.
- <kbd>Fix:</kbd> prevent crashes in some very rare race condition edge cases.

<sub>**Enterprise release 2580.4292** (min 1992.2986 GHE 2.12+) 2020-11-04 <!-- enterprise 2580.4292 --></sub>

- <kbd>Fix:</kbd> **HOTFIX** fix handling of paginated GraphQL requests when running against GHE.  This has been broken since day one but mostly worked fine since requests that require paginating are pretty rare.  However, as we've been replacing REST with GraphQL over time the issue has grown worse and we finally tracked it down.  You're most likely to notice it with assignee and reviewer autocomplete not listing the right users, or with mysterious failures when publishing a review with assignee or reviewer changes.
- <kbd>Fix:</kbd> tolerate empty check run names.

<sub>**Enterprise release 2569.4290** (min 1992.2986 GHE 2.12+) 2020-11-01 <!-- enterprise 2569.4290 --></sub>

- <kbd>Upd:</kbd> fully support syntax highlighting of `.tsx` files.
- <kbd>Fix:</kbd> show all PRs where the user was mentioned on the reviews dashboard, working around a GitHub bug where @-mentions in reviews aren't indexed properly.  See [issue comment](https://github.com/Reviewable/Reviewable/issues/636#issuecomment-696902568) for limitations.
- <kbd>Fix:</kbd> work around stricter browser security restrictions in the sign-in popup window that would sometimes cause Reviewable to fall back to a less convenient redirect auth flow.  (For anybody stuck in the redirect flow, clearing cookies from Reviewable's site will reset the flag.)
- <kbd>Fix:</kbd> fix a regression in automatically setting requested reviewers on a review.
- <kbd>Fix:</kbd> truncate participant avatars field in review list so it doesn't overflow and leave no space for the PR title.
- <kbd>Fix:</kbd> avoid some very rare crashes when clicking outside the review area.
- <kbd>Fix:</kbd> fix a regression in extending code selection in diff to beginning/end of line.

<sub>**Enterprise release 2487.4249** (min 1992.2986 GHE 2.12+) 2020-09-22 <!-- enterprise 2487.4249 --></sub>

- <kbd>Upd:</kbd> point GitHub link button directly to the file of interest rather than just the diff of interest.
- <kbd>Upd:</kbd> add a small icon to the Publish button indicating approval / blocking when the text gets removed due to small page width.
- <kbd>Upd:</kbd> add `action` property to file revisions in the custom review completion condition input structure, to indicate whether the file was added, removed, modified, or renamed at that revision.
- <kbd>Upd:</kbd> add a `nextDiscussionWithDisposition(disposition)` keyboard binding, along with previous/first/last variants.
- <kbd>Fix:</kbd> correct a race condition that resulted in comments with images sometimes being cut off on the page.
- <kbd>Fix:</kbd> resize resolved discussion "bar" placeholders when changing the diff's column width.
- <kbd>Fix:</kbd> correctly render PR labels that get cut off on the reviews dashboard.
- <kbd>Fix:</kbd> avoid sometimes locking up on load in reviews with a renamed-then-reintroduced file when using review-each-commit style.
- <kbd>Fix:</kbd> stop syntax highlighter from getting confused in some cases (e.g., when using `Foo.class` in a Java file).

<sub>**Enterprise release 2411.4117** (min 1992.2986 GHE 2.12+) 2020-08-12 <!-- enterprise 2411.4117 --></sub>

- <kbd>Upd:</kbd> make [Reviewable docs](https://docs.reviewable.io) indexable by Google Search.
- <kbd>Upd:</kbd> add `review.pullRequest.target.headCommitSha` to the review completion condition input data.
- <kbd>Fix:</kbd> make sure publishing comments works even if an organization has many thousands of potential assignees.
- <kbd>Fix:</kbd> correct a bunch of issues related to autocomplete in drafts, including inconsistent search logic, behavior in the face of user logout, etc.
- <kbd>Fix:</kbd> don't try to automatically connect archived repositories.
- <kbd>Fix:</kbd> ignore self-mentions in comments instead of showing an error or freezing.
- <kbd>Fix:</kbd> prevent accidental DoS-by-regex on certain malformed PR descriptions and other user-controlled input.

<sub>**Enterprise release 2351.4070** (min 1992.2986 GHE 2.12+) 2020-06-22 <!-- enterprise 2351.4070 --></sub>

- <kbd>Upd:</kbd> check more often that the user who originally connected a repository still has admin access to it, and send a warning email if not.
- <kbd>Fix:</kbd> autosize draft text area consistently when the comment contains `>` quotes.
- <kbd>Fix:</kbd> resize comment area correctly when expanding/collapsing quoted blocks.
- <kbd>Fix:</kbd> in two column diffs, prevent blank (filler) lines from appearing in text copied from the diff.
- <kbd>Fix:</kbd> don't allow a race condition to cause some values like mergeStyle to flutter when review completion code is run.
- <kbd>Fix:</kbd> ignore another category of bogus errors that appear to mostly come from the Grammarly extension.  Sigh.
- <kbd>Fix:</kbd> avoid locking up when trying to preview or send a comment in some forked repos.

<sub>**Enterprise release 2330.4029** (min 1992.2986 GHE 2.12+) 2020-04-29 <!-- enterprise 2330.4029 --></sub>

- <kbd>Fix:</kbd> don't crash when a bogus "ResizeObserver loop limit exceeded" error occurs.  This appears to be caused by the somewhat popular Grammarly extension.
- <kbd>Fix:</kbd> remove one more spot that used deprecated GitHub API authentication methods, though it likely wasn't affecting most installations.
- <kbd>Fix:</kbd> make "unresolved discussion" navigation keyboard shortcuts work again.

<sub>**Enterprise release 2326.4025** (min 1992.2986 GHE 2.12+) 2020-04-16 <!-- enterprise 2326.4025 --></sub>

- <kbd>New:</kbd> treat file mode changes as modifications and display them when diffing.  Also notify when a file is a symbolic link.
- <kbd>Upd:</kbd> offer option to insert Reviewable badge at the top of the pull request description, rather than at the bottom.
- <kbd>Fix:</kbd> correctly handle commit authors and committers that are not GHE users.
- <kbd>Fix:</kbd> show correct defaults when opening repository settings a second time after applying some edits.
- <kbd>Fix:</kbd> don't trigger a run of the custom review completion condition when background-syncing a closed pull request.  Doing so could result in spammy notifications when performing batch admin actions on a repo in GHE, and Reviewable generally doesn't automatically update the completion condition for closed PRs anyway.
- <kbd>Fix:</kbd> avoid breaking review list page when user is a member of more than 100 teams.
- <kbd>Fix:</kbd> respect the "automatically delete head branches" setting in GitHub, by forcing the "delete" option in the merge options dropdown and letting GitHub do the deed rather than racing with it.

<sub>**Enterprise release 2269.3960** (min 1992.2986 GHE 2.12+) 2020-03-08 <!-- enterprise 2269.3960 --></sub>

- <kbd>Upd:</kbd> add warning about draft PR to mergeability status check that shows up in Reviewable.  Before then, if a PR was in draft but otherwise ready to merge, you'd end up in a state where everything looked OK but the merge button just wouldn't show up.
- <kbd>Upd:</kbd> reduce false positive reports of "Repeatedly failed to process event".
- <kbd>Upd:</kbd> stop using the recently deprecated `access_token` authentication method for GitHub requests on the client.  This will impact performance since it requires an additional "preflight" request for most every `GET` sent to GitHub, but GitHub's engineers weren't receptive to this argument against the change.  Oh well.
- <kbd>Upd:</kbd> switch to a new HTTP request library on both client and server.  Should have no noticeable effects, but last time we tried upgrading the old library it broke servers seemingly at random, so noting the change here just in case.
- <kbd>Upd:</kbd> add `author` and `committer` to revision commits info in review completion condition input structure.
- <kbd>Upd:</kbd> add `markFileReviewedAndRetreat` bindable command, for those who like to start their reviews at the bottom.
- <kbd>Fix:</kbd> note when a review is broken on the Reviews dashboard and skip loading detailed data for it.  This doesn't happen often (e.g., if the number of files in a review exceeds 8000) but when it does the data might be in an invalid state and cause the page to get stuck.
- <kbd>Fix:</kbd> when `syncRequestedReviewers` is set in a custom completion condition, update requested reviewers whenever `pendingReviewers` changes, even if no review was published (e.g., when a PR is first created).
- <kbd>Fix:</kbd> ensure the Reviews button in the header always goes back to the most recently viewed list of reviews.  It would sometimes go back to a specific review instead!
- <kbd>Fix:</kbd> work around a recent change in GitHub's API that would cause reviews with a commit that touched >100 files to be unable to sync.
- <kbd>Fix:</kbd> prevent some UI issues that would occur when only part of a file's revision history belonged to a renamed file, but the rest remained as part of the original.  This could result in weird diff bounds being picked or marking revisions as reviewed affecting multiple files in the matrix.
- <kbd>Fix:</kbd> allow for ambiguous path to file mappings when interpreting review completion condition results.  This happens in the same "partially assimilated file" conditions as for the fix above.
- <kbd>Fix:</kbd> when creating a discussion, ensure that the other revision in the diff gets snapshotted too so we can reproduce the exact diff later.  Otherwise, we can end up with a discussion with a dangling revision reference, which can cause crashes in rare circumstances.
- <kbd>Fix:</kbd> guard against a bug in GHE that occasionally returns a supposedly internal completion state for a check run.

<sub>**Enterprise release 2227.3878** (min 1992.2986 GHE 2.12 - 2.20) 2020-01-06 <!-- enterprise 2227.3878 --></sub>

- <kbd>Upd:</kbd> improve diff algorithm to keep indentation-only deltas clean rather than sometimes pulling in short unchanged line contents.
- <kbd>Upd:</kbd> allow horizontal scrolling of file header when revision cells overflow available space.  Scroll bar is not visible but you can use the middle mouse button (or whatever your OS of choice allows) instead.
- <kbd>Upd:</kbd> embed RSA key rolling feature in the monthly user table cron job if multiple keys are passed to the server.  This is more reliable than using a separate script.
- <kbd>Upd:</kbd> switch RSA encryption to native Node libraries for a boost in performance.
- <kbd>Fix:</kbd> prevent very rare "undefined function closest" crash.
- <kbd>Fix:</kbd> prevent permission denied errors when stale user records are automatically cleaned up when they're still referenced by other data.
- <kbd>Fix:</kbd> prevent servers getting stuck processing a GitHub event forever if the repo it refers to was deleted at just the wrong moment.
- <kbd>Fix:</kbd> deal gracefully with pull requests that have no commits.  This can happen if the source repo gets deleted.
- <kbd>Fix:</kbd> support thousands of repos on the Repositories page.

<sub>**Enterprise release 2210.3860** (min 1992.2986 GHE 2.12 - 2.20) 2019-11-21 <!-- enterprise 2210.3860 --></sub>

- <kbd>New:</kbd> support monitoring via `statsd`.  This is just a first cut at the feature and subject to change as I gather feedback from people who actually use `statsd` and such.  Please see the [config doc](https://github.com/Reviewable/Reviewable/blob/master/enterprise/config.md#monitoring) for details on the extra environment variables you need to set this up, but if you already happen to have `DD_AGENT_HOST` defined in your environment then the feature will turn on automatically.
- <kbd>Upd:</kbd> add `draft` state to pull request list query language.
- <kbd>Upd:</kbd> upgrade Lambda executor to use NodeJS 10 environment for user scripts.
- <kbd>Fix:</kbd> work around a regression in the Lambda API that caused all errors to show up as "internal executor error".
- <kbd>Fix:</kbd> use custom monospace font for code embedded inside comments too.
- <kbd>Fix:</kbd> avoid getting into a situation where (among other things) newly opened reply drafts would fail to get focus and get deleted on the next click.  This seems to have only affected some Firefox installations but could've had much more widespread effects.  All browsers should benefit from a performance boost for reviews with many discussions where users often change diff bounds.
- <kbd>Fix:</kbd> when setting automatic diff bounds in commit-by-commit review style, don't set bounds for files if it would result in diffing a revision against itself (resulting in a nil diff).  This was a no-op, but messed up the algorithm that estimated whether the bounds of all the file diffs were consistent.
- <kbd>Fix:</kbd> don't over-extend diff selection on copy if the selection ends exactly at the beginning of a new line.
- <kbd>Fix:</kbd> prevent occasional crash with "unmatched diff release" error message.

<sub>**Enterprise release 2200.3821** (min 1992.2986 GHE 2.12 - 2.20) 2019-10-10 <!-- enterprise 2200.3821 --></sub>

- <kbd>New:</kbd> add a repository setting to constrain who can dismiss participants from a discussion, either anyone with write access (the default) or only repository admins.
- <kbd>Upd:</kbd> update to Node 12.
- <kbd>Upd:</kbd> no longer run server as `root` to improve security.
- <kbd>Upd:</kbd> slim down Docker image from 392MB to 105MB.
- <kbd>Upd:</kbd> only offer "Resolve" as the primary action on a discussion if the user is already an active participant or the PR author.  Always offering it made it too easy to accidentally resolve a discussions when there are multiple reviewers.
- <kbd>Upd:</kbd> capture both diff bounds when a new discussion is created in a file, and restore both if the user clicks on a discussion's revision corner label.  Previously, only the discussion's target revision was stored, not the other side of the diff.
- <kbd>Upd:</kbd> include commit titles (first line of commit message) in custom review completion condition input data.
- <kbd>Upd:</kbd> treat files under `__generated__` directory as generated.
- <kbd>Fix:</kbd> treat Unicode line and page separators as newlines when parsing text.
- <kbd>Fix:</kbd> avoid minor layout issues on dashboard page and in review participants summary section.
- <kbd>Fix:</kbd> don't fetch branch list of current repo until user starts editing the target branch (which happens quite rarely).
- <kbd>Fix:</kbd> if a file was renamed, then reintroduced under its original name, ensure the reintroduced one is actually included in the review.
- <kbd>Fix:</kbd> don't show an error if trying to delete a branch that's already gone after a merge.

<sub>**Enterprise release 2183.3776** (min 1992.2986 GHE 2.12 - 2.20) 2019-09-13 <!-- enterprise 2183.3776 --></sub>

- <kbd>New:</kbd> display old/new file size (and delta) for binary files.
- <kbd>Upd:</kbd> split quoted replies to Reviewable's combined messages that originate from GitHub's web UI into separate threads, just like we always did for email.
- <kbd>Upd:</kbd> respect disposition-setting keywords (such as "FYI" or "OK") at the beginning of a draft even if they are preceded by quoted lines.
- <kbd>Upd:</kbd> add syntax highlighting for HCL/Terraform files.
- <kbd>Upd:</kbd> show the checks status icon on the dashboard if the summary state is `missing` or `pending` even if the review is in progress and other status counters are non-zero.  Previously, these states used to be elided from the dashboard to avoid information overload but they can be helpful in deciding which reviews to tackle and which to postpone.
- <kbd>Upd:</kbd> include `review.pullRequest.mergeability` and `review.pullRequest.checks` in custom review completion condition input data.
- <kbd>Upd:</kbd> don't mark synthesized revision comments (that list the commits that make up a revision) as unread if a commit was added to one that didn't affect any of the files in the PR, usually as the result of a merge or rebase operation.  (The commit is still processed and added to the revision as before, just without further notification as there's nothing new to review anyway.)
- <kbd>Upd:</kbd> when deciding whose action a discussion is awaiting, if the PR author's disposition is Blocking and all participants are up-to-date on all comments, then the PR author will be the only one selected as being waited on (even if others are Blocking too).  This is an unusual scenario since the PR author would typically be Working instead but this logic tweak should accord better with intuition.
- <kbd>Fix:</kbd> work around a bug in a dependency that manifests itself as GitHub API calls sometimes timing out with an "Aborted" message.  The error was probably introduced in 2140.3674, and was usually innocuous as the call would be automatically retried but in some situations (such as a highly loaded GHE instance) could become fatal and render Reviewable virtually unusable.
- <kbd>Fix:</kbd> prevent a user record with ID `undefined` from being written to the datastore.  This is likely the result of a buggy response from GitHub's API, but once in the datastore it breaks some downstream code.
- <kbd>Fix:</kbd> make a middle mouse click work properly most anywhere within a dashboard row, not just on the PR name.
- <kbd>Fix:</kbd> recognize click on mark reviewed button when text is selected on the page in Firefox.
- <kbd>Fix:</kbd> take GitHub review comments made on multiple comments into account correctly when deciding how to group commits into revisions.
- <kbd>Fix:</kbd> don't allow repo config button in checks dropdown panel to be clicked when disabled.
- <kbd>Fix:</kbd> correctly manage text selection within diffs in Firefox.  Previously, the last line of the selection was sometimes dropped.
- <kbd>Fix:</kbd> respect `reviewed: false` flag set by custom review completion condition on file revisions by counting files as unreviewed and styling mark buttons appropriately.  Previously, it was possible for the `false` value to be overridden by reviews of subsequent revisions.
- <kbd>Fix:</kbd> roll back HTTP request library to work around weird timeout problems on cached fetches.  The issue did not present consistently, appearing without provocation on a given instance and sometimes going away by itself as well.  If you're seeing a lot of "Aborted" or "Timeout" errors you'll want to update to this version.

<sub>**Enterprise release 2148.3676** (min 1992.2986 GHE 2.12 - 2.20) 2019-07-24 <!-- enterprise 2148.3676 --></sub>

- <kbd>Fix:</kbd> **HOTFIX** remain compatible with older GHE versions by removing reference to `Mannequin` from GraphQL queries.
- <kbd>Fix:</kbd> deal correctly with non-lowercase usernames when inferring list of users for "sync requested reviewers" publishing option.

<sub>**Enterprise release 2140.3674** (min 1992.2986 GHE 2.12 - 2.20) 2019-07-11 <!-- enterprise 2140.3674 --></sub>

- <kbd>Adm<i>(enterprise)</i>:</kbd> This version is broken on some older GHE versions, it's strongly recommended that you skip to the next one (2148.3676).
- <kbd>Upd:</kbd> indicate draft PRs on dashboard and review pages (GHE 2.17+).  You need to use GitHub to declare a draft PR "ready for review" for the time being; that functionality will be added later, along with a UI redo.
- <kbd>Upd:</kbd> support `±label:<name>` query terms in review list.
- <kbd>Upd:</kbd> improve selection of base commit when diffing renamed files (favoring the original file when possible).
- <kbd>Fix:</kbd> don't ignore errors when merging, and don't delete the branch if the merge failed.
- <kbd>Fix:</kbd> make sure the merge completes before deleting the source branch.
- <kbd>Fix:</kbd> don't get stuck waiting for a merge commit message (with a spinner that never goes away) if user clears out the text box.
- <kbd>Fix:</kbd> avoid rare crash when deleting a comment with images in its preview mode.
- <kbd>Fix:</kbd> avoid another rare crash when using the review preview dropdown and editing a comment immediately thereafter.
- <kbd>Fix:</kbd> don't crash with a bogus permission denied error when trying to access an unarchived review with special characters in the owner or repository name.
- <kbd>Fix:</kbd> track focused draft correctly for targeting keyboard shortcuts.  A bug caused the first draft that had a keyboard shortcut applied to it to become the target of all future shortcuts.
- <kbd>Fix:</kbd> ignore review comments with no author (not sure how that can happen, but observed one such case!).
- <kbd>Fix:</kbd> clip long directory paths in file matrix.  This is a quick fix to prevent the layout from jumping around when moving the mouse around the matrix, but may result in some long paths getting clipped even when _not_ hovering over them if all filenames are short and there aren't many revisions.

<sub>**Enterprise release 2113.3608** (min 1992.2986 GHE 2.12 - 2.20) 2019-05-16 <!-- enterprise 2113.3608 --></sub>

- <kbd>New:</kbd> add a `mergeStyle` field to review completion condition output.  You can use this to dynamically force a specific merge style for a review even if the repo is configured to allow others.  Only enforced in Reviewable.
- <kbd>Fix:</kbd> make custom diff font settings actually work again.
- <kbd>Fix:</kbd> prevent an extremely rare series of occurrences from permanently corrupting a review such that it won't update with any further commits.  This bug has been present in the code since day one and I just observed it for the first time in 5 years...
- <kbd>Fix:</kbd> don't offer to "show more concluded reviews" when searching for a single PR by URL in review list.
- <kbd>Fix:</kbd> don't crash when some PR filepaths differ only in case in specific ways.
- <kbd>Fix:</kbd> don't use data derived from a stale review state when racing to create a new review (very rarely).  This could've resulted in aspects of a review being temporarily out of sync with the PR, but should've fixed itself automatically as the review was visited and resynced.
- <kbd>Fix:</kbd> deal gracefully with racing server shutdown requests, instead of crashing out early.

<sub>**Enterprise release 2093.3571** (min 1992.2986 GHE 2.12 - 2.20) 2019-04-16 <!-- enterprise 2093.3571 --></sub>

- <kbd>New:</kbd> add a `disableBranchUpdates` flag to review completion condition output.
- <kbd>New:</kbd> add `defaultMergeCommitMessage` and `defaultSquashCommitMessage` fields to review completion condition output.  Also include `title` and `body` in `review.pullRequest` input state.
- <kbd>Upd:</kbd> on initial load, keep the review list's spinner up until _all_ the data has been loaded, to prevent having rows move around as more information streams in.  Note that this is a live list so rows may still shift position later as reviews' states change, but this should improve the first-load experience at the expense of a bit more latency before the list shows up.
- <kbd>Upd:</kbd> upgrade AWS Lambda custom review completion condition runtime environment to Node 8 (applied lazily as conditions are modified).  This is technically a major version change but it's very unlikely to affect the kind of code written for completion conditions.
- <kbd>Upd:</kbd> raise GitHub API socket timeouts.  This should help reduce spurious errors when the GitHub server is under high load and slow to respond.
- <kbd>Upd:</kbd> tweak semantics for the red "unreplied" counter and "awaited" users so that if you are awaited for a review due to a discussion, it will always show up as unreplied for you.  Previously, there were edge cases in multi-party discussions where you were awaited but a passive follower got the red unreplied state instead.
- <kbd>Upd:</kbd> remove a workaround for GitHub's API bug that reset the "allow maintainers to modify PR" flag when applying an unrelated patch.  Unfortunately, they've tightened up the validation such that it's not possible to even specify the existing flag value unless you're the PR author, and Reviewable needs to call the API through various identities.  It's not clear when the API bug was fixed, so if you're still using an old version of GHE then Reviewable might start resetting the flag again.  If this happens, please either upgrade your GHE or downgrade Reviewable.
- <kbd>Upd:</kbd> show full name in review participants status area, instead of just the avatar.
- <kbd>Fix:</kbd> don't consider a branch fast-forwardable if GitHub says it can't be rebased, even if analysis of the commit chain indicates that it ought to be.
- <kbd>Fix:</kbd> line up diff stats correctly to the right of the file matrix when a file has no last reviewer.
- <kbd>Fix:</kbd> correctly generate publication preview when user switches approval flag while the preview is being generated.
- <kbd>Fix:</kbd> prevent some very rare crashes in data race condition edge cases.
- <kbd>Fix:</kbd> don't crash if a GitHub app files a status check with an empty-string context.
- <kbd>Fix:</kbd> don't crash with permission denied error when collapsing or expanding a file group whose name has periods in it.
- <kbd>Fix:</kbd> prevent crashes when trying to redirect in Edge.
- <kbd>Fix:</kbd> prevent clicks on a merge button in the pull requests list from navigating to the review.

<sub>**Enterprise release 2071.3450** (min 1992.2986 GHE 2.12 - 2.20) 2019-03-11 <!-- enterprise 2071.3450 --></sub>

- <kbd>New:</kbd> allow grouping (and reordering) files in a review via new `group` property for files in the custom review completion condition.  See the docs on [setting it up](https://docs.reviewable.io/repositories#files) and [how it looks in the UI](https://docs.reviewable.io/files#file-list) for details.
- <kbd>Upd:</kbd> lay out the file matrix as a directory tree rather than a flat list of files.
- <kbd>Fix:</kbd> **HOTFIX** avoid a crash when loading Reviewable on an encrypted instance in private mode while already signed in with the error "Encryption not set up".  This regression was introduced in the previous release, v2066.3418.
- <kbd>Fix:</kbd> correctly display and expand/contract long paths in file headers.
- <kbd>Fix:</kbd> don't show file matrix until file renames have been mapped.
- <kbd>Fix:</kbd> improve text copy from diff to correctly extend selection to full lines when dragging backwards with mouse, and to exclude blank line space placeholders from the copied text.
- <kbd>Fix:</kbd> stop requiring `REVIEWABLE_FIREBASE_AUTH`, which hasn't been needed since v1994.2998.
- <kbd>Fix:</kbd> prevent a crash on loading the reviews list if server hasn't properly set the GHE version in Firebase yet.  The root cause is likely a bad auth for the subscription admin user, which will log `Unable to initialize generic GitHub access` on the server at startup along with a specific error message.
- <kbd>Fix:</kbd> don't flash a prompt to sign in when loading a review page on an encrypted instance in private mode while already signed in.

<sub>**Enterprise release 2066.3418** (min 1992.2986 GHE 2.12 - 2.20) 2019-02-28 <!-- enterprise 2066.3418 --></sub>

- <kbd>Adm<i>(enterprise)</i>:</kbd> **KNOWN ISSUE** This version breaks badly in environments running in `REVIEWABLE_PRIVATE_MODE`.  You almost certainly want to skip over it.
- <kbd>New:</kbd> let user temporarily see more concluded (closed or merged) pull requests on the dashboard by clicking a link.
- <kbd>Upd:</kbd> upgrade to NodeJS 10.
- <kbd>Upd:</kbd> upgrade email module.  **WARNING** It now uses `dns.resolve` instead of `dns.lookup` when resolving `REVIEWABLE_SMTP_URL`, which will query the DNS server directly and bypass some local configs such as `/etc/hosts` (i.e., it doesn't use `getaddrinfo(3)`).
- <kbd>Upd:</kbd> lower the diff threshold to consider a file pair as renamed by 5%.
- <kbd>Fix:</kbd> ignore @-mentions that can't be resolved.
- <kbd>Fix:</kbd> detect when the authorization has been upgraded in other tabs, and force user to re-authenticate to prevent an authorization skew between the permissions on the server and in the tab.  This was not a security issue but could result in unexpected errors.
- <kbd>Fix:</kbd> lock out sign-in/sign-out during authentication (to avoid racing multiple auth requests) and when publishing (to avoid accidentally signing out and breaking the process halfway).
- <kbd>Fix:</kbd> fix minor visual issues with set default query link on dashboard.
- <kbd>Fix:</kbd> prevent crash in rare cases when setting diff bounds in file matrix header.
- <kbd>Fix:</kbd> put pending reviewers list back in the checks dropdown.
- <kbd>Fix:</kbd> don't request reviewer twice if user is self-requesting.  This is a no-op but looks ugly in GitHub's timeline.

<sub>**Enterprise release 2056.3350** (min 1992.2986 GHE 2.12 - 2.20) 2019-02-07 <!-- enterprise 2056.3350 --></sub>

- <kbd>New:</kbd> give option to sync GitHub's requested reviewers from Reviewable's awaited reviewers when publishing.  See [docs](https://docs.reviewable.io/reviews#sync-requested-reviewers) for details.  Great for integration with [Pull Reminders](https://pullreminders.com) if you use Slack!
- <kbd>Fix:</kbd> allow users to login in multiple browsers / profiles without forcing all but the latest one offline.  This was a regression introduced in 2033.3283.  Note that this is a temporary fix that reintroduces the auth ugprade race condition handled by the broken fix.  A better permanent fix will come in the next release, after a whole lot of testing.
- <kbd>Fix:</kbd> remedy race condition when triggering completion condition evaluation in response to PR review events. Previously, it was possible for the condition to be triggered before the review state correctly reflected the new approvals.
- <kbd>Fix:</kbd> improve forced logout on page load when session is close to expiring to be less likely to cause spurious errors.
- <kbd>Fix:</kbd> if a review's style hasn't been set yet and the user lacks write permissions, temporarily initialize it locally to avoid potential breakage (and a blank dropdown in the UI).
- <kbd>Fix:</kbd> don't show merge button if user lacks push permissions, even if PR is mergeable.
- <kbd>Fix:</kbd> substitute ghost user for deleted users during completion condition evaluation if unable to find or fetch their old info.  Previously, the evaluation task would get into an infinite failure loop instead.
- <kbd>Fix:</kbd> correctly render dismissed user status icon on dashboard.
- <kbd>Fix:</kbd> truncate very long GitHub comments when syncing (current cutoff is 100KB) to avoid running afoul of Firebase's hard limits on data size.  (If the limits are exceeded it can get tricky to recover.)
- <kbd>Fix:</kbd> keep drafts locked while generating publish preview to avoid async edits that would not be reflected in the preview, or that can sometimes cause a crash.
- <kbd>Fix:</kbd> don't misinterpret a `±reviewer:@username` directive as an @-mention.
- <kbd>Fix:</kbd> don't offer PR author as a completion for `+reviewer:@` directive.
- <kbd>Fix:</kbd> include pending changes to approval, assignees, reviewers, labels, etc. when evaluating the completion condition before publishing.  This didn't affect status accuracy (since the condition gets evaluated again after everything is published and committed) but could result in a bogus completion description being shown in the preview and posted in the GitHub message.
- <kbd>Fix:</kbd> don't walk revision description message timestamps forward by 1ms every time the review gets synced in certain circumstances.  This could result in requiring users to regularly re-acknowledge those comments.
- <kbd>Fix:</kbd> restore hotkey indicators in certain contextual help blurbs.

<sub>**Enterprise release 2033.3283** (min 1992.2986 GHE 2.12 - 2.20) 2019-01-21 <!-- enterprise 2033.3283 --></sub>

- <kbd>New:</kbd> publish a complete user guide at https://docs.reviewable.io.  This has all the content from the online help system and more, organized to be both readable and searchable.  It will stay up to date with the current version of the app running on reviewable.io, so it may reference features that are not yet available to Enterprise, or that you have not yet deployed.  If this turns out to be a major issue we'll figure out a solution, but for now think of it as an additional incentive to update often!
- <kbd>Upd:</kbd> fill in missing properties in the result of a custom review completion condition with values from the output of the built-in default condition.  This will make it easier to tweak things without having to take on maintenance of the full condition.
- <kbd>Upd:</kbd> support `refreshTimestamp` in completion condition output structure, to determine when it should be re-evaluated.  Also add `lastActivityTimestamp` to discussion participants and `timestamp` to file reviewer marks (the latter will not be available for marks made in older versions).  See the new user guide for a full explanation of how this works!
- <kbd>Upd:</kbd> add `review.pullRequest.requestedTeams` to the review state data made available to custom review completion conditions.  Old reviews are _not_ eagerly backfilled, but will gain the property when synced for any reason (e.g., being visited in the browser).
- <kbd>Upd:</kbd> regularly delete stale cached info for users who never signed in to Reviewable.  This will help reduce the size of the users collection, which can eventually cause performance problems.
- <kbd>Upd:</kbd> add `showHideAllComments` bindable command.
- <kbd>Fix:</kbd> make the warning icon show up correctly in merge button.
- <kbd>Fix:</kbd> update Reviewable's cached mergeability state promptly if Reviewable status check is required in GitHub.  Prior to this fix, actions that changed the review's completion status would not be reflected in the mergeability state until the user reloaded the review page or something else triggered a sync.
- <kbd>Fix:</kbd> if review creation fails on visit, display error correctly in the browser.
- <kbd>Fix:</kbd> immediately recognize GitHub auth upgrades (new OAuth scopes) instead of getting stuck and requiring the user to reload the page.
- <kbd>Fix:</kbd> eliminate a race condition on GitHub auth upgrades where some GitHub API calls would be issued too early (with the old token) and fail.
- <kbd>Fix:</kbd> ensure that GitHub auth upgrades don't accidentally switch to a different account, if the user signed in with a different username to GitHub but not Reviewable.
- <kbd>Fix:</kbd> prevent spurious server shutdowns when fetching very long lists of items to process during background sweeps.
- <kbd>Fix:</kbd> resize comment area if details element expanded (e.g., "Quoted NN lines of code...").

<sub>**Enterprise release 2017.3170** (min 1992.2986 GHE 2.12 - 2.20) 2018-12-14 <!-- enterprise 2017.3170 --></sub>

- <kbd>Upd:</kbd> show a yellow warning sign on the merge button if non-required checks are failing, instead of a red one which is now reserved for admin overrides of required checks.
- <kbd>Fix:</kbd> correctly compute height of file matrix when concealing/revealing obsolete files.
- <kbd>Fix:</kbd> when navigating to a file in a review, avoid animating the header multiple times if the user has visited multiple review pages during the session.
- <kbd>Fix:</kbd> in the "mark reviewed and go to next file" button, hitting the small red button will now also advance to the next file instead of only marking it as reviewed.  This was a regression from a version or two ago.
- <kbd>Fix:</kbd> avoid a "not ready" crash when clicking on a disabled Merge button.
- <kbd>Fix:</kbd> compute mergeability status correctly and in a timely fashion in all (or at least more) situations when branch protection is turned on.
- <kbd>Fix:</kbd> don't lock up the dashboard when user types a partial URL into the search box.
- <kbd>Fix:</kbd> in markdown comments, don't treat multiple triple-backticks on the same line as an unclosed code block since GitHub renders them as if though they were inline single-backticks instead.
- <kbd>Fix:</kbd> respect no-animation setting in merge options dropdown.

<sub>**Enterprise release 2003.3043** (min 1992.2986 GHE 2.12 - 2.20) 2018-11-28 <!-- enterprise 2003.3043 --></sub>

- <kbd>Upd:</kbd> remove "butterfly" onboarding mechanism, to be replaced by a more conventional (and less hate-inspiring) checklist as part of the Vue rework at a later date.
- <kbd>Upd:</kbd> exclude merged and closed PRs from the "Awaiting my action" section on the dashboard.
- <kbd>Upd:</kbd> adjust sorting order of blocking avatars on the dashboard to be easier to parse visually.
- <kbd>Fix:</kbd> correctly send sample review data if no PR selected when editing custom review completion condition.
- <kbd>Fix:</kbd> reinstate rebased revision matching arcs above the file matrix and file header revision cells.  If the source branch was rebased, these show Reviewable's guess at how the revisions match up.  They disappared a while back and are now back as part of the Vue migration.
- <kbd>Fix:</kbd> make issue (`#`) autocomplete work in comments again.
- <kbd>Fix:</kbd> protect against breakage if a username, organization name, or repository name happens to match a built-in property name.
- <kbd>Fix:</kbd> render markdown checkboxes in comments as checked when they are.
- <kbd>Fix:</kbd> avoid extremely rare internal error crash when diffing.
- <kbd>Fix:</kbd> gracefully handle situation where a user who turned on an organization's "All current and future repos" toggle loses admin permissions but still has pull permissions.
- <kbd>Fix:</kbd> ensure that the second and later runs of background cron tasks start from the beginning, rather than mistakenly resuming at the last checkpoint of the previous run.

<sub>**Enterprise release 1994.2998** (min 1992.2986 GHE 2.12 - 2.20) 2018-11-19 <!-- enterprise 1994.2998 --></sub>

- <kbd>Upd:</kbd> prevent rollbacks to version that use the old Firebase SDK.  It's now safe to remove the `REVIEWABLE_FIREBASE_AUTH` environment variable from your configuration, and revoke the legacy secret(s) if you'd like to do so.
- <kbd>Fix:</kbd> avoid bogus "offline" state with pending writes that never goes away, caused by an unfixable false positive in the shared web worker client abandonment detection logic.  The trade-off is that now if a Reviewable tab exits abruptly, some resources in the shared worker won't be released.  However, closing _all_ Reviewable tabs will always dispose of the worker, so it's a good thing to try if you find your browser resource usage creeping up inexplicably.
- <kbd>Fix:</kbd> correctly treat the "Show pull requests not yet connected to Reviewable" toggle on the dashboard as being on by default, if the user never toggled it manually.  Previous versions used to show it as on, but behaved as if it was off.
- <kbd>Fix:</kbd> on the dashboard, don't show a status spinner forever for unconnected pull requests.  (Esthetic fix only, as there's nothing more to show anyway.)
- <kbd>Fix:</kbd> prevent the merge button from getting stuck disabled when in Squash merge mode.  This change moves fetching the commits from GitHub to generate the automatic merge commit message to later in the process, so if this phase fails the merge will fail with an appropriate error message rather than the button getting stuck.
- <kbd>Fix:</kbd> avoid a crash when the user signs out halfway through merging a PR.
- <kbd>Fix:</kbd> work around corrupted Firebase state when the client crashes with an `InvalidStateError`.  Prior to this fix, all subsequent page loads would fail with permission denied errors until the user closed _all_ Reviewable tabs to flush the shared worker.
- <kbd>Fix:</kbd> raise timeout when checking permissions on all of the user's repos, to allow for a large number of repos even if the GitHub API server is pretty busy.
- <kbd>Fix:</kbd> don't crash if a bulk permission check fails and a targeted permission check returns false.

<sub>**Enterprise release 1992.2986** (min 1975.2968 GHE 2.12 - 2.20) 2018-10-31 <!-- enterprise 1992.2986 --></sub>

- <kbd>New:</kbd> automatically archive old reviews to save space and prevent the monthly sweep from overloading Firebase.  Closed reviews are archived aggressively, while seemingly abandoned open reviews will be archived after a longer period of time, based on the time of last access (or review creation if never accessed).  Archived reviews remain in Firebase (and encrypted) and will be transparently restored as needed.  The only place where this feature is visible to users is on the reviews dashboard, where archived reviews will show their status as "Archived" until restored via a visit and may not show up in the correct category.
- <kbd>Upd:</kbd> switch the client to the current version of the Firebase SDK.  All users will be signed out the first time they load a Reviewable page with this version, but currently open pages from the previous version will not be interrupted.  No config updates required beyond those from the previous version.
- <kbd>Fix:</kbd> don't list reviews where the user is just a mentionee under the "being reviewed by you" category on the dashboard, but do list self-reviews there.  A side-effect of this fix is that some older reviews will show up in a category lower than "being reviewed by you" until somebody visits them again, but this shouldn't be a problem going forward.
- <kbd>Fix:</kbd> include files that were renamed with no other changes in the review state passed to the custom review completion condition.
- <kbd>Fix:</kbd> supply correct sentiment timstamp to custom review completion condition when executing in a preview or pre-publication context.  Since version 1831.2835, conditions were sometimes given a bogus object instead of a timestamp that could cause the condition to fail or produce inaccurate results.
- <kbd>Fix:</kbd> prevent batch cron jobs from disturbing the Firebase cache.
- <kbd>Fix:</kbd> address even more edge cases when rebasing to avoid ending up with a broken review.
- <kbd>Fix:</kbd> avoid some crashes when user signs in and out very quickly.  This should pretty much never occur in real usage, but did during github.com's recent breakdown where they were handing out auth tokens but immediately refusing to accept them!
- <kbd>Fix:</kbd> defuse race condition that could let users try to create a line comment after signing in but before their review state was loaded, resulting in a crash.

<sub>**Enterprise release 1975.2968** (min 1866.2875 GHE 2.12 - 2.20) 2018-10-19 <!-- enterprise 1975.2968 --></sub>

- <kbd>Upd:</kbd> **CONFIG UPDATE REQUIRED** switch the server to the current version of the Firebase SDK.  The new SDK addresses some long-standing Firebase bugs, in particular greatly ameliorating (but not quite fixing) the stuck transactions that cause Reviewable servers to restart themselves frequently under load.  However, this new SDK **requires different credentials** to initialize the connection to Firebase.  Please check the updated [config docs](https://github.com/Reviewable/Reviewable/blob/master/enterprise/config.md) for instructions on where to find the bits you'll need in the Firebase console and how to set the `REVIEWABLE_FIREBASE_WEB_API_KEY` and `REVIEWABLE_FIREBASE_CREDENTIALS_FILE` environment variables.  Please keep the old `REVIEWABLE_FIREBASE_AUTH` around for now, until the client gets updated to the new SDK as well in an upcoming release.  In case you have a very twitchy firewall, note that the new Firebase SDK will send requests to various subdomains of `googleapis.com` as part of the updated auth token management mechanism.
- <kbd>Upd:</kbd> update syntax highlighting library, review and update file extension mappings, and subset library to a more commonly used set of languages based on analytics data from reviewable.io.  If you find that some file types are no longer highlighted correctly, please let me know and I'll add them to the next release.
- <kbd>Fix:</kbd> handle even rarer edge cases when rebasing to avoid ending up with a broken review.
- <kbd>Fix:</kbd> prevent rare permission denied crash when loading an uninitialized review.
- <kbd>Fix:</kbd> prevent permission denied crash when creating a comment on a base revision of a renamed file where the original source file had been recreated in the PR at or before that revision.  The comment will now be created on the nearest possible equivalent base revision instead.
- <kbd>Fix:</kbd> avoid rare crash due to race condition in the contextual help subsystem.
- <kbd>Fix:</kbd> invite user to sign in when landing on a review page they have permission for but where the review hasn't been created yet, instead of getting stuck.
- <kbd>Fix:</kbd> avoid false negative liveness checks that cause an automated server restart when a cron job is starting up.

<sub>**Enterprise release 1911.2952** (min 1866.2875 GHE 2.12 - 2.20) 2018-10-08 <!-- enterprise 1911.2952 --></sub>

- <kbd>New:</kbd> allow user to set a default query for the Reviews page
- <kbd>Upd:</kbd> add `±starred` and `±watched` filters for use in Reviews queries.
- <kbd>Upd:</kbd> migrate Merge button from AngularJS to VueJS.  There should be no user-visible differences, except perhaps an incidental fix to a rare bug in applying default settings.  This is just the first step in the migration of the entire UI to VueJS; unlike the big-bang model migration and attendant beta, this one will proceed piecemeal over the coming months.  I won't call out further VueJS updates in the changelog unless they have user-visible effects.
- <kbd>Fix:</kbd> accept `check_run` and `check_suite` events.
- <kbd>Fix:</kbd> correctly abandon processing of comment events if the comment still can't be found after an hour.
- <kbd>Fix:</kbd> correctly handle some edge cases when a branch gets rebased onto one of its own commits, where previously this could result in a permanently broken review.
- <kbd>Fix:</kbd> don't crash when the user requests a preview of the outgoing drafts, then edits one of them at just the wrong moment.
- <kbd>Fix:</kbd> don't get stuck waiting forever for data when the user switches pages at just the right time to trigger a race condition.  This could happen most easily when switching from Reviews to Repositories and back before the Repositories page fully loaded, but could have affected other transitions as well.
- <kbd>Fix:</kbd> remove top discussion draft area from bunny dropdown when user not signed in (otherwise typing in it would cause a crash).

<sub>**Enterprise release 1883.2928** (min 1866.2875 GHE 2.12 - 2.20) 2018-09-09 <!-- enterprise 1883.2928 --></sub>

- <kbd>Upd:</kbd> don't count participation in resolved dicussions towards inclusion in the "being reviewed by me" section on the dashboard.
- <kbd>Upd:</kbd> restart the server if Firebase liveness check fails for more than about a minute.  This can help reset zombie connections to Firebase in some edge cases.
- <kbd>Upd:</kbd> removed many rarely used languages from the syntax highlighting library pack to significantly reduce code size.
- <kbd>Fix:</kbd> set correct font for draft text boxes.  This regression caused draft boxes to be sized incorrectly, which made long messages harder to input.
- <kbd>Fix:</kbd> back off the retry interval when dealing with GitHub's 422 bug for setting refs, and log retries to make this situation easier to debug.
- <kbd>Fix:</kbd> ensure that the "unresolved N" toolbar button (for N > 0) will always navigate to a discussion.  Previously, it was bound to navigate to the next discussion _without a draft_.  Also introduce new commands for the two navigation variants and rebind default keys to the new semantics.
- <kbd>Fix:</kbd> bring back the "draft saved" indicator when editing draft comments.
- <kbd>Fix:</kbd> eliminate rare crash when publishing comments due to rendered value being `undefined`.
- <kbd>Fix:</kbd> prevent some rare crashes when quickly navigating to a review from the dashboard and back.
- <kbd>Fix:</kbd> prevent some permission denied errors that could occur if the connection dropped while publishing.

<sub>**Enterprise release 1872.2918** (min 1866.2875 GHE 2.12 - 2.20) 2018-08-25 <!-- enterprise 1872.2918 --></sub>

- <kbd>Upd:</kbd> mark stalled reviews with an icon in the reviews list.
- <kbd>Upd:</kbd> raise LOC thresholds for considering a diff "big" and hiding it by default.
- <kbd>Fix:</kbd> dynamically back off pull request list request size when we run into GitHub's GraphQL bug.  The request size used to be a static value picked to work "most of the time", but could still result in incomplete results sometimes (with a warning shown to the user).  This new approach should be more reliable.
- <kbd>Fix:</kbd> for the `sandcastle` custom completion condition executor, fix error formatting and add support for `require`ing a hardcoded list of built-in modules.
- <kbd>Fix:</kbd> better tolerate malformed custom line link templates, and show any errors in the settings dropdown.
- <kbd>Fix:</kbd> support double-click text selection in diffs, as best as possible.  It still races with discussion creation and, if animated transitions are on, will sometimes immediately deselect the text.
- <kbd>Fix:</kbd> make `setCurrentDiscussionDisposition` work properly when editing a draft reply.
- <kbd>Fix:</kbd> increase reliability of redirect flavor of sign-in flow, and make it work in Edge.
- <kbd>Fix:</kbd> ensure that tooltips (e.g., on the toolbar counts) don't show stale descriptions sometimes.
- <kbd>Fix:</kbd> correctly compute unresolved / unreplied discussions when dismissals are pending.
- <kbd>Fix:</kbd> prevent UI elements (e.g., the Publish button) from occasionally disappearing when transition animations are turned off.
- <kbd>Fix:</kbd> promptly update mergeability and show merge button when branch protection is turned on in a repo.
- <kbd>Fix:</kbd> correctly style implicit code snippets in markdown, instantiated automatically by GitHub in response to a blob line range link.

<sub>**Enterprise release 1868.2890** (min 1866.2875 GHE 2.12 - 2.20) 2018-08-04 <!-- enterprise 1868.2890 --></sub>

- <kbd>New:</kbd> add a "Mark reviewed and go to next file / diff next revision" button at the bottom of diffs that need reviewing.  Also add a bindable command for this action (not bound by default).
- <kbd>Upd:</kbd> change the semantics of the "to review" counter in the toolbar to "to review in the current diffs" (as originally planned), and fix the Changes box in the toolbar to turn the revision red when there are more files to review at a different revision.
- <kbd>Fix:</kbd> correctly enforce min versions.  The last few releases will not automatically enforce the minimum rollback versions listed here, but please make sure to respect them nonetheless if you need to roll back.
- <kbd>Fix:</kbd> include commit status context name in the description shown in the Checks dropdown.
- <kbd>Fix:</kbd> make sure disposition dropdowns don't layer under another file's revision cells.
- <kbd>Fix:</kbd> avoid race condition when preparing the Merge Branch button that would sometimes result in user's settings being ignored.
- <kbd>Fix:</kbd> don't collapse a discussion as soon as a draft reply is created, but rather wait until it's sent.
- <kbd>Fix:</kbd> correctly handle repos with dots in their name on the Repositories page.
- <kbd>Fix:</kbd> force a permission refresh if a newly created repo is detected on the Repositories page.
- <kbd>Fix:</kbd> prevent crash when repeatedly editing settings of repos in multiple organizations on the Repositories page.
- <kbd>Fix:</kbd> update evaluated value when editing completion condition while an evaluation is already in progress.

<sub>**Enterprise release 1866.2875** (min 1831.2835 GHE 2.12 - 2.20) 2018-07-24 <!-- enterprise 1866.2875 --></sub>

- <kbd>New:</kbd> if a user is mentioned in a discussion (other than the main top-level thread), don't treat them as a reviewer unless they've taken review-like actions, e.g., marked a file as reviewed or started a new discussion.  This way, if you come into a review because somebody mentioned you to ask for spot advice, you won't see all files as to be reviewed and many discussions as to reply.
- <kbd>New:</kbd> disable "Approve" and "Request changes" publication options if custom review completion condition sets `disableGitHubApprovals` to `true` in its return value.  This is useful for teams that have an LGTM-centric workflow and don't want the confusion of GitHub approvals (even if they're ignored).
- <kbd>New:</kbd> added REVIEWABLE_LOG_GITHUB_API_LATENCY and REVIEWABLE_GITHUB_CACHE_SIZE environment variables.  See [configuration docs](https://github.com/Reviewable/Reviewable/blob/master/enterprise/config.md) for details.
- <kbd>Upd:</kbd> make review synchronization more efficient for repositories with large file trees.  This especially impacts cases where a directory has a lot (1000+) of immediate subdirectories, which could previously bring the server to a virtual standstill.
- <kbd>Fix:</kbd> use commit timestamp instead of authoring timestamp when sorting commits or generating revision descriptions in top-level thread.  While these timestamps are usually the same, in some rebase or merging scenarios they can drift apart, and using the original authoring timestamp can result in new revision descriptions being considered "read".
- <kbd>Fix:</kbd> ensure constrast slider shows up in correct position when settings dropdown is opened.
- <kbd>Fix:</kbd> fix sample review completion condition for counting approvals; the previous code wouldn't actually do so.  Oops.
- <kbd>Fix:</kbd> allow repo admins to merge when GitHub's branch protection would normally block it but admins are exempted.
- <kbd>Fix:</kbd> display correct loading message when waiting for a review to be created (usually only in a disconnected repo).
- <kbd>Fix:</kbd> guard against various failures when `REVIEWABLE_LOGGING_URL` is specified.
- <kbd>Fix:</kbd> avoid producing temporarily invalid review structures when some events get handled out of order.  This could result in a "permission denied" message on the client while waiting for the review creation to finish.

<sub>**Enterprise release 1844.2857** (min 1831.2835 GHE 2.12 - 2.20) 2018-07-14 <!-- enterprise 1844.2857 --></sub>

- <kbd>New:</kbd> integrate with GitHub's review approval system.  When publishing from Reviewable you can set whether to approve, request changes, or just comment, with Reviewable picking a default state based on your discussion dispositions and file review marks.  This state gets published to GitHub and will be used by the branch protection system's required reviews option.  Reviewers' current effective state is also reflected in Reviewable (in the reviews list and on the review page) and available for use in custom review completion conditions.  ([Full changelog entry](https://www.reviewable.io/blog/github-reviews-integration/))
- <kbd>New:</kbd> add "Trust but verify" user setting.  When turned on, discussions where the user is _Discussing_ and that get resolved with no further comment will be treated as unreplied.  The new setting panel can be accessed from any disposition dropdown via a small gear icon.  ([Full changelog entry](https://www.reviewable.io/blog/trust-but-verify/))
- <kbd>Upd:</kbd> moved time-ago comment dividers ("N days ago", etc.) to be above the corresponding time period, rather than below, in a nod to widespread convention.
- <kbd>Upd:</kbd> if branch protection is turned on then defer to GitHub's mergeability determination, since we can't accurately duplicate the logic.  Note that this may result in Reviewable offering the option to merge earlier than it used to, if branch protection is set up more loosely than Reviewable's old built-in logic.
- <kbd>Fix:</kbd> update PR mergeability status in Reviewable on all events that could affect it, and do so in a timely manner.
- <kbd>Fix:</kbd> correctly use a default emoji if custom LGTM button output text is complex.
- <kbd>Fix:</kbd> make toolbar dropdowns (checks, changes) show up correctly when page is scrolled down.
- <kbd>Fix:</kbd> correctly list commits within diff bounds for current file in changes dropdown.

<sub>**Enterprise release 1831.2835** (min 1801.2799 GHE 2.12 - 2.20) 2018-07-02 <!-- enterprise 1831.2835 --></sub>

- <kbd>New:</kbd> allow user to tweak the app's visual contrast (e.g., of diff highlighting) through account settings dropdown.
- <kbd>Upd:</kbd> emit the server-side review status (including a custom review completion condition, if so configured) when publishing a review.
- <kbd>Fix:</kbd> work around a GitHub GraphQL bug that causes PRs to be randomly omitted from the review list when the list gets long.
- <kbd>Fix:</kbd> in review list, correctly fetch requested reviewers for PRs that don't yet have connected reviews.
- <kbd>Fix:</kbd> avoid permission denied error in the client when loading a review that hasn't yet been created.
- <kbd>Fix:</kbd> avoid permission denied error if the client gets disconnected at just the wrong moment when publishing comments, then reconnects.
- <kbd>Fix:</kbd> snapshot revisions when user acknowledges, changes disposition, or dismisses a participant.
- <kbd>Fix:</kbd> prevent disposition dropdown from disappearing under another layer in rare cases.
- <kbd>Fix:</kbd> improve auto-recovery from wrong webhook secret.

<sub>**Enterprise release 1801.2799** (min 1785.2755 GHE 2.12 - 2.20) 2018-06-10 <!-- enterprise 1801.2799 --></sub>

- <kbd>New:</kbd> overhaul discussion semantics, including disposition, resolution, unreplied counts, etc.  See [this post](https://www.reviewable.io/blog/discussion-semantics-overhaul/) for a summary, and [issue #510](https://github.com/Reviewable/Reviewable/issues/510) for details.  The most intrusive UX change is that _all_ state changes are created as drafts and must now be published to take effect, including acknowledgements, disposition changes, and dismissals.  Otherwise, I've done as much as possible to ensure that reviews in progress won't be disrupted and that users with old clients still loaded can collaborate with those who have the new version, but there may still be some minor bumps during the transition.
- <kbd>Upd:</kbd> added `±am:author`, `±am:assigned`, and `±am:requested` filters to the reviews list.
- <kbd>Fix:</kbd> correctly calculate number of marks and reviewed files in the presence of renames.
- <kbd>Fix:</kbd> re-enable rebase merging, got disabled by accident.
- <kbd>Fix:</kbd> don't crash when client gets disconnected in the middle of a transaction.
- <kbd>Fix:</kbd> keep better track of currently focused file (for applying keyboard shortcuts).
- <kbd>Fix:</kbd> greatly improve loading performance for reviews with many files (hundreds or higher), especially if a lot of files were renamed.

<sub>**Enterprise release 1785.2755** (min 1755.2561 GHE 2.12 - 2.20) 2018-05-26 <!-- enterprise 1785.2755 --></sub>

- <kbd>Upd:</kbd> remove automatically generated :shipit: emoji from published messages as it could be confusing in multi-reviewer situations.
- <kbd>Upd:</kbd> add `review.pullRequest.creationTimestamp` to completion condition data; not backfilled but should populate pretty quickly.
- <kbd>Upd:</kbd> tolerate new discussion semantics (coming in the next release!) in case of rollback.
- <kbd>Fix:</kbd> if user grants new permissions when sending comments, actually use those permissions when sending.
- <kbd>Fix:</kbd> correctly process label directives for labels that have a description.
- <kbd>Fix:</kbd> restore last-reviewer avatars in the file matrix.
- <kbd>Fix:</kbd> correctly configure merge button to delete or retain branch based on user settings and permissions.
- <kbd>Fix:</kbd> avoid unnecessarily updating the review when syncing a PR.
- <kbd>Fix:</kbd> correctly handle the "include administrators" branch protection flag.
- <kbd>Fix:</kbd> avoid occasional permission denied error when reconnecting to the network after a long time offline.
- <kbd>Fix:</kbd> address some very rare client crashes caused by race conditions and data edge cases.
- <kbd>Fix:</kbd> actually sort the repository lists on the Repositories page; they were only (mostly) sorted by accident before.

<sub>**Enterprise release 1777.2720** (BETA, min 1755.2561 GHE 2.12 - 2.20) 2018-04-26 <!-- enterprise 1777.2720 --></sub>

- <kbd>New:</kbd> enforce a minimum supported GHE version, starting with the relatively recent GHE 2.12.  This lets Reviewable take advantage of new APIs sooner, in particular new additions to GraphQL data.  The policy is to always support the two most recent GHE versions and the three most recent if possible.
- <kbd>New:</kbd> this release includes a complete rewrite of the client's data / logic layer for improved performance and consistency.  One extra bonus is that communication with Firebase is moved into a worker thread, offloading all the crypto to where it doesn't block the UI.  When using Chrome or Firefox the worker is shared between tabs, improving bootstrap time on subsequent tabs due to the connection already being established, and providing a shared data cache.
- <kbd>New:</kbd> offer option to load all diffs when any were skipped for any reason (e.g., throttling, too many files, etc.).
- <kbd>New:</kbd> make requested reviewers available to review completion conditions and update the samples to prefer requested reviewers over assignees when set.  If your users have custom review completion conditions for their repos they may want to tweak them as well.
- <kbd>New:</kbd> make available a new directive (`±reviewer:@username`) to manage requested reviewers, via any comment (in Reviewable, via GitHub, or via email).
- <kbd>New:</kbd> display how long ago each participant in a review last interacted with the review, and whether they have any drafts pending.  (Note that clients prior to this version don't report this information, so people who are hoarding an old Reviewable page will appear to be idle and have no pending drafts.)
- <kbd>New:</kbd> support `Merge manually by overwriting target` label to improve diffs in forked repos being synced with upstream changes; see [this changelog entry](https://www.reviewable.io/blog/reviews-in-forked-repos-that-track-upstream-changes/) for details.
- <kbd>Upd:</kbd> allow filter negation in reviews list and add more filters.
- <kbd>Upd:</kbd> reduce reviews list request and bandwidth requirements, and show labels and milestones even for unconnected PRs (thanks GraphQL!).
- <kbd>Upd:</kbd> add "waiting on me" and "being reviewed by me" sections to reviews list, and show blocking users instead of assignees next to the pointing hand.
- <kbd>Upd:</kbd> include reviews requested from your teams in the "involving my teams" section, and consider ancestor teams as well in all team-related queries.
- <kbd>Upd:</kbd> make review list search field bigger, and combine with pull request URL jump field.
- <kbd>Upd:</kbd> sort C/C++ header files before their corresponding implementation files.
- <kbd>Upd:</kbd> add support for label descriptions, when available.
- <kbd>Upd:</kbd> move "show full diff" button lower in the Changes box and make it available all the time.
- <kbd>Upd:</kbd> if a GitHub `pull_request` event was missed for a connected repository for some reason, create the review if any auxiliary events come in for it later.  This was already the case for comments, but now works for `push` and `status` events too.
- <kbd>Fix:</kbd> don't crash when adding a comment to the base of certain revisions of a renamed file.
- <kbd>Fix:</kbd> take diff regions that are collapsed by default (e.g., whitespace, base changes) into consideration when computing the size of the diff to decide whether it's too big to show.
- <kbd>Fix:</kbd> expand multi-line diff selections to include full first and last lines, and adjust rendering of collapsed quoted code to work with the latest GitHub Markdown renderer.
- <kbd>Fix:</kbd> work around a bug in Firefox where up/down cursor keys wouldn't work in a reply to a discussion until it was blurred and refocused.
- <kbd>Fix:</kbd> work around rare bug where page scrolled to the top and stayed stuck there after clicking Acknowledge (possibly limited to Firefox).
- <kbd>Fix:</kbd> prevent disabled dropdowns from getting re-enabled after display help overlay.

<sub>**Enterprise release 1761.2574** (min 1664.2314) 2018-03-18 <!-- enterprise 1761.2574 --></sub>

- <kbd>Fix:</kbd> deal correctly with rate limiting on GHE (whether turned on or off).

<sub>**Enterprise release 1757.2561** (min 1664.2314) 2018-03-15 <!-- enterprise 1757.2561 --></sub>

- <kbd>Fix:</kbd> use correct URL for GHE GraphQL queries.

<sub>**Enterprise release 1745.2527** (min 1664.2314) 2018-03-11 <!-- enterprise 1745.2527 --></sub>

- <kbd>Upd:</kbd> respect Go's standard "generated file" marker.
- <kbd>Upd:</kbd> use GraphQL when handling `push` events on the server instead of search API.
- <kbd>Upd:</kbd> prefer requested reviewers if set instead of assignees when determining who is needed to review a PR in the default review completion condition.  This change is on the server only and sets the stage for matching client-side changes coming in a follow-up release.
- <kbd>Fix:</kbd> add hard timeouts when checking queue health, to ensure that the process can never get stuck even if Firebase is down and its SDK is buggy.  This _should_ prevent Reviewable processes from going zombie in extreme and rare circumstances, where they're still alive but not doing any useful work.
- <kbd>Fix:</kbd> catch and handle some rare top-level exceptions that could cause a server process to go zombie.
- <kbd>Fix:</kbd> gracefully handle hiccups during comment sending that cause a duplicate write.
- <kbd>Fix:</kbd> don't die when a commit has more than 100 different status contexts.
- <kbd>Fix:</kbd> reset repeating cron job counters between runs.
- <kbd>Fix:</kbd> prevent error when connecting an empty repo.

<sub>**Enterprise release 1694.2348** (min 1664.2314) 2018-01-17 <!-- enterprise 1694.2348 --></sub>

- <kbd>New:</kbd> sweep database every 30 days to fix things up and delete stale redundant data, reducing long-term storage requirements.  Deleted data will be automatically refetched from GHE if needed later. WARNING: while a sweep is setting up, the instance will be temporarily locked out of doing other work for up to a few minutes. Please make sure you have at least 2 instances running at all times to avoid outages.
- <kbd>Upd:</kbd> remove `/_ah/start` and `/_ah/stop` handlers, add `/_ah/ready` handler, and listen to `SIGTERM` for graceful shutdown.  If you were using those handlers or are using health checks on your instances, please see the [updated configuration docs](https://github.com/Reviewable/Reviewable/blob/master/enterprise/config.md#container-configuration).
- <kbd>Upd:</kbd> replace `REVIEWABLE_GITHUB_CERT_FILE` config option with `NODE_EXTRA_CA_CERTS`.
- <kbd>Fix:</kbd> if a large tree fetch from GHE fails to parse incomplete data, treat it as a truncated result and fall back on manually recursing smaller fetches.  This should reduce transient errors when syncing reviews.

<sub>**Enterprise release 1678.2324** (min 1664.2314) 2018-01-10 <!-- enterprise 1678.2324 --></sub>

- <kbd>Fix:</kbd> sweep all reviews to correct broken owner/repo properties from renamed organizations and repositories.
- <kbd>Fix:</kbd> correctly compute review state on the server when faced with complex file rename chains.  This affects both the built-in review completion computation and custom completion conditions.
- <kbd>Fix:</kbd> bootstrap correctly on first install (again).

<sub>**Enterprise release 1664.2314** (min 1549.2198) 2017-12-11 <!-- enterprise 1664.2314 --></sub>

- <kbd>Upd:</kbd> update server to Node 8.
- <kbd>Fix:</kbd> correctly adjust reviews' owner/repo properties when processing an organization or repository name change.  Badly adjusted reviews will have some properties still pointing to the old owner/repo, which can cause permission grants to fail and users to be improperly denied access to the reviews.  This fixes the problem going forward, and a later change will fix the properties of reviews previously created in subsequently renamed repositories.
- <kbd>Fix:</kbd> don't overwrite disposition changes on discussions with comments imported from GitHub.

<sub>**Enterprise release 1655.2258** (min 1549.2198) 2017-12-01 <!-- enterprise 1655.2258 --></sub>

- <kbd>New:</kbd> add REVIEWABLE_GITHUB_CERT_FILE config option, for GHE servers with self-signed TLS certs.
- <kbd>Fix:</kbd> reduce number of GitHub status updates to avoid running into hardcoded limit in API.
- <kbd>Fix:</kbd> omit files whose revisions are all obsolete from proposed diffs, preventing the "each-commit" review workflow from getting "stuck" after marking all files reviewed.
- <kbd>Fix:</kbd> bootstrap correctly on first install when there are no reviews yet.
- <kbd>Fix:</kbd> correctly parse "Last, First" format names when sending emails; this format is sometimes used by user directory sync systems.
- <kbd>Fix:</kbd> avoid resetting `maintainer_can_modify` on PRs, due to a GitHub API bug.

<sub>**Enterprise release 1638.2247** (min 1549.2198) 2017-10-08 <!-- enterprise 1638.2247 --></sub>

- <kbd>Fix:</kbd> correctly deal with bot users introduced by the new(ish) GitHub Apps API.
- <kbd>Fix:</kbd> when collapsing a discussion (e.g., by clicking Acknowledge) whose top is off-screen, prevent the page from seeming to "jump down" to unrelated content.
- <kbd>Fix:</kbd> mark revisions as `obsolete` in data structure passed to custom review completion conditions.  You'll likely need to [update your condition code](https://www.reviewable.io/blog/completion-conditions-and-obsolete-revisions/), especially if you use force pushes in your workflow.

<sub>**Enterprise release 1619.2237** (min 1549.2198) 2017-08-16 <!-- enterprise 1619.2237 --></sub>

- <kbd>New:</kbd> added `REVIEWABLE_CONSOLE_MULTILINE_SEPARATOR` config option for environments that expect one-message-per-line console output.  See [config docs](https://github.com/Reviewable/Reviewable/blob/master/enterprise/config.md#monitoring) for more details.
- <kbd>Upd:</kbd> change AWS Lambda environment for review completion function execution from Node 4.3 to Node 6.10.
- <kbd>Fix:</kbd> detect errors caused by a suspended account and treat as a permanent issue (send email, disable repo connection).
- <kbd>Fix:</kbd> ensure resolved discussions stay collapsed when layout triggered (e.g., due to window resize).
- <kbd>Fix:</kbd> ensure expanded diff regions stay expanded when layout triggered (e.g., due to window resize).
- <kbd>Fix:</kbd> detect `CRLF` line-ending style and don't highlight `CR`s as trailing whitespace.
- <kbd>Fix:</kbd> correctly discriminate between "no basis for comparison between HEAD and BASE" and "all revisions are obsolete" errors when syncing a PR.

<sub>**Enterprise release 1607.2231** (min 1549.2198) 2017-07-18 <!-- enterprise 1607.2231 --></sub>

- <kbd>Fix:</kbd> improve large diff suppression by estimating a diff's impact on UI performance more accurately, and considering the sum total of all showing diffs rather than each file separately.
- <kbd>Fix:</kbd> short-circuit mergeability check on closed PRs to avoid waiting for a GitHub flag that never settles.
- <kbd>Fix:</kbd> correctly send warning emails about failures to parse user emails with Reviewable directives.
- <kbd>Fix:</kbd> deal gracefully with commits reverted via force push when no new commits are pushed at the same time.
- <kbd>Fix:</kbd> correctly diagnose errors with in-comment-badge author settings, sending emails to repo connector.
- <kbd>Fix:</kbd> change no-final-EOL glyph in diffs to be non-combining, to work around a Chrome rendering bug.

<sub>**Enterprise release 1592.2216** (min 1549.2198) 2017-06-07 <!-- enterprise 1592.2216 --></sub>

- <kbd>Upd:</kbd> create a sample Reviewable commit status when connecting a repo so that it's visible when configuring branch protection settings in GitHub before creating a PR.
- <kbd>Upd:</kbd> update syntax highlighting module and add Kotlin source file extension mappings.
- <kbd>Fix:</kbd> correctly enforce minimum version requirements; the previous logic was too strict and would disallow rollbacks that should've been permitted.

<sub>**Enterprise release 1575.2214** (min 1549.2198) 2017-05-20 <!-- enterprise 1575.2214 --></sub>

- <kbd>New:</kbd> allow organization owners to request automatic connection of all newly created repos to Reviewable.  You can find the new toggles on the Repositories page.  You can do it for personal repos as well, but the reaction to a new repo may be delayed by up to 2 minutes (since there's no webhook for personal repo creation).
- <kbd>Upd:</kbd> upgrade all connected repos to listen to _all_ GitHub webhook events.  This process will kick off automatically within minutes of starting up the new version and continue (with checkpoints) until finished, probably within a few minutes and definitely in less than 30 minutes.  (If you're doing a rolling upgrade, it may get delayed or start right away &mdash; either one is fine.)  While running, the upgrade process will keep one instance pretty busy so you might not want to upgrade during peak hours.  If you want to follow along, look for log lines with the token "migrate1549" for (minimal) status updates, and a final summary log line starting with "Migrated NNN legacy repositories" that indicates completion.  It's OK even if there's a few failures, as any repo that isn't completely idle will get updated the next time it sends a webhook anyway.  This upgrade process just hurries things along.
- <kbd>Fix:</kbd> prevent occasional "permission denied" crash when upgrading OAuth scopes on the Reviews or Repositories page.
- <kbd>Fix:</kbd> prune obsolete webhooks more aggressively in case they got migrated from github.com to GHE.

<sub>**Enterprise release 1555.2206** (min 1313.2023) 2017-05-09 <!-- enterprise 1555.2206 --></sub>

- <kbd>Fix:</kbd> use correct ghost user ID for GHE (substituted when a user account has disappeared for some reason).
- <kbd>Fix:</kbd> prevent spurious @-mentions of organizations or people with no access to repo from adding participants to a discussion.
- <kbd>Fix:</kbd> if a repo's GitHub status updates are set to "if review visisted", and a status was posted for a review, and a new PR/review was created for the same commit, then keep updating the status even if the new review wasn't visited yet.  The previous logic changed the status to "disabled by admin" which was confusing and incorrect.
- <kbd>Fix:</kbd> prevent a client crash when running in private mode and navigating directly to a review page before signing in (regression).

<sub>**Enterprise release 1549.2198** (min 1313.2023) 2017-04-30 <!-- enterprise 1549.2198 --></sub>

- <kbd>New:</kbd> show list of users occupying licensed seats when clicking on "M of N seats in use" in license info box on Repositories page.
- <kbd>New:</kbd> support migrating review data from reviewable.io to new enterprise instance, in case of migration from github.com to GHE.
- <kbd>Upd:</kbd> listen to _all_ GitHub webhook events for connected repos. This change will allow Reviewable to more easily support new GitHub features while remaining backwards-compatible with older GHE versions. It does mean that Reviewable instances will have to handle a higher load of incoming requests so you'll want to check your performance metrics after upgrading if you're not auto-scaling. (But unwanted events are dropped very quickly, so I don't expect a big impact.) For now, webhooks are updated to the new format opportunistically; a future release will sweep up any remainders.
- <kbd>Upd:</kbd> always hide the file matrix on load if >200 files to improve performance, overriding the user's preference.  You can still toggle the file matrix open after the page loads if you want.
- <kbd>Fix:</kbd> if popup auth gets stuck (seems to happen in some mobile browsers?) time out after 2 seconds and switch to using the redirect method instead.
- <kbd>Fix:</kbd> fix a time-of-check vs time-of-use bug when syncing a review with its PR that could result in bogus revisions being created in rare cases.
- <kbd>Fix:</kbd> make bindable `setCurrentDiscussionDisposition()` command work on newly created discussions that only have a draft comment.
- <kbd>Fix:</kbd> allow opening review files whose names start with a `.` in a new tab.

<sub>**Enterprise release 1531.2183** (min 1313.2023) 2017-04-18 <!-- enterprise 1531.2183 --></sub>

- <kbd>New:</kbd> add `REVIEWABLE_LOGGING_URL` setting to capture all console and exception logs in JSON format (if you don't want to set up Sentry and manually capture the server console); details in [config docs](https://github.com/Reviewable/Reviewable/blob/master/enterprise/config.md#monitoring).
- <kbd>New:</kbd> add button to copy the head branch name to the clipboard, and offer a bindable command for same.
- <kbd>Fix:</kbd> properly cancel comment file upload when progress placeholder deleted.
- <kbd>Fix:</kbd> render correct style in unchanged diff block due to changes in enclosing comments (two-column diffs only).
- <kbd>Fix:</kbd> don't crash server on startup if both encryption and local file uploads enabled.

<sub>**Enterprise release 1517.2159** (min 1313.2023) 2017-02-18 <!-- enterprise 1517.2159 --></sub>

- <kbd>Upd:</kbd> opportunistically fix webhooks when `REVIEWABLE_GITHUB_SECRET_TOKEN` is changed.
- <kbd>Fix:</kbd> reduce Firebase bandwidth usage again (regression).
- <kbd>Fix:</kbd> prevent occasional permission denied error when revision being snapshotted gets deleted mid-transaction.
- <kbd>Fix:</kbd> deal correctly with repos deleted and recreated multiple times with the same name.

<sub>**Enterprise release 1491.2156** (min 1313.2023) 2017-01-23 <!-- enterprise 1491.2156 --></sub>

- <kbd>Upd:</kbd> tighten up security headers when serving static files: `X-Content-Type-Options`, `X-Frame-Options`, and `X-XSS-Protection`.
- <kbd>Fix:</kbd> further improve workaround for Firebase transaction flakiness.  Detection is now more accurate and won't restart instances unnecessarily if other servers are picking up the load on affected keys.
- <kbd>Fix:</kbd> controlled instance restarts are now much faster (typically 5-10 seconds, max 60 seconds), whereas before they often timed out only after 5 minutes.

<sub>**Enterprise release 1445.2150** (min 1313.2023) 2017-01-15 <!-- enterprise 1445.2150 --></sub>

- <kbd>New:</kbd> support `REVIEWABLE_ANALYTICS_URL` to allow for tracking of major user actions and customized stats.  Please see the [config guide](https://github.com/Reviewable/Reviewable/blob/master/enterprise/config.md#monitoring) for details.
- <kbd>New:</kbd> enable subscription admin to restrict Reviewable users to members of a set of teams.  (The default is to continue to allow any GHE user to sign in.)
- <kbd>Upd:</kbd> upgrade server environment to Node v6.
- <kbd>Upd:</kbd> remove support for `GAE_MODULE_INSTANCE`, as the new GAE flex environment no longer provides this value and AFAIK no other container runner provides an ordinal instance number either.
- <kbd>Upd:</kbd> have server log errors with full stack traces to console if Sentry monitoring not set up.
- <kbd>Fix:</kbd> improve workaround for Firebase stuck transaction bug.  The condition will now be detected earlier, reducing thrashing, and can now recover without restarting the instance in many cases.
- <kbd>Fix:</kbd> set correct disposition on button-initiated "Done" reply when the user is the PR author and also a reviewer due to marking files as reviewed.  (Yes, all of those conditions are necessary to trigger the bug!)
- <kbd>Fix:</kbd> handle mixed-case emoji tokens correctly.
- <kbd>Fix:</kbd> handle a repo renaming corner case correctly (repo renamed then original recreated).

<sub>**Enterprise release 1394.2104** (min 1313.2023) 2016-12-09 <!-- enterprise 1394.2104 --></sub>

- <kbd>Fix:</kbd> switch client's production flag back on; it got accidentally turned off in 1390.2098, but the only effect was a slight performance degradation and a bit of extra monitoring UI in the lower-right corner

<sub>**Enterprise release 1390.2098** (min 1313.2023) 2016-12-08 <!-- enterprise 1390.2098 --></sub>

- <kbd>New:</kbd> respect `.gitattributes` `diff` attributes to suppress diffing of, e.g., generated files, or force diffing / pick syntax highlighting language
- <kbd>Upd:</kbd> allow specifying which user account should be the author of badge comments
- <kbd>Upd:</kbd> auto-fit diff width to window in finer increments
- <kbd>Fix:</kbd> eliminate bogus unhandled rejection errors on the server
- <kbd>Fix:</kbd> eliminate sporadic permission denied errors on the client due to `fillIssues` request contention
- <kbd>Fix:</kbd> limit elided file expansion hover target to just the path itself

<sub>**Enterprise release 1362.2058** (min 1313.2023) 2016-11-29 <!-- enterprise 1362.2058 --></sub>

- <kbd>Fix:</kbd> allow acknowledging discussions when disposition is "withdrawn"
- <kbd>Fix:</kbd> correctly render quoted text in batched comment messages (workaround for change in GitHub's Markdown parser)

<sub>**Enterprise release 1360.2047** (min 1313.1977) 2016-11-14 <!-- enterprise 1360.2047 --></sub>

- <kbd>New:</kbd> add option to put badge into a comment instead of PR description (control in repo settings panel)
- <kbd>Fix:</kbd> correcty check admin permissions for newly added repos on Repositories page
- <kbd>Fix:</kbd> don't require branch update if strict status checks turned on but no required status checks selected
- <kbd>Fix:</kbd> restore ability to sign in with Edge and Internet Explorer
- <kbd>Fix:</kbd> don't throw bogus fatal exception when user without push permissions visits a review in some conditions
- <kbd>Fix:</kbd> work around a GitHub bug where the API returns inconsistent data about a PR's commits
- <kbd>Fix:</kbd> detect hard AWS Lambda timeouts and return a better error message
- <kbd>Fix:</kbd> close malformed code blocks when publishing, so they don't corrupt the rest of the message

<sub>**Enterprise release 1340.2023** (min 1313.1977) 2016-11-04 <!-- enterprise 1340.2023 --></sub>

- <kbd>Upd:</kbd> use internal auth server in all environments, and shift some post-login processing from client to server
- <kbd>Fix:</kbd> allow new users to sign in!
- <kbd>Fix:</kbd> reduce memory usage when syncing large PRs
- <kbd>Fix:</kbd> capture more information for some exceptions
- <kbd>Fix:</kbd> get rid of most bogus exceptions (on server, not user-visible) when syncing GitHub status
- <kbd>Fix:</kbd> work around draft watermark rendering bug in Chrome and Safari on recent versions of Mac OS

<sub>**Enterprise release 1313.2011** (min 1273.1977) 2016-10-29 <!-- enterprise 1313.2011 --></sub>

- <kbd>New:</kbd> add `?debug=latency` for debugging page loading latency issues
- <kbd>Upd:</kbd> switch to a new promise/coroutine framework on the server for minor performance improvements
- <kbd>Upd:</kbd> add prefetch and preconnect directives to the page to improve initial load performance
- <kbd>Upd:</kbd> add syntax highlighting for CMake
- <kbd>Fix:</kbd> unreplied discussions counter for PR author no longer includes discussions with unsent drafts
- <kbd>Fix:</kbd> tighten up security to mitigate repo existence info leak by probing for other people's permission tickets
- <kbd>Fix:</kbd> determine fast-forward merge availability and "out-of-date" PR correctly
- <kbd>Fix:</kbd> speed up permission checks in various ways, and recommend using a 2048 bit RSA key for `REVIEWABLE_ENCRYPTION_PRIVATE_KEYS`
- <kbd>Fix:</kbd> tweak queue health alerting thresholds to reduce false positives, especially when running with a single instance
- <kbd>Fix:</kbd> fix various task lease issues that could lead to false positive error reports in Sentry
- <kbd>Fix:</kbd> fix minor issues with crash overlay
- <kbd>Fix:</kbd> fix minor layout issue with target branch editor in Firefox

<sub>**Enterprise release 1277.1987** (min 1273.1977) 2016-10-14 <!-- enterprise 1277.1987 --></sub>

- <kbd>Fix:</kbd> correctly grant permissions in an encrypted datastore for repos whose names need escaping
- <kbd>Fix:</kbd> take care of some query handling bugs exposed by the limited issue prefetch

<sub>**Enterprise release 1275.1985** (min 1273.1977) 2016-10-13 <!-- enterprise 1275.1985 --></sub>

- <kbd>New:</kbd> if the `X-Forwarded-Proto` header is set to `http`, and REVIEWABLE_HOST_URL has an `https` address, then issue a permanent redirect to the secure version of the requested URL
- <kbd>Fix:</kbd> unbreak Edge, which also has a non-compliant Web Crypto implementation
- <kbd>Fix:</kbd> unbreak Chrome when page served over HTTP
- <kbd>Fix:</kbd> make "My PRs in any public/private repo" connections work again (will retroactively connect past PRs)
- <kbd>Fix:</kbd> better support the rename-then-recreate repo workflow
- <kbd>Fix:</kbd> only prefetch the most recent 100 issues for autocompletion on page load to reduce latency; fetch all issues only when #-autocomplete triggered

<sub>**Enterprise release 1273.1981** (min 1273.1977) 2016-10-11 <!-- enterprise 1273.1981 --></sub>

- <kbd>Fix:</kbd> unbreak Safari, which was completely unable to load Reviewable once signed in due to a broken Web Crypto implementation

<sub>**Enterprise release 1273.1979** (min 1273.1977) 2016-10-10 <!-- enterprise 1273.1979 --></sub>

- <kbd>Upd:</kbd> support Web Crypto for encrypting GitHub tokens; use new REVIEWABLE_WEB_CRYPTO_REQUIRED config to force
- <kbd>Fix:</kbd> integrate fix for performance regression in AES crypto routines

<sub>**Enterprise release 1273.1977** (min 1259.1971) 2016-10-10 <!-- enterprise 1273.1977 --></sub>

- <kbd>New:</kbd> support rebase & merge and delegate merge style allowability to GitHub (if supported in GHE)
- <kbd>Upd:</kbd> prepare to support Web Crypto for encrypting GitHub tokens
- <kbd>Upd:</kbd> add bindable nextPersonallyUnreviewedFile (etc.) command
- <kbd>Fix:</kbd> ensure controlled shutdown actually exits the process, regardless of secondary failures
- <kbd>Fix:</kbd> use correct condition to determine whether branch can be fast forward merged
- <kbd>Fix:</kbd> resync PR after merge if repo not connected, to avoid merge button being enabled on page reload

<sub>**Enterprise release 1259.1971** (min 1152.1875) 2016-10-03 <!-- enterprise 1259.1971 --></sub>

- <kbd>Upd:</kbd> update syntax higlighting and code editor libraries
- <kbd>Upd:</kbd> prepare support for rebase & merge
- <kbd>Fix:</kbd> detect stuck transactions (due to Firebase SDK bug) and shut down so server can be restarted
- <kbd>Fix:</kbd> guard against a rare condition where a closed PR sync fails repeatedly
- <kbd>Fix:</kbd> allow uppercase chars in assignee directive usernames
- <kbd>Fix:</kbd> don't send low quota warning emails when there were transient errors looking for alternative admins

<sub>**Enterprise release 1243.1957** (min 1152.1875) 2016-09-21 <!-- enterprise 1243.1957 --></sub>

- <kbd>New:</kbd> [AES encryption key rotation tool](https://www.npmjs.com/package/firecrypt-tools) now available, along with [ops use instructions](https://github.com/Reviewable/Reviewable/blob/master/enterprise/operations.md#aes-encryption-key-rotation)
- <kbd>New:</kbd> [RSA encryption key rotation tool](https://www.npmjs.com/package/reviewable-enterprise-tools) now available, along with [ops use instructions](https://github.com/Reviewable/Reviewable/blob/master/enterprise/operations.md#rsa-encryption-key-rotation)
- <kbd>Upd:</kbd> add REVIEWABLE_DUMP_ENV to dump environment variables as Reviewable sees them, for debugging
- <kbd>Upd:</kbd> add REVIEWABLE_UPLOADS_PROVIDER to explicitly set uploads destination; requires config change if you're using file uploads!
- <kbd>Upd:</kbd> add REVIEWABLE_LAMBDA_EXECUTOR_ROLE and REVIEWABLE_LAMBDA_VPC_CONFIG to further configure AWS Lambda executor
- <kbd>Upd:</kbd> elide file path segments with ellipses only if extra space is needed for revision cells
- <kbd>Upd:</kbd> improve who will see a discussion as "unreplied", when everyone has seen the latest message but discussion is still unresolved
- <kbd>Fix:</kbd> ensure client always shows latest data from datastore; in some edge cases, it got stuck showing local "fake" values
- <kbd>Fix:</kbd> deal correctly with user username changes
- <kbd>Fix:</kbd> compute file path width correctly (it used to grow by 13px with each recomputation!) and don't waste space in single-file mode
- <kbd>Fix:</kbd> list all PRs on Reviews page when more than 100 in a single API request
- <kbd>Fix:</kbd> don't busy loop in extreme error situations when checking permissions

<sub>**Enterprise release 1225.1935** (min 1152.1875) 2016-09-12 <!-- enterprise 1225.1935 --></sub>

- <kbd>New:</kbd> show license details on Repositories page (for license admin user only)
- <kbd>New:</kbd> add maintenance mode that locks out the datastore for bulk updates (see new [ops playbook](https://github.com/Reviewable/Reviewable/blob/master/enterprise/operations.md) for instructions)
- <kbd>Upd:</kbd> verify session encryption key on the client and sign out if stale to enable key rotation
- <kbd>Upd:</kbd> share diff worker process between tabs (improves source code caching)
- <kbd>Fix:</kbd> pasting bug in recent versions of Firefox
- <kbd>Fix:</kbd> make automatic lease extension work in more cases
- <kbd>Fix:</kbd> work around stuck connections that force the user offline due to "stale writes"

<sub>**Enterprise release 1203.1910** (min 1152.1875) 2016-09-02 <!-- enterprise 1203.1910 --></sub>

- <kbd>Fix:</kbd> clean up more alternative admin selection corner cases
- <kbd>Fix:</kbd> improve error event grouping in Sentry
- <kbd>Fix:</kbd> make long-running tasks (e.g., large PR syncs) more reliable by automatically extending lease
- <kbd>Fix:</kbd> correctly parse broken up discussion URLs in emails
- <kbd>Fix:</kbd> adjust some regexes to deal with GHE URLs

<sub>**Enterprise release 1193.1907** (min 1152.1875) 2016-08-31 <!-- enterprise 1193.1907 --></sub>

- <kbd>Fix:</kbd> stop sending bogus "your authorization is broken" emails
- <kbd>Fix:</kbd> many issues related to all-organizations licenses

<sub>**Enterprise release 1186.1905** (min 1152.1875) 2016-08-30 <!-- enterprise 1186.1905 --></sub>

- <kbd>Fix:</kbd> balance GitHub calls among other admins for connected repositories when API quota gets low
- <kbd>Fix:</kbd> guesstimate GitHub burst quota usage and postpone or reassign tasks that might trigger an abuse warning
- <kbd>Fix:</kbd> set GitHub request timeouts based on remaining task lease time
- <kbd>Fix:</kbd> don't query `/rate_limit` on GitHub Enterprise instances

<sub>**Enterprise release 1168.1901** (min 1152.1875) 2016-08-25 <!-- enterprise 1168.1901 --></sub>

- <kbd>New:</kbd> optional encryption of user-controlled text properties in the datastore
- <kbd>New:</kbd> private mode option for server
- <kbd>New:</kbd> expose ability to switch a PR's base branch
- <kbd>Upd:</kbd> mark outdated revisions, simplify rebase arcs visualization, and improve auto-diff bound picks when using "review each commit" style
- <kbd>Fix:</kbd> undo regression in schema validation constraints
- <kbd>Fix:</kbd> make review page somewhat usable on mobile devices
- <kbd>Fix:</kbd> [#388](https://github.com/Reviewable/Reviewable/issues/388), [#389](https://github.com/Reviewable/Reviewable/issues/389)

<sub>**Enterprise release 1158.1885** (min 1152.1875) 2016-08-15 <!-- enterprise 1158.1885 --></sub>

- <kbd>Upd:</kbd> improved styling of wrapped lines in diff and fixed some line length computation bugs
- <kbd>Upd:</kbd> turned on gzip compression in the web server
- <kbd>Fix:</kbd> security issue fix part 2
- <kbd>Fix:</kbd> [#385](https://github.com/Reviewable/Reviewable/issues/385)

<sub>**Enterprise release 1152.1875** (min 1063.1721) 2016-08-08 <!-- enterprise 1152.1875 --></sub>

- <kbd>Upd:</kbd> improved detection of Go declaration headers
- <kbd>Fix:</kbd> split reply emails into separate discussions
- <kbd>Fix:</kbd> security issue fix part 1

<sub>**Enterprise release 1146.1862** (min 1063.1721) 2016-08-07 <!-- enterprise 1146.1862 --></sub>

- <kbd>Fix:</kbd> automated detection and reconnection of renamed repos and organizations
- <kbd>Fix:</kbd> improved scaling in the face of very high GitHub event rates
- <kbd>Fix:</kbd> fixed a number of bugs around drafts, markdown rendering, and publishing (some of which could cause you to get stuck or, in rare cases, data loss)
- <kbd>Fix:</kbd> properly force branch "retain" mode in merge button, and ensure button will be enabled on reviews dashboard
- <kbd>Fix:</kbd> [#366](https://github.com/Reviewable/Reviewable/issues/366), [#367](https://github.com/Reviewable/Reviewable/issues/367), [#368](https://github.com/Reviewable/Reviewable/issues/368), [#369](https://github.com/Reviewable/Reviewable/issues/369), [#371](https://github.com/Reviewable/Reviewable/issues/371)

<sub>**Enterprise release 1130.1815** (min 1063.1721) 2016-07-20 <!-- enterprise 1130.1815 --></sub>

- <kbd>New:</kbd> squash and fast-forward merges, editing of merge commit message
- <kbd>New:</kbd> update source branch from target
- <kbd>Upd:</kbd> removed REVIEWABLE_GITHUB_VIRGIN_USERNAME env var as it's no longer needed
- <kbd>Upd:</kbd> [#359](https://github.com/Reviewable/Reviewable/issues/359)
- <kbd>Fix:</kbd> [#308](https://github.com/Reviewable/Reviewable/issues/308), [#358](https://github.com/Reviewable/Reviewable/issues/358)

<sub>**Enterprise release 1117.1791** (min 1063.1721) 2016-07-14 <!-- enterprise 1117.1791 --></sub>

- <kbd>New:</kbd> all repo settings now available in a single panel
- <kbd>New:</kbd> new repos can now inherit settings from a prototype repo
- <kbd>Upd:</kbd> [#350](https://github.com/Reviewable/Reviewable/issues/350)
- <kbd>Fix:</kbd> adapt to non-backwards-compatible change in Firebase authentication server
- <kbd>Fix:</kbd> [#340](https://github.com/Reviewable/Reviewable/issues/340), [#341](https://github.com/Reviewable/Reviewable/issues/341), [#352](https://github.com/Reviewable/Reviewable/issues/352), [#357](https://github.com/Reviewable/Reviewable/issues/357)

<sub>**Enterprise release 1104.1771** (min 1063.1721) 2016-06-25 <!-- enterprise 1104.1771 --></sub>

- <kbd>Fix:</kbd> bootstrap when license has a username instead of a user id
- <kbd>Fix:</kbd> support GitHub multiple assignees (when the feature shows up in GHE, at least)
- <kbd>Fix:</kbd> lots of small things on both client and server

<sub>**Enterprise release 1087.1754** (min 1063.1721) 2016-05-30 <!-- enterprise 1087.1754 --></sub>

- <kbd>New:</kbd> support GitHub Enterprise
- <kbd>New:</kbd> use GitHub OAuth directly for authentication instead of delegating to Firebase.
- <kbd>Upd:</kbd> autoquote selected text on reply.
- <kbd>Upd:</kbd> support per-file determination of reviewed status in custom condition.
- <kbd>Upd:</kbd> collapse large quoted code blocks in comments.
- <kbd>Upd:</kbd> read configuration from file instead of env vars.
- <kbd>Fix:</kbd> hover bug on lower-right-corner indicators.
- <kbd>Fix:</kbd> not fully treating PR author as reviewer after they've marked a file as reviewed.
- <kbd>Fix:</kbd> welcome offered to users who aren't members of any subscribed org.

<sub>**Enterprise release 1077.1739** (min 1063.1721) 2016-05-20 <!-- enterprise 1077.1739 --></sub>

- <kbd>New:</kbd> welcome message for new org members with one all-in authorization button.
- <kbd>Upd:</kbd> show who a review is waiting on, and support in custom conditions.
- <kbd>Upd:</kbd> shorten default GitHub status message to fit in 50 chars.
- <kbd>Upd:</kbd> revised semantics for "discussing" disposition, and OK/FYI intent support.
- <kbd>Fix:</kbd> rare undefined value bug in client.
- <kbd>Fix:</kbd> hide buttons and text related to private repos if license is public-only.
- <kbd>Fix:</kbd> don't add code quote if other quote already included in comment.
- <kbd>Fix:</kbd> other minor fixes for rare client crashes.

<sub>**Enterprise release 1065.1721** (min 1063.1721) 2016-05-10 <!-- enterprise 1065.1721 --></sub>

- <kbd>New<i>(enterprise)</i>:</kbd> initial public release.