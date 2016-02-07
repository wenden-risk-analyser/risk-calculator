const tape            = require('tape');
const riskCalculator  = require('../src/risk-calculator');
const content         = require('../src/risk-constants').ValidationContent;
const mockProviders   = require('./mockServiceProviders');

tape('Ensures required arguments are provided', assert => {
    // throw error for missing customer service provider
    assert.throws(() => {
        riskCalculator();
    }, new RegExp(content.MISSING_SERVICE + ' customerService.'));

    // throw error for missing bet service provider
    assert.throws(() => {
        riskCalculator(mockProviders.emptyCustService);
    }, new RegExp(content.MISSING_SERVICE + ' betService.'));

    assert.end();
});

tape('Ensures service providers quack like they should', assert => {
    // throw error for incomplete interface implementation
    assert.throws(() => {
        riskCalculator(mockProviders.invalidService, mockProviders.emptyBetService);
    }, new RegExp(content.INVALID_SERVICE + ' customerService.'));

    // throw error for missing bet service provider
    assert.throws(() => {
        riskCalculator(mockProviders.emptyCustService, mockProviders.invalidService);
    }, new RegExp(content.INVALID_SERVICE + ' betService.'));

    assert.end();
});
