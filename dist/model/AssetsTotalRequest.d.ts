/**
 * The AssetsTotalRequest model module.
 * @module model/AssetsTotalRequest
 * @version v1
 */
export default class AssetsTotalRequest {
    /**
     * Constructs a <code>AssetsTotalRequest</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/AssetsTotalRequest} obj Optional instance to populate.
     * @return {module:model/AssetsTotalRequest} The populated <code>AssetsTotalRequest</code> instance.
     */
    static constructFromObject(data: any, obj: any): any;
    /**
     * Constructs a new <code>AssetsTotalRequest</code>.
     * @alias module:model/AssetsTotalRequest
     * @class
     * @param exchange {String} Exchange name (e.g., `binance`).
     * @param base {String} Base currency to value the assets in (e.g., `USDT`).
     * @param start {Number} Start timestamp in milliseconds since Unix epoch.
     * @param end {Number} End timestamp in milliseconds since Unix epoch.
     */
    constructor(exchange: string, base: string, start: number, end: number);
    exchange: string;
    base: string;
    start: number;
    end: number;
}
