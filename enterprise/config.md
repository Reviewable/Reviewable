### Environment variables

Required:
* `REVIEWABLE_HOST_URL`: The URL for the Reviewable web server.  HTTP requests sent to this URL must be dispatched to a running Reviewable Docker image at the port below.  The host URL *must be stable* since changing it in any way will break GitHub webhooks and review links.  (Please contact support@reviewable.io for help if you absolutely need to change it.)  We recommend that the host URL also be secure (`https://...`) as some requests will contain repository contents, but no credentials or other secrets are ever sent through this address. 
* `PORT`: The port for the web server to listen on.  Reviewable assumes that a higher layer will provide load balancing and SSL termination, and forward requests to the servers over HTTP on an internal, secure network.  Defaults to port 8080, which is also exposed in the Docker container.
* `MEMORY_AVAILABLE`: The amount of memory available to the Node process in MiB.  Defaults to 1024, which is the absolute minimum.
* `REVIEWABLE_FIREBASE`: The name of the Firebase project you'll be using to store Reviewable data.
* `REVIEWABLE_FIREBASE_AUTH`: A master secret for the Firebase project above, obtained from the Secrets tab on the Firebase management page.  Can be rotated as necessary (e.g, if compromised).

Optional:
* `REVIEWABLE_GITHUB_SECRET_TOKEN`: An arbitrary secret string that will be used to sign GitHub webhook requests to ensure their authenticity.  Set to anything random, robust when transmitted as text, and reasonably long (e.g., 64 hex characters).  Once set don't ever change it, or you'll invalidate the hooks on all connected repos.
* `REVIEWABLE_SMTP_URL`: The URL of an SMTP server to use when sending administrative emails.  (Review notifications are sent via GitHub.)  Use the format `smtps://username:password@smtp.example.com:port`, or `smtp://...` if you don't want Reviewable to use TLS.  If missing, Reviewable will attempt to send emails by connecting directly to the recipient's MX server, but this is not very reliable (no retries, no DKIM/SPF so messages will likely be treated as spam).
* `REVIEWABLE_SMTP_FROM`: The `From` email address to set on outgoing messages.  Can be either a plain email address or the full `"Sender Name" <sender@example.com>` syntax.  If missing, Reviewable will default to `Reviewable <support@reviewable.io>`.
* `REVIEWABLE_SMTP_BCC`: A `Bcc` email address to copy each message to, useful for keeping an eye on the emails that Reviewable is sending.  If missing, no copies are sent.
* `REVIEWABLE_PING_URL`: A URL that each server will ping with a GET request at 1 minute intervals as long as (it thinks) it's healthy.  You can connect this to some external health-monitoring system that can alert you if all servers are unhealthy.
* `REVIEWABLE_TERMS_URL`: The URL for the Terms link in the footer of every Reviewable page.  If missing, the link won't be shown in the footer.
* `REVIEWABLE_PRIVACY_URL`: The URL for the Privacy link in the footer of every Reviewable page.  If missing, the link won't be shown in the footer.
* `GAE_MODULE_INSTANCE`: The zero-based, consecutive instance number of the current process.  If set, some servers will specialize themselves to optimize latency for user-facing operations.
* `GAE_VM`: If set (to any value), the servers will handle requests to `/_ah/health`, `/_ah/start`, and `/_ah/stop`, per the [standard GAE semantics](https://cloud.google.com/appengine/docs/flexible/custom-runtimes/build#lifecycle_events).  It's up to you to restrict requests to those endpoints so random people can't shut down your servers.  The servers will also trust the proxy that's immediately in front of them.

### Logs

The Reviewable servers will write logs to `stdout` and `stderr`, with no timestamps.  Some issues will be easier to debug if your environment collects, aggregates, and timestamps those logs.
