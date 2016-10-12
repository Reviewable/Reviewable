This is the release log for Reviewable's Enterprise branch.  Each release has a two-part version number (_server.client_) with a corresponding tag on the Docker image.  Note that once you've deployed a given release you'll only be able to deploy releases with version components at least equal to its _min_ version number, which may constrain your rollbacks.

#### Upcoming changes
- Fix: unbreak Edge, which also has a non-compliant Web Crypto implementation
- Fix: unbreak Chrome when page served over HTTP
- Fix: make "My PRs in any public/private repo" connection work again (will retroactively connect past PRs)
- Fix: better support the rename-then-recreate repo workflow

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
