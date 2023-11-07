const { expect } = require('chai');
const { describe, it, beforeEach, afterEach } = require('mocha');
const NumbersValidator = require('../../numbers_validator');

describe('NumbersValidator.isNumberEven', () => {
  let validator;

  beforeEach(function () {
    validator = new NumbersValidator();
  });

  afterEach(() => {
    validator = null;
  });

  it('should return true when number 4 is provided', () => {
    const validationResult = validator.isNumberEven(4);
    expect(validationResult).to.be.equal(true);
  });

  it('should return true when number 3 is provided', () => {
    const validationResult = validator.isNumberEven(3);
    expect(validationResult).to.be.equal(false);
  });

  it('should throw error when string is provided', () => {
    try {
      validator.isNumberEven('fake string');
    } catch (error) {
      expect(error.message).to.be.equal(
        '[fake string] is not of type "Number" it is of type "string"',
      );
    }
  });
});
