<p align="center"> <img src="https://raw.githubusercontent.com/gunthardeniro/gunbot-sdk-js/main/assets/logo.svg" width="96" alt="Gunbot SDK logo"></p>

# Gunbot SDK for JavaScript & TypeScript
**JavaScript & TypeScript client for the Gunbot REST API for automated crypto-/ETF-/stock trading**
 
[![npm version](https://img.shields.io/npm/v/gunbot-sdk-js.svg)](https://www.npmjs.com/package/gunbot-sdk-js)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)

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
9. [Examples](#examples)
10. [Troubleshooting](#troubleshooting)
11. [Contributing](#contributing)
12. [Roadmap](#roadmap)
13. [Changelog](#changelog)
14. [License](#license)

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

Works out-of-the-box with **ESM** and **CJS**.

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

> The docs folder on Github has documentation for each of the supported methods, [online version of this documentation](https://gunthardeniro.github.io/gunbot-sdk-js/).

> You need an appropriate [Gunbot plan](https://www.gunbot.com) to use this SDK effectively.


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

> Gunbot ships with native connectors for **25+ exchanges**. 

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

## Examples

The script sets up the SDK client, creates a `GunbotApi` instance, and calls most of the available endpoints, so you can run it once to verify connectivity and see the expected argument patterns and raw responses. Use it as a reference checklist when integrating the SDK.

``` javascript
import { ApiClient, GunbotApi } from 'gunbot-sdk-js';

/* ───────────────────── 1. CLIENT CONFIG ───────────────────── */
const apiClient = ApiClient.instance;
apiClient.basePath = 'http://localhost:3000/api/v1';                  // ← set real REST base
apiClient.authentications['BearerAuth'] = {
  type: 'oauth2',
  accessToken: '<YOUR-JWT-HERE>'                                      // ← set real bearer token
};

/* ───────────────────── 2. SERVICE WRAPPER ──────────────────── */
const gunbot = new GunbotApi(apiClient);

/* ───────────────────── 3. EXAMPLES ─────────────────────────── */
async function runExamples() {

  /* ---------- SYSTEM / AUTH ---------- */
  const authStatusRes = await gunbot.authStatus();
  console.log('authStatus:', authStatusRes);

  const timeRes = await gunbot.time();
  console.log('time:', timeRes);

  const systemStartRes = await gunbot.systemStart();
  console.log('systemStart:', systemStartRes);

  const systemStopRes = await gunbot.systemStop();
  console.log('systemStop:', systemStopRes);


  /* ---------- CONFIGURATION ---------- */
  const configFullRes = await gunbot.configFull();
  console.log('configFull:', configFullRes);

  const configUpdateRes = await gunbot.configUpdate({
    data: { /* full Gunbot config as object */ }
  });
  console.log('configUpdate:', configUpdateRes);

  const configPairAddRes = await gunbot.configPairAdd({
    pair: 'USDT-BTC',
    exchange: 'binance',
    settings: {
                strategy: "stepgrid",
                enabled: true,
                override: {
                    "BUY_METHOD": "stepgrid",
                    "SELL_METHOD": "stepgrid",
                    "GAIN": "2"
                }
            }
  });
  console.log('configPairAdd:', configPairAddRes);

  const configPairRemoveRes = await gunbot.configPairRemove({
    pair: 'USDT-BTC',
    exchange: 'binance'
  });
  console.log('configPairRemove:', configPairRemoveRes);

  const configStrategyAddRes = await gunbot.configStrategyAdd({
    name: 'MY-STRATEGY',
    settings: { SOME_PARAM: true, MORE_PARAMS: 2 }
  });
  console.log('configStrategyAdd:', configStrategyAddRes);

  const configStrategyRemoveRes = await gunbot.configStrategyRemove({
    name: 'MY-STRATEGY'
  });
  console.log('configStrategyRemove:', configStrategyRemoveRes);


  /* ---------- MARKET DATA ---------- */
  const assetsTotalRes = await gunbot.assetsTotal({
    exchange: 'binance',
    base: 'USDT',
    start: Date.now() - 24 * 60 * 60 * 1000,
    end: Date.now()
  });
  console.log('assetsTotal:', assetsTotalRes);

  const chartDataRes = await gunbot.chartData({
    exchange: 'binance',
    pair: 'USDT-BTC',
    interval: '1h',
    start: Date.now() - 72 * 60 * 60 * 1000,
    end: Date.now()
  });
  console.log('chartData:', chartDataRes);

  const chartMarksRes = await gunbot.chartMarks(
    'binance', 'USDT-BTC', '1h',
    Date.now() - 24 * 60 * 60 * 1000, Date.now()
  );
  console.log('chartMarks:', chartMarksRes);

  const marketCandlesRes = await gunbot.marketCandles('binance/USDT-BTC');
  console.log('marketCandles:', marketCandlesRes);

  const marketOrderbookRes = await gunbot.marketOrderbook('binance/USDT-BTC');
  console.log('marketOrderbook:', marketOrderbookRes);


  /* ---------- CORE MEMORY ---------- */
  const corememRes = await gunbot.coremem();
  console.log('coremem:', corememRes);

  const corememRequestRes = await gunbot.corememRequest({
    exchange: 'binance',
    pair: 'USDT-BTC',
    elements: []
  });
  console.log('corememRequest:', corememRequestRes);

  const corememSingleRes = await gunbot.corememSingle({
    exchange: 'binance',
    pair: 'USDT-BTC'
  });
  console.log('corememSingle:', corememSingleRes);


  /* ---------- ORDERS ---------- */
  const ordersRes = await gunbot.orders('binance/USDT-BTC');
  console.log('orders:', ordersRes);

  const ordersPageRes = await gunbot.ordersPage('binance/USDT-BTC', 0, 50);
  console.log('ordersPage:', ordersPageRes);

  const ordersPageMultiRes = await gunbot.ordersPageMulti(
    ['binance/USDT-BTC', 'binance/USDT-BTC'], 0, 100
  );
  console.log('ordersPageMulti:', ordersPageMultiRes);

  const ordersDayRes = await gunbot.ordersDay(
    'Europe/Berlin', ['binance/USDT-BTC']
  );
  console.log('ordersDay:', ordersDayRes);


  /* ---------- BALANCES & PAIRS ---------- */
  const balancesRes = await gunbot.balances();
  console.log('balances:', balancesRes);

  const pairsRes = await gunbot.pairs('binance');
  console.log('pairs:', pairsRes);

  const pairsDetailedRes = await gunbot.pairsDetailed('binance');
  console.log('pairsDetailed:', pairsDetailedRes);


  /* ---------- PNL ---------- */
  const pnlDailyRes = await gunbot.pnlDaily(
    'binance/USDT-BTC',
    Date.now() - 24 * 60 * 60 * 1000, Date.now()
  );
  console.log('pnlDaily:', pnlDailyRes);

  const pnlDailyPaginatedRes = await gunbot.pnlDailyPaginated(
    'binance/USDT-BTC', 1, 30, Date.now()
  );
  console.log('pnlDailyPaginated:', pnlDailyPaginatedRes);

  const pnlSumRes = await gunbot.pnlSum(
    'binance', Date.now() - 7 * 24 * 60 * 60 * 1000, Date.now()
  );
  console.log('pnlSum:', pnlSumRes);

  const pnlTotalRes = await gunbot.pnlTotal('binance/USDT-BTC');
  console.log('pnlTotal:', pnlTotalRes);

  const pnlOverviewRes = await gunbot.pnlOverview({
    timezone: 'Europe/Berlin',
    keys: ['binance/USDT-BTC']
  });
  console.log('pnlOverview:', pnlOverviewRes);


  /* ---------- FILES ---------- */
  const filesStateRes = await gunbot.filesState();
  console.log('filesState:', filesStateRes);

  const filesStrategyRes = await gunbot.filesStrategy();
  console.log('filesStrategy:', filesStrategyRes);

  const filesStrategyWriteRes = await gunbot.filesStrategyWrite({
    filename: 'apistrat.js',
    document: 'full strategy as string'
  });
  console.log('filesStrategyWrite:', filesStrategyWriteRes);

  const filesStrategyDeleteRes = await gunbot.filesStrategyDelete({
    filename: 'apistrat.js'
  });
  console.log('filesStrategyDelete:', filesStrategyDeleteRes);

  const strategyFileContentRes = await gunbot.filesStrategyGet({
    filename: 'mfi.js'
  });
  console.log('filesStrategyGet:', strategyFileContentRes);

  const filesAcvarGetRes = await gunbot.filesAcvarGet({
    filename: 'autoconfig-variables.json'
  });
  console.log('filesAcvarGet:', filesAcvarGetRes);

  const filesAcvarRes = await gunbot.filesAcvar();
  console.log('filesAcvar:', filesAcvarRes);

  const filesAutoconfigWriteRes = await gunbot.filesAutoconfigWrite({
    /* full autoconfig.json */
  });
  console.log('filesAutoconfigWrite:', filesAutoconfigWriteRes);

  const filesCustomEditorWriteRes = await gunbot.filesCustomEditorWrite({
    document: { test: true }
  });
  console.log('filesCustomEditorWrite:', filesCustomEditorWriteRes);

  const filesCustomEditorGetRes = await gunbot.filesCustomEditorGet();
  console.log('filesCustomEditorGet:', filesCustomEditorGetRes);

  const filesBackupRes = await gunbot.filesBackup();
  console.log('filesBackup:', filesBackupRes);

  const backupFileRes = await gunbot.filesBackupGet({
    filename: 'autoconfig.json.1623252417412'
  });
  console.log('filesBackupGet:', backupFileRes);


  /* ---------- TRADING ---------- */
  const tradeBuyRes1 = await gunbot.tradeBuy({
    exch: 'binance',
    pair: 'USDT-BTC',
    price: 100000,
    amt: 0.001
  });
  console.log('tradeBuy (data):', tradeBuyRes1);

  const tradeSellRes = await gunbot.tradeSell({
    exch: 'binance',
    pair: 'USDT-BTC',
    price: 100000,
    amt: 0.001
  });
  console.log('tradeSell:', tradeSellRes);

  const tradeBuyMarketRes = await gunbot.tradeBuyMarket({
    exch: 'binance',
    pair: 'USDT-BTC',
    price: 100000, // explicit price needed in simulator mode, can be set to 0 for real trading
    amt: 0.001
  });
  console.log('tradeBuy (market):', tradeBuyMarketRes);

  const tradeSellMarketRes = await gunbot.tradeSellMarket({
    exch: 'binance',
    pair: 'USDT-BTC',
    price: 100000, // explicit price needed in simulator mode, can be set to 0 for real trading
    amt: 0.001
  });
  console.log('tradeSellMarket:', tradeSellMarketRes);
}

/* ───────────────────── 4. RUN ─────────────────────────────── */
runExamples().catch(console.error);

```

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
