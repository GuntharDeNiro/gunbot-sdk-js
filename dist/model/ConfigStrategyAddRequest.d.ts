/**
 * The ConfigStrategyAddRequest model module.
 * @module model/ConfigStrategyAddRequest
 * @version v1
 */
export default class ConfigStrategyAddRequest {
    /**
     * Constructs a <code>ConfigStrategyAddRequest</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/ConfigStrategyAddRequest} obj Optional instance to populate.
     * @return {module:model/ConfigStrategyAddRequest} The populated <code>ConfigStrategyAddRequest</code> instance.
     */
    static constructFromObject(data: any, obj: any): any;
    /**
     * Constructs a new <code>ConfigStrategyAddRequest</code>.
     * @alias module:model/ConfigStrategyAddRequest
     * @class
     * @param name {String} The name of the strategy to add (e.g., `myStrategy`).
     * @param settings {Object.<String, Object>} (Optional) Specific settings for the strategy.
     */
    constructor(name: string, settings: any);
    name: string;
    settings: any;
}
