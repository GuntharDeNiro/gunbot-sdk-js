/**
 * The SuccessStatusResponse model module.
 * @module model/SuccessStatusResponse
 * @version v1
 */
export default class SuccessStatusResponse {
    /**
     * Constructs a <code>SuccessStatusResponse</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/SuccessStatusResponse} obj Optional instance to populate.
     * @return {module:model/SuccessStatusResponse} The populated <code>SuccessStatusResponse</code> instance.
     */
    static constructFromObject(data: any, obj: any): any;
    /**
     * @member {String} status
     */
    status: any;
}
