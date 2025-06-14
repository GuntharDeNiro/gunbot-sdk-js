/**
 * The PnlOverviewRequest model module.
 * @module model/PnlOverviewRequest
 * @version v1
 */
export default class PnlOverviewRequest {
    /**
     * Constructs a <code>PnlOverviewRequest</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/PnlOverviewRequest} obj Optional instance to populate.
     * @return {module:model/PnlOverviewRequest} The populated <code>PnlOverviewRequest</code> instance.
     */
    static constructFromObject(data: any, obj: any): any;
    /**
     * Constructs a new <code>PnlOverviewRequest</code>.
     * @alias module:model/PnlOverviewRequest
     * @class
     * @param timezone {String} IANA timezone string (e.g., `Europe/Amsterdam`).
     * @param keys {Array.<String>} Array of trading keys (e.g., `['binance/USDT-BTC', 'binance/USDT-XRP']`). Use `['All']` for all results.
     */
    constructor(timezone: string, keys: Array<string>);
    timezone: string;
    keys: string[];
    /**
     * @member {module:model/PnlOverviewRequestDateRange} dateRange
     */
    dateRange: any;
}
