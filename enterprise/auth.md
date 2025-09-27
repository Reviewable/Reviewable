## Reviewable Authentication Flow
The user starts out unauthenticated.  We assume that [`REVIEWABLE_PRIVATE_MODE`](config.md#:~:text=REVIEWABLE_PRIVATE_MODE) is turned on. All random values are generated using crypto APIs.

1. The user loads any Reviewable page and is redirected to the root (sign-in) page.
2. The user clicks Sign In.
3. The browser issues a sign-in request to the Reviewable server over HTTPS.  The client may use either a pop-up window or an in-tab redirect flow for this, depending on the browser and context.  If the redirect flow is used then a random secret value is generated, stored in local storage, and passed to the server with the request.
4. The Reviewable server redirects the request to the OAuth endpoint on the configured GitHub server.  This initial login doesn’t request any OAuth scopes.  The Reviewable server generates a random secret value, stores it in a short-lived cookie, and passes it along with the redirect.
5. The GitHub server now goes through its login and authorization flow.  This may involve presenting a login page to the user, redirecting to an SSO provider, asking the user to authorize the Reviewable app, etc.  Once done, it redirects to a callback URL back on Reviewable’s server, including the secret value above and a login code.
6. The Reviewable server validates the secret value, then issues a request for an access token to the GitHub server, passing its app client ID, client secret, and the login code received above.
7. Once that request returns with an access token that’s valid forever, the user is considered to be successfully authenticated.  The access token is encrypted using the configured RSA key and stored in the user’s record in Firebase (keyed by their GitHub ID), accessible only to the Reviewable server.
8. The Reviewable server then generates a custom Firebase JWT token, with the only claims (beyond the standard JWT ones) being the user’s ID number and an expiry date for security rules authorization purposes 90 days from now (see the authorization flow below).  This uses the server’s service account credentials.  The Firebase JWT token itself has an expiration time of 1 hour.
9. The GitHub access token and the Firebase custom token are both returned to the client, along with the database AES-SIV encryption key.  If the redirect flow was used this also includes the original client secret.
10. The client validates the server’s response, including the secret if applicable.  It stores the GitHub access token and database encryption key in local storage, and initiates a Firebase login with the Firebase custom token.
11. The Firebase SDK communicates with the Firebase server, sending it the custom token and receiving a refresh token that’s valid forever in response.  The refresh token is stored in the browser’s IndexedDB and automatically used to obtain an ID token at hourly intervals.  The current ID token is automatically used to authenticate with Firebase over the web socket.  The database encryption key is used to automatically encrypt/decrypt all human-readable data sent to or received from Firebase.

The user is now signed in, and the page redirects to the reviews dashboard.

If `REVIEWABLE_PRIVATE_MODE` is turned off, the flow is the same with two exceptions:  the user is allowed to load public review pages without authentication, and the database encryption key is sent with the initial page load.

If the user needs to authorize additional OAuth scopes, the flow is the same as above starting at step 3 except that we pass additional scopes into the OAuth dance in step 4.

If the user previously authorized the app and is still signed in to GitHub but signed out from Reviewable, then step 5 may just be an immediate redirect with no user interaction, at GitHub’s discretion.

If the user is already signed in to Reviewable then the GitHub and Firebase tokens and the database encryption key are automatically fetched from the browser’s local storage and IndexedDB.  If the session is at least 76 days old (i.e., less than two weeks remain on the 90 day expiry) then the user is automatically signed out and the unauthenticated flow above kicks off.  This helps prevent sessions from becoming invalid at the 90 day mark while the user is working.

## Reviewable Authorization Flow
With few exceptions, Reviewable’s authorization is delegated to GitHub and Firebase.

GitHub applies its usual authorization rules to all API requests based on the permissions of the user whose access token is being used.  The Reviewable server always impersonates some user for every GitHub request using the access tokens stored in step 7 above; it has no permissions of its own.

Firebase authorizes all access to the database according to the security rules configured by Reviewable.  These rules are uploaded to Firebase every time a Reviewable server starts up and persist until overwritten by a newer version.

The rules give the Reviewable server full read/write access to the database, subject only to data validity constraints.  The server always executes reads and writes under its own authority and does not impersonate users.  (We mitigate the confused deputy problem by having the client do all of its own reads, and most of its own writes, except those that require extra authorization from the server.)

The rules limit a user’s access to the database based on the GItHub ID from their Firebase token and their GitHub permissions:

First, the rules consider any Firebase token issued more than 90 days ago as invalid.  This mitigates the fact that a Firebase refresh token doesn’t expire and forces the user to re-authenticate (via GitHub OAuth) no less than every 90 days.

Second, the rules limit access to data based on the user’s ID and their GitHub permissions.  For example, a user has full read/write access to their personal state, but only gets read access to review data if they have read access to the corresponding GitHub repository.  The latter process works as follows:
1. The client identifies an attempted database read or write as requiring authorization.  It blocks the request and writes a ticket into the database scoped to the appropriate repository or organization.
2. The server reads the ticket, impersonates the user with their GitHub access token (fetched and decrypted from the database), and issues a GitHub API request for the relevant permissions.
3. Once a response is received, the server updates the ticket with the permissions.
4. The client notices this and unblocks the original request, which is then validated via Firebase security rules by looking at the request’s path and checking for corresponding permissions in any relevant tickets.
5. Permissions stored in tickets are updated automatically by the server every 15 to 120 minutes (depending on sensitivity), and automatically deleted within 24 hours of last access by the client.

The security rule declarations are available on request under NDA, but require a solid understanding of Firebase RTDB to make sense of.

All access to the database (by both clients and the server) can be saved to an audit log for forensic analysis.  This is done at the database level and cannot be bypassed.

