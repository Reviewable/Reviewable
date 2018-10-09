### Reviewable Enterprise

There's a version of Reviewable that runs on your own premises and can connect to your instance of GitHub Enterprise (GHE).  Note that it has a somewhat atypical architecture that requires the use of external cloud services &mdash; please see the [security overview](https://github.com/Reviewable/Reviewable/blob/master/enterprise/security.md) for details.

If you're interested in a free trial, please [get in touch!](mailto:support@reviewable.io?subject=Enterprise%20edition)  To issue a temporary license key we'll need two pieces of information from you first:
1. A [`hub.docker.com`](https:/hub.docker.com/) username to be granted access to the image.
2. The GHE username of the designated Reviewable license admin account; this account doesn't need to be a GHE admin or have any special permissions.  If you're running GHE in _private mode_, we'll need the raw numeric user ID for the account instead.  Here's [how to find these](https://github.com/Reviewable/Reviewable/blob/master/enterprise/userid.md).

If you already have a license, you'll want to explore the links below.

##### [How to set up Reviewable on your premises](https://github.com/Reviewable/Reviewable/blob/master/enterprise/config.md)

##### [Security overview](https://github.com/Reviewable/Reviewable/blob/master/enterprise/security.md)

##### [Ops playbook](https://github.com/Reviewable/Reviewable/blob/master/enterprise/operations.md)

##### [Changelog](https://github.com/Reviewable/Reviewable/blob/master/enterprise/changelog.md)

##### Open source [server dependencies](https://app.fossa.io/reports/ef41d9ac-ed5e-461b-82ce-3c06154c0321) and [client dependencies](https://app.fossa.io/reports/efbaf284-6782-49f5-9cf2-57a98792a723) distributed with the image.

##### Default [License Agreement](https://github.com/Reviewable/Reviewable/raw/master/enterprise/Reviewable%20MLA%20Template.pdf) template
