/*
 * Gunbot REST API
 * The Gunbot REST API enables you to programmatically interact with Gunbot, a self hosted trading bot for crypto, ETFs and stocks, allowing automation and integration with your own applications and services. It gives you a single API with which you can control trading operations on many exchanges.  The API accepts and returns data in JSON format. It uses standard HTTP response codes to indicate request outcomes: - **200 OK**: The request was successful. - **400 Bad Request**: The request was invalid or cannot be processed. - **401 Unauthorized**: Authentication failed, or the user lacks necessary permissions. - **500 Internal Server Error**: A server-side error occurred.  **Gunbot Workflow:** To automate trading for any pair using the API, follow these steps: 1. Add the trading pair to the configuration with a valid strategy. 2. Start the core to activate trading operations. After completing these steps, you can access API endpoints for market data and trading actions. Gunbot will actively monitor and execute strategies for the specified pairs.  **Encryption Helpers:** Gunbot uses password encryption. Refer to the original documentation for encryption helper snippets in JavaScript (Browser/Node.js), Bash, and Python. 
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

/**
 * The TradeTrailingStopData model module.
 * @module model/TradeTrailingStopData
 * @version v1
 */
export default class TradeTrailingStopData {
  /**
   * Constructs a new <code>TradeTrailingStopData</code>.
   * @alias module:model/TradeTrailingStopData
   * @class
   * @param exch {String} 
   * @param pair {String} 
   * @param amt {Number} 
   * @param price {Number} Reference price for the order.
   * @param stopPrice {Number} Trailing stop price.
   */
  constructor(exch, pair, amt, price, stopPrice) {
    this.exch = exch;
    this.pair = pair;
    this.amt = amt;
    this.price = price;
    this.stopPrice = stopPrice;
  }

  /**
   * Constructs a <code>TradeTrailingStopData</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/TradeTrailingStopData} obj Optional instance to populate.
   * @return {module:model/TradeTrailingStopData} The populated <code>TradeTrailingStopData</code> instance.
   */
  static constructFromObject(data, obj) {
    if (data) {
      obj = obj || new TradeTrailingStopData();
      if (data.hasOwnProperty('exch'))
        obj.exch = ApiClient.convertToType(data['exch'], 'String');
      if (data.hasOwnProperty('pair'))
        obj.pair = ApiClient.convertToType(data['pair'], 'String');
      if (data.hasOwnProperty('amt'))
        obj.amt = ApiClient.convertToType(data['amt'], 'Number');
      if (data.hasOwnProperty('price'))
        obj.price = ApiClient.convertToType(data['price'], 'Number');
      if (data.hasOwnProperty('stopPrice'))
        obj.stopPrice = ApiClient.convertToType(data['stopPrice'], 'Number');
    }
    return obj;
  }
}

/**
 * @member {String} exch
 */
TradeTrailingStopData.prototype.exch = undefined;

/**
 * @member {String} pair
 */
TradeTrailingStopData.prototype.pair = undefined;

/**
 * @member {Number} amt
 */
TradeTrailingStopData.prototype.amt = undefined;

/**
 * Reference price for the order.
 * @member {Number} price
 */
TradeTrailingStopData.prototype.price = undefined;

/**
 * Trailing stop price.
 * @member {Number} stopPrice
 */
TradeTrailingStopData.prototype.stopPrice = undefined;

