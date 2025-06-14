/**
 * The FileStateContentResponse model module.
 * @module model/FileStateContentResponse
 * @version v1
 */
export default class FileStateContentResponse {
    /**
     * Constructs a <code>FileStateContentResponse</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/FileStateContentResponse} obj Optional instance to populate.
     * @return {module:model/FileStateContentResponse} The populated <code>FileStateContentResponse</code> instance.
     */
    static constructFromObject(data: any, obj: any): any;
    /**
     * @member {Array.<Object.<String, Object>>} orders
     */
    orders: any;
    /**
     * @member {Object.<String, Object>} balances
     */
    balances: any;
}
