/**
 * The AuthStatusResponse model module.
 * @module model/AuthStatusResponse
 * @version v1
 */
export default class AuthStatusResponse {
    /**
     * Constructs a <code>AuthStatusResponse</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/AuthStatusResponse} obj Optional instance to populate.
     * @return {module:model/AuthStatusResponse} The populated <code>AuthStatusResponse</code> instance.
     */
    static constructFromObject(data: any, obj: any): any;
    /**
     * @member {Number} code
     */
    code: any;
    /**
     * @member {Boolean} isDemo
     */
    isDemo: any;
    /**
     * @member {Boolean} isRegistered
     */
    isRegistered: any;
    /**
     * @member {Boolean} isTwoFA
     */
    isTwoFA: any;
    /**
     * @member {Boolean} metamask
     */
    metamask: any;
    /**
     * @member {String} status
     */
    status: any;
    /**
     * @member {String} message
     */
    message: any;
}
