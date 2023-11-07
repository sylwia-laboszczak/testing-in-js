const { expect } = require('chai');
const { describe, it, beforeEach, afterEach } = require('mocha');
const NumbersValidator = require('../../numbers_validator');

describe('NumbersValidator.isInteger', () => {
  let validator;

  beforeEach(function () {
    validator = new NumbersValidator();
  });

  afterEach(() => {
    validator = null;
  });

  it('should return true when value 4 is provided', () => {
    const validationResult = validator.isInteger(4);
    expect(validationResult).to.be.equal(true);
  });

  it('should return false when value 3.8 is provided', () => {
    const validationResult = validator.isInteger(3.8);
    expect(validationResult).to.be.equal(false);
  });

  it('should throw error when string is provided', () => {
    try {
      validator.isInteger('fake string');
    } catch (error) {
      expect(error.message).to.be.equal(
        '[fake string] is not a number',
      );
    }
  });
});
