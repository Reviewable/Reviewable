#### Maintenance mode

You can switch Reviewable into maintenance mode to disable all clients' and servers' access to the Firebase datastore.  This can be useful when you need to atomically update the entire datastore, such as when restoring from backup or rotating encryption keys.

To turn on maintenance mode, run the following command:

```bash
$ curl https://$REVIEWABLE_FIREBASE.firebaseio.com/system/maintenance.json?auth=$REVIEWABLE_FIREBASE_AUTH -X PUT -d '{"message": "An HTML message to your users."}'
```

You must specify a message that will be displayed in the browser's modal overlay.  The message is in HTML, so you can embed links to internal status pages and such.  While Reviewable is in maintenance, all clients will be locked out like so:

![Maintenance overlay](https://raw.githubusercontent.com/Reviewable/Reviewable/master/enterprise/maintenance.png)

To exit maintenance, run the following command:

```bash
$ curl https://$REVIEWABLE_FIREBASE.firebaseio.com/system/maintenance.json?auth=$REVIEWABLE_FIREBASE_AUTH -X DELETE
```
