### Reviewable Enterprise

There's a version of Reviewable that runs on your own premises and can connect to your instance of GitHub Enterprise (GHE).  Note that it still requires an external connection to the Firebase datastore (part of Google Cloud Services) but it can encrypt all sensitive data at rest with a key that never leaves your premises.

If you're interested in a free trial, please [get in touch!](mailto:support@reviewable.io?subject=Enterprise%20edition)  To issue a temporary license key we'll need two pieces of information from you first:
1. A `hub.docker.com` username to be granted access to the image.
2. The GHE username of the designated Reviewable license admin account; this account doesn't need to be a GHE admin or have any special permissions.  If you're running GHE in private mode, we'll need the raw numeric user ID for the account instead &mdash; you can find this in the GHE database admin panel, or just crib it from the account's avatar URL.

If you already have a license, you'll want to explore the links below.

##### [How to set up Reviewable on your premises](https://github.com/Reviewable/Reviewable/blob/master/enterprise/config.md)

##### [Ops playbook](https://github.com/Reviewable/Reviewable/blob/master/enterprise/operations.md)

##### [Changelog](https://github.com/Reviewable/Reviewable/blob/master/enterprise/changelog.md)

##### [Dependencies distributed with the image](https://github.com/Reviewable/Reviewable/blob/master/enterprise/dependencies.md)

##### Default [License Agreement](https://github.com/Reviewable/Reviewable/raw/master/enterprise/Reviewable%20MLA%20Template.pdf) template
