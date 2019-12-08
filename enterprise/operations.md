### Maintenance mode

You can switch Reviewable into maintenance mode to disable all clients' and servers' access to the Firebase datastore.  This can be useful when you need to atomically update the entire datastore, such as when restoring from backup or rotating encryption keys.

#### Limitations

The component that serves the app over HTTP will remain on throughout (except while restarting) so clients can continue to load the page, to be informed of the maintenance.  However, GitHub webhook events that arrive during maintenance mode will be rejected and won't be retried.  This will likely cause some reviews to fall out of sync in Reviewable (e.g., GitHub comments not posted, reviews not created for new PRs).  Once you exit maintenance mode, reviews will automatically resync as they're accessed or new webhooks arrive, and users can also force the immediate creation of any missing reviews from Reviewable's Reviews dashboard.

Also, if you have `REVIEWABLE_PING_URL` set up, then pings won't be emitted while in maintenance mode and your monitoring system will likely alert.

#### Entering maintenance mode

To turn on maintenance mode, run the following command:

```bash
$ curl https://$REVIEWABLE_FIREBASE.firebaseio.com/system/maintenance.json?auth=$REVIEWABLE_FIREBASE_AUTH \
       -X PUT -d '{"switch": true, "message": "An HTML message to your users."}'
```

The switch itself is public and will be publicly visible to anyone who cares to check.  You may also specify a private message that will be displayed in the browser's modal overlay only for users who are signed in.  The message is in HTML, so you can embed links to internal status pages and such.  You can repeat this command as often as necessary to update the message.

When maintenance mode is switched on, the servers will log `Entering maintenance mode`, immediately shut off datastore access, and exit at random intervals over the next minute to be restarted by the container.  After restarting, they'll log `Waiting for maintenance mode to end` and, once you turn maintenance mode off, `Exiting maintenance mode`.  No manual action should be required, but you can restart the servers as needed while in maintenance mode without repercussions.

When maintenance mode is switched on, clients will immediately shut off datastore access and show a modal overlay (sample below)  Users will need to manually reload the page once maintenance mode is switched off so you may want to provide an estimated time of completion in the message above.

![Maintenance overlay](https://raw.githubusercontent.com/Reviewable/Reviewable/master/enterprise/images/maintenance.png)

#### Exiting maintenance mode

To exit maintenance, run the following command:

```bash
$ curl https://$REVIEWABLE_FIREBASE.firebaseio.com/system/maintenance.json?auth=$REVIEWABLE_FIREBASE_AUTH \
       -X DELETE
```

### AES encryption key rotation

You can add, remove, or rotate the AES encryption key specified in `REVIEWABLE_ENCRYPTION_AES_KEY`.

1. Install `npm install --global firecrypt-tools` and make sure you can run `recrypt`.
2. Obtain a copy of `rules_firecrypt.json`, either by extracting it from the system's Docker image (it's in `/usr/src/app`) or by requesting the current copy from your support contact.
3. Locate the current encryption key (if any) and generate a new encryption key if desired (`openssl rand --base64 64`).
4. Put Reviewable in maintenance mode (instructions above).
5. Run <code>recrypt --firebase $REVIEWABLE_FIREBASE --auth $REVIEWABLE_FIREBASE_AUTH --spec rule_firecrypt.json --oldKey <i>base64key</i> --newKey <i>base64Key</i></code>, using the environment values you configured for your server and specifying one or both keys depending on the operation you want to perform (encrypt, decrypt, or rotate).
6. Update your server's configuration with the new `REVIEWABLE_ENCRYPTION_AES_KEY`.
7. Exit maintenance mode (instructions above).

Rotating keys will take approximately NN minutes per GB of database size, assuming a reasonably fast machine and network connection.  Before you rotate the key on your production database, you might want to clone it into a spare Firebase project with security rules set to `{"rules": {".read": false, ".write": false}}`) and run it there to ensure there will be no errors and get a better estimate of how long it will take.

If the re-encryption runs into any errors it'll abort and leave the database in a partially-transformed state.  You'll need to get help from support to figure out the error and rerun the command until it completes successfully.  The transformation is idempotent so it's safe to rerun a command repeatedly.

### RSA encryption key rotation

You can rotate the RSA `REVIEWABLE_ENCRYPTION_PRIVATE_KEYS` key used for encrypting GitHub tokens, or add a new one.  You can do this online, without entering maintenance mode.

Note that if you choose to rotate your RSA key then you must never downgrade your server below v1243.1957, as older versions may crash in this situation.

1. Generate a new encryption key (`openssl genrsa -out private.pem 4096`).
2. Add the new key to the end of the `REVIEWABLE_ENCRYPTION_PRIVATE_KEYS` environment variable, comma-separated from any old keys, and restart your servers.  This is necessary to ensure that all servers have the new key before the clients start using it to encrypt data.  If you don't do rolling upgrades on your servers (i.e., all servers are shut down before new ones are deployed) then you can safely skip this step.
3. Move the new key to the front of `REVIEWABLE_ENCRYPTION_PRIVATE_KEYS` and restart your servers.
4. Wait for the `sweepUsers` cron job to run.  It normally runs once a month and leaves the messages "`Running background task sweepUsers`" and "`Background task sweepUsers complete`" in the logs.  You can also trigger it to run immediately by deleting the `/queues/cron/sweepUsers/_lease/expiry` entry from the datastore via the Firebase console.
5. At your convenience, remove any old keys from `REVIEWABLE_ENCRYPTION_PRIVATE_KEYS` and restart your servers.

### Data migration from reviewable.io

You can work with us to migrate in-progress reviews and user data from reviewable.io to your new enterprise instance.  The migration proceeds in three phases and is non-destructive, so it's highly recommended to do a dry run or two.

First, you need to request a migration from Reviewable support and provide the following information:
1. A list of all repos to be migrated, as a JSON array of `"owner/repo"` strings.  If it's not obvious we may ask for proof of ownership of the repos.
2. A mapping of github.com numeric user IDs to new GHE user IDs, as a JSON object of `"github:MMMM": "github:NNNN"` key-value pairs, where `MMMM` is the old numeric ID and `NNNN` the new one.  Note that only settings and data related to reviews in the repos above will be migrated &mdash; no personal information gets copied.
3. The numeric GHE user ID of a "ghost" user that will be substituted for any referenced users that don't appear in your mapping.  GitHub maintains the [ghost](https://github.com/ghost) account on github.com and you probably want to create something similar.

Next, we'll extract the required data from the reviewable.io datastore and send you a large JSON file that you'll use as input for the third phase.  It's probably best if there's no activity in your repos during this step and the following one so you get a clean copy.

Finally, you'll load the extracted data into your own Reviewable datastore and sync it with your GHE instance.  Note that existing data will be overwritten so it's best to do this on an installation that hasn't seen actual use yet.
1. Make sure you've signed in to your instance of Reviewable with your license admin account at least once.
2. Install `npm install --global reviewable-enterprise-tools` and make sure you can run `load_data --help`.
3. Define `REVIEWABLE_FIREBASE`, `REVIEWABLE_FIREBASE_AUTH`, and `REVIEWABLE_ENCRYPTION_AES_KEY` in your shell just like on your servers.
4. Run `load_data --input data.js --admin github:NNNN` where `data.js` points to the data file we sent you and `NNNN` is the numeric GHE user ID of the license admin account.
