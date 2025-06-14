/**
 * The OrderItem model module.
 * @module model/OrderItem
 * @version v1
 */
declare class OrderItem {
    /**
     * Constructs a <code>OrderItem</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/OrderItem} obj Optional instance to populate.
     * @return {module:model/OrderItem} The populated <code>OrderItem</code> instance.
     */
    static constructFromObject(data: any, obj: any): any;
    /**
     * @member {Number} time
     */
    time: any;
    /**
     * @member {String} pair
     */
    pair: any;
    /**
     * @member {module:model/OrderItem.TypeEnum} type
     */
    type: any;
    /**
     * @member {Number} rate
     */
    rate: any;
    /**
     * @member {Number} amount
     */
    amount: any;
    /**
     * @member {Object} id
     */
    id: any;
    /**
     * @member {Number} cost
     */
    cost: any;
    /**
     * @member {Boolean} toCancel
     */
    toCancel: any;
    /**
     * @member {Number} fees
     */
    fees: any;
    /**
     * @member {Number} baseValue
     */
    baseValue: any;
    /**
     * @member {Number} costProceed
     */
    costProceed: any;
    /**
     * @member {Number} averagePrice
     */
    averagePrice: any;
    /**
     * @member {Number} pnlPrice
     */
    pnlPrice: any;
    /**
     * @member {Number} balance
     */
    balance: any;
    /**
     * @member {Number} baseBalance
     */
    baseBalance: any;
    /**
     * @member {Number} inventoryCost
     */
    inventoryCost: any;
    /**
     * @member {Number} ABP
     */
    ABP: any;
    /**
     * @member {Number} pnl
     */
    pnl: any;
}
declare namespace OrderItem {
    namespace TypeEnum {
        let buy: string;
        let sell: string;
    }
    /**
     * *
     */
    type TypeEnum = string;
}
export default OrderItem;
