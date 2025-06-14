/**
 * The PnlDailyPaginatedResponse model module.
 * @module model/PnlDailyPaginatedResponse
 * @version v1
 */
export default class PnlDailyPaginatedResponse {
    /**
     * Constructs a <code>PnlDailyPaginatedResponse</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/PnlDailyPaginatedResponse} obj Optional instance to populate.
     * @return {module:model/PnlDailyPaginatedResponse} The populated <code>PnlDailyPaginatedResponse</code> instance.
     */
    static constructFromObject(data: any, obj: any): any;
    /**
     * @member {Number} totalSize
     */
    totalSize: any;
    /**
     * @member {Array.<Object.<String, Object>>} data
     */
    data: any;
}
