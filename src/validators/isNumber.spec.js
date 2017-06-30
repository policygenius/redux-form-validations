import isNumber from './isNumber';

describe('isNumber', () => {
  const someFields = {};

  context('when the value is a valid number', () => {
    it('is true', () => {
      expect(isNumber.validator(someFields, '50')).toBe(true);
    });

    context('when the value is not a valid number', () => {
      it('returns false', () => {
        expect(isNumber.validator(someFields, 'so not a number')).toBe(false);
      });
    });

    context('when the value is not a string', () => {
      it('raises an invariant', () => {
        expect(() => {
          isNumber.validator(someFields, 0);
        }).toThrow(/Argument must be a string or nil value/);
      });
    });

    context('when the value is nil', () => {
      it('returns true', () => {
        expect(isNumber.validator(someFields, undefined)).toBe(true);
      });
    });
  });
});
