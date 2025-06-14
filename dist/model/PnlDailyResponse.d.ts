/**
 * The PnlDailyResponse model module.
 * @module model/PnlDailyResponse
 * @version v1
 */
export default class PnlDailyResponse {
    /**
     * Constructs a <code>PnlDailyResponse</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/PnlDailyResponse} obj Optional instance to populate.
     * @return {module:model/PnlDailyResponse} The populated <code>PnlDailyResponse</code> instance.
     */
    static constructFromObject(data: any, obj: any): any;
    /**
     * @member {Array.<Object.<String, Object>>} dateRangeDailyHistory
     */
    dateRangeDailyHistory: any;
    /**
     * @member {Number} unmatchedBaseValuePerDateRange
     */
    unmatchedBaseValuePerDateRange: any;
}
