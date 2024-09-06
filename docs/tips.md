# Tips and Tricks

## Videos

We're trying out a new video format where an engineer goes through a real code review while we kibbitz and give them tips on using Reviewable:
- [Adam Storm from CockroachDB reviews some code](https://www.youtube.com/watch?v=w3cgXBD7ErQ)

There's a growing collection of [tips in screencast format](https://www.youtube.com/channel/UCosLEhkOCx39oEPS9gaF0Gw/), if that's what you prefer, including:
- [What's the fastest way to check out your review code?](https://www.youtube.com/watch?v=JqFGBZa7YGg)
- [Keyboard shortcuts for efficient reviews](https://www.youtube.com/watch?v=xuJ2PGFprBE)
- [Customizing keyboard shortcuts](https://www.youtube.com/watch?v=lg2tvhTTQNE)
- [Customizing code review completion conditions](https://www.youtube.com/watch?v=mIwg3zRpSQE)

## Articles

Here are some articles and blog posts on code reviews that we found worth reading:
- [How to Make Your Code Reviewer Fall in Love with You](https://mtlynch.io/code-review-love/)

## Visual tweaks

Reviewable doesn't have a lot of settings exposed in the UI to customize how things look to keep things simple.  However, you can easily inject a [custom stylesheet](accountsettings.md#custom-stylesheet) to override styling on a wide range of elements.  Here are some commonly requested examples.

### Line numbers

Reviewable doesn't show line numbers in the diff for a number of reasons &mdash; there's a long discussion in [issue #147](https://github.com/Reviewable/Reviewable/issues/147).  The snippet below overrides this.  It's not perfect but it should work in the vast majority of cases:

```css
{{#include tweaks.css:show-line-numbers}}
```

If you don't need to tweak these styles, just paste `https://gist.githack.com/pkaminski/4fd7c7b9014856de32bb43f84a396772/raw/line_numbers.css` into the custom stylesheet field.

**Be careful** though: by changing the layout in this way, Reviewable won't be able to automatically pick a diff width that fits your window so you'll need to [control it manually](files.md#diff-layout).

### Diff line background

When in side-by-side diff mode, Reviewable doesn't highlight the whole line &mdash; just the deltas.  If you'd prefer the full line to also be highlighted like in unified diff mode you can use these styles:

```css
{{#include tweaks.css:highlight-whole-diff-line}}
```

Or just use this link:  `https://rawgit.com/pkaminski/2922da3d58f76a8ed7bf/raw/highlight_lines_in_two_columns.css`.

### Code Coverage Bars

If you have Reviewable set up to [show code coverage bars](repositories.md#code-coverage) in your diffs, you can customize the bar colors by setting these css properties in your customization stylesheet.

```css
{{#include tweaks.css:code-coverage-default}}
```

A darker example:
```css
{{#include tweaks.css:code-coverage-darker}}
```

### Victory bunny

Don't like the merge bunny?  Turn it off like this:

```css
{{#include tweaks.css:no-merge-bunny}}
```

### Removing wavy lines on collapsed regions

Want to turn the wavy lines off to simplify how collapsed diff regions look? This snippet will do the trick:

```css
{{#include tweaks.css:no-collapsed-region-wavy-lines}}
```
You can also use this link: `https://rawcdn.githack.com/earlAchromatic/reviewable-custom-styles/6e35f21b6fa3d3978a4ae5f8ba0f23e2d5d6a475/no-wave.css`

## Skipping vendored dependencies

Depending on your package manager, you sometimes need to commit dependency source code into your repository but don't necessarily want to review updates to those hundreds or thousands of files every time you update.  Reviewable automatically identifies and groups many vendored files, and offers a few helpful features for this situation, from least to most invasive:

1. [Suppress diffs](files.md#diff-suppression-and-file-type) for vendored files via `.gitattributes`.
2. Use a custom review completion condition to [identify files as vendored](https://github.com/Reviewable/Reviewable/blob/master/examples/conditions/identify_vendored_files.js) in the file matrix, which will allow you to mark them all as reviewed with one click.
3. Use a custom review completion condition to preemptively [treat all such files as reviewed](repositories.md#files).  This is the nuclear option and should work by itself, or you can combine it with the previous options for more flexibility.

## Ignore comments by bots

When a user posts a comment (whether via Reviewable or GiHub), we automatically snapshot all revisions to ensure that the comment's context is preserved.  This can lead to a mess, though, if you're taking your time pushing commits to a PR before asking for a review and a bot (perhaps CI?) is posting comments as you go.  There can be dozens of snapshotted revisions by the time you invite a reviewer!

To avoid this situation, Reviewable attempts to detect whether a comment was posted by a bot and avoids snapshotting revisions in that case.  We detect bots by checking whether the username ends with `[bot]` (for GitHub app bots) or `-bot`, or the display name ends with `(bot)`.  If you have a favorite bot account changing its username could be tricky, but it should be easy to append `(bot)` to its name since that oughtn't be referenced anywhere.

## Easy local revision checkout

### TLDR

```sh
git fetch origin refs/reviewable/pr756/r6
git checkout FETCH_HEAD
```

### Explanation

Reviewable stores references to commits associated with each revision on Github.
This has a handy side effect of making it easy to checkout a local copy of any revision from any Reviewable pull request.

This can be done in two steps.

1. Get a reference to the pull request or revision of interest.
2. Checkout or make use of that reference.

#### 1. Get the revision reference

If your prId were `756` and your desired revision were `6` as in the image above, you would store revision reference in `.git/FETCH_HEAD` constant using

```sh
git fetch origin refs/reviewable/pr756/r6
```

Note that the form of the reviewable reference titles as shown above is `refs/reviewable/pr${prId}/r${revisionId}` .

The ids `prId` and `revisionId` are available by inspection on the reviewable.io. review page:

![crop from review page showing prId of 756 and revisionId of 6](images/tips_1_prId.png)

{:.tip}
You can also just explore the references using the git client, by typing a reference name partially, as in `git fetch origin refs/reviewable/`, and then use tab completion to get your options.

#### 2. Use the revision reference

After saving the FETCH_HEAD reference as described above, you can use it as you see fit.

For example check out the revision code using

```sh
git checkout FETCH_HEAD
```

or glance at the log using

```sh
git log -n 1 --oneline FETCH_HEAD
```
