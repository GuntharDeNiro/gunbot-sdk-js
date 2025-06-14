/**
 * The LoginRequest model module.
 * @module model/LoginRequest
 * @version v1
 */
export default class LoginRequest {
    /**
     * Constructs a <code>LoginRequest</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/LoginRequest} obj Optional instance to populate.
     * @return {module:model/LoginRequest} The populated <code>LoginRequest</code> instance.
     */
    static constructFromObject(data: any, obj: any): any;
    /**
     * Constructs a new <code>LoginRequest</code>.
     * @alias module:model/LoginRequest
     * @class
     * @param password {String} The user's encrypted password. See encryption helpers in the original documentation.
     */
    constructor(password: string);
    password: string;
}
