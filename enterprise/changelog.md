This is the release log for Reviewable's Enterprise branch.  Each release has a two-part version number (_server.client_) with a corresponding tag on the Docker image.  Note that once you've deployed a given release you'll only be able to deploy releases with version components at least equal to its _min_ version number, which may constrain your rollbacks.

#### Upcoming changes
- Fix: rare undefined value bug in client
- Update: revised semantics for "discussing" disposition, and OK/FYI intent support
- New: welcome message for new org members with one all-in authorization button

#### 1065.1721 (min 1063.1721)
- Initial public release
