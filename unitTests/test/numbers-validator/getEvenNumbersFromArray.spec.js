const { expect } = require('chai');
const { describe, it, beforeEach, afterEach } = require('mocha');
const NumbersValidator = require('../../numbers_validator');

describe('NumbersValidator.getEvenNumbersFromArray', () => {
  let validator;

  beforeEach(function () {
    validator = new NumbersValidator();
  });

  afterEach(() => {
    validator = null;
  });

  it('should return filtered even numbers', () => {
    const validationResult = validator.getEvenNumbersFromArray([
      1, 2, 3, 4, 5, 51, 60, 101,
    ]);
    expect(validationResult).to.deep.equal([2, 4, 60]);
  });

  it('should return empty array ', () => {
    const validationResult = validator.getEvenNumbersFromArray([3, 5, 7, 9]);
    expect(validationResult).to.deep.equal([]);
  });

  it('should throw error when array of strings is provided', () => {
    try {
      validator.getEvenNumbersFromArray(['Fake sting', 'fake message']);
    } catch (error) {
      expect(error.message).to.be.equal(
        '[Fake sting,fake message] is not an array of "Numbers"',
      );
    }
  });
});
