This is the release log for Reviewable's Enterprise branch.  Each release has a two-part version number (_server.client_) with a corresponding tag on the Docker image.  Note that once you've deployed a given release you'll only be able to deploy releases with version components at least equal to its _min_ version number, which may constrain your rollbacks.

#### Upcoming changes
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
