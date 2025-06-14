/**
 * The ChartMarkItem model module.
 * @module model/ChartMarkItem
 * @version v1
 */
export default class ChartMarkItem {
    /**
     * Constructs a <code>ChartMarkItem</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/ChartMarkItem} obj Optional instance to populate.
     * @return {module:model/ChartMarkItem} The populated <code>ChartMarkItem</code> instance.
     */
    static constructFromObject(data: any, obj: any): any;
    /**
     * @member {String} exchange
     */
    exchange: any;
    /**
     * @member {String} pair
     */
    pair: any;
    /**
     * @member {String} id
     */
    id: any;
    /**
     * @member {Number} time
     */
    time: any;
    /**
     * @member {String} color
     */
    color: any;
    /**
     * @member {String} label
     */
    label: any;
    /**
     * @member {Array.<String>} tooltip
     */
    tooltip: any;
}
