/**
 * The TradeCloseLimitRequest model module.
 * @module model/TradeCloseLimitRequest
 * @version v1
 */
export default class TradeCloseLimitRequest {
    /**
     * Constructs a <code>TradeCloseLimitRequest</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/TradeCloseLimitRequest} obj Optional instance to populate.
     * @return {module:model/TradeCloseLimitRequest} The populated <code>TradeCloseLimitRequest</code> instance.
     */
    static constructFromObject(data: any, obj: any): any;
    /**
     * Constructs a new <code>TradeCloseLimitRequest</code>.
     * @alias module:model/TradeCloseLimitRequest
     * @class
     * @param data {module:model/TradeCloseLimitData}
     */
    constructor(data: any);
    data: any;
}
