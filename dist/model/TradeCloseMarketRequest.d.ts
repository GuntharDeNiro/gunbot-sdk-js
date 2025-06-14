/**
 * The TradeCloseMarketRequest model module.
 * @module model/TradeCloseMarketRequest
 * @version v1
 */
export default class TradeCloseMarketRequest {
    /**
     * Constructs a <code>TradeCloseMarketRequest</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/TradeCloseMarketRequest} obj Optional instance to populate.
     * @return {module:model/TradeCloseMarketRequest} The populated <code>TradeCloseMarketRequest</code> instance.
     */
    static constructFromObject(data: any, obj: any): any;
    /**
     * Constructs a new <code>TradeCloseMarketRequest</code>.
     * @alias module:model/TradeCloseMarketRequest
     * @class
     * @param data {module:model/TradeCloseMarketData}
     */
    constructor(data: any);
    data: any;
}
