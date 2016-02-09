module.exports = {
    ValidationContent: {
        MISSING_SERVICE: 'Missing service provider:',
        INVALID_SERVICE: 'Service provider does not implement correct interface:'
    },
    RISKY_WIN_PERCENTAGE: 0.6,
    UNUSUAL_STAKE_FACTOR: 10,
    EXCEPTIONALLY_RISKY_STAKE_FACTOR: 30,
    RISKY_PAYOUT_AMOUNT: 1000,
    RiskSeverity: {
        SAFE: 0,
        UNUSUAL: 1,
        RISKY: 2,
        HIGHLYRISKY: 3
    },
    RiskLevels: {
        SAFE: 'Safe',
        UNUSUAL: 'Unusual',
        RISKY: 'Risky',
        HIGHLYRISKY: 'Highly Risky'
    },
    RiskReasons: {
        CUSTOMER_LARGE_WIN_PERCENTAGE: 'Large win percentage.',
        LARGE_STAKE: 'Stake is unusually large based on betting history.',
        EXCEPTIONAL_STAKE: 'Stake is exceptionally large based on betting history.',
        LARGE_PAYOUT: 'Potential payout is too high.'
    }
};
