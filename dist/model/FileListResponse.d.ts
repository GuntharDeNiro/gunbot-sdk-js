/**
 * The FileListResponse model module.
 * @module model/FileListResponse
 * @version v1
 */
export default class FileListResponse {
    /**
     * Constructs a <code>FileListResponse</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/FileListResponse} obj Optional instance to populate.
     * @return {module:model/FileListResponse} The populated <code>FileListResponse</code> instance.
     */
    static constructFromObject(data: any, obj: any): any;
    /**
     * @member {String} status
     */
    status: any;
    /**
     * @member {Array.<String>} result
     */
    result: any;
}
