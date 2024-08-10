### REST API

*Added in Reviewable Enterprise 4247.6681*

Setting the `REVIEWABLE_API_SECRET` environment variable
(see the [configuration docs](https://github.com/Reviewable/Reviewable/blob/master/enterprise/config.md#security))
enables the REST API located at `{REVIEWABLE_HOST_URL}/api/v1/{endpoint}`.

#### Authorization

Each API request must be authenticated with following request header:

    Authorization: admin {REVIEWABLE_API_SECRET}

`{REVIEWABLE_API_SECRET}` is to be substituted by the value of the environment variable.

#### Expanding responses

Some data are omitted from the repsonse by default. These are documented as *expandable*.
In order to request expandable data to be included in the repsonse, add the `expand` parameter
to the request's query string specifying the path to the propery to be expanded,
e.g. `?expand=occupants.details`. You can specify multiple properties separated by comma.

#### Retrieve license information

The `license` API endpoint provides information about your
[Reviewable Enterprise license](https://docs.reviewable.io/subscriptions.html#licenses),
its seats and their occupants.

##### The license object

| Property             | Type                        | Description                             |
|----------------------|-----------------------------|-----------------------------------------|
| `num_seats`          | number                      | The number of available seats.          |
| `num_occupied_seats` | number                      | The number of occupied seats.           |
| `expiry`             | ISO date and time string    | Time at which this license will expire. |
| `organizations`      | optional array of strings   | If this license was issued for use with GitHub Enterprise Cloud, this property contains the list of GitHub organizations this license covers. If this license was issued for a self-hosted GitHub Enterprise instance, all organizations in that GitHub Entrprise instance are covered, and this property will be absent. |
| `occupants`          | array of *occupant* objects | The users that occupy a seat.           |
| `guests`             | array of *occupant* objects | The users that occupy a guest seat. These don't count towards the licensed seats. |

##### The occupant object

| Property           | Type                     | Description                        |
|--------------------|--------------------------|------------------------------------|
| `github_id`        | number                   | The GitHub user ID.                |
| `last_activity`    | ISO date and time string | Time at which the user most recently performed an action that requires a license, causing the user to take up a seat. |
| `session_end`      | ISO date and time string | Time at which this user will no longer take up a seat if no further actions that require a license are performed. |
| `details`          | *expandable* object      | User details synced from GitHub. By default this property is absent, see [expanding responses](#expanding-responses). |
| `details.email`    | nullable string          | The user's email address.         |
| `details.username` | nullable string          | The user's GitHub username.        |
| `details.name`     | nullable string          | The user's display name on GitHub. |

##### cURL example

    curl https://your-reviewable-host/api/v1/license -H "Authorization: admin secret"

##### Example response

```js
{
  "num_seats": 20,
  "num_occupied_seats": 1,
  "expiry": "2024-05-14T00:00:00.000Z",
  "occupants": [
    {
      "github_id": 1646896,
      "last_activity": "2023-12-05T05:57:23.902Z",
      "session_end": "2024-03-04T05:57:23.902Z",
      /* expand=occupants.details
      "details": {
        "email": "piotr@reviewable.io",
        "username": "pkaminski",
        "name": "Piotr Kaminski"
      } */
    }
  ],
  "guests": [
    {
      "github_id": 1525,
      "last_activity": "2023-12-05T05:57:23.902Z",
      "session_end": "2024-03-04T05:57:23.902Z",
      /* expand=guests.details
      "details": {
        "email": "sebastian@reviewable.io",
        "username": "snoack",
        "name": "Sebastian Noack"
      } */
    }
  ]
}
```

#### Retrieving team constraints

*Added in Reviewable Enterprise xxxx.xxxx*

The `team_constraints` API endpoint provides the
[team constraints](https://docs.reviewable.io/subscriptions.html#team-constraints)
as an array of strings in the format `<org name>/<team slug>`.
If no team constraints are in effect, an empty array is retrieved.

##### cURL example

    curl https://your-reviewable-host/api/v1/team_constraints -H "Authorization: admin secret"

##### Example response

```js
["Reviewable/developers", "Reviewable/release-managers"]
```

#### Updating team constraints

*Added in Reviewable Enterprise xxxx.xxxx*

The `team_constraints` API endpoint accepts `PUT` requests for setting the
[team constraints](https://docs.reviewable.io/subscriptions.html#team-constraints).
The request body is expected to be a JSON-encoded array of strings in the format `<org name>/<team slug>`.
In order to disable team constraints set it to an empty array.

##### cURL example

    curl https://your-reviewable-host/api/v1/team_constraints -X PUT \
      -H "Authorization: admin secret" \
      -H "Content-Type: application/json" \
      -d '["Reviewable/developers", "Reviewable/release-managers"]'
