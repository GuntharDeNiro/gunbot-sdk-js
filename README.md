# Gunbot SDK for JavaScript & TypeScript
**JavaScript & TypeScript client for the Gunbot REST API for automated crypto-/ETF-/stock trading**
 
[![npm version](https://img.shields.io/npm/v/gunbot-sdk-js.svg)](https://www.npmjs.com/package/gunbot-sdk-js)
[![bundle size](https://img.shields.io/bundlephobia/minzip/gunbot-sdk-js)](https://bundlephobia.com/package/gunbot-sdk-js)
[![license](https://img.shields.io/npm/l/gunbot-sdk-js.svg)](LICENSE)

> Programmatically control **Gunbot** – the self-hosted automated trading bot – from Node.js, browsers, CI jobs or serverless functions.

**Key Features**
- **100 % OpenAPI 3.0 generated** – strong typings & up-to-date endpoints  
- **Unified interface** for spot, futures **and** on-chain derivatives  
- Works in **Node ≥ 18**, **browsers** (ES modules) and **TypeScript** projects  
- **Tree-shakeable** ES bundle + CommonJS build + d.ts typings  
- Small footprint and **few runtime deps** except `superagent`  
- MIT licensed – use in commercial or open-source projects

---

## Table of Contents
1. [Installation](#installation)
3. [Quick Start](#quick-start)
4. [Configuration](#configuration)
5. [Supported Exchanges](#supported-exchanges)
6. [API Coverage](#api-coverage)
7. [TypeScript Usage](#typescript-usage)
8. [Authentication](#authentication)
9. [Troubleshooting](#troubleshooting)
10. [Contributing](#contributing)
11. [Roadmap](#roadmap)
12. [Changelog](#changelog)
13. [License](#license)

---

## Installation
```bash
# npm
npm install gunbot-sdk-js
# yarn
yarn add gunbot-sdk-js
# pnpm
pnpm add gunbot-sdk-js
````

Works out-of-the-box with **ESM** and **CJS** thanks to the `exports` field.

---

## Quick Start

```js
import { ApiClient, GunbotApi } from 'gunbot-sdk-js';

const api     = ApiClient.instance;
api.basePath  = 'http://<host>:3000/api/v1';   // ← REST base
api.authentications.BearerAuth = { type: 'oauth2', accessToken: '<token>' };

const gunbot  = new GunbotApi(api);

/* Call methods, like placing an order, query balances, manage strategies … */
const assets  = await gunbot.assetsTotal({
  exchange: 'binance',
  base:     'USDT',
  start:    Date.now() - 86400000,
  end:      Date.now()
});

console.log(assets);
```

> Replace `<host>` and `<token>` with your own instance values. 
> The docs folder has [documentation for each of the supported methods](https://github.com/GuntharDeNiro/gunbot-sdk-js/tree/main/docs/index.html).


---

## Configuration

| Option                   | Default                   | Description                                |
| ------------------------ | ------------------------- | ------------------------------------------ |
| `api.basePath`           | `http://localhost:3000`   | Gunbot REST base path                      |
| `BearerAuth.accessToken` | –                         | JWT from GUI localStorage or `/auth/login` |
| `timeout` (`ApiClient`)  | `60 000` ms               | Request timeout                            |
| `userAgent`              | `gunbot-sdk-js/<version>` | Custom UA header                           |

---

## Supported Exchanges

> Gunbot ships with native connectors for **25+ venues**. 

| Exchange | Spot | Futures / Perps | DeFi (on-chain) | Extra notes |
| --- | :---: | :---: | :---: | --- |
| **Binance** | ✔️ | ✔️ (USD-M & COIN-M) |  | Largest liquidity |
| **Binance US** | ✔️ |  |  | US-regulated arm |
| **Bitget** | ✔️ | ✔️ (USDT & UM perps) |  |  |
| **Bybit** | ✔️ | ✔️ (USDT & inverse perps) |  |  |
| **OKX** | ✔️ | ✔️ (Perps & dated futures) |  |  |
| **Kraken** | ✔️ | ✔️ (via Kraken Futures) |  |  |
| **KuCoin** | ✔️ |  |  |  |
| **Gate.io** | ✔️ |  |  |  |
| **MEXC** | ✔️ |  |  |  |
| **BingX** | ✔️ |  |  |  |
| **Crypto.com** | ✔️ |  |  |  |
| **Huobi Global** | ✔️ |  |  |  |
| **Bitfinex** | ✔️ |  |  |  |
| **HitBTC** | ✔️ |  |  |  |
| **Coinbase Advanced Trade** | ✔️ |  |  | Former Coinbase Pro |
| **CEX.io** | ✔️ |  |  |  |
| **Poloniex** | ✔️ |  |  |  |
| **Alpaca** (stocks & crypto) | ✔️ |  |  |  |
| **dYdX (v3/v4)** |  | ✔️ | ✔️ | Perpetual DEX |
| **HyperLiquid** | ✔️ | ✔️ | ✔️ | DeFi perps |
| **PancakeSwap** |  | ✔️ | ✔️ | BSC DEX |
| **Bitmex / Bitmex Testnet** |  | ✔️ |  |  |

---

## API Coverage

This SDK targets **Gunbot REST v1** (`/api/v1`), built from the official [OpenAPI spec](./openapi.json).

| Tag / Section | Status         |
| ------------- | -------------- |
| Auth          | ✅              |
| Market Data   | ✅              |
| Orders        | ✅              |
| Strategy      | ✅              |
| Wallet        | ✅              |
| Exchange Mgmt | ✅              |

---

## TypeScript Usage

Types are bundled (`dist/index.d.ts`).

Full generics for responses and request bodies.

---

## Authentication

* **Bearer Token** – Easy way: copy from Gunbot GUI `localStorage.jwtToken`
* **Password Encryption** – To get bearer token programatically, use helpers from the [Gunbot docs](https://www.gunbot.com/support/docs/rest-api/api-auth/#encryption-helpers)
* All requests sent via HTTPS recommended for non-localhost deployments.

---

## Troubleshooting

| Symptom                                                     | Checklist                                          |
| ----------------------------------------------------------- | -------------------------------------------------- |
| 401 Unauthorized                                            | ✓ Valid token? ✓ Correct `basePath`?               |
| 400 Bad Request                                             | ✓ Payload shape vs spec? ✓ Missing required param? |
| ECONNREFUSED                                                | ✓ Gunbot core running? ✓ Port forwarded?           |
| Enable `DEBUG=superagent gunbot-sdk-js:*` for verbose logs. |                                                    |

---

## Contributing

1. Fork → PR
2. Follow Conventional Commits for commits & PR titles

---

## License

MIT – see [`LICENSE`](./LICENSE).
