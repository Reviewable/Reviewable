# Subscriptions

All public repositories and personal private repositories can use Reviewable free of charge forever.  A subscription is required for private organizational repositories.

Every subscription gets a 30-day free trial, which requires no credit card up front. If you don't explicitly start a subscription, an automatic trial subscription will begin when you create the first review.

Organizations are shown below your personal repos on the Repositories page, and appear whether you are an owner or a contributor.  You can open the subscription panel by clicking on the **Subscribe** or **Edit subscription** button next to the organization name.  Any organization member can start a subscription, not just organization owners.

!> OAuth app restrictions may entirely block Reviewable from an organization. Learn more in the [OAuth app access restrictions](registration.md#oauth-restrictions) section in the Registration chapter.


## Selecting a plan

In the subscription panel you can select a plan for your organization.  Each plan has a maximum number of monthly contributors. Rather than forcing you to maintain yet another user list, we count each distinct PR author during a billing cycle as a contributor, at the time a review is created and linked to the PR. Once a review has been created, any number of people can view it and participate.  You should select a plan that will cover the expected number of contributors on your team.

If a PR causes you to exceed your plan's contributor quota, both the subscriber and the person who connected the affected repo will be immediately notified by email. If you have chosen a subscription plan that has a flexible overage, Reviewable will permit all additional contributors if you did not exceed your maximum in the previous billing cycle. This flexibility provides you additional time to upgrade your subscription without disruption. If you are confident that the overage will not continue into the next month, you can simply ignore it. If your plan doesn't have the flexible overage feature, or you exceeded the maximum in the prior month, Reviewable won't create the review until you upgrade your subscription — or the contributor count resets on your next billing date.

?> If you exceed your plan's quota, Reviewable will continue updating all previously created reviews and keep creating reviews for contributors that were already counted this month.

If you change your plan in the middle of a billing cycle, the new plan takes effect immediately and fees are not prorated (up or down).  You'll be charged the new price on your next billing date.

## Managing the scope of your subscription

By default, a subscription covers all reviews in a single organization. Optionally, you can restrict or expand this scope.

To restrict access to your Reviewable subscription, simply designate a contributor team. Only PRs from team members can be submitted for review, even if others outside the team create PRs in a connected repository. Establishing a team is one approach to ensure that you won't exceed the contributor maximum for your subscription.

On the other hand, if your company's repos are distributed over multiple GitHub organizations (as is sometimes the case for consulting companies), you can specify extra organizations to be covered if your plan allows it. In this situation, a person who creates reviews in any of the subscription's organizations counts as a single contributor — so this may be a less expensive alternative to maintaining separate subscriptions.

?> Restricting an organization to a team and extending it to other organizations are mutually exclusive.

## Payments

You will need to specify a card to use for payments.  This can be a credit or debit card — most anything with a major payment network logo on it should work. Reviewable uses Stripe to process payments and store your credit card information, so you can have full confidence that your financial information is secure.

?> At this time, each user can only specify one card for all their subscriptions.

Under the card information, you can reveal extra fields that let you specify a custom memo to include on the monthly receipts (accountants love these!), and a different email address to send the receipts to.

## Canceling a subscription

To cancel a subscription, click the **Edit subscription** button and switch to the free plan — don't forget to click **Confirm**!  Only the user who originally created the subscription can do this.  If this is not possible or convenient, please get in touch with [support](mailto:support@reviewable.io) and we'll help you out.

You can change or cancel a subscription at any time with immediate effect, but there will be no refunds or proration of fees. If you cancel, previously created reviews will continue to be accessible and synchronized with GitHub. However, you'll no longer have the ability to create new reviews.

## Subscription ownership

At this time, even though a subscription covers one or more organizations, it is owned by a single user and only that user can manage it.  Other members will be informed that a subscription exists with a “Organizational subscription active” message next to the organization name but will be unable to affect it in any way, even if they're an organization owner.

It is also not possible to transfer a subscription between users.  As a workaround, have the new subscriber begin another (duplicate) subscription, then have the original subscriber cancel theirs. This way, there will be no interruption in service.

We intend to accommodate this better in the future, though it is not yet a top priority.
