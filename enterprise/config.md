### Prereqs

To get started you first need to obtain an SSL certificate, create a GitHub application, and create a Firebase database.

You'll need to decide the URL at which your Reviewable instance will operate, called `REVIEWABLE_HOST_URL`.  You'll want to obtain an SSL certificate so that connections to this address will be secure, and set up a proxy to terminate and load balance connections to Reviewable's server cluster.

Next, on your GitHub instance, find the settings section of your preferred organization&mdash;any one will do.  In the OAuth applications subsection click the Register new application button:
![app registration section](https://raw.githubusercontent.com/Reviewable/Reviewable/master/enterprise/register_github_app.png)
Set the application name, homepage URL, and application description to taste (but preferably not just plain "Reviewable" to avoid confusion).  You can easily update these later so don't sweat it.  Set the authorization callback URL to `<REVIEWABLE_HOST_URL>/auth/callback`.  Take note of the Client ID and Client Secret at the top of the application's dashboard as you'll need to provide these to Reviewable (below).

Next, visit the [Firebase console](https://console.firebase.google.com/) and create a new project.  Set the name to taste (but preferably not just plain "Reviewable"), which will also determine your datastore's permanent name.  In the Database tab, find the datastore name (to set below) as the first part of the database URL: `https://<REVIEWABLE_FIREBASE>.firebaseio.com/`.  Also find a database secret in your project setting's Database tab (different from the left nav Database tab) to set as `REVIEWABLE_FIREBASE_AUTH` below:
![Firebase project settings](https://raw.githubusercontent.com/Reviewable/Reviewable/master/enterprise/firebase_secret.png)

### Runtime expectations

Reviewable is packaged as a Docker image, available from [`reviewable/enterprise`](https://hub.docker.com/r/reviewable/enterprise/tags/), a private repo on Docker Hub&mdash;your docker.com account will be granted pull access when you purchase a license.  To run it you'll need to configure a Docker container.  The entrypoint is already specified in the image but you have to define a bunch of additional environment variables (see below).

We recommend running in a VM with around 1.5GB to 2GB of memory available to the server&mdash;less than that and you might run out of memory when handling some big pull requests, and more than that isn't useful to (and won't be used by) a single Reviewable process.  The server is single-threaded, so one vCPU (or even a fraction of one) is sufficient, and the processes are more network than CPU intensive anyway.  On Google Cloud Platform, the `g1-small` instance type is a good fit, on AWS a `t2.small`, and on Azure an `A1`.

You should run at least 2 server instances, fronted by a load-balancing HTTP proxy.  (You can technically run just one and connect to it directly, but such a configuration won't be reliable and won't be able to handle SSL connections.)  The servers are stateless (with the exception of `REVIEWABLE_USER_CONTENT_PATH`, see below) so you can start/stop as many of them as you want without problems.  As of this writing, the main reviewable.io service doesn't typically need to scale up to more than 8 `g1-small` instances.

The servers expect to be restarted automatically if the process exits.  They'll exit with a non-zero exit code if something went terribly wrong.  You can safely kill a process at any time but it's always preferable to make a clean exit by setting `GAE_VM` (see below) and using `/_ah/stop`.  Doing so will potentially avoid delays on retrying interrupted tasks.

The servers will write logs to `stdout` and `stderr`, with no timestamps.  Some issues will be easier to debug if your environment collects, aggregates, and timestamps those logs.

### Environment variables

Reviewable is configured by defining a whole bunch of environment variables.  If you'd rather keep the configuration in a file, you can define the variables below in a JSON file consisting of a single object, where the keys are the environment variable names and the values are all strings, mount it into the Docker image, and pass the full path via the `REVIEWABLE_CONFIG_FILE` environment variable.  (If any variables are defined both in the environment and in the file, the value in the file takes precedence.)

##### Core configuration:
These are required unless stated otherwise.
* `REVIEWABLE_LICENSE`: You'll receive a license key when you purchase or renew a license.  This is just a JSON Web Token (JWT), signed with a private key, that encodes the constraints of your license.  It expires at the same time as the license.  The server won't run without a valid and current license key.
* `REVIEWABLE_HOST_URL`: The URL for the Reviewable web server.  HTTP requests sent to this URL must be dispatched to a running Reviewable Docker image at the port below.  The host URL *must be stable* since changing it in any way will break GitHub webhooks and review links.  (Please contact us for help if you absolutely need to change it.)  We strongly recommend that the host URL also be secure (`https://...`) since some OAuth credentials will be sent via these URLs. 
* `PORT`: The port for the web server to listen on.  Reviewable assumes that a higher layer will provide load balancing and SSL termination, and forward requests to the servers over HTTP on an internal, secure network.  Defaults to port 8080, which is also exposed in the Docker container.
* `REVIEWABLE_FIREBASE`: The name of the Firebase database you'll be using to store Reviewable data.
* `REVIEWABLE_FIREBASE_AUTH`: A master secret for the Firebase project above, obtained from the project settings Database tab on the Firebase console page.  Can be rotated as necessary (e.g., if compromised).
* `REVIEWABLE_GITHUB_URL`: The URL for your instance of GitHub Enterprise, used by Reviewable for authentication, API calls, and links to the web interface.  If missing, Reviewable will connect to the public `https://github.com/` site instead, with special allowances for its differences from GHE.
* `REVIEWABLE_GITHUB_CLIENT_ID`: The hex client ID assigned to the GitHub application you created above.
* `REVIEWABLE_GITHUB_CLIENT_SECRET`: The hex client secret assigned to the GitHub application you created above.
* `REVIEWABLE_GITHUB_VIRGIN_USERNAME`: The username of a "virgin" account on your GitHub instance that can be used for checking public access permissions (and some other non-privileged work).  This account should have no repos, and no membership in any organization.  After creating it, you need to sign the account into your Reviewable instance with an empty auth scope.  If missing, Reviewable will access the API anonymously instead but this is severely rate-limited by GitHub and may cause some operations to fail.  If you're running your GHE in private mode, this setting is **required** and must be in the form `github:<databaseID>` instead of a username.  (You can find a user's database ID in the Site Admin's user details, in the Database tab.)

##### Security
Optional settings that enable extra security mechanisms.
* `REVIEWABLE_ENCRYPTION_PRIVATE_KEYS`: A comma-separated list of unencrypted RSA private keys in PEM format, optionally with newlines removed.  These keys will be used to encrypt especially sensitive data in the Firebase datastore to provide an extra line of defense in case of a breach.  Currently, this includes all GitHub authorization tokens.  The current key should be first in the list, and any number of additional keys can be listed afterwards to assist with key rotation.
* `REVIEWABLE_GITHUB_SECRET_TOKEN`: An arbitrary secret string that will be used to sign GitHub webhook requests to ensure their authenticity.  Set to anything random, robust when transmitted as text, and reasonably long (e.g., 64 hex characters).  Once set don't ever change it, or you'll invalidate the hooks on all connected repos.

##### Monitoring
Connections to external systems to monitor the health of the application.  Because errors and warnings can be hard to notice in the logs, Reviewable also sends everything of note to [Sentry](https://getsentry.com).  It's highly recommended that you configure this integration; you can choose to use the DSNs provided with your license to send everything to us (some private data may be included, but never repo contents), create your own [hosted Sentry account](https://getsentry.com/signup/), or [host an instance](https://github.com/getsentry/sentry) of the open source server yourself.
* `REVIEWABLE_SERVER_SENTRY_DSN`: The Sentry DSN to send server errors to; must include both public and private keys.
* `REVIEWABLE_CLIENT_SENTRY_DSN`: The public Sentry DSN to send client errors to; must only include the public key.
* `REVIEWABLE_PING_URL`: A URL that each server will ping with a GET request at 1 minute intervals as long as (it thinks) it's healthy.  You can connect this to an external health-monitoring system (such as [Healthchecks](https://healthchecks.io/) or [Cronitor](https://cronitor.io/)) that can alert you if all servers are unhealthy.

##### Email
Outbound email server configuration, used to send the occasional admin or error notification.  Normal review notifications all go through GitHub.
* `REVIEWABLE_SMTP_URL`: The URL of an SMTP server to use when sending administrative emails.  (Review notifications are sent via GitHub.)  Use the format `smtp://username:password@smtp.example.com:port/`.  The connection will be automatically secured if the server supports it, but you can append `?requireTLS=true` if you want to force `STARTTLS`, or use `https` for a direct TLS connection on port 465.  If missing, Reviewable will attempt to send emails by connecting directly to the recipient's MX server, but this is not very reliable (no retries, no DKIM/SPF so messages likely to be treated as spam).
* `REVIEWABLE_SMTP_FROM`: The `From` email address to set on outgoing messages.  Can be either a plain email address or the full `"Sender Name" <sender@example.com>` syntax.  If missing, Reviewable will default to `Reviewable <support@reviewable.io>`.
* `REVIEWABLE_SMTP_BCC`: A `Bcc` email address to copy each message to, useful for keeping an eye on the emails that Reviewable is sending.  If missing, no copies are sent.

##### File uploads
Destination for file attachments in comments.  The file types and sizes will be checked by Reviewable; as of this writing, only images up to 10MB in size are allowed.  At most one of the options should be set; if none are, then file uploads will be refused.
* `REVIEWABLE_USER_CONTENT_PATH`: An absolute path to a directory on a shared persistent volume with read/write access that will be used to store comment attachments.  The files will be served on `$REVIEWABLE_HOST_URL/usercontent`.
* `REVIEWABLE_S3_BUCKET`: The name of an AWS S3 bucket for storing files.  If set, you also need to specify a user with `s3:PutObject` and `s3:PutObjectAcl` permissions on bucket resources by setting `AWS_ACCESS_KEY_ID` and `AWS_SECRET_ACCESS_KEY`, and the bucket's region via `AWS_REGION`.  The bucket needs to have a CORS configuration that allows `POST` requests from all your users' clients (likely just `*`).  Files are stored with `public-read` ACLs and will be served from `https://s3-<REGION>.amazonaws.com/<BUCKET>`, unless `REVIEWABLE_UPLOADED_FILES_URL` is set, in which case they're `private` and served from that URL instead.
* `REVIEWABLE_GCS_BUCKET`: The name of a GCS (Google Cloud Storage) bucket for storing files.  If set, you also need to specify a service account with write permissions to the bucket by setting `GCS_ACCOUNT_ID` (the service account's email address) and `GCS_PRIVATE_KEY` (its private key in PEM format, optionally with newlines removed).  The bucket needs to have a CORS configuration that allows `POST` requests from all your users' clients (likely just `*`).  Files are stored with `public-read` ACLs and will be served from `https://storage.googleapis.com/<BUCKET>`, unless `REVIEWABLE_UPLOADED_FILES_URL` is set in which case they'll be served from that URL instead.
* `REVIEWABLE_UPLOADED_FILES_URL`: An alternative URL that gives access to files uploaded via any of the methods above.  This could be a CDN or a proxy you've set up that's fed from the upload method's "bare" access URL, or directly by the file store.  For example, on AWS you can set up a CloudFront distribution for your S3 bucket.

##### User code execution
Some features, such as [custom review completion rules](https://github.com/Reviewable/Reviewable/wiki/FAQ#can-i-customize-what-makes-a-review-complete), require Reviewable to execute user-provided code.  You can configure where and how such code should be executed.
* `REVIEWABLE_CODE_EXECUTOR`: One of the following values, or leave empty to disable features that require code execution.
  * `sandcastle`: Execute code on the server itself, in a [separate sandboxed process](https://github.com/bcoe/sandcastle).  While this will mostly prevent accidental interference with the server, it's likely that an attacker would be able to break out of the sandbox or at least perform a denial of service attack.  Use this option only if all users with access to Reviewable can be trusted.
  * `awslambda`: Execute code in [AWS Lambda](https://aws.amazon.com/lambda).  This provides great isolation and scalability at the expense of needing a fair bit of setup.  You'll need to set `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`, and `AWS_REGION`, create a `lambda_basic_execution` role in IAM with permissions `{"Effect": "Allow", "Action": ["logs:CreateLogGroup", "logs:CreateLogStream", "logs:PutLogEvents"], "Resource": "arn:aws:logs:*:*:*"}`, and make sure that the specified user has all of the following permissions:
```
 [
    {
        "Effect": "Allow",
        "Action": [
            "lambda:CreateFunction",
            "lambda:DeleteFunction",
            "lambda:InvokeFunction",
            "lambda:ListFunctions"
        ],
        "Resource": [
            "*"
        ]
    },
    {
        "Effect": "Allow",
        "Action": [
            "iam:PassRole"
        ],
        "Resource": [
            "arn:aws:iam::<ACCOUNT>:role/lambda_basic_execution"
        ]
    },
    {
        "Effect": "Allow",
        "Action": [
            "logs:CreateLogGroup",
            "logs:PutRetentionPolicy",
            "logs:DeleteLogGroup"
        ],
        "Resource": [
            "arn:aws:logs:<REGION>:<ACCOUNT>:log-group:/aws/lambda/*"
        ]
    }
]
```

##### UI customization
Basic UI customization.
* `REVIEWABLE_TERMS_URL`: The URL for the Terms link in the footer of every Reviewable page.  If missing, the link won't be shown in the footer.
* `REVIEWABLE_PRIVACY_URL`: The URL for the Privacy link in the footer of every Reviewable page.  If missing, the link won't be shown in the footer.

##### Container configuration
Extra configuration for optimizing the server runtime.
* `GAE_MODULE_INSTANCE`: The zero-based, consecutive instance number of the current process.  If set, some servers will specialize themselves to optimize latency for user-facing operations.
* `GAE_VM`: If set (to any value), the servers will handle requests to `/_ah/health`, `/_ah/start`, and `/_ah/stop`, per the [standard GAE semantics](https://cloud.google.com/appengine/docs/flexible/custom-runtimes/build#lifecycle_events).  It's up to you to restrict requests to those endpoints so random people can't shut down your servers.  The servers will also trust headers inserted by the last HTTP proxy.
* `MEMORY_AVAILABLE`: The amount of memory available to the Node process in MiB.  Defaults to the lower of `/proc/meminfo` `MemTotal` and `/sys/fs/cgroup/memory/memory.stat` `hierarchical_memory_limit`.  If not set accurately, the servers are more likely to run out of memory and start swapping.  A server logs how much memory it thinks it has available when it starts up.
