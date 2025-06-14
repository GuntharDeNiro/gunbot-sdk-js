/**
 * The OrdersPageMultiResponse model module.
 * @module model/OrdersPageMultiResponse
 * @version v1
 */
export default class OrdersPageMultiResponse {
    /**
     * Constructs a <code>OrdersPageMultiResponse</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/OrdersPageMultiResponse} obj Optional instance to populate.
     * @return {module:model/OrdersPageMultiResponse} The populated <code>OrdersPageMultiResponse</code> instance.
     */
    static constructFromObject(data: any, obj: any): any;
    /**
     * @member {Number} total
     */
    total: any;
    /**
     * @member {Number} totalCount
     */
    totalCount: any;
    /**
     * @member {Number} page
     */
    page: any;
    /**
     * @member {Array.<Object.<String, Object>>} data
     */
    data: any;
}
