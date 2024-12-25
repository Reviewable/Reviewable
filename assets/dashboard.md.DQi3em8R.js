import{_ as t,c as o,a2 as i,o as r}from"./chunks/framework.C3km0Mkq.js";const s="/assets/reviews_4.DAy7CPcn.png",a="/assets/reviews_10.Dg_ayL8Q.png",n="/assets/reviews_5.9QxSl1Ed.png",d="/assets/reviews_6.CHIsKMv9.png",l="/assets/reviews_14.C4L-GALY.png",v=JSON.parse('{"title":"Reviews dashboard","description":"","frontmatter":{},"headers":[],"relativePath":"dashboard.md","filePath":"dashboard.md","lastUpdated":1735143827000}'),c={name:"dashboard.md"};function h(p,e,u,w,g,m){return r(),o("div",null,e[0]||(e[0]=[i('<h1 id="reviews-dashboard" tabindex="-1">Reviews dashboard <a class="header-anchor" href="#reviews-dashboard" aria-label="Permalink to &quot;Reviews dashboard&quot;">​</a></h1><p>Click the <strong>Reviews</strong> button at the very top of the page to display the reviews list. Here, you&#39;ll find all open pull requests in which you are a participant. As a participant, these PRs have either been created by you, assigned to you, contain comments from you, or mention you (or a team you belong to). Reviewable automatically updates this list at least once per minute (and data held in Reviewable is updated in real time), so there&#39;s no need to reload the page.</p><div class="tip custom-block"><p class="custom-block-title">TIP</p><p>If PRs appear to be missing from the list, try clicking the <strong>Include stalled pull requests/reviews</strong> link at the bottom of the panel. You may also want to click the green <strong>Also show team reviews</strong> or <strong>Also show private reviews</strong> buttons at the bottom if they&#39;re showing and you haven&#39;t yet granted those permissions. Finally, if PRs are still missing, check whether the relevant organizations have OAuth app access restrictions turned on.</p></div><p><img src="'+s+'" alt="reviewable reviews list"></p><p>PRs are sorted into groups ordered from most to least relevant. Within each group, PRs are sorted in chronological order. The exception is that in the <strong>Waiting on me</strong> group, the PRs that are only waiting on you appear before others; the logic that determines if a PR is waiting on you is described (<a href="./reviews#waiting-on">here</a>). The intention is that the PRs appear in the order you ought to deal with them. You cannot change the sort order, but you can filter the list instead (see below for details).</p><p>You can constrain the list to a specific organization by selecting it from the dropdown menu in the panel&#39;s header. Your selection will be automatically saved for future visits. You can also view all of the PRs in a specific repository by clicking one of the “N open reviews” links on the <a href="./repositories">Repository page</a>, or by entering the full repository name and clicking on the &quot;Go to dashboard for...&quot; link under the query field.</p><div class="tip custom-block"><p class="custom-block-title">TIP</p><p>Loading the list of reviews for a single organization or repository will be much faster than doing so for all your repositories.</p></div><p>You can further modify the view with the various toggles and filters on this page. If a specific pull request isn&#39;t showing in the list, you can simply paste its URL into the filter field to access it directly.</p><p>The time since the list of PRs was last updated is displayed under the header. The list refreshes automatically at regular intervals, but you can also force an immediate refresh by reloading the page.</p><div class="tip custom-block"><p class="custom-block-title">TIP</p><p>Up to three closed PRs from the previous three days may also be shown here. This makes it easier to follow up on recently completed reviews. Enter <code>+open</code> in the search bar to hide the closed PRs. To show older closed PRs click <strong>Show more concluded reviews</strong> at the bottom of the panel, repeating as necessary.</p></div><h2 id="review-state" tabindex="-1">Review state <a class="header-anchor" href="#review-state" aria-label="Permalink to &quot;Review state&quot;">​</a></h2><p>Each review in the listing indicates the state of the review, in more-or-less real time. People whose attention the review currently needs are show to the right of the <i class="waiting on icon"></i>, while other participants follow the <i class="participating icon"></i>. Each avatar is decorated with the participant&#39;s current most important status, including PR authorship, GitHub approval (<i class="sanction approved icon"></i> approved or <i class="sanction blocked icon"></i> changes requested), discussion blocker, and LGTM. The rest of the line shows the pull request summary, current milestone, and labels (if any).</p><p><img src="'+a+'" alt="reviews list"></p><p>The <i class="unconnected icon"></i> icon indicates that the repository for this PR is not connected to Reviewable and the review will update on demand only. In such cases, the counters may be out of date. An administrator can connect the repository from the <a href="./repositories">Repository page</a>.</p><p>A <i class="stalled icon"></i> icon indicates a stalled review that has not been updated in over two weeks.</p><p>Counters reflect the same information as you&#39;ll see on the review page:</p><p><img src="'+n+'" alt="reviewable review state"></p><p>If a PR is ready for merging, the status checks are successful, and all the counters are zero, then a merge button appears in the state column instead. This lets you quickly merge completed PRs but doesn&#39;t give access to merge options — for that, please open the review page.</p><p>Other possible states include <strong>Merged</strong>, <strong>Closed</strong>, and <strong>Archived</strong> (automatically, for old reviews — just open to unarchive). No state appears for any PR not yet connected to a review.</p><h2 id="open-review" tabindex="-1">Open a review <a class="header-anchor" href="#open-review" aria-label="Permalink to &quot;Open a review {#open-review}&quot;">​</a></h2><p>Click on a PR to open the review, or hold down the appropriate modifier key to open it in a new tab. If a <i class="create review icon"></i> is shown, clicking on the listing will open a new review and insert a link into the description for the PR. If <i class="grey private icon"></i> is also shown, this may begin a free trial.</p><p>Click the link on the right end of a listing to access the pull request on GitHub.</p><h2 id="filter-reviews" tabindex="-1">Filter reviews <a class="header-anchor" href="#filter-reviews" aria-label="Permalink to &quot;Filter reviews&quot;">​</a></h2><p>In the filter field, enter one or more terms to match in the PR summary, repository, number, milestone, labels, author username, or blocking reviewer. The query is immediately reflected in the URL if you&#39;d like to bookmark it.</p><p>You can also use the special filters in the table below, adding either a <code>+</code> or <code>-</code> prefix to the special term (such as <code>+open</code>) to require or prohibit the specified condition respectively.</p><p>Add an OR operator to the positive filter by entering a comma. For example, <code>+needs:review,needs:fix</code> will filter for all reviews that need work, or have a failing check. For negative filters, the comma functions as an AND operator. More complex boolean expressions are not supported.</p><p>For the <code>±label:<i>name</i></code> filter, you must use double quotes around the label name if it contains spaces.</p><table tabindex="0"><thead><tr><th>Filter</th><th>Meaning</th></tr></thead><tbody><tr><td><code>±open</code></td><td>Currently open PR</td></tr><tr><td><code>±red</code></td><td>PRs with red counters</td></tr><tr><td><code>±deferred</code></td><td>PRs with deferred counters</td></tr><tr><td><code>±mine</code></td><td>Created, assigned, and requested PRs</td></tr><tr><td><code>±label:<i>name</i></code></td><td>PRs with given label</td></tr><tr><td><code>±needs:</code></td><td> </td></tr><tr><td>    <code>review</code></td><td>Incomplete reviews</td></tr><tr><td>    <code>fix</code></td><td>Reviews with failing checks</td></tr><tr><td>    <code>merge</code></td><td>Completed and clean reviews</td></tr><tr><td>    <code>me</code></td><td>Reviews waiting on you</td></tr><tr><td>    <code>author</code></td><td>Reviews waiting on author</td></tr><tr><td>    <code>reviewer</code></td><td>Reviews waiting on a reviewer</td></tr><tr><td><code>±am:</code></td><td> </td></tr><tr><td>    <code>author</code></td><td>Created PRs</td></tr><tr><td>    <code>assigned</code></td><td>Assigned PRs</td></tr><tr><td>    <code>requested</code></td><td>Requested reviewer PRs</td></tr><tr><td><code>±draft</code></td><td>PR draft, not yet fully open</td></tr><tr><td><code>±merged</code></td><td>PR that was successfully merged</td></tr><tr><td><code>±closed</code></td><td>PR that was closed without merging</td></tr><tr><td><code>±public</code></td><td>PRs from public repos</td></tr><tr><td><code>±private</code></td><td>PRs from private repos</td></tr><tr><td><code>±starred</code></td><td>PRs from repos you starred</td></tr><tr><td><code>±watched</code></td><td>PRs from repos you&#39;re watching</td></tr><tr><td><code>±by:<i>username</i></code></td><td>PRs authored by given user</td></tr><tr><td><code>±with:<i>username</i></code></td><td>PRs involving given user (or team)</td></tr></tbody></table><div class="tip custom-block"><p class="custom-block-title">TIP</p><p>Click the small <strong>Set as your default</strong> link to set the query that will automatically be applied when you load the page.</p></div><p><img src="'+d+'" alt="reviewable filter field"></p><p>If shown, you can click the <strong>Include stalled pull requests/reviews</strong> link near the bottom of the panel to exclude or include any stalled PRs. The current state of this toggle is reflected in the URL, so you can bookmark it.</p><h2 id="other-toggles" tabindex="-1">Other toggles <a class="header-anchor" href="#other-toggles" aria-label="Permalink to &quot;Other toggles&quot;">​</a></h2><p>At the bottom of the Reviews page, you’ll find two toggle buttons:</p><p><img src="'+l+'" alt="reviewable reviews list toggles"></p><p><strong>Show pull request not yet connected to Reviewable</strong></p><p>If this toggle is on, the list will include PRs for which a review has not yet been created. Such a PR will be indicated with a <i class="create review icon"></i>, and clicking that PR will connect that PR to a review and insert a link into the PR description.</p><p>You may want to turn off this toggle if you only want to see PRs from connected repositories.</p><p><strong>Also show pull request you’re not involved with from all repos to which you can push.</strong></p><p>If this toggle is on, the list includes all open PRs from repos where you have commit privileges, even if you&#39;re not a participant. This is useful if you need to monitor repos for incoming PRs, such as if you&#39;re a manager, or an admin on an open source project.</p><p>Optionally, you can restrict this set of repos to only those repos connected to Reviewable, or that you watched or starred on GitHub. This can be useful if you have push permissions to a lot of repos and, for example, you don’t want to see random open source repos while at work.</p>',40)]))}const y=t(c,[["render",h]]);export{v as __pageData,y as default};