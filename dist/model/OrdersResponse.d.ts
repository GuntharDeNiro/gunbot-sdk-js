/**
 * The OrdersResponse model module.
 * @module model/OrdersResponse
 * @version v1
 */
export default class OrdersResponse {
    /**
     * Constructs a <code>OrdersResponse</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/OrdersResponse} obj Optional instance to populate.
     * @return {module:model/OrdersResponse} The populated <code>OrdersResponse</code> instance.
     */
    static constructFromObject(data: any, obj: any): any;
    /**
     * @member {Array.<module:model/OrderItem>} data
     */
    data: any;
}
