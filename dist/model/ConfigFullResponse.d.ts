/**
 * The ConfigFullResponse model module.
 * @module model/ConfigFullResponse
 * @version v1
 */
export default class ConfigFullResponse {
    /**
     * Constructs a <code>ConfigFullResponse</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/ConfigFullResponse} obj Optional instance to populate.
     * @return {module:model/ConfigFullResponse} The populated <code>ConfigFullResponse</code> instance.
     */
    static constructFromObject(data: any, obj: any): any;
    /**
     * @member {String} status
     */
    status: any;
    /**
     * @member {module:model/GunbotConfig} config
     */
    config: any;
}
