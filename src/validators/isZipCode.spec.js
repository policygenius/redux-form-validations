import isZipCode from 'validators/isZipCode';

describe('isZipCode', () => {
  const someFields = {};

  context('when the value is a valid zip code', () => {
    it('is true', () => {
      expect(isZipCode.validator(someFields, '63130')).toBe(true);
    });

    context('when the value is not a valid zip code', () => {
      it('returns false', () => {
        expect(isZipCode.validator(someFields, '42')).toBe(false);
      });
    });

    context('when the value is not a string or nil', () => {
      it('raises an invariant', () => {
        expect(() => {
          isZipCode.validator(someFields, 12345)
        }).toThrow(/Zip code must be a string, was passed 12345, a number/);
      });
    });

    context('when the value is nil', () => {
      it('returns true', () => {
        expect(isZipCode.validator(someFields, undefined)).toBe(true);
      });
    });
  });
});
