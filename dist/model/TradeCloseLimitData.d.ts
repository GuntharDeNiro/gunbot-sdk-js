/**
 * The TradeCloseLimitData model module.
 * @module model/TradeCloseLimitData
 * @version v1
 */
export default class TradeCloseLimitData {
    /**
     * Constructs a <code>TradeCloseLimitData</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/TradeCloseLimitData} obj Optional instance to populate.
     * @return {module:model/TradeCloseLimitData} The populated <code>TradeCloseLimitData</code> instance.
     */
    static constructFromObject(data: any, obj: any): any;
    /**
     * Constructs a new <code>TradeCloseLimitData</code>.
     * @alias module:model/TradeCloseLimitData
     * @class
     * @param exch {String}
     * @param pair {String} Pair symbol, often includes LONG/SHORT for futures.
     * @param amt {Number}
     * @param price {Number}
     */
    constructor(exch: string, pair: string, amt: number, price: number);
    exch: string;
    pair: string;
    amt: number;
    price: number;
}
