/**
 * The ConfigUpdateResponse model module.
 * @module model/ConfigUpdateResponse
 * @version v1
 */
export default class ConfigUpdateResponse {
    /**
     * Constructs a <code>ConfigUpdateResponse</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/ConfigUpdateResponse} obj Optional instance to populate.
     * @return {module:model/ConfigUpdateResponse} The populated <code>ConfigUpdateResponse</code> instance.
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
