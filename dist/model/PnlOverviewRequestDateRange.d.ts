/**
 * The PnlOverviewRequestDateRange model module.
 * @module model/PnlOverviewRequestDateRange
 * @version v1
 */
export default class PnlOverviewRequestDateRange {
    /**
     * Constructs a <code>PnlOverviewRequestDateRange</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/PnlOverviewRequestDateRange} obj Optional instance to populate.
     * @return {module:model/PnlOverviewRequestDateRange} The populated <code>PnlOverviewRequestDateRange</code> instance.
     */
    static constructFromObject(data: any, obj: any): any;
    /**
     * Start timestamp in milliseconds.
     * @member {Number} startDate
     */
    startDate: any;
    /**
     * End timestamp in milliseconds.
     * @member {Number} endDate
     */
    endDate: any;
}
