const riskConstants = require('../risk-constants');

/*
* @Public
*
* Determine whether a customer is considered high risk based on their betting history.
*
* @param {Array} settledBets All of the customers settled bets.
*
* @returns {Object} The risk profile for the customer.
*/
function HighWinPercentage(settledBets) {
    const wins = settledBets.filter(bet => bet.payout > 0);
    if ((wins.length / settledBets.length) > riskConstants.RISKY_WIN_PERCENTAGE) {
        return {
            risk: riskConstants.RiskSeverity.RISKY,
            reason: riskConstants.RiskReasons.CUSTOMER_LARGE_WIN_PERCENTAGE
        };
    }
    return {
        risk: riskConstants.RiskSeverity.SAFE,
        reason: ''
    };
}

module.exports = [HighWinPercentage];
