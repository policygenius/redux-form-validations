import mockdate from 'mockdate';
import isDateInPast from './isDateInPast';

describe('isDateInPast', () => {
  const someFields = {};
  beforeEach(() => {
    mockdate.set('2/16/2017');
  });

  afterEach(() => {
    mockdate.reset();
  });

  context('when the value is a parsable date', () => {
    context('and that date is in the past', () => {
      it('returns true', () => {
        expect(isDateInPast.validator(someFields, '3/16/2012')).toBe(true);
      });
    });

    context('and that date is in the future', () => {
      it('returns false', () => {
        expect(isDateInPast.validator(someFields, '3/16/2019')).toBe(false);
      });
    });
  });

  context('when the value is not a parsable date', () => {
    context('and the value is nil', () => {
      it('returns true', () => {
        expect(isDateInPast.validator(someFields, null)).toBe(true);
      });
    });
  });
});
