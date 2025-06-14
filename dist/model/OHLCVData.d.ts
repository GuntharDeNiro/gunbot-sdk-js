/**
 * The OHLCVData model module.
 * @module model/OHLCVData
 * @version v1
 */
export default class OHLCVData {
    /**
     * Constructs a <code>OHLCVData</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/OHLCVData} obj Optional instance to populate.
     * @return {module:model/OHLCVData} The populated <code>OHLCVData</code> instance.
     */
    static constructFromObject(data: any, obj: any): any;
    /**
     * @member {Array.<Number>} close
     */
    close: any;
    /**
     * @member {Array.<Number>} high
     */
    high: any;
    /**
     * @member {Array.<Number>} low
     */
    low: any;
    /**
     * @member {Array.<Number>} volume
     */
    volume: any;
    /**
     * @member {Array.<Number>} open
     */
    open: any;
}
