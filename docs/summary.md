# Summary of changes

This panel appears at the very top of the code review page. The revision status is given at the top of this panel, indicating which revision you are reviewing—relative to the base. Compare this status with the counters in the [top toolbar](toptoolbar.md) [link to top toolbar].

A review is considered completed when all files have been reviewed at the most recent revision and all discussions have been resolved, with all counters at zero.

<table border ="1", bgcolor="ADE9FB">
<tbody>
<tr>
<td><strong>NOTE</strong>: This definition of complete can be overridden, either by (a) configuring a custom review completion condition or by (b) turning on branch protection in GitHub and checking some of the checkboxes.</td>
</tr>
</tbody>
</table>

You’ll also see the number of files, revisions and commits.

![reviewable summary of changes](images/summary_1.png "")
<br>

## Files
This is the number of files currently in the review. Any extra obsolete files have been modified at some point during the PR, but those are now the same as in the target base branch (so no further review of those files is necessary). 

<table border ="1", bgcolor="ADE9FB">
<tbody>
<tr>
<td><strong>NOTE</strong>: If you are in commit-by-commit review mode then, by default, obsolete files will still be selected for review for you, until you reach the commit at which they've become obsolete.</td>
</tr>
</tbody>
</table>

### Mark as Reviewed 
Click this button to mark all files as reviewed—up to the current right-bound of the diffs. This doesn’t necessarily mean that you think the files are ready for merging, but rather only that you reviewed them and added all of your comments. After clicking this button, a small Undo link will appear beneath it. (Incidentally, This is the only action in Reviewable that offers an explicit undo method of recovery.)

To mark files individually, click the buttons to the left of the file name in the File Matrix (see below). These buttons are also found in the file headers and at the bottom of unreviewed files.

### Show unreviewed diffs 
If you did not mark the last revision, click the <strong>SHOW UNREVIEWED DIFFS</strong> button to set the diff bounds to the next range that Reviewable thinks you need to examine. If you're a reviewer in <strong>combine-commits-for-review</strong> mode, this will be the range between the last reviewed revision (for each file) and the latest revision. If you're in <strong>review-each-commit</strong> mode, this is the range between the last fully reviewed commit and the next one. If you're the author, this will be the range between the last snapshotted revision and the latest one, so you can review the diffs that you have just pushed. When you first load the review page, this button has already been clicked for you -- that is, the initial diffs will be as explained above.

<table border ="1", bgcolor="ADE9FB">
<tbody>
<tr>
<td><strong>NOTE</strong>: When applicable, you’ll find a small <strong>Show all diffs</strong> link beneath the SHOW UNREVIEWED DIFFS button that will show the full diffs between the base and the latest revision for each file. </td>
</tr>
</tbody>
</table>


When appropriate, a checkbox for <strong>Include changes in files previously reviewed only by others</strong> will appears beneath the <strong>SHOW UNREVIEWED DIFFS</strong> button. Leave this box unchecked to automatically partition a review among multiple reviewers. For each file, Reviewable finds the last reviewed revision, then considers everyone who reviewed it to be a reviewer of that file. 

So if Peter reviews a file at r1, and then John force-reviews it at r2, then John becomes a reviewer of that file and—by default—won't get diffed for Peter.  

The exact semantics of this feature are a bit tricky, though, so please see [issue #404](https://github.com/Reviewable/Reviewable/issues/404) for a full exploration and why some people choose to remap <strong>n/p</strong> onto <strong>nextPersonallyUnreviewedFile()</strong>.

## Revisions 
This is the total number of revisions in the review. Each revision is an automatic, unmodifiable capture of one or more commits—the logic for grouping commits into revisions depends on the review style (see below), number of commits pushed at the same time, commit authors, etc.. You’ll find the commits assigned to a revision in the Review Discussion box, and also in the Changes drop-down at the very top of the page. 

A <strong>_provisional revision_</strong> is tentative, since it may still change up to the point at which someone begins reviewing it. The intent behind provisional revisions is to permit the PR author to self-review the changes and push fixes without polluting the revision list.  Provisional revisions are italicized in the file matrix.

An <strong>_obsolete revision_</strong> is one that is no longer part of the pull request due to a force push that changed the commit history.  It will appear crossed out in the file matrix.

## Commits 
This is the current number of commits in the pull request, including the commits in the source (head) and target (base) branches. Click any of the links here to open the corresponding GitHub page in the same tab.

<strong>Review style</strong> — From this drop-down, choose the style of review. This will affect how commits are grouped into revisions, and also the suggested sequence of diffs to review. 

<table border ="1", bgcolor="ADE9FB">
<tbody>
<tr>
<td><strong>NOTE</strong>: Snapshotted revisions won’t get restructured, so you may encounter surprising results if you switch the review style after beginning the review.

<br>

An exception to this is the case in which a revision was snapshotted only because somebody other than the PR author looked at it—in which case it appears snapshotted but it is OK for restructuring. The purpose of this is to enable a reviewer to switch the review style, since just loading the page will show the diff and snapshot the revisions.
</td>
</tr>
</tbody>
</table>

There are two types of review styles:

*   <strong>Combine commits for review</strong> — review commits that are grouped together according to the time at which they were pushed and a few other factors. Keep in mind that some commits might not be accessible for diffing.
*   <strong>Review each commit separately</strong> — a revision is created for each commit, even if a successive commit wrote over previous changes. We recommend choosing this review style only if the commits have been carefully organized. Keep in mind that there are some built-in limits on how many revisions can be created together. This means that commits may get aggregated if those limits are exceeded.  Please contact support to discuss raising the limits for your repos if you feel this would be useful.

![reviewable review style](images/summary_2.png "")
<br>


<table border ="1", bgcolor="ADE9FB">
<tbody>
<tr>
<td><strong>OTHER NOTES</strong>
<br>
<br>
1.  You can change the target branch of the PR here if you have the necessary permissions.<br>
2.  If you're a repo admin, you can also set the default review style for the repo via a small link.

</td>
</tr>
</tbody>
</table>

### Review labels and participants summary 

This summary appears at the bottom of the general discussion (see the figure below). It includes the relevant milestone for the PR, any labels that have been applied, and a list of participants in the review. 

For each participant:

*   a red or grey dot on the avatar indicates their current approval and "needed" status—identical to the review list.
*   The comment icon will be dark in color if the participant has any drafts pending. 
*   The comment text indicates the last time they edited the review.
*   The **assigned** and **review requested** markers indicate the corresponding state.
*   There may also be a chronological listing of all the emojis used in comment—any comments, not just in the general discussion.

![reviewable review labels and participants](images/summary_3.png "")
<br>

