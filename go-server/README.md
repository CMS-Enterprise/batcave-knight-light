# Knight Light Server (Go)

[![pipeline status](https://code.batcave.internal.cms.gov/ado-repositories/nightwing/knight-light/knight-light-server-go/badges/main/pipeline.svg)](https://code.batcave.internal.cms.gov/ado-repositories/nightwing/knight-light/knight-light-server-go/-/commits/main)

A simple API written in Go with 3 routes

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

