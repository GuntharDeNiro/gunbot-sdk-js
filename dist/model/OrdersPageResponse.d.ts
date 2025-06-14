/**
 * The OrdersPageResponse model module.
 * @module model/OrdersPageResponse
 * @version v1
 */
export default class OrdersPageResponse {
    /**
     * Constructs a <code>OrdersPageResponse</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/OrdersPageResponse} obj Optional instance to populate.
     * @return {module:model/OrdersPageResponse} The populated <code>OrdersPageResponse</code> instance.
     */
    static constructFromObject(data: any, obj: any): any;
    /**
     * @member {Number} total
     */
    total: any;
    /**
     * @member {Number} page
     */
    page: any;
    /**
     * @member {Array.<Object.<String, Object>>} data
     */
    data: any;
}
