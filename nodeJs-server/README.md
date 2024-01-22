# Bat Signal Server - nodeJS

[![pipeline status](https://code.batcave.internal.cms.gov/ado-repositories/nightwing/knight-light/knight-light-server-nodejs/badges/main/pipeline.svg)](https://code.batcave.internal.cms.gov/ado-repositories/nightwing/knight-light/knight-light-server-nodejs/-/commits/main)
[![coverage report](https://code.batcave.internal.cms.gov/ado-repositories/nightwing/knight-light/knight-light-server-nodejs/badges/main/coverage.svg)](https://code.batcave.internal.cms.gov/ado-repositories/nightwing/knight-light/knight-light-server-nodejs/-/commits/main)

A simple API written in nodeJS with 3 routes

```bash
curl <bat signal address>/
curl <bat signal address>/activate
curl <bat signal address>/deactivate
```

Each end point will return JSON

```json
{
  "status": "ON",
  "server": "nodeJS"
}
```

```json
{
  "status": "OFF",
  "server": "nodeJS"
}
```

Status can be on or off
