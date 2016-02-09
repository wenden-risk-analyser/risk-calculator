const tape           = require('tape');
const mocks          = require('./../mockServiceProviders');
const riskConstants  = require('../../src/risk-constants');
const betServiceSafeCustomer = {
    getAll() {},
    search() {
        return [
            {
                customerId: '2',
                eventId: '1',
                participantId: '3',
                stake: 300,
                potentialPayout: 500,
                payout: 0
            },
            {
                customerId: '2',
                eventId: '3',
                participantId: '5',
                stake: 300,
                potentialPayout: 500,
                payout: 0
            },
            {
                customerId: '2',
                eventId: '2',
                participantId: '4',
                stake: 300,
                potentialPayout: 500,
                payout: 0
            }
        ];
    }
};

tape('Should correctly identify a risky bet based on the customer', assert => {
    const betServiceRiskyCustomer = {
        getAll() {},
        search() {
            return [
                {
                    customerId: '2',
                    eventId: '1',
                    participantId: '3',
                    stake: 300,
                    potentialPayout: 500,
                    payout: 500
                },
                {
                    customerId: '2',
                    eventId: '3',
                    participantId: '5',
                    stake: 300,
                    potentialPayout: 500,
                    payout: 600
                },
                {
                    customerId: '2',
                    eventId: '2',
                    participantId: '4',
                    stake: 300,
                    potentialPayout: 500,
                    payout: 0
                }
            ];
        }
    };

    const riskCalculator = require('../../src/risk-calculator')(mocks.emptyCustService, betServiceRiskyCustomer);
    const riskProfile = riskCalculator.betRiskProfile({
        customerId: '2',
        eventId: '2',
        participantId: '4',
        stake: 300,
        potentialPayout: 500,
        payout: 0
    });
    assert.deepLooseEqual(riskProfile, {
        severity: riskConstants.RiskSeverity.RISKY,
        risk: riskConstants.RiskLevels.RISKY,
        reason: riskConstants.RiskReasons.CUSTOMER_LARGE_WIN_PERCENTAGE
    });
    assert.end();
});

tape('Should correctly identify an unusual bet based on a safe customer and unusually high bet', assert => {
    const riskCalculator = require('../../src/risk-calculator')(mocks.emptyCustService, betServiceSafeCustomer);
    // average stake is 300
    const riskProfile = riskCalculator.betRiskProfile({
        customerId: '2',
        eventId: '2',
        participantId: '4',
        stake: 3001,
        potentialPayout: 500,
        payout: 0
    });
    assert.deepLooseEqual(riskProfile, {
        severity: riskConstants.RiskSeverity.UNUSUAL,
        risk: riskConstants.RiskLevels.UNUSUAL,
        reason: riskConstants.RiskReasons.LARGE_STAKE
    });
    assert.end();
});

tape('Should correctly identify a safe bet based on a safe customer and equalling high bet value', assert => {
    const riskCalculator = require('../../src/risk-calculator')(mocks.emptyCustService, betServiceSafeCustomer);
    // average stake is 300
    const riskProfile = riskCalculator.betRiskProfile({
        customerId: '2',
        eventId: '2',
        participantId: '4',
        stake: 3000,
        potentialPayout: 500,
        payout: 0
    });
    assert.deepLooseEqual(riskProfile, {
        severity: riskConstants.RiskSeverity.SAFE,
        risk: riskConstants.RiskLevels.SAFE,
        reason: ''
    });
    assert.end();
});

tape('Should correctly identify a risky bet based on a safe customer and extremely high bet', assert => {
    const riskCalculator = require('../../src/risk-calculator')(mocks.emptyCustService, betServiceSafeCustomer);
    // average stake is 300
    const riskProfile = riskCalculator.betRiskProfile({
        customerId: '2',
        eventId: '2',
        participantId: '4',
        stake: 9001,
        potentialPayout: 500,
        payout: 0
    });
    assert.deepLooseEqual(riskProfile, {
        severity: riskConstants.RiskSeverity.HIGHLYRISKY,
        risk: riskConstants.RiskLevels.HIGHLYRISKY,
        reason: riskConstants.RiskReasons.EXCEPTIONAL_STAKE
    });
    assert.end();
});

tape('Should correctly identify an unusual bet based on a safe customer and equalling extremely high bet value', assert => {
    const riskCalculator = require('../../src/risk-calculator')(mocks.emptyCustService, betServiceSafeCustomer);
    // average stake is 300
    const riskProfile = riskCalculator.betRiskProfile({
        customerId: '2',
        eventId: '2',
        participantId: '4',
        stake: 9000,
        potentialPayout: 500,
        payout: 0
    });
    assert.deepLooseEqual(riskProfile, {
        severity: riskConstants.RiskSeverity.UNUSUAL,
        risk: riskConstants.RiskLevels.UNUSUAL,
        reason: riskConstants.RiskReasons.LARGE_STAKE
    });
    assert.end();
});

tape('Should correctly identify a risky bet based on a safe customer with a large payout', assert => {
    const riskCalculator = require('../../src/risk-calculator')(mocks.emptyCustService, betServiceSafeCustomer);

    const riskProfile = riskCalculator.betRiskProfile({
        customerId: '2',
        eventId: '2',
        participantId: '4',
        stake: 400,
        potentialPayout: 1500,
        payout: 0
    });
    assert.deepLooseEqual(riskProfile, {
        severity: riskConstants.RiskSeverity.RISKY,
        risk: riskConstants.RiskLevels.RISKY,
        reason: riskConstants.RiskReasons.LARGE_PAYOUT
    });
    assert.end();
});

tape('Should correctly identify a high risk bet based on a safe customer with a large payout with a large stake based on risk severity', assert => {
    const riskCalculator = require('../../src/risk-calculator')(mocks.emptyCustService, betServiceSafeCustomer);

    const riskProfile = riskCalculator.betRiskProfile({
        customerId: '2',
        eventId: '2',
        participantId: '4',
        stake: 9400,
        potentialPayout: 1500,
        payout: 0
    });
    assert.deepLooseEqual(riskProfile, {
        severity: riskConstants.RiskSeverity.HIGHLYRISKY,
        risk: riskConstants.RiskLevels.HIGHLYRISKY,
        reason: riskConstants.RiskReasons.EXCEPTIONAL_STAKE
    });
    assert.end();
});
