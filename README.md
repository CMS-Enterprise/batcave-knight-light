# Knight Light (Brian's branch)

A simple polyglot demo application designed as a mono-repo intended for robust CI/CD testing.

[![Build Knight-Light Go Server](https://github.com/CMS-Enterprise/batcave-knight-light/actions/workflows/go-server.yml/badge.svg)](https://github.com/CMS-Enterprise/batcave-knight-light/actions/workflows/go-server.yml)
[![Build Knight-Light Java Server](https://github.com/CMS-Enterprise/batcave-knight-light/actions/workflows/java-server.yml/badge.svg)](https://github.com/CMS-Enterprise/batcave-knight-light/actions/workflows/java-server.yml)
[![Build Knight-Light NodeJS Server](https://github.com/CMS-Enterprise/batcave-knight-light/actions/workflows/node-server.yml/badge.svg)](https://github.com/CMS-Enterprise/batcave-knight-light/actions/workflows/node-server.yml)
[![Build Knight-Light Python Server](https://github.com/CMS-Enterprise/batcave-knight-light/actions/workflows/python-server.yml/badge.svg)](https://github.com/CMS-Enterprise/batcave-knight-light/actions/workflows/python-server.yml)
[![Build Knight-Light UI](https://github.com/CMS-Enterprise/batcave-knight-light/actions/workflows/ui.yml/badge.svg)](https://github.com/CMS-Enterprise/batcave-knight-light/actions/workflows/ui.yml)

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


