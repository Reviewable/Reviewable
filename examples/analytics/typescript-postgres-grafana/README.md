# Analytics via postgresql and grafana

This folder contains the following:
* A typescript server that bridges events into postgresql.
* A docker-compose.yaml to run postgresql and the above server

# Getting Started

Just run `docker compose up -d` in this folder!

**NOTE**: There is an insecure password in `docker-compose.yml` that should be
changed if you're running this in production, and it's matched in ormconfig.json.
