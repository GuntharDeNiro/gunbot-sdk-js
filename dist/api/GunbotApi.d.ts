/**
* Gunbot service.
* @module api/GunbotApi
* @version v1
*/
export default class GunbotApi {
    /**
    * Constructs a new GunbotApi.
    * @alias module:api/GunbotApi
    * @class
    * @param {module:ApiClient} [apiClient] Optional API client implementation to use,
    * default to {@link module:ApiClient#instanc
    e} if unspecified.
    */
    constructor(apiClient?: any);
    apiClient: any;
    /**
     * Callback function to receive the result of the assetsTotal operation.
     * @callback moduleapi/GunbotApi~assetsTotalCallback
     * @param {String} error Error message, if any.
     * @param {module:model/AssetsTotalResponse{ data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */
    /**
     * Get Historical Total Asset Value
     * Retrieve historical total asset value in a base currency over a time range.
     * @param {module:model/AssetsTotalRequest} body
     * @param {module:api/GunbotApi~assetsTotalCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
     */
    assetsTotal(body: any, callback: any): any;
    /**
     * Callback function to receive the result of the authLogin operation.
     * @callback moduleapi/GunbotApi~authLoginCallback
     * @param {String} error Error message, if any.
     * @param {module:model/LoginResponse{ data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */
    /**
     * Login User
     * Authenticate a user and obtain a JSON Web Token (JWT).
     * @param {module:model/LoginRequest} body
     * @param {module:api/GunbotApi~authLoginCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
     */
    authLogin(body: any, callback: any): any;
    /**
     * Callback function to receive the result of the authStatus operation.
     * @callback moduleapi/GunbotApi~authStatusCallback
     * @param {String} error Error message, if any.
     * @param {module:model/AuthStatusResponse{ data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */
    /**
     * Get Authentication Status
     * Validate the current session&#x27;s authentication status using the provided token.
     * @param {module:api/GunbotApi~authStatusCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
     */
    authStatus(callback: any): any;
    /**
     * Callback function to receive the result of the balances operation.
     * @callback moduleapi/GunbotApi~balancesCallback
     * @param {String} error Error message, if any.
     * @param {module:model/BalancesResponse{ data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */
    /**
     * Get Asset Balances
     * Retrieve asset balances across exchanges for the authenticated user.
     * @param {module:api/GunbotApi~balancesCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
     */
    balances(callback: any): any;
    /**
     * Callback function to receive the result of the chartData operation.
     * @callback moduleapi/GunbotApi~chartDataCallback
     * @param {String} error Error message, if any.
     * @param {module:model/ChartDataResponse{ data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */
    /**
     * Get Chart Data (Candles and Indicators)
     * Retrieve chart data, including candles and indicators, for a specific trading pair.
     * @param {module:model/ChartDataRequest} body
     * @param {module:api/GunbotApi~chartDataCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
     */
    chartData(body: any, callback: any): any;
    /**
     * Callback function to receive the result of the chartMarks operation.
     * @callback moduleapi/GunbotApi~chartMarksCallback
     * @param {String} error Error message, if any.
     * @param {module:model/ChartMarksResponse{ data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */
    /**
     * Get Chart Timescale Marks
     * Retrieve chart timescale marks (annotations like buy/sell triggers) for a pair and interval.
     * @param {String} exchange
     * @param {String} pair
     * @param {String} interval Time interval in minutes.
     * @param {String} startTime Start time (UNIX timestamp seconds).
     * @param {String} endTime End time (UNIX timestamp seconds).
     * @param {module:api/GunbotApi~chartMarksCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
     */
    chartMarks(exchange: string, pair: string, interval: string, startTime: string, endTime: string, callback: any): any;
    /**
     * Callback function to receive the result of the configFull operation.
     * @callback moduleapi/GunbotApi~configFullCallback
     * @param {String} error Error message, if any.
     * @param {module:model/ConfigFullResponse{ data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */
    /**
     * Get Full Configuration
     * Retrieve the entire application configuration.
     * @param {module:api/GunbotApi~configFullCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
     */
    configFull(callback: any): any;
    /**
     * Callback function to receive the result of the configPairAdd operation.
     * @callback moduleapi/GunbotApi~configPairAddCallback
     * @param {String} error Error message, if any.
     * @param {module:model/SuccessStatusResponse{ data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */
    /**
     * Add Trading Pair to Configuration
     * Add a new trading pair to the configuration.
     * @param {module:model/ConfigPairAddRequest} body
     * @param {module:api/GunbotApi~configPairAddCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
     */
    configPairAdd(body: any, callback: any): any;
    /**
     * Callback function to receive the result of the configPairRemove operation.
     * @callback moduleapi/GunbotApi~configPairRemoveCallback
     * @param {String} error Error message, if any.
     * @param {module:model/SuccessStatusResponse{ data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */
    /**
     * Remove Trading Pair from Configuration
     * Remove a trading pair from the configuration.
     * @param {module:model/ConfigPairRemoveRequest} body
     * @param {module:api/GunbotApi~configPairRemoveCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
     */
    configPairRemove(body: any, callback: any): any;
    /**
     * Callback function to receive the result of the configStrategyAdd operation.
     * @callback moduleapi/GunbotApi~configStrategyAddCallback
     * @param {String} error Error message, if any.
     * @param {module:model/SuccessStatusResponse{ data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */
    /**
     * Add Trading Strategy to Configuration
     * Add a new trading strategy to the configuration.
     * @param {module:model/ConfigStrategyAddRequest} body
     * @param {module:api/GunbotApi~configStrategyAddCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
     */
    configStrategyAdd(body: any, callback: any): any;
    /**
     * Callback function to receive the result of the configStrategyRemove operation.
     * @callback moduleapi/GunbotApi~configStrategyRemoveCallback
     * @param {String} error Error message, if any.
     * @param {module:model/SuccessStatusResponse{ data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */
    /**
     * Remove Trading Strategy from Configuration
     * Remove a trading strategy from the configuration.
     * @param {module:model/ConfigStrategyRemoveRequest} body
     * @param {module:api/GunbotApi~configStrategyRemoveCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
     */
    configStrategyRemove(body: any, callback: any): any;
    /**
     * Callback function to receive the result of the configUpdate operation.
     * @callback moduleapi/GunbotApi~configUpdateCallback
     * @param {String} error Error message, if any.
     * @param {module:model/ConfigUpdateResponse{ data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */
    /**
     * Update Full Configuration
     * Update the entire configuration with a new object.
     * @param {module:model/ConfigUpdateRequest} body
     * @param {module:api/GunbotApi~configUpdateCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
     */
    configUpdate(body: any, callback: any): any;
    /**
     * Callback function to receive the result of the coremem operation.
     * @callback moduleapi/GunbotApi~corememCallback
     * @param {String} error Error message, if any.
     * @param {module:model/CoreMemSnapshotResponse{ data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */
    /**
     * Get Core Memory Snapshot (All Pairs)
     * Retrieve a snapshot of relevant core memory data for all active trading pairs. Data is slightly delayed and transformed for frontend use.
     * @param {module:api/GunbotApi~corememCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
     */
    coremem(callback: any): any;
    /**
     * Callback function to receive the result of the corememRequest operation.
     * @callback moduleapi/GunbotApi~corememRequestCallback
     * @param {String} error Error message, if any.
     * @param {module:model/CoreMemRawResponse{ data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */
    /**
     * Get Raw Core Memory Data for a Pair
     * Retrieve raw core memory data for a specific trading pair, optionally filtered by elements.
     * @param {module:model/CoreMemRawRequest} body
     * @param {module:api/GunbotApi~corememRequestCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
     */
    corememRequest(body: any, callback: any): any;
    /**
     * Callback function to receive the result of the corememSingle operation.
     * @callback moduleapi/GunbotApi~corememSingleCallback
     * @param {String} error Error message, if any.
     * @param {module:model/CoreMemSnapshotResponse{ data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */
    /**
     * Get Core Memory Snapshot (Single Pair)
     * Retrieve a snapshot of relevant core memory data for a single active trading pair. Data is slightly delayed and transformed.
     * @param {module:model/CoreMemSingleRequest} body
     * @param {module:api/GunbotApi~corememSingleCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
     */
    corememSingle(body: any, callback: any): any;
    /**
     * Callback function to receive the result of the filesAcvar operation.
     * @callback moduleapi/GunbotApi~filesAcvarCallback
     * @param {String} error Error message, if any.
     * @param {module:model/FileListResponse{ data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */
    /**
     * List AutoConfig Variable Files
     * List filenames of available AutoConfig variable files.
     * @param {module:api/GunbotApi~filesAcvarCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
     */
    filesAcvar(callback: any): any;
    /**
     * Callback function to receive the result of the filesAcvarGet operation.
     * @callback moduleapi/GunbotApi~filesAcvarGetCallback
     * @param {String} error Error message, if any.
     * @param {module:model/FileAclarContentResponse{ data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */
    /**
     * Get AutoConfig Variable File Content
     * Retrieve the content of a specified AutoConfig variable file.
     * @param {module:model/FileGetRequest} body
     * @param {module:api/GunbotApi~filesAcvarGetCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
     */
    filesAcvarGet(body: any, callback: any): any;
    /**
     * Callback function to receive the result of the filesAutoconfigWrite operation.
     * @callback moduleapi/GunbotApi~filesAutoconfigWriteCallback
     * @param {String} error Error message, if any.
     * @param {module:model/SuccessStatusResponse{ data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */
    /**
     * Write to autoconfig.json File
     * Write content to the &#x60;autoconfig.json&#x60; file.
     * @param {module:model/FileWriteRequest} body
     * @param {module:api/GunbotApi~filesAutoconfigWriteCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
     */
    filesAutoconfigWrite(body: any, callback: any): any;
    /**
     * Callback function to receive the result of the filesBackup operation.
     * @callback moduleapi/GunbotApi~filesBackupCallback
     * @param {String} error Error message, if any.
     * @param {module:model/FileListResponse{ data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */
    /**
     * List Backup Files
     * List available backup files.
     * @param {module:api/GunbotApi~filesBackupCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
     */
    filesBackup(callback: any): any;
    /**
     * Callback function to receive the result of the filesBackupGet operation.
     * @callback moduleapi/GunbotApi~filesBackupGetCallback
     * @param {String} error Error message, if any.
     * @param {module:model/FileContentResponse{ data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */
    /**
     * Get Backup File Content
     * Retrieve the content of a specified backup config file.
     * @param {module:model/FileGetRequest} body
     * @param {module:api/GunbotApi~filesBackupGetCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
     */
    filesBackupGet(body: any, callback: any): any;
    /**
     * Callback function to receive the result of the filesCustomEditorGet operation.
     * @callback moduleapi/GunbotApi~filesCustomEditorGetCallback
     * @param {String} error Error message, if any.
     * @param {Object.<String, {'String': Object}>{ data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */
    /**
     * Get Custom Strategy Editor File Content
     * Retrieve the content of the custom strategy editor file.
     * @param {module:api/GunbotApi~filesCustomEditorGetCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
     */
    filesCustomEditorGet(callback: any): any;
    /**
     * Callback function to receive the result of the filesCustomEditorWrite operation.
     * @callback moduleapi/GunbotApi~filesCustomEditorWriteCallback
     * @param {String} error Error message, if any.
     * @param {module:model/SuccessStatusResponse{ data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */
    /**
     * Write to Custom Strategy Editor File
     * Write content to the custom strategy editor file.
     * @param {module:model/FileWriteRequest} body
     * @param {module:api/GunbotApi~filesCustomEditorWriteCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
     */
    filesCustomEditorWrite(body: any, callback: any): any;
    /**
     * Callback function to receive the result of the filesState operation.
     * @callback moduleapi/GunbotApi~filesStateCallback
     * @param {String} error Error message, if any.
     * @param {module:model/FileListResponse{ data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */
    /**
     * List State Files
     * List filenames of available state files.
     * @param {module:api/GunbotApi~filesStateCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
     */
    filesState(callback: any): any;
    /**
     * Callback function to receive the result of the filesStateGet operation.
     * @callback moduleapi/GunbotApi~filesStateGetCallback
     * @param {String} error Error message, if any.
     * @param {module:model/FileStateContentResponse{ data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */
    /**
     * Get State File Content
     * Retrieve the content of a specific state file.
     * @param {module:model/FileGetRequest} body
     * @param {module:api/GunbotApi~filesStateGetCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
     */
    filesStateGet(body: any, callback: any): any;
    /**
     * Callback function to receive the result of the filesStrategy operation.
     * @callback moduleapi/GunbotApi~filesStrategyCallback
     * @param {String} error Error message, if any.
     * @param {module:model/FileListResponse{ data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */
    /**
     * List Custom Strategy Files
     * List filenames of available custom strategy files (JavaScript files).
     * @param {module:api/GunbotApi~filesStrategyCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
     */
    filesStrategy(callback: any): any;
    /**
     * Callback function to receive the result of the filesStrategyDelete operation.
     * @callback moduleapi/GunbotApi~filesStrategyDeleteCallback
     * @param {String} error Error message, if any.
     * @param {module:model/SuccessStatusResponse{ data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */
    /**
     * Delete Custom Strategy File
     * Delete a specific custom strategy file.
     * @param {module:model/FileGetRequest} body
     * @param {module:api/GunbotApi~filesStrategyDeleteCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
     */
    filesStrategyDelete(body: any, callback: any): any;
    /**
     * Callback function to receive the result of the filesStrategyGet operation.
     * @callback moduleapi/GunbotApi~filesStrategyGetCallback
     * @param {String} error Error message, if any.
     * @param {Object.<String, {'String': Object}>{ data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */
    /**
     * Get Custom Strategy File Content
     * Retrieve the content of a specific custom strategy file. The response is the raw content of the file, likely JavaScript code, wrapped in a JSON object.
     * @param {module:model/FileGetRequest} body
     * @param {module:api/GunbotApi~filesStrategyGetCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
     */
    filesStrategyGet(body: any, callback: any): any;
    /**
     * Callback function to receive the result of the filesStrategyWrite operation.
     * @callback moduleapi/GunbotApi~filesStrategyWriteCallback
     * @param {String} error Error message, if any.
     * @param {module:model/SuccessStatusResponse{ data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */
    /**
     * Write to Custom Strategy File
     * Write JavaScript code content to a specific custom strategy file.
     * @param {module:model/FileStrategyWriteRequest} body
     * @param {module:api/GunbotApi~filesStrategyWriteCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
     */
    filesStrategyWrite(body: any, callback: any): any;
    /**
     * Callback function to receive the result of the licenseKeysEdit operation.
     * @callback moduleapi/GunbotApi~licenseKeysEditCallback
     * @param {String} error Error message, if any.
     * @param {module:model/SuccessStatusResponse{ data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */
    /**
     * Edit License Keys
     * Edit license keys for a wallet, optionally verifying with an exchange.
     * @param {module:model/LicenseKeysEditRequest} body
     * @param {module:api/GunbotApi~licenseKeysEditCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
     */
    licenseKeysEdit(body: any, callback: any): any;
    /**
     * Callback function to receive the result of the marketCandles operation.
     * @callback moduleapi/GunbotApi~marketCandlesCallback
     * @param {String} error Error message, if any.
     * @param {module:model/MarketCandlesResponse{ data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */
    /**
     * Get Market Candles (OHLCV)
     * Retrieve historical OHLCV candle data for a trading pair. The &#x60;key&#x60; parameter (exchange/pair) must be URL-encoded.
     * @param {String} key URL-encoded trading pair key (e.g., &#x60;binance%2FUSDT-PEPE&#x60;).
     * @param {module:api/GunbotApi~marketCandlesCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
     */
    marketCandles(key: string, callback: any): any;
    /**
     * Callback function to receive the result of the marketOrderbook operation.
     * @callback moduleapi/GunbotApi~marketOrderbookCallback
     * @param {String} error Error message, if any.
     * @param {module:model/MarketOrderbookResponse{ data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */
    /**
     * Get Market Orderbook
     * Retrieve current order book (bids and asks) for a trading pair. The &#x60;key&#x60; parameter must be URL-encoded.
     * @param {String} key URL-encoded trading pair key (e.g., &#x60;binance%2FUSDT-PEPE&#x60;).
     * @param {module:api/GunbotApi~marketOrderbookCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
     */
    marketOrderbook(key: string, callback: any): any;
    /**
     * Callback function to receive the result of the orders operation.
     * @callback moduleapi/GunbotApi~ordersCallback
     * @param {String} error Error message, if any.
     * @param {module:model/OrdersResponse{ data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */
    /**
     * Get Order History for a Pair
     * Retrieve locally stored order history for a trading pair. The &#x60;key&#x60; parameter must be URL-encoded.
     * @param {String} key URL-encoded exchange/pair key (e.g., &#x60;binance%2FUSDT-XRP&#x60;).
     * @param {module:api/GunbotApi~ordersCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
     */
    orders(key: string, callback: any): any;
    /**
     * Callback function to receive the result of the ordersDay operation.
     * @callback moduleapi/GunbotApi~ordersDayCallback
     * @param {String} error Error message, if any.
     * @param {module:model/OrdersDayResponse{ data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */
    /**
     * Get Orders for Current Day (Multiple Pairs)
     * Retrieve orders from the current day for multiple trading pairs. Individual keys in &#x60;keys[]&#x60; array must be URL-encoded if they contain special characters.
     * @param {String} timezone IANA timezone (e.g., &#x60;America/New_York&#x60;).
     * @param {Array.<String>} keys Array of exchange/pair keys. Each key should be URL-encoded if needed.
     * @param {module:api/GunbotApi~ordersDayCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
     */
    ordersDay(timezone: string, keys: Array<string>, callback: any): any;
    /**
     * Callback function to receive the result of the ordersPage operation.
     * @callback moduleapi/GunbotApi~ordersPageCallback
     * @param {String} error Error message, if any.
     * @param {module:model/OrdersPageResponse{ data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */
    /**
     * Get Paginated Orders for a Pair
     * Retrieve paginated orders for a trading pair. The &#x60;key&#x60; parameter must be URL-encoded.
     * @param {String} key URL-encoded exchange/pair key.
     * @param {Number} page Page number (0-indexed).
     * @param {Number} pageSize Records per page.
     * @param {module:api/GunbotApi~ordersPageCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
     */
    ordersPage(key: string, page: number, pageSize: number, callback: any): any;
    /**
     * Callback function to receive the result of the ordersPageMulti operation.
     * @callback moduleapi/GunbotApi~ordersPageMultiCallback
     * @param {String} error Error message, if any.
     * @param {module:model/OrdersPageMultiResponse{ data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */
    /**
     * Get Paginated Orders (Multiple Pairs)
     * Retrieve paginated orders for multiple trading pairs. Individual keys in &#x60;keys[]&#x60; array must be URL-encoded if needed.
     * @param {Array.<String>} keys Array of exchange/pair keys. Each key should be URL-encoded if needed.
     * @param {Number} page Page number (0-indexed).
     * @param {Number} pageSize Records per page.
     * @param {module:api/GunbotApi~ordersPageMultiCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
     */
    ordersPageMulti(keys: Array<string>, page: number, pageSize: number, callback: any): any;
    /**
     * Callback function to receive the result of the pairs operation.
     * @callback moduleapi/GunbotApi~pairsCallback
     * @param {String} error Error message, if any.
     * @param {module:model/PairsResponse{ data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */
    /**
     * Get Trading Pairs
     * Retrieve a list of trading pairs for a specified exchange. The &#x60;exchange&#x60; parameter should be URL-encoded if it contains special characters (e.g., &#x60;#&#x60; as &#x60;%23&#x60;).
     * @param {String} exchange Exchange name (e.g., &#x60;binance%233&#x60;).
     * @param {module:api/GunbotApi~pairsCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
     */
    pairs(exchange: string, callback: any): any;
    /**
     * Callback function to receive the result of the pairsDetailed operation.
     * @callback moduleapi/GunbotApi~pairsDetailedCallback
     * @param {String} error Error message, if any.
     * @param {module:model/PairsDetailedResponse{ data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */
    /**
     * Get Detailed Trading Pairs
     * Retrieve detailed trading pair information for a specified exchange. The &#x60;exchange&#x60; parameter should be URL-encoded if it contains special characters.
     * @param {String} exchange Exchange name (e.g., &#x60;binance%233&#x60;).
     * @param {module:api/GunbotApi~pairsDetailedCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
     */
    pairsDetailed(exchange: string, callback: any): any;
    /**
     * Callback function to receive the result of the pnlDaily operation.
     * @callback moduleapi/GunbotApi~pnlDailyCallback
     * @param {String} error Error message, if any.
     * @param {module:model/PnlDailyResponse{ data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */
    /**
     * Get Daily PNL for a Trading Key
     * Retrieve daily PNL data for a specific trading key within a time range. The &#x60;key&#x60; parameter must be URL-encoded.
     * @param {String} key URL-encoded trading key (e.g. &#x60;binance%2FUSDT-XRP&#x60;).
     * @param {Number} startTimestamp Start timestamp (ms).
     * @param {Number} endTimestamp End timestamp (ms).
     * @param {module:api/GunbotApi~pnlDailyCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
     */
    pnlDaily(key: string, startTimestamp: number, endTimestamp: number, callback: any): any;
    /**
     * Callback function to receive the result of the pnlDailyPaginated operation.
     * @callback moduleapi/GunbotApi~pnlDailyPaginatedCallback
     * @param {String} error Error message, if any.
     * @param {module:model/PnlDailyPaginatedResponse{ data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */
    /**
     * Get Paginated Daily PNL for a Trading Key
     * Retrieve paginated daily PNL data for a specific trading key. The &#x60;key&#x60; parameter must be URL-encoded.
     * @param {String} key URL-encoded trading key.
     * @param {Number} pageNum Page number.
     * @param {Number} pageSize Records per page.
     * @param {Number} endTime End timestamp (ms).
     * @param {module:api/GunbotApi~pnlDailyPaginatedCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
     */
    pnlDailyPaginated(key: string, pageNum: number, pageSize: number, endTime: number, callback: any): any;
    /**
     * Callback function to receive the result of the pnlOverview operation.
     * @callback moduleapi/GunbotApi~pnlOverviewCallback
     * @param {String} error Error message, if any.
     * @param {module:model/PnlOverviewResponse{ data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */
    /**
     * Get PNL Overview
     * Retrieve an overview of PNL data, summarized over time periods and trading pairs.
     * @param {module:model/PnlOverviewRequest} body
     * @param {module:api/GunbotApi~pnlOverviewCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
     */
    pnlOverview(body: any, callback: any): any;
    /**
     * Callback function to receive the result of the pnlSum operation.
     * @callback moduleapi/GunbotApi~pnlSumCallback
     * @param {String} error Error message, if any.
     * @param {module:model/PnlSumResponse{ data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */
    /**
     * Get PNL Sum for an Exchange Key
     * Retrieve total PNL sum and investment for an exchange key over a time range. The &#x60;exchange&#x60; parameter (exchange key) must be URL-encoded.
     * @param {String} exchange URL-encoded exchange key (e.g. &#x60;binance%2FUSDT-XRP&#x60;).
     * @param {Number} startTimestamp Start timestamp (ms).
     * @param {Number} endTimestamp End timestamp (ms).
     * @param {module:api/GunbotApi~pnlSumCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
     */
    pnlSum(exchange: string, startTimestamp: number, endTimestamp: number, callback: any): any;
    /**
     * Callback function to receive the result of the pnlTotal operation.
     * @callback moduleapi/GunbotApi~pnlTotalCallback
     * @param {String} error Error message, if any.
     * @param {module:model/PnlTotalResponse{ data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */
    /**
     * Get Total PNL for a Trading Key
     * Retrieve total PNL for a specific trading key. The &#x60;key&#x60; parameter must be URL-encoded.
     * @param {String} key URL-encoded trading key.
     * @param {module:api/GunbotApi~pnlTotalCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
     */
    pnlTotal(key: string, callback: any): any;
    /**
     * Callback function to receive the result of the systemStart operation.
     * @callback moduleapi/GunbotApi~systemStartCallback
     * @param {String} error Error message, if any.
     * @param {module:model/SystemActionResponse{ data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */
    /**
     * Start System
     * Start the Gunbot system. Returns current configuration without private keys.
     * @param {module:api/GunbotApi~systemStartCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
     */
    systemStart(callback: any): any;
    /**
     * Callback function to receive the result of the systemStop operation.
     * @callback moduleapi/GunbotApi~systemStopCallback
     * @param {String} error Error message, if any.
     * @param {module:model/SystemActionResponse{ data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */
    /**
     * Stop System
     * Stop the Gunbot system. Returns current configuration without private keys.
     * @param {module:api/GunbotApi~systemStopCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
     */
    systemStop(callback: any): any;
    /**
     * Callback function to receive the result of the time operation.
     * @callback moduleapi/GunbotApi~timeCallback
     * @param {String} error Error message, if any.
     * @param {module:model/TimeResponse{ data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */
    /**
     * Get Server Time
     * Retrieve the current server time in milliseconds since Unix epoch.
     * @param {module:api/GunbotApi~timeCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
     */
    time(callback: any): any;
    /**
     * Callback function to receive the result of the tradeBuy operation.
     * @callback moduleapi/GunbotApi~tradeBuyCallback
     * @param {String} error Error message, if any.
     * @param {module:model/TradeResponse{ data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */
    /**
     * Place Limit Buy Order
     * Place a limit buy order.
     * @param {module:model/TradeLimitOrderRequest} body
     * @param {module:api/GunbotApi~tradeBuyCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
     */
    tradeBuy(body: any, callback: any): any;
    /**
     * Callback function to receive the result of the tradeBuyMarket operation.
     * @callback moduleapi/GunbotApi~tradeBuyMarketCallback
     * @param {String} error Error message, if any.
     * @param {module:model/TradeResponse{ data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */
    /**
     * Place Market Buy Order
     * Place a market buy order.
     * @param {module:model/TradeMarketOrderRequest} body
     * @param {module:api/GunbotApi~tradeBuyMarketCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
     */
    tradeBuyMarket(body: any, callback: any): any;
    /**
     * Callback function to receive the result of the tradeBuyOco operation.
     * @callback moduleapi/GunbotApi~tradeBuyOcoCallback
     * @param {String} error Error message, if any.
     * @param {module:model/TradeResponse{ data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */
    /**
     * Place OCO Buy Order (Binance)
     * Place an OCO (One-Cancels-the-Other) buy order on Binance.
     * @param {module:model/TradeOcoRequest} body
     * @param {module:api/GunbotApi~tradeBuyOcoCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
     */
    tradeBuyOco(body: any, callback: any): any;
    /**
     * Callback function to receive the result of the tradeBuyStoplimit operation.
     * @callback moduleapi/GunbotApi~tradeBuyStoplimitCallback
     * @param {String} error Error message, if any.
     * @param {module:model/TradeResponse{ data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */
    /**
     * Place Stop-Limit Buy Order (Binance)
     * Place a stop-limit buy order on Binance.
     * @param {module:model/TradeStopLimitRequest} body
     * @param {module:api/GunbotApi~tradeBuyStoplimitCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
     */
    tradeBuyStoplimit(body: any, callback: any): any;
    /**
     * Callback function to receive the result of the tradeBuyTrailingstop operation.
     * @callback moduleapi/GunbotApi~tradeBuyTrailingstopCallback
     * @param {String} error Error message, if any.
     * @param {module:model/TradeResponse{ data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */
    /**
     * Place Trailing Stop Buy Order (Binance)
     * Place a trailing stop buy order on Binance. &#x60;price&#x60; is the reference price.
     * @param {module:model/TradeTrailingStopRequest} body
     * @param {module:api/GunbotApi~tradeBuyTrailingstopCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
     */
    tradeBuyTrailingstop(body: any, callback: any): any;
    /**
     * Callback function to receive the result of the tradeCancel operation.
     * @callback moduleapi/GunbotApi~tradeCancelCallback
     * @param {String} error Error message, if any.
     * @param {module:model/TradeResponse{ data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */
    /**
     * Cancel Order
     * Cancel an existing order.
     * @param {module:model/TradeCancelRequest} body
     * @param {module:api/GunbotApi~tradeCancelCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
     */
    tradeCancel(body: any, callback: any): any;
    /**
     * Callback function to receive the result of the tradeClose operation.
     * @callback moduleapi/GunbotApi~tradeCloseCallback
     * @param {String} error Error message, if any.
     * @param {module:model/TradeResponse{ data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */
    /**
     * Close Position with Limit Price (Bybit Futures)
     * Close an open position at a specified limit price on Bybit (futures).
     * @param {module:model/TradeCloseLimitRequest} body
     * @param {module:api/GunbotApi~tradeCloseCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
     */
    tradeClose(body: any, callback: any): any;
    /**
     * Callback function to receive the result of the tradeCloseMarket operation.
     * @callback moduleapi/GunbotApi~tradeCloseMarketCallback
     * @param {String} error Error message, if any.
     * @param {module:model/TradeResponse{ data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */
    /**
     * Close Position at Market Price (Bybit Futures)
     * Close an open position at the current market price on Bybit (futures).
     * @param {module:model/TradeCloseMarketRequest} body
     * @param {module:api/GunbotApi~tradeCloseMarketCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
     */
    tradeCloseMarket(body: any, callback: any): any;
    /**
     * Callback function to receive the result of the tradeSell operation.
     * @callback moduleapi/GunbotApi~tradeSellCallback
     * @param {String} error Error message, if any.
     * @param {module:model/TradeResponse{ data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */
    /**
     * Place Limit Sell Order
     * Place a limit sell order.
     * @param {module:model/TradeLimitOrderRequest} body
     * @param {module:api/GunbotApi~tradeSellCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
     */
    tradeSell(body: any, callback: any): any;
    /**
     * Callback function to receive the result of the tradeSellMarket operation.
     * @callback moduleapi/GunbotApi~tradeSellMarketCallback
     * @param {String} error Error message, if any.
     * @param {module:model/TradeResponse{ data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */
    /**
     * Place Market Sell Order
     * Place a market sell order.
     * @param {module:model/TradeMarketOrderRequest} body
     * @param {module:api/GunbotApi~tradeSellMarketCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
     */
    tradeSellMarket(body: any, callback: any): any;
    /**
     * Callback function to receive the result of the tradeSellOco operation.
     * @callback moduleapi/GunbotApi~tradeSellOcoCallback
     * @param {String} error Error message, if any.
     * @param {module:model/TradeResponse{ data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */
    /**
     * Place OCO Sell Order (Binance)
     * Place an OCO (One-Cancels-the-Other) sell order on Binance.
     * @param {module:model/TradeOcoRequest} body
     * @param {module:api/GunbotApi~tradeSellOcoCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
     */
    tradeSellOco(body: any, callback: any): any;
    /**
     * Callback function to receive the result of the tradeSellStoplimit operation.
     * @callback moduleapi/GunbotApi~tradeSellStoplimitCallback
     * @param {String} error Error message, if any.
     * @param {module:model/TradeResponse{ data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */
    /**
     * Place Stop-Limit Sell Order (Binance)
     * Place a stop-limit sell order on Binance.
     * @param {module:model/TradeStopLimitRequest} body
     * @param {module:api/GunbotApi~tradeSellStoplimitCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
     */
    tradeSellStoplimit(body: any, callback: any): any;
    /**
     * Callback function to receive the result of the tradeSellTrailingstop operation.
     * @callback moduleapi/GunbotApi~tradeSellTrailingstopCallback
     * @param {String} error Error message, if any.
     * @param {module:model/TradeResponse{ data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */
    /**
     * Place Trailing Stop Sell Order (Binance)
     * Place a trailing stop sell order on Binance. &#x60;price&#x60; is the reference price.
     * @param {module:model/TradeTrailingStopRequest} body
     * @param {module:api/GunbotApi~tradeSellTrailingstopCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
     */
    tradeSellTrailingstop(body: any, callback: any): any;
}
