### Reviewable Enterprise

There's a version of Reviewable that runs on your own premises and can connect to your instance of GitHub Enterprise (GHE).  Note that it has a somewhat atypical architecture that requires the use of external cloud services &mdash; please see the [security overview](https://github.com/Reviewable/Reviewable/blob/master/enterprise/security.md) for details.  (There's also an Enterprise Cloud variant which is like the SaaS offering, but includes a negotiable contract, SLAs, etc.)

If you're interested in a free trial, please [get in touch!](mailto:support@reviewable.io?subject=Enterprise%20edition)  To issue a temporary license key we'll need a few pieces of information from you first:
1. A [`hub.docker.com`](https://hub.docker.com/) username to be granted access to the image.
2. The GHE username of the designated Reviewable license admin account; this account doesn't need to be a GHE admin or have any special permissions.  If you're running GHE in _private mode_, we'll need the raw numeric user ID for the account instead.  Here's [how to find these](https://github.com/Reviewable/Reviewable/blob/master/enterprise/userid.md).
3. If you'll be running Reviewable against `github.com` rather than a private GHE deployment, we'll also need the name of your GitHub organization so that your instance and ours don't step on each other's toes.

If you already have a license, you'll want to explore the links below.

##### [How to set up Reviewable on your premises](https://github.com/Reviewable/Reviewable/blob/master/enterprise/config.md)

##### [Security overview](https://github.com/Reviewable/Reviewable/blob/master/enterprise/security.md)

##### [Ops playbook](https://github.com/Reviewable/Reviewable/blob/master/enterprise/operations.md)

##### [Analytics events dictionary](https://github.com/Reviewable/Reviewable/blob/master/enterprise/analytics.md)

##### [Changelog](https://github.com/Reviewable/Reviewable/blob/master/enterprise/changelog.md)

##### [Announcements mailing list](https://groups.google.com/g/reviewable-enterprise-announce)

##### Default [License Agreement](https://github.com/Reviewable/Reviewable/raw/master/enterprise/Reviewable%20MLA%20Template.pdf) template
