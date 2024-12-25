import{_ as t,c as o,a2 as a,o as i}from"./chunks/framework.C3km0Mkq.js";const r="/assets/registration_1.CDyg7l0L.png",s="/assets/registration_2.C3q00sst.png",n="/assets/registration_3.Bu6xvjiE.png",l="/assets/saml_authorization.D3IIP03O.png",f=JSON.parse('{"title":"Registration and GitHub Authorization","description":"","frontmatter":{},"headers":[],"relativePath":"registration.md","filePath":"registration.md","lastUpdated":1735143827000}'),u={name:"registration.md"};function c(p,e,h,b,d,m){return i(),o("div",null,e[0]||(e[0]=[a('<h1 id="registration-and-github-authorization" tabindex="-1">Registration and GitHub Authorization <a class="header-anchor" href="#registration-and-github-authorization" aria-label="Permalink to &quot;Registration and GitHub Authorization&quot;">​</a></h1><p>It is necessary to have a GitHub account to sign-in to Reviewable. Simply click the <strong>Sign In</strong> button in the upper-right corner of the page, and then enter your GitHub credentials in the popup window. If necessary, you can create a GitHub account from there.</p><p><img src="'+r+'" alt="reviewable registration"></p><h2 id="subscribing-organizations-member-sign-up" tabindex="-1">Subscribing organizations member sign-up <a class="header-anchor" href="#subscribing-organizations-member-sign-up" aria-label="Permalink to &quot;Subscribing organizations member sign-up&quot;">​</a></h2><p>To ease onboarding for members of organizations with a private repo subscription, a popup window will appear that provides a clear call to action (on the first sign-in):</p><p>Learn more in <a href="#subscriptions">Subscriptions</a>.</p><p><img src="'+s+'" alt="reviewable subscribing organization"></p><h2 id="oauth-restrictions" tabindex="-1">OAuth app access restrictions <a class="header-anchor" href="#oauth-restrictions" aria-label="Permalink to &quot;OAuth app access restrictions {#oauth-restrictions}&quot;">​</a></h2><p><a href="https://help.github.com/articles/about-oauth-app-access-restrictions/" target="_blank" rel="noreferrer">OAuth app access restrictions</a> can completely block Reviewable from an organization. This often happens inadvertently and is usually undetectable by Reviewable. If some of your PRs/repo/organizations are inexplicably missing, make this one of the the first things that you check.</p><div class="danger custom-block"><p class="custom-block-title">DANGER</p><p>A rare but even more confusing situation is that forked repos retain the access restrictions of their original organization. So, it&#39;s possible that your organization allows Reviewable, but a repo might not show up on the Repositories page because its original organization does not allow Reviewable. You will need to either get the original organization to allow Reviewable or make a manual copy of the repo instead of a fork.</p></div><h2 id="github-authorizations" tabindex="-1">GitHub authorizations <a class="header-anchor" href="#github-authorizations" aria-label="Permalink to &quot;GitHub authorizations&quot;">​</a></h2><p>It is necessary for you to grant authorizations to Reviewable in GitHub. Your current GitHub authorization scopes appear at the bottom of the Account Settings drop-down window:</p><p><img src="'+n+'" alt="reviewable github authorizations"></p><p>Here&#39;s how we use the <a href="https://developer.github.com/apps/building-oauth-apps/scopes-for-oauth-apps/" target="_blank" rel="noreferrer">GitHub authorizations</a> you grant to Reviewable:</p><ul><li><code>public_repo</code> — Reviewable will post pull request comments on your behalf, merge pull requests, delete branches on your request, and pin revision commits in the repo so they don&#39;t disappear if you rebase.</li><li><code>repo</code> — Reviewable will list your private repos and organizations, read source code (only in the browser), read pull request metadata and comments, post pull request comments on your behalf, merge pull requests, delete branches on request, and pin revision commits in the repo so they don&#39;t disappear if you rebase.</li><li><code>admin:repo_hook</code> — Reviewable will add or remove an event hook when connecting or disconnecting a repo, so that Reviewable is notified of relevant events (e.g., pull request updates).</li><li><code>admin:org_hook</code> — So that Reviewable is notified of relevant events — such as organization membership changes — Reviewable will add or remove an event hook when subscribing to a plan or unsubscribing from a plan.</li><li><code>read:org</code> — Reviewable will get a list of the organizations of which you’re a member—even if your membership is private. Reviewable will also retrieve a list of all the repos which you can access as an organization member, and a list of your team memberships.</li><li><code>user:email</code> — Notifications specific to Reviewable are sent to your email address, such as failed subscription charges, quota overages, or failures to parse an emailed comment.</li></ul><div class="tip custom-block"><p class="custom-block-title">TIP</p><p>Reviewable staff may also contact you directly in exceptional circumstances — such as when something has gone wrong with your account. All day-to-day review email from Reviewable is sent indirectly through GitHub, and is controllable with GitHub notification settings.</p></div><div class="danger custom-block"><p class="custom-block-title">DANGER</p><p>GitHub lets you connect multiple email accounts and define how to route notifications based on which organization they pertain to. Unfortunately, this routing table isn&#39;t available through their API, so Reviewable always sends non-review email messages to the primary email address for your account. Review emails are handled by GitHub, which has access to the routing configuration and will honor it.</p></div><p>While Reviewable only needs read access to your repositories to function, GitHub permission scopes don&#39;t distinguish between read and read/write access. Write access is also required to post pull request reviews on your behalf, and let you merge PRs from within Reviewable.</p><div class="tip custom-block"><p class="custom-block-title">TIP</p><p>GitHub Apps do support finer-grained permissions scoping, and it&#39;s a long term goal of the team at Reviewable to shift over to this platform (currently, it&#39;s an “OAuth app”). So far, though, this platform doesn’t support all the APIs that Reviewable requires.</p></div><p>You can revoke any or all of these permissions at any time in your <a href="https://github.com/settings/applications" target="_blank" rel="noreferrer">GitHub authorized applications</a> settings page on GitHub. Remember to disconnect your repos before revoking, otherwise Reviewable will bug you about the lost permissions.</p><h2 id="authorization-scopes" tabindex="-1">Authorization scopes <a class="header-anchor" href="#authorization-scopes" aria-label="Permalink to &quot;Authorization scopes&quot;">​</a></h2><p>GitHub authorization scopes cannot be narrowed to a particular organization. For more information, GitHub also has some docs on <a href="https://developer.github.com/v3/oauth/#scopes" target="_blank" rel="noreferrer">authorization scopes</a>. Specifically, we recommend that you take a moment to learn about <a href="https://help.github.com/articles/about-oauth-app-access-restrictions/" target="_blank" rel="noreferrer">OAuth App access restrictions</a>.</p><h2 id="saml-authorization" tabindex="-1">SAML Authorization <a class="header-anchor" href="#saml-authorization" aria-label="Permalink to &quot;SAML Authorization {#saml-authorization}&quot;">​</a></h2><p>Github allows organizations to protect resources with a SAML SSO server. If your organization has enabled SAML you&#39;ll need to explicitly authorize Reviewable to access your organization; your previous generic authorization will not be enough. If Reviewable can safely notify you of this change, we&#39;ll prompt you to re-authorize your current session. Otherwise, we&#39;ll have to terminate your current authorization and prompt you to sign back in.</p><p><img src="'+l+'" alt="SAML Authentication Flow Example"></p>',25)]))}const w=t(u,[["render",c]]);export{f as __pageData,w as default};