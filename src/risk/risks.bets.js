const riskConstants = require('../risk-constants');

/*
* @Public
*
* Determine whether a bet is considered high risk based on the stake compared to the customers average stake.
*
* @param {Object} bet Current bet to retrieve the risk profile on.
* @param {Array} settledBets All of the customers settled bets.
*
* @returns {Object} The risk profile for the customer.
*/
function HighStakeRisk(bet, settledBets) {
    const averageStake = settledBets.reduce((prev, curr) => prev + curr.stake, 0) / settledBets.length;

    if (bet.stake > (averageStake * riskConstants.EXCEPTIONALLY_RISKY_STAKE_FACTOR)) {
        return {
            severity: riskConstants.RiskSeverity.HIGHLYRISKY,
            risk: riskConstants.RiskLevels.HIGHLYRISKY,
            reason: riskConstants.RiskReasons.EXCEPTIONAL_STAKE
        };
    } else if (bet.stake > (averageStake * riskConstants.UNUSUAL_STAKE_FACTOR)) {
        return {
            severity: riskConstants.RiskSeverity.UNUSUAL,
            risk: riskConstants.RiskLevels.UNUSUAL,
            reason: riskConstants.RiskReasons.LARGE_STAKE
        };
    }

    return {
        severity: riskConstants.RiskSeverity.SAFE,
        risk: riskConstants.RiskLevels.SAFE,
        reason: ''
    };
}

/*
* @Public
*
* Determine whether a bet is considered high risk based on the potential payout.
*
* @param {Object} bet Current bet to retrieve the risk profile on.
*
* @returns {Object} The risk profile for the customer.
*/
function HighPayoutRisk(bet) {
    if (bet.potentialPayout > riskConstants.RISKY_PAYOUT_AMOUNT) {
        return {
            severity: riskConstants.RiskSeverity.RISKY,
            risk: riskConstants.RiskLevels.RISKY,
            reason: riskConstants.RiskReasons.LARGE_PAYOUT
        };
    }

    return {
        severity: riskConstants.RiskSeverity.SAFE,
        risk: riskConstants.RiskLevels.SAFE,
        reason: ''
    };
}

module.exports = [HighStakeRisk, HighPayoutRisk];
