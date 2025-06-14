/**
 * The TradeOcoRequest model module.
 * @module model/TradeOcoRequest
 * @version v1
 */
export default class TradeOcoRequest {
    /**
     * Constructs a <code>TradeOcoRequest</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/TradeOcoRequest} obj Optional instance to populate.
     * @return {module:model/TradeOcoRequest} The populated <code>TradeOcoRequest</code> instance.
     */
    static constructFromObject(data: any, obj: any): any;
    /**
     * Constructs a new <code>TradeOcoRequest</code>.
     * @alias module:model/TradeOcoRequest
     * @class
     * @param data {module:model/TradeOcoData}
     */
    constructor(data: any);
    data: any;
}
