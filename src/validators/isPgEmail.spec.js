import isPgEmail from './isPgEmail';

describe('isPgEmail', () => {
  const someFields = {};

  context('when the value is a valid PG email address', () => {
    it('is true', () => {
      expect(isPgEmail.validator(someFields, 'asdf@policygenius.com')).toBe(true);
    });

    context('when the value is not a valid PG email address', () => {
      it('returns false', () => {
        expect(isPgEmail.validator(someFields, 'policygenius@lemonade.com')).toBe(false);
      });
    });

    context('when the value is not a string', () => {
      it('raises an invariant', () => {
        expect(() => {
          isPgEmail.validator(someFields, 0);
        }).toThrow(/Argument must be a string or nil value/);
      });
    });

    context('when the value is nil', () => {
      it('returns true', () => {
        expect(isPgEmail.validator(someFields, undefined)).toBe(true);
      });
    });
  });
});
