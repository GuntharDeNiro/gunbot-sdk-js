/**
 * The TradeCancelData model module.
 * @module model/TradeCancelData
 * @version v1
 */
declare class TradeCancelData {
    /**
     * Constructs a <code>TradeCancelData</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/TradeCancelData} obj Optional instance to populate.
     * @return {module:model/TradeCancelData} The populated <code>TradeCancelData</code> instance.
     */
    static constructFromObject(data: any, obj: any): any;
    /**
     * Constructs a new <code>TradeCancelData</code>.
     * @alias module:model/TradeCancelData
     * @class
     * @param exch {String}
     * @param pair {String}
     * @param id {String}
     * @param price {Number}
     * @param type {module:model/TradeCancelData.TypeEnum}
     */
    constructor(exch: string, pair: string, id: string, price: number, type: any);
    exch: string;
    pair: string;
    id: string;
    price: number;
    type: any;
}
declare namespace TradeCancelData {
    namespace TypeEnum {
        let limit: string;
        let market: string;
    }
    /**
     * *
     */
    type TypeEnum = string;
}
export default TradeCancelData;
