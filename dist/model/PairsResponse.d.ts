/**
 * The PairsResponse model module.
 * @module model/PairsResponse
 * @version v1
 */
export default class PairsResponse {
    /**
     * Constructs a <code>PairsResponse</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/PairsResponse} obj Optional instance to populate.
     * @return {module:model/PairsResponse} The populated <code>PairsResponse</code> instance.
     */
    static constructFromObject(data: any, obj: any): any;
    /**
     * @member {String} status
     */
    status: any;
    /**
     * @member {Array.<String>} pairList
     */
    pairList: any;
}
