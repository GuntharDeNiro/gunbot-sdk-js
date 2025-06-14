/**
 * The TradeLimitOrderRequest model module.
 * @module model/TradeLimitOrderRequest
 * @version v1
 */
export default class TradeLimitOrderRequest {
    /**
     * Constructs a <code>TradeLimitOrderRequest</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/TradeLimitOrderRequest} obj Optional instance to populate.
     * @return {module:model/TradeLimitOrderRequest} The populated <code>TradeLimitOrderRequest</code> instance.
     */
    static constructFromObject(data: any, obj: any): any;
    /**
     * Constructs a new <code>TradeLimitOrderRequest</code>.
     * @alias module:model/TradeLimitOrderRequest
     * @class
     * @param data {module:model/TradeLimitOrderData}
     */
    constructor(data: any);
    data: any;
}
