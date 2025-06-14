/**
 * The PnlSumResponseTournamentData model module.
 * @module model/PnlSumResponseTournamentData
 * @version v1
 */
export default class PnlSumResponseTournamentData {
    /**
     * Constructs a <code>PnlSumResponseTournamentData</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/PnlSumResponseTournamentData} obj Optional instance to populate.
     * @return {module:model/PnlSumResponseTournamentData} The populated <code>PnlSumResponseTournamentData</code> instance.
     */
    static constructFromObject(data: any, obj: any): any;
    /**
     * @member {String} sommaPnl
     */
    sommaPnl: any;
    /**
     * @member {String} invested
     */
    invested: any;
}
