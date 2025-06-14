/**
 * The CoreMemRawRequest model module.
 * @module model/CoreMemRawRequest
 * @version v1
 */
export default class CoreMemRawRequest {
    /**
     * Constructs a <code>CoreMemRawRequest</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/CoreMemRawRequest} obj Optional instance to populate.
     * @return {module:model/CoreMemRawRequest} The populated <code>CoreMemRawRequest</code> instance.
     */
    static constructFromObject(data: any, obj: any): any;
    /**
     * Constructs a new <code>CoreMemRawRequest</code>.
     * @alias module:model/CoreMemRawRequest
     * @class
     * @param exchange {String}
     * @param pair {String}
     */
    constructor(exchange: string, pair: string);
    exchange: string;
    pair: string;
    /**
     * Optional array of elements to filter. If omitted, returns all.
     * @member {Array.<String>} elements
     */
    elements: any;
}
