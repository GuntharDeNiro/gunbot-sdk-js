/**
 * The OrdersDayResponse model module.
 * @module model/OrdersDayResponse
 * @version v1
 */
export default class OrdersDayResponse {
    /**
     * Constructs a <code>OrdersDayResponse</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/OrdersDayResponse} obj Optional instance to populate.
     * @return {module:model/OrdersDayResponse} The populated <code>OrdersDayResponse</code> instance.
     */
    static constructFromObject(data: any, obj: any): any;
    /**
     * @member {Array.<Object.<String, Object>>} days
     */
    days: any;
    /**
     * @member {Array.<Object.<String, Object>>} orders
     */
    orders: any;
    /**
     * @member {Array.<Object.<String, Object>>} closeOrders
     */
    closeOrders: any;
}
