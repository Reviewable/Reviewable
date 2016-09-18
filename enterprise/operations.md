### Maintenance mode

You can switch Reviewable into maintenance mode to disable all clients' and servers' access to the Firebase datastore.  This can be useful when you need to atomically update the entire datastore, such as when restoring from backup or rotating encryption keys.

#### Limitations

The component that serves the app over HTTP will remain on throughout (except while restarting) so clients can continue to load the page, to be informed of the maintenance.  However, GitHub webhook events that arrive while maintenance mode is on will be rejected and won't be retried.  This will likely cause some reviews to fall out of sync in Reviewable (e.g., GitHub comments not posted, reviews not created for new PRs).  Once you exit maintenance mode, reviews will automatically resync as they're accessed or new webhooks arrive, and users can also force the immediate creation of any missing reviews from Reviewable's Reviews dashboard.

#### Entering maintenance mode

To turn on maintenance mode, run the following command:

```bash
$ curl https://$REVIEWABLE_FIREBASE.firebaseio.com/system/maintenance.json?auth=$REVIEWABLE_FIREBASE_AUTH \
       -X PUT -d '{"switch": true, "message": "An HTML message to your users."}'
```

The switch itself is public and will be publicly visible to anyone who cares to check.  You may also specify a private message that will be displayed in the browser's modal overlay only for users who are signed in.  The message is in HTML, so you can embed links to internal status pages and such.  You can repeat this command as often as necessary to update the message.

When maintenance mode is switched on, the servers will log `Entering maintenance mode`, immediately shut off datastore access, and exit at staggered (if `GAE_MODULE_INSTANCE` is set) or random intervals over the next minute to be restarted by the container.  After restarting, they'll log `Waiting for maintenance mode to end` and, once you turn maintenance mode off, `Exiting maintenance mode`.  No manual action should be required, but you can restart the servers as needed while in maintenance mode without repercussions.

When maintenance mode is switched on, clients will immediately shut off datastore access and show a modal overlay (sample below)  Users will need to manually reload the page once maintenance mode is switched off so you may want to provide an estimated time of completion in the message above.

![Maintenance overlay](https://raw.githubusercontent.com/Reviewable/Reviewable/master/enterprise/maintenance.png)

#### Exiting maintenance mode

To exit maintenance, run the following command:

```bash
$ curl https://$REVIEWABLE_FIREBASE.firebaseio.com/system/maintenance.json?auth=$REVIEWABLE_FIREBASE_AUTH \
       -X DELETE
```

### AES encryption key rotation

You can add, remove, or rotate the AES encryption key specified in `REVIEWABLE_ENCRYPTION_AES_KEY`.

1. Install `npm install --global firecrypt-tools`.
2. Obtain a copy of `rules_firecrypt.json`, either by extracting it from the system's Docker image (it's in `/usr/src/app`) or by requesting the current copy from your support contact.
3. Locate the current encryption key (if any) and generate a new encryption key if desired (`openssl rand --base64 64`).
4. Put Reviewable in maintenance mode (instructions above).
5. Run <code>recrypt --firebase $REVIEWABLE_FIREBASE --auth $REVIEWABLE_FIREBASE_AUTH --spec rule_firecrypt.json --oldKey <i>base64key</i> --newKey <i>base64Key</i></code> (using the environment values you configured for your server).
6. Update your server's configuration with the new `REVIEWABLE_ENCRYPTION_AES_KEY` (if any).
7. Exit maintenance mode (instructions above).

Rotating keys will take approximately NN minutes per GB of database size, assuming a reasonably fast machine and network connection.  Before you rotate the key on your production database, you might want to clone it into a spare Firebase project with security rules set to `{"rules": {".read": false, ".write": false}}`) and run it there to ensure there will be no errors and get a better estimate of how long it will take.

If the re-encryption runs into any errors it'll abort and leave the database in a partially-transformed state.  You'll need to get help from support to figure out the error and rerun the command until it completes successfully (it's idempotent).
