# BCT platform test

## Development / Installation

### Setup dependencies

This project uses [yarn workspace v1](https://classic.yarnpkg.com/en/docs/workspaces/) to manage dependencies

```bash
yarn
```

### Start project

```bash
# start server
yarn start:server

# start client
yarn start:client
```

### Infos

- client website is available by default on the url: `http://localhost:3000`
- server is available by default on the url: `http://localhost:5000`

> The server is configured to accept all domain requests (`Access-Control-Allow-Origin: *`)

## Test

The technical test specifications [are available here](./SPECS.md)
