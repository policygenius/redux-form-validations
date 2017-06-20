import isDateAfter from './isDateAfter';

describe('isDateAfter', () => {
  const someFields = {};
  const validationDate = '2/16/2017';

  context('when the value is a parsable date', () => {
    context('and that date is before the validation date', () => {
      it('returns false', () => {
        expect(isDateAfter(validationDate).validator(someFields, '2/15/2017')).toBe(false);
      });
    });

    context('and that date is on the validation date', () => {
      it('returns false', () => {
        expect(isDateAfter(validationDate).validator(someFields, '2/16/2017')).toBe(false);
      });
    });

    context('and that date is after the validation date', () => {
      it('returns true', () => {
        expect(isDateAfter(validationDate).validator(someFields, '2/17/2017')).toBe(true);
      });
    });
  });

  context('when the value is not a parsable date', () => {
    context('and the value is nil', () => {
      it('returns true', () => {
        expect(isDateAfter(validationDate).validator(someFields, null)).toBe(true);
      });
    });

    context('and the value is not a valid date format', () => {
      it('returns false', () => {
        expect(isDateAfter(validationDate).validator(someFields, 'two/seventeen/twothousandseventeen')).toBe(false);
      });
    });
  });
});
