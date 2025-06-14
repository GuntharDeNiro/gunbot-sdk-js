/**
 * The FileWriteRequest model module.
 * @module model/FileWriteRequest
 * @version v1
 */
export default class FileWriteRequest {
    /**
     * Constructs a <code>FileWriteRequest</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/FileWriteRequest} obj Optional instance to populate.
     * @return {module:model/FileWriteRequest} The populated <code>FileWriteRequest</code> instance.
     */
    static constructFromObject(data: any, obj: any): any;
    /**
     * Constructs a new <code>FileWriteRequest</code>.
     * @alias module:model/FileWriteRequest
     * @class
     * @param document {Object} The content to write into the file.
     */
    constructor(document: any);
    document: any;
}
