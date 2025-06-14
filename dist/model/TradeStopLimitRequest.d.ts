/**
 * The TradeStopLimitRequest model module.
 * @module model/TradeStopLimitRequest
 * @version v1
 */
export default class TradeStopLimitRequest {
    /**
     * Constructs a <code>TradeStopLimitRequest</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/TradeStopLimitRequest} obj Optional instance to populate.
     * @return {module:model/TradeStopLimitRequest} The populated <code>TradeStopLimitRequest</code> instance.
     */
    static constructFromObject(data: any, obj: any): any;
    /**
     * Constructs a new <code>TradeStopLimitRequest</code>.
     * @alias module:model/TradeStopLimitRequest
     * @class
     * @param data {module:model/TradeStopLimitData}
     */
    constructor(data: any);
    data: any;
}
