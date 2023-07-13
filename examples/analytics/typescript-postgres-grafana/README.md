# Analytics via postgresql and grafana

This folder contains the following:
* A typescript server that bridges events into postgresql.
* A docker-compose.yaml to run postgresql and the above server

## Getting Started

Just run `docker compose up -d` in this folder, and add the following
environment variable to your Reviewable instance:
`REVIEWABLE_ANALYTICS_URL=http://reviewable-analytics-bridge:9000`

**NOTE**: There is an insecure password in `docker-compose.yml` that should be
changed if you're running this in production, and it's matched in ormconfig.ts.

## Grafana dashboards

A dashboard has been checked in at `dashboard/general.json` that can be
[imported into Grafana](https://grafana.com/docs/grafana/latest/dashboards/manage-dashboards/#export-and-import-dashboards)
to get started right away.

## Running in production

The `bridge` container should run on the same network as the Reviewable
container, but the other containers can be on a separate network (but shared
with the `bridge`).

Also, only the following containers are necessary, `adminer` is only for troubleshooting the bridge.

`docker compose up -d reviewable-analytics-bridge reviewable-analytics-postgres reviewable-analytics-grafana`
