const check             = require('check-types');
const riskConstants     = require('./risk-constants');
const validationContent = riskConstants.ValidationContent;

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
*
*/
const betServiceInterface = Object.freeze({
    getAll() {}
});

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

    this._customerService = customerService;
    this._betService = betService;
};

module.exports = RiskCalculator;
