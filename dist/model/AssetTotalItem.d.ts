/**
 * The AssetTotalItem model module.
 * @module model/AssetTotalItem
 * @version v1
 */
export default class AssetTotalItem {
    /**
     * Constructs a <code>AssetTotalItem</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/AssetTotalItem} obj Optional instance to populate.
     * @return {module:model/AssetTotalItem} The populated <code>AssetTotalItem</code> instance.
     */
    static constructFromObject(data: any, obj: any): any;
    /**
     * @member {Number} id
     */
    id: any;
    /**
     * @member {String} baseKey
     */
    baseKey: any;
    /**
     * @member {Number} amount
     */
    amount: any;
    /**
     * Timestamp in milliseconds since Unix epoch.
     * @member {Number} timestamp
     */
    timestamp: any;
}
