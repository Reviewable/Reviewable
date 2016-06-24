_This is a sample onboarding doc from one of Reviewable's larger users.  Use it as you will, and feel free to suggest improvements._

# Reviewable.io

We use [Reviewable.io] to conduct code reviews on GitHub pull requests.

## Setup Instructions

1. Go to [https://reviewable.io][Reviewable.io].
1. Click `SIGN IN WITH GITHUB` on the top right.
1. Grant access for Reviewable to view your public information.
1. In the dialog that pops up, grant access to your private repositories and organization info. <sup>1</sup>
1. You can now view all of the reviews that you are involved in.

<sup>1</sup> It's unfortunate that it's necessary to grant Reviewable access to
all of your private repositories.  They claim to ignore all repositories that
aren't explicitly enabled in Reviewable but they do still have the ability to
access them.  It's possible for organizations to [deny access to third party
applications unless explicitly authorized][organization permissions].  Enabling
this on an organization will deny access to the organization's private repositories
but there isn't any way to deny access to your own private repositories while
allowing access to an organization's repositories.  If you aren't comfortable
with these side effects, you can make another GitHub account specifically for
_$company_ work that only has access to _$company_ repositories.

## Reviewable Features

 - Discussions can be marked as Discussing, Satisfied, or Blocking which
   determines who needs to look at which discussions.  Discussions need to be
   resolved before the review can be completed.
 - Comments are sent in batch with an explicit Publish action to avoid a slow
   flood of notifications.
 - Activity on Reviewable creates comments on the GitHub pull request.
 - Marking individual files as reviewed allows for incremental reviews.
 - Viewing changes since the last time the file was reviewed when new commits
   are pushed makes reviewing updates much easier.
 - Setting the GitHub commit status to the status of the review makes it easy
   to determine the state of the pull request at a glance.

## Workflow

All pull request descriptions contain a link to the review on Reviewable.  The
assignee should start reviewing the code in Reviewable's interface.

You can start a new discussion by clicking on a line of code and typing in your
comment.  This comment is only a _Draft_ - it is not published until the Publish button
in the top right corner of the page is clicked.  This allows you to make many
comments during a code review and send them all in batch rather than generating
a notification for each and every comment.

You can set your _disposition_ on the comment based on its severity. The disposition
changes how the discussion can be resolved, which determines if the review is complete or not.

Marking files as reviewed is as easy as clicking on the review button (the red
eye). The best practice is to mark files as reviewed as you go rather than doing it
all at the end.  This allows for incremental code reviews, and allows you to review
only the parts of the diff that have changed since you last looked at it.

Once you have reviewed all of the code, you can click the Publish button to
publish the comments and file review status.  This bounces the review back to
the author to make the required fixes in code, respond to the comments, and
resolve any discussions that have been fixed by the new commits.  The review
then bounces back to the assignee to take another pass at reviewing it.  This
entire process repeats until all files have been reviewed and all discussions
are resolved.  Once these conditions have been met, the Reviewable status check
on GitHub is set to passing.

## Tips and Tricks

Reviewable is a very fully featured code review tool that can seem cluttered
and intimidating at first.  There are a few tips and tricks that make reviewing
code easier and more intuitive.

### Keyboard Shortcuts

`?` opens the Keyboard Shortcuts modal which displays all of the current
keyboard shortcuts.  Here are a few of them that are particularly useful:

 - `.`: Next item that needs attention
 - `x`: Mark file as reviewed/unreviewed
 - `y`: Acknowledge comment

### Comment Intents

You can set the disposition of comments by starting the comment with "OK",
"LGTM", "FYI", or "BTW" which reduces the need to explicitly set the
disposition.  See the [comment intent changelog entry] entry for more
information.

### Resolving Discussions

Resolving discussions is a common sticking point when trying to complete a
review.  There are a few things that can make this much easier:

 - You can use `.` to find any items that need your attention and resolve them
   as necessary.
 - Often times, there aren't any items that are blocked on you e.g. discussions
   blocked on somebody else.  You can find such discussions by clicking on the
   "unresolved" button in the toolbar.
 - There are many ways to resolve a discussion - the particular actions
   required depend on the participants and their dispositions.  You can see a
   participant's disposition in the bottom right
   corner of the discussion which should guide you in determining how to
   proceed.  One or more of these actions will resolve any discussion:
   - Acknowledging the last comment.
   - Changing your disposition to "Satisfied" or "Discussing".
   - Having a participant change their disposition.
   - Dismissing a participant from the discussion.  Note that only repository
     admins can dismiss blocking participants from discussions.

### LGTM Button

The LGTM button at the bottom of the top level review discussion does not
approve the review. It merely prefills a comment with `:lgtm:` which has no
effect on the review status.  In order to approve a review, all files must
be reviewed and all discussions must be resolved.

### Help Overlay

Pressing `h` on a review page brings up the help overlay which provides inline
help for components of the UI.  This is particularly useful if the purpose of a
certain button or indicator isn't obvious.  Merely hover over the element in
question and press `h` to get a description of what it is and how to use it.

[Reviewable.io]: https://reviewable.io
[organization permissions]: https://help.github.com/articles/requesting-organization-approval-for-third-party-applications/
[comment intent changelog entry]: http://changelog.reviewable.io/4668
