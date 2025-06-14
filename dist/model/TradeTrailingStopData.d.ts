/**
 * The TradeTrailingStopData model module.
 * @module model/TradeTrailingStopData
 * @version v1
 */
export default class TradeTrailingStopData {
    /**
     * Constructs a <code>TradeTrailingStopData</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/TradeTrailingStopData} obj Optional instance to populate.
     * @return {module:model/TradeTrailingStopData} The populated <code>TradeTrailingStopData</code> instance.
     */
    static constructFromObject(data: any, obj: any): any;
    /**
     * Constructs a new <code>TradeTrailingStopData</code>.
     * @alias module:model/TradeTrailingStopData
     * @class
     * @param exch {String}
     * @param pair {String}
     * @param amt {Number}
     * @param price {Number} Reference price for the order.
     * @param stopPrice {Number} Trailing stop price.
     */
    constructor(exch: string, pair: string, amt: number, price: number, stopPrice: number);
    exch: string;
    pair: string;
    amt: number;
    price: number;
    stopPrice: number;
}
