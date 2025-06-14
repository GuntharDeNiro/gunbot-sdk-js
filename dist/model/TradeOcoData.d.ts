/**
 * The TradeOcoData model module.
 * @module model/TradeOcoData
 * @version v1
 */
export default class TradeOcoData {
    /**
     * Constructs a <code>TradeOcoData</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/TradeOcoData} obj Optional instance to populate.
     * @return {module:model/TradeOcoData} The populated <code>TradeOcoData</code> instance.
     */
    static constructFromObject(data: any, obj: any): any;
    /**
     * Constructs a new <code>TradeOcoData</code>.
     * @alias module:model/TradeOcoData
     * @class
     * @param exch {String}
     * @param pair {String}
     * @param amt {Number}
     * @param price {Number} Limit price for the OCO order part.
     * @param stopPrice {Number} Stop price for the stop-limit part.
     * @param limit {Number} Limit price used after stopPrice is triggered for the stop-limit part.
     */
    constructor(exch: string, pair: string, amt: number, price: number, stopPrice: number, limit: number);
    exch: string;
    pair: string;
    amt: number;
    price: number;
    stopPrice: number;
    limit: number;
}
