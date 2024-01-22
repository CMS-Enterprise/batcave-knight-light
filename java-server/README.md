# Bat Signal Server - Java

[![pipeline status](https://code.batcave.internal.cms.gov/ado-repositories/nightwing/knight-light/knight-light-server-java/badges/main/pipeline.svg)](https://code.batcave.internal.cms.gov/ado-repositories/nightwing/knight-light/knight-light-server-java/-/commits/main)
[![coverage report](https://code.batcave.internal.cms.gov/ado-repositories/nightwing/knight-light/knight-light-server-java/badges/main/coverage.svg)](https://code.batcave.internal.cms.gov/ado-repositories/nightwing/knight-light/knight-light-server-java/-/commits/main)

A simple API written in Java with 3 routes

```bash
curl <bat signal address>/
curl <bat signal address>/activate
curl <bat signal address>/deactivate
```

Each end point will return JSON

```json
{
  "status": "ON",
  "server": "java spring boot"
}
```

```json
{
  "status": "OFF",
  "server": "java spring boot"
}
```

Status can be on or off