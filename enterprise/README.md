### Reviewable Enterprise

There's a version of Reviewable that runs on your own premises and can connect to your instance of GitHub Enterprise Server (GHES) or to `github.com` (plain or GHE Cloud).  Note that it has a somewhat atypical architecture that requires the use of external cloud services — please see the [security overview](https://github.com/Reviewable/Reviewable/blob/master/enterprise/security.md) for details.  (There's also a Managed Enterprise variant where we take care of running the dedicated instance for you.  See a comparison of all the options [here](https://www.reviewable.io/blog/reviewable-ghe-options/).)

If you're interested in a free trial, please [get in touch!](mailto:support@reviewable.io?subject=Enterprise%20edition)  To issue a temporary license key we'll need a couple pieces of information from you first:
1. The GitHub username of the designated Reviewable license admin account; this account doesn't need to be an admin or have any special permissions.  If you're running GHES in _private mode_, we'll need the raw numeric user ID for the account instead.  Here's [how to find these](https://github.com/Reviewable/Reviewable/blob/master/enterprise/userid.md). [^1]
2. If you'll be running Reviewable against `github.com` rather than a private GHES deployment, we'll also need the name of your GitHub organization so that your instance and ours don't step on each other's toes.

Note that Reviewable ships with cryptographic technology that results in a BIS commodity classification of 5D992.c.

If you already have a license, you'll want to explore the links below.

##### [How to set up Reviewable on your premises](https://github.com/Reviewable/Reviewable/blob/master/enterprise/config.md)

##### [Security overview](https://github.com/Reviewable/Reviewable/blob/master/enterprise/security.md)

##### [Ops playbook](https://github.com/Reviewable/Reviewable/blob/master/enterprise/operations.md)

##### [Analytics events dictionary](https://github.com/Reviewable/Reviewable/blob/master/enterprise/analytics.md)

##### [API docs](https://github.com/Reviewable/Reviewable/blob/master/enterprise/api.md)

##### [Changelog](https://github.com/Reviewable/Reviewable/blob/master/enterprise/changelog.md)

##### [Announcements mailing list](https://groups.google.com/g/reviewable-enterprise-announce)

##### [License Agreement](https://github.com/Reviewable/Reviewable/raw/master/enterprise/Reviewable%20MLA%20Template.pdf) template

[^1]: When running against github.com, only this user will have access to the licensing panel. When running against GitHub Enterprise, all instance owners have access as well as this user.
