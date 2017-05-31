import isEmail from 'validators/isEmail';

describe('isEmail', () => {
  const someFields = {};

  context('when the value is a valid email address', () => {
    it('is true', () => {
      expect(isEmail.validator(someFields, 'asdf@fakemail.com')).toBe(true);
    });

    context('when the value is not a valid email address', () => {
      it('returns false', () => {
        expect(isEmail.validator(someFields, 'asdffakemail.com')).toBe(false);
      });
    });

    context('when the value is not a string', () => {
      it('raises an invariant', () => {
        expect(() => {
          isEmail.validator(someFields, 0)
        }).toThrow(/Argument must be a string or nil value/);
      });
    });

    context('when the value is nil', () => {
      it('returns true', () => {
        expect(isEmail.validator(someFields, undefined)).toBe(true);
      });
    });
  });
});
