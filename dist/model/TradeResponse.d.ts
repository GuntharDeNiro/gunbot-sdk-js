/**
 * The TradeResponse model module.
 * @module model/TradeResponse
 * @version v1
 */
export default class TradeResponse {
    /**
     * Constructs a <code>TradeResponse</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/TradeResponse} obj Optional instance to populate.
     * @return {module:model/TradeResponse} The populated <code>TradeResponse</code> instance.
     */
    static constructFromObject(data: any, obj: any): any;
    /**
     * @member {String} status
     */
    status: any;
    /**
     * @member {String} message
     */
    message: any;
}
