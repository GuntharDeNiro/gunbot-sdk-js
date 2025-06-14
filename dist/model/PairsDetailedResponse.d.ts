/**
 * The PairsDetailedResponse model module.
 * @module model/PairsDetailedResponse
 * @version v1
 */
export default class PairsDetailedResponse {
    /**
     * Constructs a <code>PairsDetailedResponse</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/PairsDetailedResponse} obj Optional instance to populate.
     * @return {module:model/PairsDetailedResponse} The populated <code>PairsDetailedResponse</code> instance.
     */
    static constructFromObject(data: any, obj: any): any;
    /**
     * @member {String} status
     */
    status: any;
    /**
     * An object where keys are base currencies (e.g., \"BTC\") and values are arrays of pair details.
     * @member {Object.<String, Array.<module:model/PairDetailItem>>} pairList
     */
    pairList: any;
}
