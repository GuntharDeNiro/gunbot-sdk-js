/**
 * The ConfigPairAddRequest model module.
 * @module model/ConfigPairAddRequest
 * @version v1
 */
export default class ConfigPairAddRequest {
    /**
     * Constructs a <code>ConfigPairAddRequest</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/ConfigPairAddRequest} obj Optional instance to populate.
     * @return {module:model/ConfigPairAddRequest} The populated <code>ConfigPairAddRequest</code> instance.
     */
    static constructFromObject(data: any, obj: any): any;
    /**
     * Constructs a new <code>ConfigPairAddRequest</code>.
     * @alias module:model/ConfigPairAddRequest
     * @class
     * @param pair {String} The trading pair to add (e.g., `USDT-PEPE`).
     * @param exchange {String} The exchange name (e.g., `binance`).
     */
    constructor(pair: string, exchange: string);
    pair: string;
    exchange: string;
    /**
     * (Optional) Specific settings for the trading pair.
     * @member {Object.<String, Object>} settings
     */
    settings: any;
}
