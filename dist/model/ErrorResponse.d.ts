/**
 * The ErrorResponse model module.
 * @module model/ErrorResponse
 * @version v1
 */
export default class ErrorResponse {
    /**
     * Constructs a <code>ErrorResponse</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/ErrorResponse} obj Optional instance to populate.
     * @return {module:model/ErrorResponse} The populated <code>ErrorResponse</code> instance.
     */
    static constructFromObject(data: any, obj: any): any;
    /**
     * @member {String} status
     */
    status: any;
    /**
     * @member {String} message
     */
    message: any;
    /**
     * @member {Number} code
     */
    code: any;
}
