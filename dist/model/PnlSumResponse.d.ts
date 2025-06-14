/**
 * The PnlSumResponse model module.
 * @module model/PnlSumResponse
 * @version v1
 */
export default class PnlSumResponse {
    /**
     * Constructs a <code>PnlSumResponse</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/PnlSumResponse} obj Optional instance to populate.
     * @return {module:model/PnlSumResponse} The populated <code>PnlSumResponse</code> instance.
     */
    static constructFromObject(data: any, obj: any): any;
    /**
     * @member {module:model/PnlSumResponseTournamentData} tournamentData
     */
    tournamentData: any;
    /**
     * @member {Array.<Object.<String, Object>>} data
     */
    data: any;
}
