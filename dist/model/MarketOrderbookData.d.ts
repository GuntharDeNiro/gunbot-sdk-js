/**
 * The MarketOrderbookData model module.
 * @module model/MarketOrderbookData
 * @version v1
 */
export default class MarketOrderbookData {
    /**
     * Constructs a <code>MarketOrderbookData</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/MarketOrderbookData} obj Optional instance to populate.
     * @return {module:model/MarketOrderbookData} The populated <code>MarketOrderbookData</code> instance.
     */
    static constructFromObject(data: any, obj: any): any;
    /**
     * @member {Array.<module:model/OrderbookLevel>} ask
     */
    ask: any;
    /**
     * @member {Array.<module:model/OrderbookLevel>} bid
     */
    bid: any;
}
