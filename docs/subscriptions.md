# Subscriptions and licenses

All public repositories and personal private repositories can use Reviewable free of charge forever.  A subscription or license is required for private organizational repositories.  Subscriptions are used on `reviewable.io`, while licenses are needed for managed or self-hosted enterprise instances.

## Subscriptions

Every organization gets a 30 day free trial, which requires no credit card. You can start a trial from any private review page, or from an organization entry on the Repositories page.

Organizations are shown below your personal repos on the Repositories page, and appear whether you are an owner or a contributor.  One or more of the buttons below will show up next to the organization name:
- **Start a 30 day trial** will start a trial for that organization.  If the button isn't showing, then you're already in the middle of a trial, have recently completed one, or have a current subscription.
- **Subscribe** will open a panel showing the various plans, where you can compare features, select the desired number of contributors, and click **Subscribe** again to start the checkout process.
- **Manage subscription** will open the subscription portal where you can adjust or cancel your subscription, update your card, or view past invoices.
- **Edit settings** will show some options to *[manage the scope of the subscription](#managing-the-scope-of-your-subscription)*, and (un)assign a *[billing manager](#billing-manager)*, see below.

{:.important}
OAuth app restrictions may entirely block Reviewable from an organization. Learn more in the [OAuth app access restrictions](registration.md#oauth-restrictions) section in the Registration chapter.


### Selecting a plan

In the subscription panel you can select a plan for your organization, and the number of constributors to purchase the plan for.  We count each distinct PR author during a billing cycle as a contributor, at the time a review is created and linked to the PR.  Once a review has been created, any number of people can view it and participate.

If a PR causes you to exceed your plan's contributor quota, both the subscriber and the person who connected the affected repo will be immediately notified by email.  Reviewable won't create reviews for PRs created by additional authors until you upgrade your subscription — or the contributor count resets on your next billing date.

{:.tip}
If you exceed your plan's quota, Reviewable will continue updating all previously created reviews and keep creating reviews for contributors that were already counted this month.

You can upgrade, downgrade, or cancel the plan any time.  If you change your plan during the billing cycle, the new plan (if any) takes effect immediately and fees are prorated which results either in a credit being applied to future invoices, or in additional fees to be charged today.  There are no refunds.

### Managing the scope of your subscription

By default, a subscription covers all reviews in a single organization. Optionally, you can restrict or expand this scope.

To restrict access to your Reviewable subscription, simply designate a contributor team. Only PRs from team members can be submitted for review, even if others outside the team create PRs in a connected repository. Establishing a team is one approach to ensure that you won't exceed the contributor maximum for your subscription.

On the other hand, if your company's repos are distributed over multiple GitHub organizations (as is sometimes the case for consulting companies), you can specify extra organizations to be covered if your plan allows it. In this situation, a person who creates reviews in any of the subscription's organizations counts as a single contributor — so this may be a less expensive alternative to maintaining separate subscriptions.

{:.tip}
Restricting an organization to a team and extending it to other organizations are mutually exclusive.

### Canceling a subscription

To cancel a subscription, click the **Edit subscription** button and switch to the free plan — don't forget to click **Confirm**!  Only the user who originally created the subscription can do this.  If this is not possible or convenient, please get in touch with [support](mailto:support@reviewable.io) and we'll help you out.

You can change or cancel a subscription at any time with immediate effect, but there will be no refunds or proration of fees. If you cancel, previously created reviews will continue to be accessible and synchronized with GitHub. However, you'll no longer have the ability to create new reviews.

### Billing manager

Any organization member can start a subscription and by doing so they become the organization's billing manager until they either leave the organization or a different billing manager is assigned.  Any organization owner is also allowed to manage the subscription.

## Licenses

On an enterprise instance, the license administrator you selected when signing up and any GitHub Enterprise Server instance administrators will be able to check the license details in a panel at the top of the Repositories page.  The details include the number of licensed seats, how many are currently in use, the organization(s) the license is constrained to (if any), and the license's expiry date.  You can also view a list of users who are currently allocated licensed or guest seats.

### Team constraints

If desired, you can additionally limit the users who will be able to obtain seats on your instance.  This can be useful in larger organizations where Reviewable is only intended for use by a specific team or department, and you don't want other employees accidentally taking up seats that are needed for the intended users.  (By default, any GitHub user can sign in and occupy a seat, or, for an organization-constrained license, any member of said organizations.)

To turn on team constraints you enter one or more fully-qualified team slugs in the panel's field; only users who are a member of at least one of these teams will be able to obtain a seat.  Users with currently assigned seats will _not_ be evicted even if they're not a team member, but won't be able to renew their seat once it expires.

{:.tip}
The designated license administrator is always allowed to grab a seat so they can't accidentally lock themselves out.

If team constraints are on and a user signing in is not a member (but otherwise a valid user for the license), they'll be given a full-access guest pass instead.  A guest pass lasts for two weeks and doesn't take up a license seat, but once it runs out the user will be signed out and unable to sign back in until they're a team member or eligible for a guest pass again (every 90 days).  While on a guest pass, every page will display a banner encouraging the user to request access to a licensed seat:

> You've been allocated a temporary guest seat that will expire in N days. Please contact your organization administrator to obtain a permanent one.
