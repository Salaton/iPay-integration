# iPay web-based integration

This is a simple NodeJS implementation that allows a user to successfully integrate with the iPay gateway.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

This implementation assumes you have node installed in your machine. 

### Installing

How to get the development env running


```
npm install
```
This will install the needed node packages

## Running the tests

To run the tests for this system;
Run the index.ejs file on your localhost

```
http://localhost:3000/
```
Since all parameters are predefined in the app.js file, you only need to "complete payment" and submit the form. On successful implementation, the payment page should be displayed. Make a card payment using dummy card details

### Running again

To run the test again, use different parameters, e.g you can change the ```ttl``` value on the ```var parameters``` and at the ```var text``` to generate a new hash. After this, you can proceed with the payment process.

## Built With

* [Express](http://expressjs.com/) - The web framework used
* [Crypto](https://cryptojs.gitbook.io/docs/) - Hashing Algorithm
* [Morgan](https://github.com/expressjs/morgan) - HTTP request logger middleware for node.js

## Authors

* **Elvis Salaton** - *Initial work* - [Salaton](https://github.com/Salaton)


