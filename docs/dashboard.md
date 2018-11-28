
## Reviews List

Click the **Reviews** button at the very top of the page to display the reviews list. Here, you'll find all open PRs in which you are a participant. As a participant, these PRs have either been created by you, assigned to you, contain comments from you, or mention you (or a team you belong to). Reviewable automatically updates this list at least every minute (and data held in Reviewable is updated in real time), so there is no need to reload the page.

?> If the reviews listing doesn't appear, click the **Include stalled pull requests/reviews** link at the bottom of the panel. If you haven't yet granted those permissions to Reviewable, you may want to click the green **Also show team reviews** or **Also show private reviews** buttons at the bottom as well. Finally, if PRs are still missing, check whether the relevant organizations have OAuth app access restrictions turned on.

![reviewable reviews list](images/reviews_4.png)

Up to three closed PRs from the previous three days may also be shown here. This makes it easier to follow-up on recently completed reviews. Enter `+open` in the search bar to hide the closed PRs.

PRs are sorted into groups ordered from most to least relevant. Within each group, PRs are sorted in chronological order. The exception is that in the **Waiting on me** group, the PRs that are only waiting on you appear before others. The intention is that the PRs appear in the order you ought to deal with them. You cannot change the sort order, but you can filter the list instead (see below for details).

Click on a PR to open the review, or hold down the appropriate modifier key to open it in a new tab.

You can modify the view with the various toggles and filters on this page. You can also view all of the PRs in a specific repository by clicking one of the repo links on the [Repository page](repositories.md).


## Review state

Each review in the listing indicates the state of the review, in real-time:

![reviewable review state](images/reviews_5.png)

If a PR is ready for merging, the status checks are successful, and all the counters are zero, then a merge button appears in the state column instead.  This lets you quickly merge completed PRs but doesn't give access to merge options — for that, please open the review page.

Other possible states include **Merged**, **Closed**, and **Archived** (automatically, for old reviews — just open to unarchive). No state appears for any PR that not yet connected to a review.


## Visit the PR on GitHub

Click the link on the right end of a listing to access the pull request on GitHub.


## Filter field

In the filter field, enter one or more terms to match in the PR summary, repository, number, milestone, labels, author username, or blocking reviewer.  The query is immediately reflected in the URL if you'd like to bookmark it.

**Create a new review:** To create or access a review for a PR that you can see on GitHub, simply paste the URL into the filter field.

You can also use the special filters in the table below, adding either a `+` or `-` prefix to the special term (such as `+open`).

Click the small **Set as your default** link to change the default to the filter to what you've entered in the filter field.

![reviewable filter field](images/reviews_6.png)

Add an OR operator to the positive filter by entering a comma. For example, `+needs:review,needs:fix` will filter for all reviews that need work, or have a failing check. For negative filters, the comma functions as an AND operator. More complex boolean expressions are not supported.

| Filter | Meaning |
|------|---------|
| `±open` | Currently open PR |
| `±red` | PRs with red counters |
| `±mine` | Created, assigned, and requested PRs |
| `±needs:` | &nbsp; |
| &nbsp;&nbsp;&nbsp; `review` | Incomplete reviews |
| &nbsp;&nbsp;&nbsp; `fix` | Reviews with failing checks |
| &nbsp;&nbsp;&nbsp; `merge` | Completed and clean reviews |
| &nbsp;&nbsp;&nbsp; `me` | Reviews waiting on you |
| &nbsp;&nbsp;&nbsp; `author` | Reviews waiting on author |
| &nbsp;&nbsp;&nbsp; `reviewer` | Reviews waiting on a reviewer |
| `±am:` | &nbsp; |
| &nbsp;&nbsp;&nbsp; `author` | Created PRs |
| &nbsp;&nbsp;&nbsp; `assigned` | Assigned PRs |
| &nbsp;&nbsp;&nbsp; `requested` | Requested reviewer PRs |
| `±public` | PRs from public repos |
| `±private` | PRs from private repos |
| `±starred` | PRs from repos you starred |
| `±watched` | PRs from repos you're watching |


## Open a review

Click on a listing to open the review for that PR. If a ![reviewable open a review](images/reviews_7.png ':size=16') is shown, clicking on the listing will open a new review and insert a link into the description for the PR. If ![reviewable free trial](images/reviews_8.png ':size=16') is also shown, this may begin a free trial. The author of the PR is shown to the left of the , and people whose attention the review currently needs to the right. You can see the approval status icon for any reviewer, which will appear with a ![reviewable review waiting](images/reviews_9.png ':size=16')  if the review is waiting on those reviewers. You’ll also see a summary, current milestone, and labels.

![reviews list](images/reviews_10.png)

The ![reviewable repository not connected](images/reviews_11.png ':size=16') icon indicates that the repository for this PR is not connected to Reviewable and the review will update on demand only. In such cases, the counters may be out of date. An administrator can connect the repository from the [link to Repositories] page.

A ![reviewable stalled review](images/reviews_12.png ':size=16') icon indicates a stalled review, that has not been updated in over two weeks.

## Exclude or include stalled PRs
If shown, you can click the link near the bottom of the panel to exclude or include any stalled PRs.  The current state of this toggle is reflected in the URL, so you can bookmark it.

## Reviews List Toggles
At the bottom of the Reviews page, you’ll find two toggle buttons, which we explain below.

![reviewable reviews list toggles](images/reviews_14.png)

?> Green **Also show team reviews** and **Also show private reviews** buttons may appear at the bottom if you haven't granted the respective permissions to Reviewable yet.


#### Show pull request not yet connected to Reviewable
If this toggle is on, the list will include PRs for which a review has not yet been created. Such a PR will be indicated with the ![reviewable open a review](images/reviews_7.png ':size=16') icon, and clicking that PR will connect that PR to a review and insert a link into the PR description.

You may want to turn off this toggle if you only want to see PRs from connected repositories.

#### Also show pull request you’re not involved with from all repos to which you can push.
If this toggle is on, the list includes PRs from all repos where you have commit privileges.

Optionally, you can restrict this set of repos to only those repos connected to Reviewable, or watched or starred on GitHub. This can be useful if you have push permissions to many on a lot of repos—as in the case, for example, that you don’t see random open-source repos while at work.</td>
</tr>
</tbody>
</table>

