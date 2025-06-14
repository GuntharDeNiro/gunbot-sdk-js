/**
 * The MarketOrderbookResponse model module.
 * @module model/MarketOrderbookResponse
 * @version v1
 */
export default class MarketOrderbookResponse {
    /**
     * Constructs a <code>MarketOrderbookResponse</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/MarketOrderbookResponse} obj Optional instance to populate.
     * @return {module:model/MarketOrderbookResponse} The populated <code>MarketOrderbookResponse</code> instance.
     */
    static constructFromObject(data: any, obj: any): any;
    /**
     * @member {module:model/MarketOrderbookData} data
     */
    data: any;
}
