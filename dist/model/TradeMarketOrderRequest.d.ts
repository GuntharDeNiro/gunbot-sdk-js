/**
 * The TradeMarketOrderRequest model module.
 * @module model/TradeMarketOrderRequest
 * @version v1
 */
export default class TradeMarketOrderRequest {
    /**
     * Constructs a <code>TradeMarketOrderRequest</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/TradeMarketOrderRequest} obj Optional instance to populate.
     * @return {module:model/TradeMarketOrderRequest} The populated <code>TradeMarketOrderRequest</code> instance.
     */
    static constructFromObject(data: any, obj: any): any;
    /**
     * Constructs a new <code>TradeMarketOrderRequest</code>.
     * @alias module:model/TradeMarketOrderRequest
     * @class
     * @param data {module:model/TradeMarketOrderData}
     */
    constructor(data: any);
    data: any;
}
