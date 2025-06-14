/**
 * The ConfigPairRemoveRequest model module.
 * @module model/ConfigPairRemoveRequest
 * @version v1
 */
export default class ConfigPairRemoveRequest {
    /**
     * Constructs a <code>ConfigPairRemoveRequest</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/ConfigPairRemoveRequest} obj Optional instance to populate.
     * @return {module:model/ConfigPairRemoveRequest} The populated <code>ConfigPairRemoveRequest</code> instance.
     */
    static constructFromObject(data: any, obj: any): any;
    /**
     * Constructs a new <code>ConfigPairRemoveRequest</code>.
     * @alias module:model/ConfigPairRemoveRequest
     * @class
     * @param pair {String} The trading pair to remove (e.g., `USDT-PEPE`).
     * @param exchange {String} The exchange name (e.g., `binance`).
     */
    constructor(pair: string, exchange: string);
    pair: string;
    exchange: string;
}
