This is the release log for Reviewable's Enterprise branch.  Each release has a two-part version number (_server.client_) with a corresponding tag on the Docker image.  Note that once you've deployed a given release you'll only be able to deploy releases with version components at least equal to its _min_ version number, which may constrain your rollbacks.

#### Upcoming changes
- Fix: automated detection and reconnection of renamed repos and organizations
- New: optional encryption of user-controlled text properties in the datastore

#### 1125.1815 (min 1063.1721) 2016-07-20
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
