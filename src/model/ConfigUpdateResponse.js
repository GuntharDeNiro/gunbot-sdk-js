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
import GunbotConfig from './GunbotConfig.js';

/**
 * The ConfigUpdateResponse model module.
 * @module model/ConfigUpdateResponse
 * @version v1
 */
export default class ConfigUpdateResponse {
  /**
   * Constructs a new <code>ConfigUpdateResponse</code>.
   * @alias module:model/ConfigUpdateResponse
   * @class
   */
  constructor() {
  }

  /**
   * Constructs a <code>ConfigUpdateResponse</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/ConfigUpdateResponse} obj Optional instance to populate.
   * @return {module:model/ConfigUpdateResponse} The populated <code>ConfigUpdateResponse</code> instance.
   */
  static constructFromObject(data, obj) {
    if (data) {
      obj = obj || new ConfigUpdateResponse();
      if (data.hasOwnProperty('status'))
        obj.status = ApiClient.convertToType(data['status'], 'String');
      if (data.hasOwnProperty('config'))
        obj.config = GunbotConfig.constructFromObject(data['config']);
    }
    return obj;
  }
}

/**
 * @member {String} status
 */
ConfigUpdateResponse.prototype.status = undefined;

/**
 * @member {module:model/GunbotConfig} config
 */
ConfigUpdateResponse.prototype.config = undefined;

