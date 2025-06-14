/**
 * The BalanceItem model module.
 * @module model/BalanceItem
 * @version v1
 */
export default class BalanceItem {
    /**
     * Constructs a <code>BalanceItem</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/BalanceItem} obj Optional instance to populate.
     * @return {module:model/BalanceItem} The populated <code>BalanceItem</code> instance.
     */
    static constructFromObject(data: any, obj: any): any;
    /**
     * @member {String} asset
     */
    asset: any;
    /**
     * @member {String} exchange
     */
    exchange: any;
    /**
     * Available quantity, as a string.
     * @member {String} availableQty
     */
    availableQty: any;
    /**
     * Quantity on order, as a string.
     * @member {String} onOrder
     */
    onOrder: any;
}
