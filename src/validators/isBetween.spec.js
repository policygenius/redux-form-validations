import isBetween from './isBetween';

describe('isBetween', () => {
  const someFields = {};

  context('when max and min the values are numbers', () => {
    context('when the value is between the min and max', () => {
      expect(isBetween(0, 5).validator(someFields, 2)).toBe(true);
    });
    context('when the value is less than the min', () => {
      expect(isBetween(4, 5).validator(someFields, 1)).toBe(false);
    });
    context('when the value is greater than the max', () => {
      expect(isBetween(4, 5).validator(someFields, 8)).toBe(false);
    });

    context('when the value is not a numerical value or nil', () => {
      it('raises an invariant', () => {
        expect(() => {
          isBetween(4, 5).validator(someFields, '14');
        }).toThrow(/Field value must be a finite number or nil/);
      });
    });
    context('when the value is nil', () => {
      it('returns true', () => {
        expect(isBetween(4, 5).validator(someFields, null)).toBe(true);
      });
    });
  });

  context('when the max and min values are not numbers', () => {
    it('raises an invariant', () => {
      expect(() => {
        isBetween(NaN, 5).validator(someFields, '14');
      }).toThrow(/The min and max values must be finite numbers/);
    });
  });
});
