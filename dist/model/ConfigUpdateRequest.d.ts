/**
 * The ConfigUpdateRequest model module.
 * @module model/ConfigUpdateRequest
 * @version v1
 */
export default class ConfigUpdateRequest {
    /**
     * Constructs a <code>ConfigUpdateRequest</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/ConfigUpdateRequest} obj Optional instance to populate.
     * @return {module:model/ConfigUpdateRequest} The populated <code>ConfigUpdateRequest</code> instance.
     */
    static constructFromObject(data: any, obj: any): any;
    /**
     * @member {module:model/GunbotConfig} config
     */
    config: any;
}
