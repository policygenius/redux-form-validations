import { isPhoneNumber } from '../';

describe('isPhoneNumber', () => {
  const someFields = {};

  context('when the value is a valid phone number', () => {
    it('is true', () => {
      expect(isPhoneNumber.validator(someFields, '1234567899')).toBe(true);
    });

    context('when the value is not a valid phone number', () => {
      it('returns false', () => {
        expect(isPhoneNumber.validator(someFields, '42')).toBe(false);
      });
    });

    context('when the value is not a string or nil', () => {
      it('raises an invariant', () => {
        expect(() => {
          isPhoneNumber.validator(someFields, 12345);
        }).toThrow(/Phone number must be a string or nil value, received 12345, a number/);
      });
    });

    context('when the value is nil', () => {
      it('returns true', () => {
        expect(isPhoneNumber.validator(someFields, undefined)).toBe(true);
      });
    });
  });
});
