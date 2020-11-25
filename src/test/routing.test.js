import getRecords from '../util/kinesis.util';
import {
  validOddNumbers,
  validEvenNumbers,
  invalidInputs,
} from '../testData/testData';
import getResponse from '../util/superTest';

describe('Validating routing to odd stream', function () {
  validOddNumbers.forEach((number) => {
    test(`should request successfully when ${number} is provided`, async function () {
      const response = await getResponse(number);
      expect(response.status).toBe(200);
    });
    test(`should route to odd stream when ${number} is provided`, async function () {
      const record = await getRecords('li-stream-odd');
      expect(record[record.length - 1].seed).toBe(number);
    });
    test(`should not route to even stream when ${number} is provided`, async function () {
      const record = await getRecords('li-stream-even');
      expect(record[record.length - 1].seed).not.toBe(number);
    });
  });
});

describe('Validating routing to even stream', function () {
  validEvenNumbers.forEach((number) => {
    test(`should request successfully when ${number} is provided`, async function () {
      const response = await getResponse(number);
      expect(response.status).toBe(200);
    });
    test(`should route to odd stream when ${number} is provided`, async function () {
      const record = await getRecords('li-stream-even');
      expect(record[record.length - 1].seed).toBe(number);
    });
    test(`should not route to even stream when ${number} is provided`, async function () {
      const record = await getRecords('li-stream-odd');
      expect(record[record.length - 1].seed).not.toBe(number);
    });
  });
});

describe('Validating response of invalid inputs', function () {
  invalidInputs.forEach((number) => {
    test(`should reject and throw 400 when ${number} is provided`, async function () {
      const response = await getResponse(number);
      expect(response.status).toBe(400);
    });
  });
});
