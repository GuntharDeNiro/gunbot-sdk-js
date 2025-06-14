/**
 * The CoreMemSingleRequest model module.
 * @module model/CoreMemSingleRequest
 * @version v1
 */
export default class CoreMemSingleRequest {
    /**
     * Constructs a <code>CoreMemSingleRequest</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/CoreMemSingleRequest} obj Optional instance to populate.
     * @return {module:model/CoreMemSingleRequest} The populated <code>CoreMemSingleRequest</code> instance.
     */
    static constructFromObject(data: any, obj: any): any;
    /**
     * Constructs a new <code>CoreMemSingleRequest</code>.
     * @alias module:model/CoreMemSingleRequest
     * @class
     * @param exchange {String}
     * @param pair {String}
     */
    constructor(exchange: string, pair: string);
    exchange: string;
    pair: string;
}
