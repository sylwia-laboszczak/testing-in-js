const { expect } = require('chai');
const { describe, it, beforeEach, afterEach } = require('mocha');
const NumbersValidator = require('../../numbers_validator');

describe('NumbersValidator.isAllNumbers', () => {
  let validator;

  beforeEach(function () {
    validator = new NumbersValidator();
  });

  afterEach(() => {
    validator = null;
  });

  it('should return true when array of numbers provided', () => {
    const validationResult = validator.isAllNumbers([1, 2, 3, 4, 56, 57, 60, 61, 100, 101]);
    expect(validationResult).to.be.equal(true);
  });

  it('should return false when array of other types provided', () => {
    const validationResult = validator.isAllNumbers([3, 5, 7, 'cat', 'dog']);
    expect(validationResult).to.be.equal(false);
  });

  it('should throw error when in array all values are not numbers ', () => {
    try {
      validator.isAllNumbers('fake message');
    } catch (error) {
      expect(error.message).to.be.equal('[fake message] is not an array');
    }
  });
});
