/**
 * The FileGetRequest model module.
 * @module model/FileGetRequest
 * @version v1
 */
export default class FileGetRequest {
    /**
     * Constructs a <code>FileGetRequest</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/FileGetRequest} obj Optional instance to populate.
     * @return {module:model/FileGetRequest} The populated <code>FileGetRequest</code> instance.
     */
    static constructFromObject(data: any, obj: any): any;
    /**
     * Constructs a new <code>FileGetRequest</code>.
     * @alias module:model/FileGetRequest
     * @class
     * @param filename {String} The name of the file to retrieve.
     */
    constructor(filename: string);
    filename: string;
}
