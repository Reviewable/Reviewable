# Introduction

Reviewable is a comprehensive code review tool that is fully integrated with GitHub (and only GitHub). 

![alt_text](images/readme_2.png "")
<br>

The Reviewable platform is:

*   **Thorough** — Tracks where par­tic­i­pants stand on each dis­cus­sion, en­sur­ing it won't dis­ap­pear un­til re­solved. Fully cus­tomiz­able logic de­ter­mines when a re­view is com­plete.
*   **Efficient** — Clearly shows net deltas since last time you looked, even if com­mits get re­based or amended. Batches com­ments and cor­rectly threads email re­sponses.
*   **Fo­cused** — Works only with GitHub and GitHub En­ter­prise, mak­ing for a seam­less in­te­gra­tion. Min­i­mal ad­min busy­work, no ex­tra fluff — just awe­some code re­views.

With Reviewable, you can:

*   In­stantly diff any two re­vi­sions of a file, in either a uni­fied or side-by-side view.
*   Hide mi­nor changes, including white­space, merge, and re­base deltas.
*   Map line com­ments across file re­vi­sions and keep them around un­til re­solved, not just un­til changes are pushed.
*   Keep track of who re­viewed which re­vi­sion of each file to ensure that no changes are missed. 
*   Com­bine com­mits for review, or re­view each commit separately.
*   Cus­tomize the line length mar­gin, fonts, col­ors, key­board short­cuts, and more. 
*   Jump from a com­ment straight to the right spot in your fa­vorite ed­i­tor.
*   Enjoy a mod­ern, clean UI—with a touch of whimsy. 
*   Get full con­tex­tual help, and fast sup­port if you have ques­tions.
*   Sign in with GitHub ac­count—no sep­a­rate ac­counts to man­age. 
*   Keep all your code on GitHub, not on our servers.

This user guide is a helpful resource for learning all of the details about every Reviewable feature. Soon, you'll be more efficient at eliminating buggy code and helping your team improve their delivery pipeline. 

## How to use this guide

Reviewable is a powerful, feature-rich, and highly configurable tool, so it'll probably take you a while to figure out how to use it to its full potential.  The first steps are fairly straightforward, though:

1.  Everybody should read through the Registration and GitHub Authorization section that follows.  
2.  Then, if Reviewable is already set up for your favorite repos, you can just keep reading straight into the Reviews section that follows and dip into the other sections as needed. 
3.  If, on the other hand, you're an admin setting up Reviewable for the first time, you'll want to jump to the Repositories section first for details on how to connect repos and start a subscription (if necessary).

## Roles

Throughout these docs, we'll often refer to users by the role they play in a review.  Reviewable automatically assigns one of three roles to every review participant: 


*   Author: the creator of the pull request.  Note if an author marks a file as reviewed they'll become a reviewer. 
*   Reviewer: anybody that is not an author or mentionee.
*   Mentionee: someone other than the author that was @-mentioned in a discussion (except the main top-level one).  Note that a mentionee will become a reviewer if they start a new discussion or mark a file as reviewed.

<table border ="1", bgcolor="ADE9FB">
<tbody>
<tr>
<td><strong>NOTE</strong>: It's possible for one person to be both the author and a reviewer in a “self-review” scenario. In that case, the “reviewer” behavior usually trumps the “author” path, but it's context-dependent.</td>
</tr>
</tbody>
</table>
