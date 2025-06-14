/**
 * The TradeCloseMarketData model module.
 * @module model/TradeCloseMarketData
 * @version v1
 */
export default class TradeCloseMarketData {
    /**
     * Constructs a <code>TradeCloseMarketData</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/TradeCloseMarketData} obj Optional instance to populate.
     * @return {module:model/TradeCloseMarketData} The populated <code>TradeCloseMarketData</code> instance.
     */
    static constructFromObject(data: any, obj: any): any;
    /**
     * Constructs a new <code>TradeCloseMarketData</code>.
     * @alias module:model/TradeCloseMarketData
     * @class
     * @param exch {String}
     * @param pair {String}
     * @param amt {Number}
     */
    constructor(exch: string, pair: string, amt: number);
    exch: string;
    pair: string;
    amt: number;
}
