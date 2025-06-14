/**
 * The TradeLimitOrderData model module.
 * @module model/TradeLimitOrderData
 * @version v1
 */
export default class TradeLimitOrderData {
    /**
     * Constructs a <code>TradeLimitOrderData</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/TradeLimitOrderData} obj Optional instance to populate.
     * @return {module:model/TradeLimitOrderData} The populated <code>TradeLimitOrderData</code> instance.
     */
    static constructFromObject(data: any, obj: any): any;
    /**
     * Constructs a new <code>TradeLimitOrderData</code>.
     * @alias module:model/TradeLimitOrderData
     * @class
     * @param exch {String}
     * @param pair {String}
     * @param amt {Number}
     * @param price {Number}
     */
    constructor(exch: string, pair: string, amt: number, price: number);
    exch: string;
    pair: string;
    amt: number;
    price: number;
}
