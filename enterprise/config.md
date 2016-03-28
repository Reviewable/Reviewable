### Environment variables

Required:
* `REVIEWABLE_FIREBASE`: The name of the Firebase project you'll be using to store Reviewable data.
* `REVIEWABLE_FIREBASE_AUTH`: A master secret for the Firebase project above, obtained from the Secrets tab on the Firebase management page.  Can be rotated as necessary (e.g, if compromised).
* `MEMORY_AVAILABLE`: The amount of memory available to the Node process in MiB.  Defaults to 1024, which is the absolute minimum.

Optional:
* `PORT`: The port for the HTTP server to listen on.  Reviewable assumes that a higher layer will provide load balancing and SSL termination, and forward requests to the servers over HTTP on an internal, secure network.  Defaults to port 8080, which is also exposed in the Docker container.
* `REVIEWABLE_GITHUB_SECRET_TOKEN`: Optional arbitrary secret string that will be used to sign GitHub webhook requests to ensure their authenticity.  Set to anything random, robust when transmitted as text, and reasonably long (e.g., 64 hex characters).  Once set don't ever change it, or you'll invalidate the hooks on all connected repos.
* `REVIEWABLE_PING_URL`: Optional URL that each server will ping with a GET request at 1 minute intervals as long as (it thinks) it's healthy.  You can connect this to some external health-monitoring system that can alert you if all servers are unhealthy.
* `REVIEWABLE_TERMS_URL`: Optional URL for the Terms link in the footer of every Reviewable page.  If missing, the link won't be shown in the footer.
* `REVIEWABLE_PRIVACY_URL`: Optional URL for the Privacy link in the footer of every Reviewable page.  If missing, the link won't be shown in the footer.
* `GAE_MODULE_INSTANCE`: Optionally set to the instance number (zero-based, consecutive) of the current process.  If set, some servers will specialize themselves to optimize latency for user-facing operations.
* `GAE_VM`: Optionally, if set (to any value), the servers will handle requests to `/_ah/health`, `/_ah/start`, and `/_ah/stop`, per the [standard GAE semantics](https://cloud.google.com/appengine/docs/flexible/custom-runtimes/build#lifecycle_events).  It's up to you to restrict requests to those endpoints so random people can't shut down your servers.  The servers will also trust the proxy that's immediately in front of them.

### Logs

The Reviewable servers will write logs to `stdout` and `stderr`, with no timestamps.  Some issues will be easier to debug if your environment collects, aggregates, and timestamps those logs.
