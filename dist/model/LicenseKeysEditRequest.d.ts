/**
 * The LicenseKeysEditRequest model module.
 * @module model/LicenseKeysEditRequest
 * @version v1
 */
export default class LicenseKeysEditRequest {
    /**
     * Constructs a <code>LicenseKeysEditRequest</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/LicenseKeysEditRequest} obj Optional instance to populate.
     * @return {module:model/LicenseKeysEditRequest} The populated <code>LicenseKeysEditRequest</code> instance.
     */
    static constructFromObject(data: any, obj: any): any;
    /**
     * Constructs a new <code>LicenseKeysEditRequest</code>.
     * @alias module:model/LicenseKeysEditRequest
     * @class
     * @param wallet {String}
     * @param newLicenses {Object.<String, Object>} Object containing new license data. Use the entire config.exchanges object. For new keys, set isEncrypted to false.
     * @param verifyExchange {String} Name of an exchange with valid, registered credentials to authenticate the request.
     */
    constructor(wallet: string, newLicenses: any, verifyExchange: string);
    wallet: string;
    newLicenses: any;
    verifyExchange: string;
}
