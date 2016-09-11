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

When maintenance mode is switched on, the servers will log `Entering maintenance mode`, immediately shut off datastore access, and exit at staggered (if `GAE_MODULE_INSTANCE` is set) or random intervals over the next minute to be restarted by the container.  After restarting, they'll log `Waiting for maintenance mode to end` and, once you turn maintenance mode off, `Exiting maintenance mode`.  No manual action should be required and you can restart the servers manually while in maintenance mode with no repercussions.

When maintenance mode is switched on, clients will immediately shut off datastore access and show a modal overlay (sample below)  Users will need to manually reload the page once maintenance mode is switched off so you may want to provide an estimated time of completion in the message above.

![Maintenance overlay](https://raw.githubusercontent.com/Reviewable/Reviewable/master/enterprise/maintenance.png)

#### Exiting maintenance mode

To exit maintenance, run the following command:

```bash
$ curl https://$REVIEWABLE_FIREBASE.firebaseio.com/system/maintenance.json?auth=$REVIEWABLE_FIREBASE_AUTH \
       -X DELETE
```
