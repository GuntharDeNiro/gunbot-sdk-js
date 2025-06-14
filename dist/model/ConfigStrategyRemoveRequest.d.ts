/**
 * The ConfigStrategyRemoveRequest model module.
 * @module model/ConfigStrategyRemoveRequest
 * @version v1
 */
export default class ConfigStrategyRemoveRequest {
    /**
     * Constructs a <code>ConfigStrategyRemoveRequest</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/ConfigStrategyRemoveRequest} obj Optional instance to populate.
     * @return {module:model/ConfigStrategyRemoveRequest} The populated <code>ConfigStrategyRemoveRequest</code> instance.
     */
    static constructFromObject(data: any, obj: any): any;
    /**
     * Constructs a new <code>ConfigStrategyRemoveRequest</code>.
     * @alias module:model/ConfigStrategyRemoveRequest
     * @class
     * @param name {String} The name of the strategy to remove.
     */
    constructor(name: string);
    name: string;
}
