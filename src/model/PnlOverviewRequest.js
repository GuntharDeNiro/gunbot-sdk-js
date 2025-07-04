/*
 * Gunbot SDK JS
 * The Gunbot SDK JS enables you to programmatically interact with Gunbot, a self-hosted trading bot for crypto, ETFs and stocks.  It's a single API client with which you can control automated trading operations on many exchanges. Gunbot includes unique built-in strategies, it can also run custom strategy code in js. This client lets you orchestrate and monitor trading bots.  The API client accepts and returns data in JSON format.  It uses standard HTTP response codes to indicate request outcomes:  - **200 OK** – The request was successful   - **400 Bad Request** – The request was invalid or cannot be processed   - **401 Unauthorized** – Authentication failed or the user lacks permissions   - **500 Internal Server Error** – A server-side error occurred    **Gunbot Workflow**  1. Add the trading pair to the configuration with a valid strategy.   2. Start the core to activate trading operations.    After completing these steps you can access market-data and trading endpoints. Gunbot will actively monitor and execute strategies for the specified pairs.  **Encryption Helpers**  Gunbot uses password encryption. Refer to the original documentation for helper snippets in JavaScript (Browser/Node.js), Bash and Python.  **Supported Exchanges**  Gunbot ships with native connectors for more than two dozen exchanges, covering spot, futures and on-chain derivatives.   | Exchange | Spot | Futures / Perps | DeFi (on-chain) | Extra notes | | --- | :---: | :---: | :---: | --- | | **Binance** | ✔️ | ✔️ (USD-M & COIN-M) |  | Largest liquidity | | **Binance US** | ✔️ |  |  | US-regulated arm | | **Bitget** | ✔️ | ✔️ (USDT & UM perps) |  |  | | **Bybit** | ✔️ | ✔️ (USDT & inverse perps) |  |  | | **OKX** | ✔️ | ✔️ (Perps & dated futures) |  |  | | **Kraken** | ✔️ | ✔️ (via Kraken Futures) |  |  | | **KuCoin** | ✔️ |  |  |  | | **Gate.io** | ✔️ |  |  |  | | **MEXC** | ✔️ |  |  |  | | **BingX** | ✔️ |  |  |  | | **Crypto.com** | ✔️ |  |  |  | | **Huobi Global** | ✔️ |  |  |  | | **Bitfinex** | ✔️ |  |  |  | | **HitBTC** | ✔️ |  |  |  | | **Coinbase Advanced Trade** | ✔️ |  |  | Former Coinbase Pro | | **CEX.io** | ✔️ |  |  |  | | **Poloniex** | ✔️ |  |  |  | | **Alpaca** (stocks & crypto) | ✔️ |  |  |  | | **dYdX (v3/v4)** |  | ✔️ | ✔️ | Perpetual DEX | | **HyperLiquid** | ✔️ | ✔️ | ✔️ | DeFi perps | | **PancakeSwap** |  | ✔️ | ✔️ | BSC DEX | | **Bitmex / Bitmex Testnet** |  | ✔️ |  |  |
 *
 * OpenAPI spec version: v1
 * Contact: support@gunbot.freshdesk.com
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 *
 * Swagger Codegen version: 3.0.68
 *
 * Do not edit the class manually.
 *
 */
import ApiClient from '../ApiClient.js';
import PnlOverviewRequestDateRange from './PnlOverviewRequestDateRange.js';

/**
 * The PnlOverviewRequest model module.
 * @module model/PnlOverviewRequest
 * @version v1
 */
export default class PnlOverviewRequest {
  /**
   * Constructs a new <code>PnlOverviewRequest</code>.
   * @alias module:model/PnlOverviewRequest
   * @class
   * @param timezone {String} IANA timezone string (e.g., `Europe/Amsterdam`).
   * @param keys {Array.<String>} Array of trading keys (e.g., `['binance/USDT-BTC', 'binance/USDT-XRP']`). Use `['All']` for all results.
   */
  constructor(timezone, keys) {
    this.timezone = timezone;
    this.keys = keys;
  }

  /**
   * Constructs a <code>PnlOverviewRequest</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/PnlOverviewRequest} obj Optional instance to populate.
   * @return {module:model/PnlOverviewRequest} The populated <code>PnlOverviewRequest</code> instance.
   */
  static constructFromObject(data, obj) {
    if (data) {
      obj = obj || new PnlOverviewRequest();
      if (data.hasOwnProperty('timezone'))
        obj.timezone = ApiClient.convertToType(data['timezone'], 'String');
      if (data.hasOwnProperty('keys'))
        obj.keys = ApiClient.convertToType(data['keys'], ['String']);
      if (data.hasOwnProperty('dateRange'))
        obj.dateRange = PnlOverviewRequestDateRange.constructFromObject(data['dateRange']);
    }
    return obj;
  }
}

/**
 * IANA timezone string (e.g., `Europe/Amsterdam`).
 * @member {String} timezone
 */
PnlOverviewRequest.prototype.timezone = undefined;

/**
 * Array of trading keys (e.g., `['binance/USDT-BTC', 'binance/USDT-XRP']`). Use `['All']` for all results.
 * @member {Array.<String>} keys
 */
PnlOverviewRequest.prototype.keys = undefined;

/**
 * @member {module:model/PnlOverviewRequestDateRange} dateRange
 */
PnlOverviewRequest.prototype.dateRange = undefined;

