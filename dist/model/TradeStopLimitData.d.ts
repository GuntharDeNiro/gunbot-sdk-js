/**
 * The TradeStopLimitData model module.
 * @module model/TradeStopLimitData
 * @version v1
 */
export default class TradeStopLimitData {
    /**
     * Constructs a <code>TradeStopLimitData</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/TradeStopLimitData} obj Optional instance to populate.
     * @return {module:model/TradeStopLimitData} The populated <code>TradeStopLimitData</code> instance.
     */
    static constructFromObject(data: any, obj: any): any;
    /**
     * Constructs a new <code>TradeStopLimitData</code>.
     * @alias module:model/TradeStopLimitData
     * @class
     * @param exch {String}
     * @param pair {String}
     * @param amt {Number}
     * @param stopPrice {Number} Price at which the limit order is triggered.
     * @param limitPrice {Number} Limit price used once stopPrice is reached.
     */
    constructor(exch: string, pair: string, amt: number, stopPrice: number, limitPrice: number);
    exch: string;
    pair: string;
    amt: number;
    stopPrice: number;
    limitPrice: number;
}
