/**
 * The TradeTrailingStopRequest model module.
 * @module model/TradeTrailingStopRequest
 * @version v1
 */
export default class TradeTrailingStopRequest {
    /**
     * Constructs a <code>TradeTrailingStopRequest</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/TradeTrailingStopRequest} obj Optional instance to populate.
     * @return {module:model/TradeTrailingStopRequest} The populated <code>TradeTrailingStopRequest</code> instance.
     */
    static constructFromObject(data: any, obj: any): any;
    /**
     * Constructs a new <code>TradeTrailingStopRequest</code>.
     * @alias module:model/TradeTrailingStopRequest
     * @class
     * @param data {module:model/TradeTrailingStopData}
     */
    constructor(data: any);
    data: any;
}
