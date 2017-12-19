This is the release log for Reviewable's Enterprise branch.  Each release has a two-part version number (_server.client_) with a corresponding tag on the Docker image.  Note that once you've deployed a given release you'll only be able to deploy releases with version components at least equal to its _min_ version number, which may constrain your rollbacks.

New releases are announced on the [reviewable-enterprise-announce mailing list](https://groups.google.com/forum/#!forum/reviewable-enterprise-announce).

#### Known issues
- Web client crashes on startup in Safari 10.1 if the database is encrypted, due to a regression in their JS engine.  It works fine in Safari 10.0 and 10.2 (technology preview).  No fix planned for Reviewable.
- See also the public [list of bugs](https://github.com/Reviewable/Reviewable/labels/bug) for Reviewable.

#### Upcoming changes (min 1664.2314)
- Fix: sweep all reviews to correct broken owner/repo properties from renamed organizations and repositories.
- Fix: correctly compute review state on the server when faced with complex file rename chains.  This affects both the built-in review completion computation and custom completion conditions.

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
