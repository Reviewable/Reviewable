# Code review discussions

Review participants engage in discussions about the changes proposed in the pull request. A discussion is unresolved until it meets resolution criteria that corresponds to the dispositions of the participants. Any discussion will remain in place until it is resolved by the participants — irrespective of whatever changes occur to the files in the PR.  A discussion may also be unreplied for specific users; this state is independent of the discussion being resolved or not.

This chapter covers all types of Reviewable discussions, including:

*   The general discussion
*   Other top-level discussions (click the **Start a new discussion** button)
*   All the various line-specific discussions that occur among all review participants.

?> Participants in the general discussion have no dispositions, and it's always considered resolved.  Other top-level discussions created by clicking the **Start a new discussion** button behave identically to line-specific discussions.

Each comment indicates its author. Hover over the avatar to view the name and username of the author. You can use the browser Find feature to search throughout all of the comments for all instances of the author’s name or username. This technique will work even though the names and usernames aren’t actually visible on the page.


## Unreplied state
A discussion is in the unreplied state for you when there are new comments in the discussion (all the ones below the yellow **New comments** ribbon), and you haven't acknowledged or replied to those. The discussion may also be _unreplied_ for you if Reviewable thinks you need to reply to the discussion for another reason—according to the rules below. Unreplied discussions will increment the red counter in the toolbar.

**New comment(s)** indicates that you have not yet acknowledged or replied to any comments after this point. If it's necessary for you to mark comments as ready without replying or acknowledging the discussion, you can hover over the ribbon to reveal a **mark read** link.

You can either enter a reply or click the primary action button.


An unresolved discussion is in **unreplied** status for you (appears as red) if one of the following rules applies—but none of the preceding rules apply to anybody else. If rule #1 is applicable, a resolved discussion is **unreplied** for you.

1. You are a participant, or you are the PR author, or one of the participants is **Informing** and you have unread comments (even if the discussion is resolved), or you are **Working**.
2. You are the PR author and the discussion has only one active participant (which is not you). This applies even if you have no unread comments; that is, you acknowledged the discussion without replying.
3. You are not the PR author, the discussion has only the PR author as the active participant, and you have unread comments.
4. You are **Blocking** and the last comment is not yours.
5. You are **Discussing** and the last comment is not yours.
6. You are **Blocking**.
7. You started the discussion, and remain an active participant.
8. You are an active participant.


If you have draft state on the discussion (as in the case of a reply, for example), the future value is used when computing the unreplied resolved state in your view.   {#if-you-have-draft-state-on-the-discussion-as-in-the-case-of-a-reply-for-example-the-future-value-is-used-when-computing-the-unreplied-resolved-state-in-your-view}


The discussion is also considered to be replied—even if the draft state will cause it to become unreplied for you once published—unless you have unread comments newer than your draft reply or acknowledgement. Your published state is still used in the view of all other participants. {#the-discussion-is-also-considered-to-be-replied—even-if-the-draft-state-will-cause-it-to-become-unreplied-for-you-once-published—unless-you-have-unread-comments-newer-than-your-draft-reply-or-acknowledgement-your-published-state-is-still-used-in-the-view-of-all-other-participants}

## Older comments

Some comments may be hidden, and this can be seen in place where you find **Show N older comments**. Click the drop-down arrow to reveal options for displaying the older comments in **this file** only or in **all files**.

![reviewable older comments](images/discussions_5.png)


## Mark Read

New comments appear in yellow highlighting at the top, as shown in the figure below. These have not yet been marked as read. Normally, you'd take an action at the bottom of the discussion—such as indicating **Acknowledge,** or making a reply. This would implicitly mark the comments as read. There are rare cases in which you might not want to do that, in which case the **mark read** link can be useful.

To mark all new comments as read without taking any action, hover over this highlight for a moment and click the **Mark Read **link.

![reviewable mark read](images/discussions_1.png)



## Add a comment to the discussion

At the bottom of each discussion box, you can write a comment to add to the discussion. The draft is saved progressively as you write it, but won’t be visible to others until you click **Publish**.

?> Until you click **Publish**, other people will be able to see that you have unsent drafts pending and how long ago you last touched the review, for example, by editing a draft.

All comments are formatted as [GitHub-flavored Markdown](https://guides.github.com/features/mastering-markdown/).

**Toolbar: **In the toolbar at the bottom, toggle between writing and previewing your comment. Click the small **M **icon to open GitHub-flavored Markdown docs. Optionally, you can add images to your comment by clicking the upload button, by dragging an image onto the draft, or by pasting an image from your clipboard (in some browsers). If necessary, you can archive your draft by clicking the small trash icon. The trashed draft is retrievable by creating another comment in the same spot.

**Sending messages immediately:**  Click the icon with the out-arrow to immediately send the comment to all pull request participants. This does not affect any other pending comments, which is useful if a big review round is in progress, you have many drafts pending, and you need to send out an intermediate clarification or request. Since each recipient will receive an alert for each message you send this way (if so configured in GitHub, which is the default), it might be best to write all of your comments and then click the **Publish** button to send them all together.

![reviewable send messages immediately](images/discussions_6.png)


## Replying to Reviewable comments by email

Reviewable will do its best to parse incoming messages and split them up into the appropriate comment threads. This only works well, however, if you leave all the separators and comment links in place  so be sure not to mangle a quoted message too much in your reply. Quoted chunks will be shown in Reviewable if they are woven into your reply, but omitted otherwise—no matter if it is top- or bottom-quoted. Any parts of the message that can't be conclusively tied to a specific discussion will show up in a top-level comment instead.

**Shorthand:** You can reply with the single word **acknowledge** (or **ack**) to simulate clicking the primary  button in Reviewable (whatever its label might actually be). If a change is warranted, you can update the disposition in your reply. On a line by itself, insert **discussing**, **satisfied**, **informing, working**, or **blocking**. For information on how to use other shorthands that work in email and in-app comments alike, see **In-comment directives** and **Magic starting words]** in the Dispositions section below.

## Dispositions and resolution

When publishing comments in the discussion you’ll want to take note of your disposition, which indicates your attitude towards resolving the discussion. You take on a default disposition when you join a discussion and, to begin with, you’ll simply rely on these defaults and the normal action buttons. As you participate in more discussions, you may eventually decide to explicitly set your disposition or even change the defaults that Reviewable uses in various situations.

To commit disposition changes they must be published—even if you make no corresponding comment.

![reviewable dispositions](images/discussions_3.png)



The disposition is how you view the possibility of resolving the discussion. You can set the disposition to one of the following (depending on the current state of the discussion):

*   **Discussing** — Neutral on whether the discussion should be resolved; will possibly continue the discussion.
*   **Blocking** — Opposed to resolving the discussion while waiting on another contributor.
*   **Working** — Keeping the discussion unresolved while working on a related task This differs from **Blocking**, in that you remain the party responsible for moving the discussion forward, and the discussion will not ask for actions from other participants.
*   **Satisfied** — In favor of resolving the discussion. If there are no other participants, then the discussion is resolved and will not be brought to the attention of others. Otherwise, the conversation between existing participants is can continue.
*   **Informing** — Discussed is resolved, but left active for others to comment.

A discussion is resolved if and only if at least one participant is **Satisfied** or **Informing** and none of the participants are **Working** or **Blocking**, or if there are no active participants left. (Participants whose disposition is **Discussing** are abstaining from the decision.)

Disposition changes will be buffered as a kind of draft and will only be applied when publishing, just like marking a file reviewed. Disposition changes do not mark the discussion as read unless they are part of a reply.

Only active participants can be dismissed, and doing so only requires push permissions (not admin). Passive participants will exhibit other dispositions, such as **Following, Mentioned**, and **Dismissed**.


### Dismissing a user from a discussion
You may find it necessary to dismiss a user from a discussion—if, for example, the user isn't responding, has gone on vacation, or left the organization. If you have push permissions on the repo, you can click the drop-down for another user. If this user is an active participant (they are currently **Discussing** or **Blocking**, for example), you can choose either the **Dismiss from this discussion** or **Dismiss from all discussions** link at the bottom of the drop-down. Note that you won't see any action options if you only have pull permissions.


### Change the default disposition for various situations

There are 4 default dispositions (the combinations of author/reviewer and new/reply), and you can set each one individually. The disposition dropdown has a **Change default disposition** link at the bottom that, once clicked, will lock in your next selection as the default for situations like that of the current comment.  (For clarity, the link will change to a description that states which default you're setting.)

You can change the default disposition to fit your workflow preference. For example, consider that the default disposition is **Blocking** for both PR author-initiated and reviewer-initiated discussions. However, as the PR author, you may want to let the reviewer resolve these by changing the default disposition to **Discussing**, or choose **Informing** as the default to encourage purely informational discussions.

Similarly, if you're following an informal review process, you may want to set the default disposition of your reviewer-initiated discussions to **Discussing**, which enables the author to resolve a discussion directly.


### Override the disposition with a magic starting word

When you start writing a new draft comment, notice—before you begin typing—the small list of disposition mappings in the lower-right corner of the draft box. These are some examples of what you'll find there:

*   FYI or BTW → **Informing**
*   Minor or Nit → **Discussing**
*   Working or Will do → **Working**

Starting your draft with one of these words will switch to the corresponding disposition, letting you keep your hands on the keyboard. However, any manual change to the disposition will permanently override any magic word in the draft text.


## Rules for resolving a discussion

A discussion is resolved if and only if at least one participant is **Satisfied** or **Informing **and none of the participants are **Working** or **Blocking**, or if there are no active participants left.

?> Participants whose disposition is Discussing are abstaining from the decision.</td>

An unresolved discussion is in **unreplied** status for you (appears as red) if one of the following rules applies—but none of the preceding rules apply to anybody else. If rule #1 is applicable, a resolved discussion is **unreplied** for you.

Resolution rules:

1. You are a participant, or you are the PR author, or one of the participants is **Informing** and you have unread comments (even if the discussion is resolved), or you are **Working**.
2. You are the PR author and the discussion has only one active participant (which is not you). This applies even if you have no unread comments; that is, you acknowledged the discussion without replying.
3. You are not the PR author, the discussion has only the PR author as the active participant, and you have unread comments.
4. You are **Blocking** and the last comment is not yours.
5. You are **Discussing** and the last comment is not yours.
6. You are **Blocking**.
7. You started the discussion, and remain an active participant.
8. You are an active participant.

If you have draft state on the discussion (as in the case of a reply, for example, the future value is used when computing the resolved state in your view.

The discussion is also considered to be replied—even if the draft state will cause it to become unreplied for you once published—unless you have unread comments newer than your draft reply or acknowledgement. Your published state is still used in the view of all other participants.


### Dismissing a user from a discussion

You may find it necessary to dismiss a user from a discussion—if, for example, the user isn't responding, has gone on vacation, or left the organization. If you have push permissions on the repo, you can click the drop-down for another user. If this user is an active participant (they are currently **Discussing** or **Blocking**, for example), you can choose either the **Dismiss from this discussion** or **Dismiss from all discussions** link at the bottom of the drop-down. Note that you won't see any action options if you only have pull permissions.


### Change the default disposition for various situations

There are 4 default dispositions, (author/reviewer and new/reply), and you set it to correspond to a particular situation. When you're the reviewer, you set a default through the disposition drop-down in a reply.

You can change the default disposition to fit your workflow preference. For example, consider that the default disposition is **Blocking** for an author-initiated and reviewer-initiated discussions. However, you may want to let the reviewer resolve these by changing the default disposition to **Discussing**, or choose **Informing** as the default to encourage purely informational discussions.

Similarly, if you're following an informal review process, you may want to set the default disposition of your reviewer-initiated discussions to **Discussing**—which enables the author to resolve a discussion directly.


### Override the disposition with a magic starting word

When you click the **Start a new discussion **button to create a draft comment (or create any draft reply, notice—before you begin typing—the small list of disposition mappings in the lower-right corner of the draft box. These are some examples of what you'll find there:

*   FYI or BTW → **Informing**
*   Minor or Nit → **Discussing**
*   Working or Will do → **Working**

Starting your draft with one of these words will switch to the corresponding disposition, letting you keep your hands on the keyboard. However, any manual change to the disposition will permanently override any magic word in the draft text.

![reviewable override with magic starting word](images/discussions_4.png)


### Reviewer dispositions
Hover over the small circle icon in the lower-right corner of a discussion box to display the avatars for all of the participants in this discussion. Click on an avatar to see the disposition for that participant.


### Start a new top-level discussion

Typically, you would begin a top-level discussion if you want to have a distinct discussion in which you can track the disposition of participants (and the eventual resolution), but the discussion isn't attached to any specific file location. You may also want to do it just to separate a thread out, even if you don't care about resolution.

To do so, click the **Start a new discussion** button below the Review Discussion to begin a new top-level discussion that is unrelated to a specific file. Unlike the Review Discussion, this discussion will follow normal resolution rules.


## Acknowledge button
The primary action button label will correspond to both your role and the state of the discussion. Clicking it will always mark the discussion as read, but may have other effects according to these rules:

| Role | Discussion | Button label | Effect |
|------|------------|:-------------|--------|
| Informing | Resolved with no other participants | Retract | Sets disposition to Satisfied |
| Informing | Resolved | Conclude | Sets disposition to Satisfied |
| Active participant, not Satisfied | Unresolved with no other participants | Retract | Sets disposition to Satisfied |
| Not Satisfied | Unresolved and switching to Satisfied would resolve | Resolve | Sets disposition to Satisfied |
| PR author not Satisfied, or anyone Working | Unresolved | Done | Sets disposition to Satisfied and creates a "Done." message |
| Blocking | Unresolved and nobody Working | Accept | Sets disposition to Satisfied |
| Any | Unread comments | Acknowledge | Sets disposition to Following if passive participant or not a participant |

Marking comments as read (explicitly or in conjunction with a reply) when you're an active participant is also buffered, and applied only when publishing. This avoids situations where a discussion shows up as unreplied to somebody else before your reply was published.

### Comments

The default behavior for comments is this: A comment that creates a new discussion will change the disposition to **Blocking**. At the moment a user first replies to an existing discussion, the disposition will change to **Discussing** if not already an active participant. Either of these defaults can be persistently overridden—by user, and for each situation (initial / reply comment as reviewer / author).

If a comment starts with one of the following keywords, it will set the corresponding disposition (ignoring the defaults and default overrides above)—unless manually changed by the user for that comment:

| Prefix | Initial comment | First Reply | Subsequent reply |
|--------|:---------------:|:-----------:|:----------------:|
| FYI, BTW | Informing | Discussing | |
| Minor, Nit | Discussing | Discussing | |
| OK, Done, LGTM | | Satisfied | Satisfied |
| Working, Will do | Working | Working | Working |

## In-comment directives

You can add special directives inline to any comment (not just top-level ones) to add or remove labels, set the milestone, and add or remove assignees or reviewers.  Reviewable doesn't use a special UI for this so that it's easy to do without lifting your hands from the keyboard, works in all contexts (including when replying by email or on GitHub), and leaves an easily readable record.

The directives you can use are **±label**, **±milestone**, **±@username** (for assignees) and **±reviewer:@username** (for requested reviewers).  Reviewable will warn you about invalid assignees or reviewers—either directly or via email if necessary—but not about bad labels or milestones since false positives are too common there.

!> For email and GitHub comments, if the repo is not connected then directives won't take effect until somebody visits the review in Reviewable.  Editing directives in a previously sent message won't work either.


## Publishing comments
All draft comments, pending acknowledgements, disposition changes, dismissals, and review markings will publish along with the review. Learn more in the [Publishing section](reviews.md#publish).


