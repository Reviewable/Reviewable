# Code review

In Reviewable, each review corresponds to a GitHub pull request. To initiate a code review, you’ll first need to create a pull request as usual and then access the corresponding review. This can be done either (a) through the link to Reviewable inserted into the PR, or (b) by clicking on the PR on your Reviewable dashboard.

In general, Reviewable keeps data synchronized between the review and its pull request for all compatible features, such as assignees, comments, and approvals.  However, some features are unique to Reviewable (such as file review marks or discussion dispositions). Other Reviewable features cannot be mapped effectively due to GitHub API limitations, such as line comments that often become top level comments.  Consequently, we don’t recommend mixing use of Reviewable and GitHub reviews on the same pull request as the experience will prove frustrating on both sides.

{:.tip}
Reviewable can't operate directly on raw commits, since it doesn't actually clone your repo. It depends heavily on GitHub APIs that are only available for pull requests.

This chapter provides an overview of the review page, but the core features of reviewing files and managing review discussions are addressed separately in subsequent chapters.

## User roles

Throughout this guide, we'll often refer to users by the role they play in a review.  Reviewable automatically assigns one of three roles to every review participant:

* **Author**: the creator of the pull request.  Note if an author marks a file as reviewed they'll become a reviewer.
* **Reviewer**: anybody that is not an author or mentionee.
* **Mentionee**: someone other than the author that was @-mentioned in a discussion (except the main top-level one).  Note that a mentionee will become a reviewer if they start a new discussion or mark a file as reviewed.

It's possible for one person to be both the author and a reviewer in a “self-review” scenario. In that case, the “reviewer” behavior usually trumps the “author” path, but it's context-dependent.

<a id="publish"></a>

## Publishing your review

As you work through a review using the tools at your disposal, Reviewable will automatically save your changes but they won't be visible to others.  To publish all drafts and other buffered state changes (including review marks, dispositions, and acknowledgements), click the **Publish** button. This action will reveal all of these to other authorized Reviewable users, and also post a single, combined message to the PR on GitHub.

{:.tip}
To temporarily keep a draft from being published, switch its disposition to **<i class="fa fa-question-circle"></i> Pondering**.

{:.tip}
If you'd like to suppress posting the combined message to Github, e.g. because you want to separate the Reviewable review from the GitHub review process, you can do so on a PR-by-PR basis. Just add the `Comments only in Reviewable` label (exact spelling!) to the PR and neither batch published nor single-send comments will be posted to GitHub.

{:.important}
Some Reviewable inline comments won't appear as inline comments in GitHub and vice-versa, because the GitHub model for comment placement is poor and trying to conform to it would invalidate many of the best features in Reviewable. <more> In more detail, it's important to understand that GitHub has two types of inline comments: pull request (PR) comments and commit comments. PR comments are assigned to lines based on the raw git diffs between two commits. Reviewable doesn't use these diffs, making mapping locations hard (see [issue #14](https://github.com/Reviewable/Reviewable/issues/14)), and can place comments on lines that don't appear in the diffs. Also, comments placed on negative delta lines in GitHub don't actually record sufficient information to figure out what line they're really on! Commit comments share most of those limitations, and also disappear from the PR if the branch is rebased. Finally, it's impossible to post commit comments without triggering a notification email for each and every comment, and while PR comments can be batched the API only allows one commit to be targeted per batch and doesn't support threading.</more>

You can open the dropdown menu off the **Publish** button to set a few extra options. The dropdown also shows you a preview of how your published message will appear on GitHub. You can click on any of your comments in this preview to navigate to the corresponding draft in the review.

![reviewable set the approval level](images/publish_1.png ':size=628')

### Approval levels

Like for GitHub reviews, there are three approval levels you can choose from when publishing via the dropdown attached to the button:

* **Comment** — Submit general feedback without explicit approval.
* **Approve** — Submit feedback and approve merging these changes.
* **Request changes** — Submit feedback that must be addressed before merging.

Reviewable will select a default approval level for you according to your review marks and the disposition of any comments you’re sending. You can override this level in the Publish dropdown menu for the review that you are about to publish (your selection is not “sticky” for subsequent publications). This approval level will be visible to others, and may affect the review completion requirements for both GitHub and Reviewable.

{:.tip}
You may only change the approval level if you have write permissions to the repository and are not the author of the PR.  As a repository admin you can also disable the **Approve** and **Request changes** for everyone via the [custom review completion condition](repositories.md#completion-condition) if they are apt to mess up your team's workflow.

{:.important}
If you choose **Comment**, any previous **Approve** or **Request changes** will remain in effect; you cannot rescind your vote, only change it.

<a id="sync-requested-reviewers"></a>

### Requested reviewers synchronization

Reviewable maintains its own list of people whose action is needed on a review (as shown on the [dashboard](dashboard.md#review-state) and in the [participants summary](#labels-and-participants-summary)), independent of GitHub's requested reviewers list.  You can choose to synchronize the latter with the former by checking the **Sync requested reviewers** box.  Doing so will request reviews from Reviewable's awaited reviewers, and cancel requests for people who have left Reviewable's list.  The option shows you what changes it will make in GitHub and you can always override it with `±reviewer` [inline directives](discussions.md#inline-directives).

{:.important}
It's not possible to request a review from the pull request's author in GitHub, nor from people who aren't collaborators on the repo, even if the user in question is on Reviewable's list of awaited reviewers.  Only users with push permissions on the repo can request reviewers.

{:.tip}
Keeping requested reviewers up-to-date (rather than just requesting the initial review) can improve integration with other tools, such as [Pull Reminders](https://pullreminders.com/).

Repository admins can customize the list of awaited reviewers and, if desired, override the **Sync requested reviewers** checkbox in a [custom review completion condition](repositories.md#completion-condition).  For example, you may wish to remove other users from the list if the PR author is on it, or force this option on for everyone to maintain a consistent workflow.

<a id="merge"></a>

## Merging a pull request

When a review is complete, a victory graphic appears and you can merge the pull request directly from within Reviewable given sufficient permissions.

![merge victory graphic](images/merge_2.png ':size=311')

A review is considered complete when the first defined condition of the following is true:

1. You've defined a [custom review completion condition](repositories.md#completion-condition) and it has returned a verdict with `completed: true` (irrespective of any other per-file or per-discussion flags).

1. You've turned on branch protection for the target branch in this repo in GitHub, and GitHub says that a merge is permitted.

1. Otherwise, a review is considered complete when GitHub reports that merging the branch won't cause any conflicts, all files have been marked reviewed by at least one person at the most recent revision, and all discussions have been resolved.  (In this case, the toolbar will show a green Checks donut, a grey Changes revision, and grey zero counters in the remaining boxes.)

To merge the pull request, click and hold the button for a couple seconds until the arming indicator fills with yellow and starts pulsing, then release.  This procedure is in place to reduce the chances of accidentally merging a pull request without requiring a separate confirmation.

You can set merge options and edit the merge commit message via the dropdown attached to the button:

![merge options](images/merge_1.png ':size=440')

Here you can select between the usual GitHub merge styles (normal/full, squash, and rebase), and whether Reviewable should automatically delete the source branch for you if the merge is successful.  Your selections are automatically persisted for this review, and the selections you made last will be applied to any new reviews.  A [custom review completion condition](repositories.md#condition-output) can force the merge style to use.

{:.tip}
When using the rebase merge style, Reviewable will indicate if the merge will be a fast-forward by adding a small annotation under the style radio button.

If you've selected the full or squash merge styles, you can edit the automatically generated merge commit message as well, or generate your own default in your [custom review completion condition](repositories.md#condition-output).

## Review toolbar

At the top of every review page you’ll find a floating toolbar with some core state indicators and buttons for common actions.

![reviewable top toolbar right](images/toptoolbar_right.png)

At the end of the toolbar you'll always find either a **Publish** or **Merge** button, depending on the review's state.  Note that if you have drafts pending, you'll always see the **Publish** button even if the pull request is otherwise mergeable.  See the sections above for details on these two operations.

If you scroll down a bit, a bunny shortcut menu icon appears at the left of the toolbar.
![reviewable top toolbar left](images/toptoolbar_left_bunny.png)

Click the bunny shortcut menu icon to drop down a panel in which you can jump to a file or quickly edit the top-level draft.  (Again, this menu icon only appears after you've scrolled down the page a bit.)

We'll now look at the functionality of the different features moving from left to right along the toolbar.

### Checks

This item summarizes the current condition of GitHub's CI commit statuses and checks, mergeability, and review completion.  The donut chart icon indicates the relative proportion of <span class="green label">successful</span>, <span class="grey label">pending</span>, and <span class="red label">error/fail</span> states.

Click the item to open a panel with more details:

![reviewable checks](images/toptoolbar_2.png)

These state icons may appear in the panel:

![reviewable check status](images/toptoolbar_3.png ':size=300')

If you're a repo admin you can click on the small wrench icon next to the current review state to jump to the [custom review completion condition](repositories.md#completion-condition) editor in the repository's settings.

Also, if your PR branch is behind the target branch, you can merge the target branch into your PR by clicking the small merge button, next to the mergeability status.  Repo admins can disable this feature in a custom [review completion condition](repositories.md#condition-output).

### Changes

This item summarizes the changes you're currently looking at.  The revision label indicates the revision that is the current right diff bound for all files, or `r??` if it's a mix.  If the label is <span class="red label">red</span>, then you have reviewed all files in your current diff but there are more unreviewed revisions that remain. Click to open the panel, and then click **Show Unreviewed Diffs**. Or, adjust the diff bounds manually yourself.

Click the item to open a panel with more details:

![reviewable changes](images/toptoolbar_4.png)

This is similar to parts of the [changes summary box](#changes-summary), but also includes a list of commits currently in scope.

### Counters

The next three items on the toolbar are counters for files, discussions, and drafts.  <span class="red label">Red</span> counters indicate that you must address the given number of items to advance the review.  <span class="grey label">Grey</span> counters indicate that other participants must address the given number of items, but you're in the clear. Grey counters with a <span class='grey label deferred'>red stripe</span> indicate that you've [deferred](#deferring-a-review) reviewing files or responding to conversations until others have acted, but otherwise work just like a <span class='grey label'>grey</span> one.

{:.tip}
The counters take into account your unsent drafts, so somebody else may see different numbers on the same review.

The **files counter** displays the number of files that remain to be reviewed at the current diff bounds, either <span class="red label">by you</span> or <span class="grey label">by others</span>.  Click to cycle between these files (default keyboard shorcut: `n`).  You're free to disregard these suggestions, of course, but if you find yourself doing so often you may want to check the review settings in the [Changes summary box](#changes-summary) or customize your [review completion condition](repositories.md#completion-condition), which also controls the per-file reviewed state.

{:.tip}
If you can’t get things to work the way you want, have a look at [issue #404](https://github.com/Reviewable/Reviewable/issues/404) for a more thorough exploration of “to review” semantics and suggestions for alternative command bindings.

The **discussions counter** display the number of discussions that are waiting for your <span class="red label">reply</span> or that are <span class="grey label">unresolved</span>.  Click to cycle between these discussions (default keyboard shortcuts: `j` for next unreplied, `⇧J` for next unresolved).

{:.tip}
The main general discussion is always considered resolved.

The **drafts counter** displays the number of drafts you have pending, and also turns red if you have any buffered state such as review marks, disposition changes, or acknowledgements.  Click to cycle between your drafts.  You can publish all of your drafts and other buffered changes by clicking the **Publish** button.

## Changes summary

This panel appears at the very top of the review page. The top line describes the current diff set you're viewing as succinctly as possible to help orient you.  There's also a link to the pull request in the top-right corner..

![reviewable summary of changes](images/summary_1.png)

The panel is divided into three sections, and has some auxiliary [file matrix](files.md#file-matrix) controls at the bottom and may also have some unique styling if a review has been [deferred](#deferring-a-review).

### Files

This shows the number of files currently in the review.

Any extra _obsolete files_ have been modified at some point during the PR, but those are now the same as in the target base branch (so no further review of those files is necessary).  They're usually hidden by default but you can reveal manually by clicking a small link next to the count.  If you are in commit-by-commit review mode then obsolete files will still be selected for review for you, until you reach the commit at which they've become obsolete.

The **Mark as Reviewed** button will mark all files as reviewed—up to the current right-bound of the diffs. This doesn’t necessarily mean that you think the files are ready for merging, but rather only that you reviewed them and added all of your comments. After clicking this button, a small **Undo** link will appear beneath it for a while. (Incidentally, this is the only action in Reviewable that offers an explicit undo method of recovery.)

To mark files as reviewed individually, click the buttons to the left of the file name in the File Matrix, or in the file headers and at the bottom of unreviewed files.

### Revisions

This shows the total number of revisions in the review. Each revision is an automatic, unmodifiable capture of one or more commits. You’ll find the commits assigned to a revision in the Review Discussion box, and also in the Changes drop-down at the very top of the page.

{:.tip}
The logic for grouping commits into revisions depends on the [review style](#changes-commits), number of commits pushed at the same time, commit authors, etc.  There are also some safety limits for how many revisions Reviewable will create at one time.

A _provisional revision_ is tentative, since it may still change up to the point at which someone begins reviewing it. The intent behind provisional revisions is to permit the PR author to self-review the changes and push fixes without polluting the revision list.  Provisional revisions are italicized in the file matrix.

An _obsolete revision_ is one that is no longer part of the pull request due to a force push that changed the commit history.  It will appear crossed out in the file matrix.

The **Show Unreviewed Diffs** button (exact wording varies) in this section will set the diff bounds on all the files to the next range that Reviewable thinks you need to examine. When you first load the review page, this button has in essence already been clicked for you — that is, the initial diffs will be what Reviewable thinks you should be looking at, not necessarily the ones that you were looking at on your last visit.  <more>If you're a reviewer in a **combined commits** style review, this will be the range between the last reviewed revision (for each file) and the latest revision. If you're using **review each commit** style, this will be the range between the last fully reviewed commit and the next one. If you're the PR author, this will be the range between the last snapshotted revision and the latest one, so you can review the diffs that you have just pushed.</more>

{:.tip}
When applicable, you’ll find a small **Show full diff** link beneath the **Show Unreviewed Diffs** button that will show the full diffs between the base and the latest revision for each file.  This will show you exactly the full deltas that will be applied if the PR is merged.

When there is more than on reviewer participating in the review, a dropdown with three **review overlap strategy** options will appear beneath the button. This setting changes which file diffs are suggested for the user to review and implicitly sets the default for any future reviews.

<a id="file-review-type"></a>

- **Skip files claimed by others** suggests files that have been previously reviewed by you, or that nobody has reviewed yet. Select this if you want to divide work by skipping files already reviewed by someone at an earlier version.
- **Review any unreviewed files** suggests files to review if they have not been reviewed by anyone at the current revision. Select this if you want to combine efforts and review any file that needs reviewing.
- **Review all files personally** suggests files you have not personally reviewed. Select this if you want to ensure that you review every file yourself, ignoring other reviewers.

{:.tip}
Re­gard­less of which op­tion you se­lect you will still be able to man­u­ally diff and re­view any file you want.

<a id="changes-commits"></a>

### Commits

This shows the current number of commits encompassed by the pull request, along with the source (head) and target (base) branch names. You can easily copy the source branch name (e.g., to check out locally) or change the target branch of the PR if you have the necessary permissions.  Click any of the other links here to open the corresponding GitHub page in the same tab.

The **Review Style** dropdown lets you choose the style of this review, affecting how commits are grouped into revisions and the suggested sequence of diffs to review.

![reviewable review style](images/summary_2.png)

There are two review styles, and changing the style will require from a few seconds to a minute or so to restructure the provisional revisions in the review.

* **Combine commits for review** — review commits that are grouped together according to the time at which they were pushed and a few other factors. Keep in mind that some commits might not be accessible for diffing.
* **Review each commit separately** — a revision is created for each commit, even if a successive commit wrote over previous changes. We recommend choosing this review style only if the commits have been carefully organized. Keep in mind that there are some built-in limits on how many revisions can be created together. This means that commits may get aggregated if those limits are exceeded.  Please contact support to discuss raising the limits for your repos if you feel this would be useful.

If you're a repo admin, you can also set the default review style for the repo via a small link under the dropdown.

{:.important}
Snapshotted revisions won’t get restructured, so you may encounter surprising results if you switch the review style after beginning the review.  An exception to this is the case in which a revision was snapshotted only because somebody other than the PR author looked at it, in which case it appears snapshotted but is OK for restructuring. The purpose of this is to enable a reviewer to switch the review style, since just loading the page will show the diff and snapshot the revisions.

## Labels and participants summary

This summary appears at the bottom of the general discussion (see the screenshot below). It includes the relevant milestone for the PR, any labels that have been applied, and a list of participants in the review.

For each participant:

* A <i class="fa fa-hand-o-right" style="color: #7D8084"></i> to the left of the avatar indicates if the person is being waited on.
* Their current approval status is shown next to the avatar (<i class="fa fa-thumbs-o-up" style="color: #5BBD72"></i> approved or <i class="fa fa-hand-paper-o" style="color: #FFA22E"></i> changes requested).
* The comment icon will be dark in color if the participant has any drafts pending.
* The comment text indicates the last time they edited the review.
* The **assigned** and **review requested** markers indicate the corresponding state.
* There may also be a chronological listing of all the emojis used in comments (any comments, not just in the general discussion).

![reviewable review labels and participants](images/summary_3.png)

## Deferring a review

When you publish a review and you have files left to review or discussions left to reply (red counters), the review will be automatically deferred for you: the red counters will turn grey with a red stripe and the review will not be awaiting your action. This lets you post a partial review — perhaps requesting some larger design changes or putting off reviewing test cases — and visibly hand off responsibility for taking the next action.

![reviewable deferral dashboard](images/deferring_dashboard.png)

A review will remain deferred until either a new revision of a file becomes available for you to review or a new comment is posted. When this happens, the review will be reactivated for you with all counters going back to being red (including for files or discussions you had deferred), and the review awaiting your action once more.

Note that you can continue manipulating a review as usual while it's deferred, except that Reviewable won't suggest the next set of diffs to review. If you wish, you can also reactivate a deferred review manually by clicking the continue review now button on the review page.

![reviewable deferral changes](images/deferring_changes.png)

{:.tip}
Sending an individual comment (via its dedicated send button) doesn't affect deferrals either way: it will neither defer a review, nor cause a deferred review to become active again.

## Reviewing commit messages

Reviewable composes a system file used for reviewing commit messages.  The **commit file** is denoted with a special commit icon prepended to its name and will always be listed first in the files list (matrix and review).  This file will contain a list of all *non obsolete* commit messages that precede it, regardless of whether you're reviewing with the **combined commits** or **commit-by-commit** review style.  It behaves just like a normal file in that it will be diffed against the selected revision and supports discussions, however it *will not* impact your repo or PR in anyway -- it's solely used by Reviewable for reviewing commit messages.

![reviewable commit matrix](images/commit_matrix.png)

![reviewable commit review](images/commit_review.png)

{:.tip}
While the commit file is virtual, it still needs to be marked as reviewed as much (or as little) as normal files.  It's included in review file [counters](#counters), but not counted in review status messages unless it's the only unreviewed file.  It's also handled separately from normal files when evaluating a custom review completion condition; see [custom completion condition](repositories.md#custom-review-completion-condition) for details.

## Keyboard shortcuts

There are a number of keyboard shortcuts available to power your way through a review. Type `?` to display a popup that lists the current bindings. Learn how to modify the available commands and the corresponding keyboard shortcuts in the [Custom key bindings](accountsettings.md#custom-key-bindings) section.

![reviewable keyboard shortcuts](images/toptoolbar_7.png)
