# Bat Signal Server - Flask

[![pipeline status](https://code.batcave.internal.cms.gov/ado-repositories/nightwing/knight-light/knight-light-server-flask/badges/main/pipeline.svg)](https://code.batcave.internal.cms.gov/ado-repositories/nightwing/knight-light/knight-light-server-flask/-/commits/main)
[![coverage report](https://code.batcave.internal.cms.gov/ado-repositories/nightwing/knight-light/knight-light-server-flask/badges/main/coverage.svg)](https://code.batcave.internal.cms.gov/ado-repositories/nightwing/knight-light/knight-light-server-flask/-/commits/main)

```bash
curl <address>/
curl <address>/activate
curl <address>/deactivate
```

Each end point will return JSON

```json
{"status": "ON", "server": "go", "version":"1.0.0"}
```

```json
{"status": "OFF", "server": "go", "version":"1.0.0"}
```

Status can be on or off

