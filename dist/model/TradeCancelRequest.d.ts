/**
 * The TradeCancelRequest model module.
 * @module model/TradeCancelRequest
 * @version v1
 */
export default class TradeCancelRequest {
    /**
     * Constructs a <code>TradeCancelRequest</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/TradeCancelRequest} obj Optional instance to populate.
     * @return {module:model/TradeCancelRequest} The populated <code>TradeCancelRequest</code> instance.
     */
    static constructFromObject(data: any, obj: any): any;
    /**
     * Constructs a new <code>TradeCancelRequest</code>.
     * @alias module:model/TradeCancelRequest
     * @class
     * @param data {module:model/TradeCancelData}
     */
    constructor(data: any);
    data: any;
}
