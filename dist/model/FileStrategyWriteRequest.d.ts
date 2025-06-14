/**
 * The FileStrategyWriteRequest model module.
 * @module model/FileStrategyWriteRequest
 * @version v1
 */
export default class FileStrategyWriteRequest {
    /**
     * Constructs a <code>FileStrategyWriteRequest</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/FileStrategyWriteRequest} obj Optional instance to populate.
     * @return {module:model/FileStrategyWriteRequest} The populated <code>FileStrategyWriteRequest</code> instance.
     */
    static constructFromObject(data: any, obj: any): any;
    /**
     * Constructs a new <code>FileStrategyWriteRequest</code>.
     * @alias module:model/FileStrategyWriteRequest
     * @class
     * @param filename {String}
     * @param document {String} The content to write into the strategy file.
     */
    constructor(filename: string, document: string);
    filename: string;
    document: string;
}
