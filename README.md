# Test Framework

This Automation testing framework primarily uses Jest as test runner and below are the support modules:

  - superTest - http lib
  - aws-sdk - nodejs based aws sdk
  - jest-html-reporter - to create html report

# Features

  - Configurable - just need to modify ".env" file to point to any environment. Either local or cloud
  - Test Data driven - As the scenarios are test data driven. To test more inputs, just need to add data "testData"


### Installation

Requires [Node.js](https://nodejs.org/) to run.

Install the dependencies and devDependencies and start the server.

```sh
$ yarn
```
## Test cases

Below are the scenarios on high level. Detailed implementation is in ``` src/test/routing.test.js ```

  - Verify routing to ```li-stream-odd``` when odd number is provided but NOT even
  - Verify routing to ```li-stream-even``` when even number is provided but NOT odd
  - Verify error is thrown when invalid inputs are provided

### Code Quality

To check the code written follows javascript and es6 convention

```sh
$ yarn lint
```


### Running Test

```sh
$ yarn test
```

### Report
Once test is run, the result will be reported in console and also as HTML reporter in "report" folder

