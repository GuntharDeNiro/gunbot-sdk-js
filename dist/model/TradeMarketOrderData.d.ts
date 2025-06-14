/**
 * The TradeMarketOrderData model module.
 * @module model/TradeMarketOrderData
 * @version v1
 */
export default class TradeMarketOrderData {
    /**
     * Constructs a <code>TradeMarketOrderData</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/TradeMarketOrderData} obj Optional instance to populate.
     * @return {module:model/TradeMarketOrderData} The populated <code>TradeMarketOrderData</code> instance.
     */
    static constructFromObject(data: any, obj: any): any;
    /**
     * Constructs a new <code>TradeMarketOrderData</code>.
     * @alias module:model/TradeMarketOrderData
     * @class
     * @param exch {String}
     * @param pair {String}
     * @param amt {Number}
     */
    constructor(exch: string, pair: string, amt: number);
    exch: string;
    pair: string;
    amt: number;
    /**
     * Optional for market orders; defaults to market price.
     * @member {Number} price
     */
    price: any;
}
