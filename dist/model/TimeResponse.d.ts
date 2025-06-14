/**
 * The TimeResponse model module.
 * @module model/TimeResponse
 * @version v1
 */
export default class TimeResponse {
    /**
     * Constructs a <code>TimeResponse</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/TimeResponse} obj Optional instance to populate.
     * @return {module:model/TimeResponse} The populated <code>TimeResponse</code> instance.
     */
    static constructFromObject(data: any, obj: any): any;
    /**
     * Current server time in milliseconds since Unix epoch.
     * @member {Number} serverTime
     */
    serverTime: any;
}
