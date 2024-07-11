# Knight Light

A simple polyglot demo application designed as a mono-repo intended for robust CI/CD testing.

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
