/**
 * The MarketCandlesResponse model module.
 * @module model/MarketCandlesResponse
 * @version v1
 */
export default class MarketCandlesResponse {
    /**
     * Constructs a <code>MarketCandlesResponse</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/MarketCandlesResponse} obj Optional instance to populate.
     * @return {module:model/MarketCandlesResponse} The populated <code>MarketCandlesResponse</code> instance.
     */
    static constructFromObject(data: any, obj: any): any;
    /**
     * @member {module:model/OHLCVData} data
     */
    data: any;
}
