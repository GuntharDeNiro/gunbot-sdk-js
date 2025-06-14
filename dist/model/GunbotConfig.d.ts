/**
 * The GunbotConfig model module.
 * @module model/GunbotConfig
 * @version v1
 */
export default class GunbotConfig {
    /**
     * Constructs a <code>GunbotConfig</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/GunbotConfig} obj Optional instance to populate.
     * @return {module:model/GunbotConfig} The populated <code>GunbotConfig</code> instance.
     */
    static constructFromObject(data: any, obj: any): any;
    /**
     * @member {Object.<String, Object.<String, Object>>} pairs
     */
    pairs: any;
}
