### Prereqs

To get started you first need to obtain an SSL certificate, create a GitHub application, and create a Firebase database.

You'll need to decide the URL at which your Reviewable instance will operate, called `REVIEWABLE_HOST_URL`.  You'll want to obtain an SSL certificate so that connections to this address will be secure, and set up a proxy to terminate and load balance connections to Reviewable's server cluster.

Next, on your GitHub instance, find the settings section of your preferred organization&mdash;any one will do.  In the OAuth applications subsection click the Register new application button:
![app registration section](https://raw.githubusercontent.com/Reviewable/Reviewable/master/enterprise/images/register_github_app.png)
Set the application name, homepage URL, and application description to taste (but preferably not just plain "Reviewable" to avoid confusion).  You can easily update these later so don't sweat it.  Set the authorization callback URL to `<REVIEWABLE_HOST_URL>/auth/callback`.  Take note of the Client ID and Client Secret at the top of the application's dashboard as you'll need to provide these to Reviewable (below).

Next, visit the [Firebase console](https://console.firebase.google.com/) and create a new project.  Set the name to taste (but preferably not just plain "Reviewable"), which will also determine your datastore's permanent name.  Then go to your Project Settings and prepare the following for configuring Reviewable:

![Firebase project settings](https://raw.githubusercontent.com/Reviewable/Reviewable/master/enterprise/images/firebase_project_settings.png)

1. On the _General_ tab, locate your Web API Key:

![Firebase Web API Key](https://raw.githubusercontent.com/Reviewable/Reviewable/master/enterprise/images/firebase_web_api_key.png)

2. On the _Service accounts_ tab, in the _Firebase Admin SDK_ section, locate your database name as the first part of the database URL (very likely the same as your project name) and generate a new private key:

![Firebase service account private key](https://raw.githubusercontent.com/Reviewable/Reviewable/master/enterprise/images/firebase_private_key.png)

### Runtime expectations

Reviewable is packaged as a Docker image, available from [`reviewable/enterprise`](https://hub.docker.com/r/reviewable/enterprise/tags/), a private repo on Docker Hub&mdash;your docker.com account will be granted pull access when you purchase a license.  To run it you'll need to configure a Docker container.  The entrypoint is already specified in the image but you have to define a bunch of additional environment variables (see below).

We recommend running in a VM with around 1.5GB of memory available to the server&mdash;much less than that and you might run out of memory when handling some big pull requests, and much more than that isn't useful to a single Reviewable process.  (The main reviewable.io service uses 1.3GB.)  The server is single-threaded, so one vCPU (or even a fraction of one) is sufficient, and the processes are more network than CPU intensive anyway.  On Google Cloud Platform, the `g1-small` instance type is a good fit, on AWS a `t2.small`, and on Azure an `A1`.

You should run at least 2 server instances, fronted by a load-balancing HTTP proxy.  (You can technically run just one and connect to it directly, but such a configuration won't be reliable and won't be able to handle SSL connections.)  The servers are stateless (with the exception of `REVIEWABLE_USER_CONTENT_PATH` if you configure them that way, see below) so you can start/stop as many of them as you want without problems.  As of this writing, the main reviewable.io service doesn't typically need to scale up to more than 8 `g1-small` instances.

The servers expect to be restarted automatically if the process exits.  They'll exit with a non-zero exit code if something went terribly wrong.  You can safely kill a process at any time but it's always preferable to make a clean exit by sending it `SIGTERM`.  Doing so will potentially avoid delays on retrying interrupted tasks.

The servers will write logs to `stdout` and `stderr`, with no timestamps.  Some issues will be easier to debug if your environment collects, aggregates, and timestamps those logs.

### Environment variables

Reviewable is configured via environment variables.  If you'd rather keep the configuration in a file, you can define the variables below in a JSON file consisting of a single object, where the keys are the environment variable names and the values are all strings, mount it into the Docker image, and pass the full path via the `REVIEWABLE_CONFIG_FILE` environment variable.  (If any variables are defined both in the environment and in the file, the value in the file takes precedence.)  For greater certainty, you can set `REVIEWABLE_DUMP_ENV` to any value to dump all the environment variables to the console on server startup, as Reviewable sees them.

Once you're up and running, make sure to sign in to Reviewable with the admin account you assigned to your license.

##### Core configuration:
These are required unless stated otherwise.
* `REVIEWABLE_LICENSE`: You'll receive a license key when you purchase or renew a license.  This is just a JSON Web Token (JWT), signed with a private key, that encodes the constraints of your license.  It expires at the same time as the license.  The server won't run without a valid and current license key.
* `REVIEWABLE_HOST_URL`: The URL for the Reviewable web server.  HTTP requests sent to this URL must be dispatched to a running Reviewable Docker image at the port below.  The host URL *must not have a path* and *must be stable* since changing it in any way will break GitHub webhooks and review links.  (Please contact us for help if you absolutely need to change it.)  We strongly recommend that the host URL also be secure (`https://...`) since some OAuth credentials will be sent via these URLs.
* `PORT`: The port for the web server to listen on.  Reviewable assumes that a higher layer will provide load balancing and SSL termination, and forward requests to the servers over HTTP on an internal, secure network.  Defaults to port 8080, which is also exposed in the Docker container.
* `REVIEWABLE_FIREBASE`: The name of the Firebase database you'll be using to store Reviewable data.  This is just the plain name, not the full URL.
* `REVIEWABLE_FIREBASE_WEB_API_KEY`: The web API key for your Firebase project.  This is just an identifier and doesn't need to be kept secret.
* `REVIEWABLE_FIREBASE_CREDENTIALS_FILE`: The absolute path to the Firebase private key file you generated above.  The file will need to be mapped into the Docker image, either by generating a derived image that includes it or mounting it in when starting the image.  If you're not sure how to do that, you can _instead_ set `REVIEWABLE_FIREBASE_PROJECT_ID`, `REVIEWABLE_FIREBASE_CLIENT_EMAIL`, and `REVIEWABLE_FIREBASE_PRIVATE_KEY` to the corresponding values in the private key file.  You can delete previously issued private keys from the IAM Admin [service accounts](https://console.cloud.google.com/iam-admin/serviceaccounts/) page &mdash; just don't delete the account itself!
* `REVIEWABLE_GITHUB_URL`: The URL for your instance of GitHub Enterprise, used by Reviewable for authentication, API calls, and links to the web interface.  If your license allows you to run against `github.com` instead you should set this to `https://github.com`.
* `REVIEWABLE_GITHUB_CLIENT_ID`: The hex client ID assigned to the GitHub application you created above.
* `REVIEWABLE_GITHUB_CLIENT_SECRET`: The hex client secret assigned to the GitHub application you created above.

##### Security
Optional settings that enable extra security mechanisms.
* `REVIEWABLE_ENCRYPTION_PRIVATE_KEYS`: A comma-separated list of unencrypted RSA private keys in PEM format (you can use `openssl genrsa -out private.pem 2048` to generate one), optionally with newlines removed but `BEGIN` / `END` fences retained.  These keys will be used to encrypt especially sensitive data in the Firebase datastore that only needs to be read by the server to provide an extra line of defense in case of a breach.  Currently, this includes all GitHub authorization tokens.  The current key should be first in the list, and any number of additional keys can be listed afterwards to assist with key rotation.
* `REVIEWABLE_ENCRYPTION_AES_KEY`: A random AES-SIV key of either 256, 384, or 512 bits (32, 48, or 64 bytes), encoded as base64 (you can use `openssl rand -base64 64` to generate such a key, for example).  This key will be used to keep all user-provided strings encrypted in the Firebase database.  Note that this is a symmetric key that will be distributed to all clients, so using this option only makes sense if your installation is isolated behind a firewall.  It's best to specify the key on the first run but you can add / change / remove keys later by following the [AES key rotation](https://github.com/Reviewable/Reviewable/blob/master/enterprise/operations.md#aes-encryption-key-rotation) procedure.
* `REVIEWABLE_GITHUB_SECRET_TOKEN`: An arbitrary secret string that will be used to sign GitHub webhook requests to ensure their authenticity.  Set to anything random, robust when transmitted as text, and reasonably long (e.g., 64 hex characters).  You shouldn't change it (or set it) once any repos have been connected as this will cause events to be dropped, though Reviewable will update the webhooks' settings as it notices that they're misconfigured.
* `REVIEWABLE_PRIVATE_MODE`: When set to any non-empty value, turns on Reviewable's equivalent of GHE's private mode by prohibiting all unauthenticated access (except to the home page) and ensuring that no secrets are passed to the browser until the user is authenticated.
* `NODE_EXTRA_CA_CERTS`: The absolute path to your GitHub server's TLS cert file in PEM format.  Useful if your GitHub installation uses a self-signed (or otherwise non-validating) certificate, as otherwise Reviewable will refuse to connect to the API.  This environment variable **must be set directly**, not via the `REVIEWABLE_CONFIG_FILE` file.

##### Monitoring
Connections to external systems to monitor the health of the application.  Because errors and warnings can be hard to notice in the logs, Reviewable also sends everything of note to [Sentry](https://getsentry.com) or a custom logging endpoint -- it's highly recommended that you configure at least one of those.
* `REVIEWABLE_LOGGING_URL`: A URL to which all logs and errors will be POSTed in JSON format -- everything that would go to the console or Sentry will end up here too.  The structure of the body varies depending on the nature of the item, but will always include `level` (one of `data`, `debug`, `info`, `warn`, `error`, `fatal`) and `timestamp` properties.  Messages logged to the console will have level `debug` and a `message`.  Performance data will have level `data` and a structured `data` property.  Exceptions will have a non-`data` level, `tags`, a `message`, an `exception` structure (with all the stack frames), and possibly an `extra` property with additional information.  More properties may be added in the future, so ideally you would just store everything and pick out details of interest for your alerts, dashboards, etc.
* `REVIEWABLE_STATSD_HOST`: The host to send `statsd` reports to via UDP.  You can also set `REVIEWABLE_STATSD_PORT` (default: 8125), `REVIEWABLE_STATSD_PREFIX` (default: `reviewable.`), and `REVIEWABLE_STATSD_TAGS` to customize the reports.  (Reviewable will include some basic tags automatically whether you specify your own or not.)  Reviewable will also fall back automatically on `DD_AGENT_HOST` and `DD_DOGSTATSD_PORT` instead if you happen to be using Datadog and already have these set up.
* `REVIEWABLE_SERVER_SENTRY_DSN`: The Sentry DSN to send server errors to; must include both public and private keys.
* `REVIEWABLE_CLIENT_SENTRY_DSN`: The public Sentry DSN to send client errors to; must only include the public key.
* `REVIEWABLE_CONSOLE_MULTILINE_SEPARATOR`: If neither `REVIEWABLE_LOGGING_URL` nor `REVIEWABLE_SERVER_SENTRY_DSN` is set, Reviewable will fall back on printing errors (including stack traces) to the console (`stdout` or `stderr`).  If you have a daemon set up that forwards console output to some log collection service and treats each line as a separate message, then multi-line messages can get mangled pretty badly.  If you set this option to a non-empty string, then Reviewable will replace any newlines within its messages with the given string, so you can get them to print on one line and de-mangle as needed later.
* `REVIEWABLE_PING_URL`: A URL that each server will ping with a GET request at 1 minute intervals as long as (it thinks) it's healthy.  You can connect this to an external health-monitoring system (such as [Healthchecks](https://healthchecks.io/) or [Cronitor](https://cronitor.io/)) that can alert you if all servers are unhealthy.
* `REVIEWABLE_ANALYTICS_URL`: A URL to send analytics events to that track user actions.  If set, both the client and server will `POST` JSON events to the URL that roughly follow the [Segment tracking spec](https://segment.com/docs/spec/track/).  You will likely need to implement a custom server or pipeline to gather and interpret these events.  At this time, we don't document or guarantee the stability of the event schema -- please get in touch if you'd like this to change.  If posting an event fails, both the client and server will log the error to the console (to aid in debugging) but otherwise ignore it.
* `REVIEWABLE_LOG_GITHUB_API_LATENCY`: When set to any non-empty value, logs the latency of every request to GitHub's API, whether the request was successful or not.  This can help track down the cause of certain types of task timeouts.

##### Email
Outbound email server configuration, used to send the occasional admin or error notification.  Normal review notifications all go through GitHub.
* `REVIEWABLE_SMTP_URL`: The URL of an SMTP server to use when sending administrative emails.  (Review notifications are sent via GitHub.)  Use the format `smtp://username:password@smtp.example.com:port/`.  The connection will be automatically secured if the server supports it, but you can append `?requireTLS=true` if you want to force `STARTTLS`, or use `https` for a direct TLS connection on port 465.  If missing, Reviewable will attempt to send emails by connecting directly to the recipient's MX server, but this is not very reliable (no retries, no DKIM/SPF so messages likely to be treated as spam).
* `REVIEWABLE_SMTP_FROM`: The `From` email address to set on outgoing messages.  Can be either a plain email address or the full `"Sender Name" <sender@example.com>` syntax.  If missing, Reviewable will default to `Reviewable <support@reviewable.io>`.
* `REVIEWABLE_SMTP_BCC`: A `Bcc` email address to copy each message to, useful for keeping an eye on the emails that Reviewable is sending.  If missing, no copies are sent.

##### File uploads
Destination for file attachments in comments.  The file types and sizes will be checked by Reviewable; as of this writing, only images up to 10MB in size are allowed.
* `REVIEWABLE_UPLOADS_PROVIDER`: One of the following values, or leave empty to disable file uploads.
  * `local`: Store files on a local volume.  You also need to set `REVIEWABLE_USER_CONTENT_PATH` as an absolute path to a directory on a shared persistent volume with read/write access.  The files will be served from `$REVIEWABLE_HOST_URL/usercontent`.
  * `s3`: Store file in an AWS S3 bucket.  You also need to set `REVIEWABLE_S3_BUCKET`, `AWS_ACCESS_KEY_ID` and `AWS_SECRET_ACCESS_KEY`, and optionally the bucket's region via `AWS_REGION`.  The identified user must have `s3:PutObject` and `s3:PutObjectAcl` permissions on bucket resources.  The bucket needs to have a CORS configuration that allows `POST` requests from all your users' clients (likely just `*`).  Files are stored with `public-read` ACLs and will be served from `https://s3-<REGION>.amazonaws.com/<BUCKET>`, unless `REVIEWABLE_UPLOADED_FILES_URL` is set, in which case they're `private` and served from that URL instead.
  * `gcs`: Store files in a Google Cloud Storage bucket.  You also need to set `REVIEWABLE_GCS_BUCKET`, `GCS_ACCOUNT_ID` (a service account's email address), and `GCS_PRIVATE_KEY` (its private key in PEM format, optionally with newlines removed).  The service account specified must have write permissions to the bucket.  The bucket needs to have a CORS configuration that allows `POST` requests from all your users' clients (likely just `*`).  Files are stored with `public-read` ACLs and will be served from `https://storage.googleapis.com/<BUCKET>`, unless `REVIEWABLE_UPLOADED_FILES_URL` is set in which case they'll be served from that URL instead.
* `REVIEWABLE_UPLOADED_FILES_URL`: An alternative URL that gives access to files uploaded via any of the methods above.  This could be a CDN or a proxy you've set up that's fed from the upload method's "bare" access URL, or directly by the file store.  For example, on AWS you can set up a CloudFront distribution for your S3 bucket.

##### User code execution
Some features, such as [custom review completion rules](https://docs.reviewable.io/#/repositories?id=completion-condition), require Reviewable to execute user-provided code.  You can configure where and how such code should be executed.
* `REVIEWABLE_CODE_EXECUTOR`: One of the following values, or leave empty to disable features that require code execution.
  * `sandcastle`: Execute code on the server itself, in a [separate sandboxed process](https://github.com/bcoe/sandcastle).  While this will mostly prevent accidental interference with the server, it's likely that an attacker would be able to break out of the sandbox or at least perform a denial of service attack.  Use this option only if all users with access to Reviewable can be trusted.
  * `awslambda`: Execute code in [AWS Lambda](https://aws.amazon.com/lambda).  This provides great isolation and scalability at the expense of needing a fair bit of setup.  You'll need to set `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`, and `AWS_REGION`, and make sure that the specified user has all of the permissions belows.  You'll also need to create a `lambda_basic_execution` role (optionally, set `REVIEWABLE_LAMBDA_EXECUTOR_ROLE` to the desired role name) in IAM with permissions `{"Effect": "Allow", "Action": ["logs:CreateLogGroup", "logs:CreateLogStream", "logs:PutLogEvents"], "Resource": "arn:aws:logs:*:*:*"}`.  Optionally, you can also set `REVIEWABLE_LAMBDA_VPC_CONFIG` if you want to enable [VPC access](http://docs.aws.amazon.com/lambda/latest/dg/vpc.html) in user code; every time you change this value you'll need to delete all functions from Lambda (they'll be recreated automatically with the new config), and you'll also need the `lambda_basic_execution` role to include the `AWSLambdaVPCAccessExecutionRole` policy per the preceding docs.
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
            "logs:DeleteLogGroup",
            "logs:DescribeLogGroups"
        ],
        "Resource": [
            "arn:aws:logs:<REGION>:<ACCOUNT>:log-group:*:*:*"
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
* `GAE_SERVICE` or `GAE_VM`: If non-empty (any value) servers will handle requests to `/_ah/health` and `/_ah/ready`; the former will respond with `200` whenever possible, the latter will respond with `200` unless the server is shutting down, in which case it'll respond with `503` instead.  Servers will also trust headers inserted by the last HTTP proxy.  (If you were previously using `/_ah/stop` for graceful shutdown requests, please now send a `SIGTERM` instead.)
* `MEMORY_AVAILABLE`: The amount of memory available to the Node process in MiB.  Defaults to the lower of `/proc/meminfo` `MemTotal` and `/sys/fs/cgroup/memory/memory.stat` `hierarchical_memory_limit`.  If not set accurately, the servers are more likely to run out of memory and start swapping.  A server logs how much memory it thinks it has available when it starts up.
* `REVIEWABLE_GITHUB_CACHE_SIZE`: The cache size to use for GitHub data, in megabytes.  Defaults to 50MB as of this writing.

### GitHub configuration

Reviewable doesn't require any special configuration of your GitHub Enterprise instance; it'll happily work with any organizations and repositories you have set up.  If you have GHE set up in private mode make sure to set `REVIEWABLE_PRIVATE_MODE` also, as documented above.

One other thing to be aware of is that Reviewable uses `refs/reviewable` to pin commits in case they get force-pushed out of the way.  This is usually transparent and all but invisible, but something to take into account if you're adding a pre-receive hook to your installation.
