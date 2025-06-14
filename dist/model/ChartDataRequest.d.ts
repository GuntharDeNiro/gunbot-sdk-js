/**
 * The ChartDataRequest model module.
 * @module model/ChartDataRequest
 * @version v1
 */
export default class ChartDataRequest {
    /**
     * Constructs a <code>ChartDataRequest</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/ChartDataRequest} obj Optional instance to populate.
     * @return {module:model/ChartDataRequest} The populated <code>ChartDataRequest</code> instance.
     */
    static constructFromObject(data: any, obj: any): any;
    /**
     * Constructs a new <code>ChartDataRequest</code>.
     * @alias module:model/ChartDataRequest
     * @class
     * @param exchange {String}
     * @param pair {String}
     */
    constructor(exchange: string, pair: string);
    exchange: string;
    pair: string;
}
