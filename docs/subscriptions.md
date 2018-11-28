# Subscriptions

Organizations are shown below your personal repos. If you are a contributing member of a subscribing organization, those will also appear on the Repositories page.

Every subscription gets a 30-day free trial, which requires no credit card up front. Reviewable uses Stripe to process payments and store your credit card information—so you can have full confidence that your financial information is secure.

**Private organizational repos require a subscription:** While public and private personal repos don't need a subscription, it is necessary to initiate a Reviewable subscription to create reviews in private, _organizational_ repos.

If you don't explicitly start a subscription, an automatic trial subscription will begin when you create the first review.


## Write access is mandatory

Reviewable posts any pull request comments on your behalf, and GitHub considers this as writing to the repo. Naturally, this requires write access. Reviewable must therefore gain write access to any repo. Keep in mind that another advantage of having write access to your repos will also give you the option to merge a pull request once the review is complete.


!> OAuth app restrictions may entirely block Reviewable from an organization. Learn more in the **OAuth app access restrictions**section of the [Registration](registration.md) page.


## Counting contributors

Each plan has a maximum number of monthly contributors. Rather than forcing you to maintain yet another user list, we count each distinct PR author as a contributor—at the time a review is created and linked to the PR. Once a review has been created, any number of people can view it and participate.

When the addition of a new contributor exceeds this maximum, you will receive immediate notification. If you have chosen a subscription plan that has a flexible overage, Reviewable will permit all additional contributors if you did not exceed your maximum in the previous billing cycle. This flexibility provides you additional time to upgrade your subscription without disruption. If you are confident that the overage will not continue into the next month, you can simply ignore it. If your plan doesn't have the flexible overage feature, or you exceeded the maximum in the prior month, Reviewable won't create the review until you upgrade your subscription—or the contributor count resets on your next billing date.

?> Reviewable will continue updating all previously created reviews, though, and keep creating reviews for contributors that were already counted this month.


## Managing the scope of your subscription
By default, a subscription covers all reviews in a single organization. Optionally, you can restrict or expand this scope.


### Restricting to contributor teams
To restrict access to your Reviewable subscription, simply designate a contributor team. Only PRs from team members can be submitted for review, even if others outside the team create PRs in a connected repository. Establishing a team is one approach to  ensure that you won't exceed the contributor maximum for your subscription.


### Extending to other organizations
If you want to open your subscription to various contributors, or if your company requires the use of multiple GitHub organizations, then you may want to consider some of the subscription plans that permit access from explicitly designated organizations.

If you do extend your subscription to multiple organizations, it will not be possible to designate a contributor team. Also, keep in mind that any one person who creates reviews in different extended organizations counts as a single contributor—so this may be a less expensive alternative to maintaining separate subscriptions.


## Canceling a private organization subscription
You can change or cancel a subscription at any time—with immediate effect—but there will be no refunds or proration of fees. If you cancel, previously created reviews will continue to be accessible and synchronized with GitHub. However, you'll no longer have the ability to create new reviews.


### Transferring an organizational subscription—not yet possible
One question that comes up regularly is how to transfer an organizational subscription between owners. Presently, this is not possible. While a subscription may indeed cover one or more organizations, it's strictly owned by a single individual. To transfer, have the new owner begin another (duplicate) subscription, then have the original subscriber cancel their subscription. This way, there will be no interruption in service.

We have plans to accommodate this better in the future, though it is not yet a top priority.


## Reauthorizing access
If you previously connected repos, but later revoked the authorization for Reviewable, you will need to re-authorize access to maintain the connection. You will see messages at the top of the repo page that prompt you to take action.
