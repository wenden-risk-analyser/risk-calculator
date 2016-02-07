# Betting Risk Calculator

Reusable package for determining customer and bet risk profiles.

## Usage
To use the risk calculator package, consumers must provide two services. These being the _customerService_ and the _betService_.

### Customer Service
The provided customer service must implement the following interface:
```
    /*
    * Returns all customers
    *
    * @returns {Array} An array of customer objects
    */
    getAll()
```

### Bet Service
The provided bet service must implement the following interface:
```
    /*
    * Returns all bets
    *
    * @returns {Array} An array of customer objects
    */
    getAll()
```

## Development
Pull down source code and run ```npm install``` to install dependencies.

After any changes, run ```npm run lint``` to ensure code adheres to package standards.

## Todo
[ ] make service provider type checking error message more meaningful.
