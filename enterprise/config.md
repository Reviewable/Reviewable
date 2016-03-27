### Environment variables

* `NODE_ENV`: Set to `production`.
* `MEMORY_AVAILABLE`: Set to the amount of memory available to the Node process, in MB.
* `PORT`: Set the port for the HTTP server.  Reviewable assumes that a higher layer will provide load balancing and SSL termination, and forward requests to the servers over HTTP on an internal, secure network.
* `REVIEWABLE_FIREBASE`: The name of the Firebase project you'll be using to store Reviewable data.
* `REVIEWABLE_FIREBASE_AUTH`: A master secret for the Firebase project above, obtained from the Secrets tab on the Firebase management page.  Can be rotated as necessary (e.g, if compromised).
* `REVIEWABLE_GITHUB_SECRET_TOKEN`: Optional arbitrary secret string that will be used to sign GitHub webhook requests to ensure their authenticity.  Set to anything random, robust when transmitted as text, and reasonably long (e.g., 64 hex characters).  Once set don't ever change it, or you'll invalidate the hooks on all connected repos.
* `REVIEWABLE_PING_URL`: Optional URL that each server will ping with a GET request at 1 minute intervals as long as (it thinks) it's healthy.  You can connect this to some external health-monitoring system that can alert you if all servers are unhealthy.
* `REVIEWABLE_TERMS_URL`: Optional URL for the Terms link in the footer of every Reviewable page.  If missing, the link won't be shown in the footer.
* `REVIEWABLE_PRIVACY_URL`: Optional URL for the Privacy link in the footer of every Reviewable page.  If missing, the link won't be shown in the footer.
* `GAE_MODULE_INSTANCE`: Optionally set to the instance number (zero-based, consecutive) of the current process.  If set, some servers will specialize themselves to optimize latency for user-facing operations.  You must run at least 3 servers if you set this variable.
* `GAE_VM`: If set (to any value), the servers will handle requests to `/_ah/health`, `/_ah/start`, and `/_ah/stop`, per the standard GAE semantics.  It's up to you to restrict requests to those endpoints so random people can't shut down your servers.
