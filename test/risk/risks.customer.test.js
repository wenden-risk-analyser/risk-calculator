const tape           = require('tape');
const mocks          = require('./../mockServiceProviders');
const riskConstants  = require('../../src/risk-constants');

tape('Should correctly identify a safe customer', assert => {
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
                    payout: 500
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

    const riskCalculator = require('../../src/risk-calculator')(mocks.emptyCustService, betServiceSafeCustomer);
    const riskProfile = riskCalculator.customerRiskProfile();
    assert.deepLooseEqual(riskProfile, {
        risk: riskConstants.RiskSeverity.SAFE,
        reason: ''
    });
    assert.end();
});

tape('Should correctly identify a risky customer', assert => {
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
    const riskProfile = riskCalculator.customerRiskProfile();

    assert.deepLooseEqual(riskProfile, {
        risk: riskConstants.RiskSeverity.RISKY,
        reason: riskConstants.RiskReasons.CUSTOMER_LARGE_WIN_PERCENTAGE
    });
    assert.end();
});
