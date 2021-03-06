const check             = require('check-types');
const riskConstants     = require('./risk-constants');
const validationContent = riskConstants.ValidationContent;
const customerRisks     = require('./risk/risks.customer');
const betRisks     = require('./risk/risks.bets');

/*
* Customer Service interface
*
* @typedef CustomerService
* @property {Function} getAll Returns all customers
*
*/
const customerServiceInterface = Object.freeze({
    getAll() {}
});

/*
* Bet Service interface
*
* @typedef BetService
* @property {Function} getAll Returns all bets
* @property {Function} search Returns subset of bets based on query
*
*/
const betServiceInterface = Object.freeze({
    getAll() {},
    search(betQuery) {} // eslint-disable-line no-unused-vars
});

const services = {
    customerService: null,
    betService: null
};

/*
* @private
*
* Compare risk profiles based on the risk level.
*
*/
function mostSevere(a, b) {
    if (a.severity < b.severity) {
        return 1;
    }
    if (a.severity > b.severity) {
        return 0;
    }

    // risk level must be equal
    return 0;
}

/*
* @Public
*
* Generate the risk profile for a given customer.
*
* @param {string} customerId Identifier of the required customer.
*
* @returns {Object} The risk profile for the customer.
*/
function customerRiskProfile(customerId) {
    const settledBets = services.betService.search({
        settled: true,
        customerId
    });
    const risks = [];

    // run through risk criteria to generate risk profile
    customerRisks.forEach(risk => {
        risks.push(risk(settledBets));
    });

    // only want to return the highest severity risk
    return risks.length === 0 ? [] : risks.sort(mostSevere)[0];
}

/*
* @Public
*
* Generate the risk profile for a given bet.
*
* @param {string} bet Bet object to return the risk profile for.
*
* @returns {Object} The risk profile for the bet.
*/
function betRiskProfile(bet) {
    const settledBets = services.betService.search({
        customerId: bet.customerId,
        settled: true
    });

    const risks = [];

    // check if the customer is high risk
    risks.push(customerRiskProfile(bet.customerId));

    // run through risk criteria to generate risk profile
    betRisks.forEach(risk => {
        risks.push(risk(bet, settledBets));
    });

    // only want to return the highest severity risk
    return risks.length === 0 ? [] : risks.sort(mostSevere)[0];
}

/*
* @Public
*
* Calculator used for determining the risk profile for a customer and/or customer bets
*
* @param {Object} customerService Customer service provider for searching and retrieving customers.
* @param {Object} betService Bet service provider for searching and retrieving bets.
*
*/
const RiskCalculator = function (customerService, betService) {
    // check that the required services are both provided and implement the required interface
    if (!check.assigned(customerService)) {
        throw new Error(validationContent.MISSING_SERVICE + ' customerService.');
    }
    if (!check.assigned(betService)) {
        throw new Error(validationContent.MISSING_SERVICE + ' betService.');
    }

    if (!check.like(customerService, customerServiceInterface)) {
        throw new Error(validationContent.INVALID_SERVICE + ' customerService.');
    }
    if (!check.like(betService, betServiceInterface)) {
        throw new Error(validationContent.INVALID_SERVICE + ' betService.');
    }

    services.customerService = customerService;
    services.betService = betService;

    return {
        customerRiskProfile,
        betRiskProfile
    };
};

module.exports = RiskCalculator;
