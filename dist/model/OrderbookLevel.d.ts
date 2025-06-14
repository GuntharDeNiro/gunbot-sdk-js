/**
 * The OrderbookLevel model module.
 * @module model/OrderbookLevel
 * @version v1
 */
export default class OrderbookLevel extends Array<any> {
    /**
     * Constructs a <code>OrderbookLevel</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/OrderbookLevel} obj Optional instance to populate.
     * @return {module:model/OrderbookLevel} The populated <code>OrderbookLevel</code> instance.
     */
    static constructFromObject(data: any, obj: any): any;
    /**
     * Constructs a new <code>OrderbookLevel</code>.
     * @alias module:model/OrderbookLevel
     * @class
     * @extends Array
     */
    constructor();
}
