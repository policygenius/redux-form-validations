import isPresent from './isPresent';

describe('isPresent', () => {
  const someFields = {};

  context('when the value is null', () => {
    it('is false', () => {
      expect(isPresent.validator(someFields, null)).toBe(false);
    });
  });

  context('when the value is undefined', () => {
    it('is false', () => {
      expect(isPresent.validator(someFields, undefined)).toBe(false);
    });
  });

  context('when the value is neither null or undefined', () => {
    it('is true', () => {
      expect(isPresent.validator(someFields, 'teehee')).toBe(true);
    });
  });
});
