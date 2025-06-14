/**
 * The PairDetailItem model module.
 * @module model/PairDetailItem
 * @version v1
 */
export default class PairDetailItem {
    /**
     * Constructs a <code>PairDetailItem</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/PairDetailItem} obj Optional instance to populate.
     * @return {module:model/PairDetailItem} The populated <code>PairDetailItem</code> instance.
     */
    static constructFromObject(data: any, obj: any): any;
    /**
     * @member {String} pairName
     */
    pairName: any;
    /**
     * @member {Number} volume
     */
    volume: any;
    /**
     * Lowest price, as a string.
     * @member {String} low
     */
    low: any;
    /**
     * Highest price, as a string.
     * @member {String} high
     */
    high: any;
    /**
     * Price change percentage, as a string.
     * @member {String} change
     */
    change: any;
}
