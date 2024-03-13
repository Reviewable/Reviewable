# License panel

Additional License panel will be displayed in the Repositories page when you're:

- License admin (designaged upon the license generation)
- GHE instance owners (self-hosted instances only)

<a id="license-usage"></a>

## License usage

Shows the license usage and the actual user allocations.

```
License for all repos in org-xyz with [88 of 100 seats (88%) in use] expires on [2025-04-01].

Allocated seats
---
alice -- 90 days left
bob   -- 85 days left
...
```

<a id="usage-restriction"></a>

## Usage restriction

This can be speficied as a form of `Organization-A/Team-1, Organization-B/Team-2, ...` (default: unset). When specified, users not in the teams would then be unable to obtain a seat, but would still be granted a free two week guest pass if they sign in, which would give them (some) time to request access to fully paid seats. When a user is working under a guest pass, every page gets a banner that says "You've been allocated a temporary guest seat that will expire in N days. Please contact your organization administrator to obtain a permanent one."

This can be benefitial when you manage a larger organization and you want to limit the number of [contributors](subscriptions.md#selecting-a-plan) to prevent sudden spike of the license consumptions. Note the restriction is considered when obtaining a seat and updating restrictions won't reclaim the seats from already allocated users.

{:.important}
The license admin is always able to get a seat to prevent being locked out accidentally.
