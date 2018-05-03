# Blockscape Explorer

Welcome to Blockscape Explorer, a developer tool to browse blockchain data
for [Blockscape Engine](https://github.com/blockscape/blockscape) projects.

The explorer currently connects to any running Blockscape node via the RPC
interface, and then presents some information about generated blocks and transactions.
It is still rough on the edges and lacks many important features.

## Usage

First, install dependencies build the application with [gulp](https://gulpjs.com/):

```bash
yarn
gulp
```

Alternatively, use NPM:

```bash
npm install
gulp
```

The server uses [`ts-node`]() to run:

```bash
cd dist/
ts-node lib/server.ts
```

By default, the server tries to connect to a listening Blockscape RPC node on localhost, port 8356.
You can change this behavior by modifying the `config.json` file:

```json
{
	"rpc": {
		"host": "my-host.foo",
		"port": 8356
	}
}
```
