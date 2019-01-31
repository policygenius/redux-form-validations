import { isEmail } from '../';

describe('isEmail', () => {
  const someFields = {};

  context('when the value is a valid email address', () => {
    it('is true', () => {
      expect(isEmail.validator(someFields, 'asdf@fakemail.com')).toBe(true);
    });

    context('when the value has no domain', () => {
      it('returns false', () => {
        expect(isEmail.validator(someFields, 'asdffakemail.com')).toBe(false);
      });
    });

    context('when the value has no TLD', () => {
      it('returns false', () => {
        expect(isEmail.validator(someFields, 'asdffakemail@email')).toBe(false);
      });
    });

    context('when the value has a bad TLD', () => {
      it('returns false', () => {
        expect(isEmail.validator(someFields, 'asdffakemail@email.c')).toBe(false);
      });
    });

    context('when the value has a space in the TLD', () => {
      it('returns false', () => {
        expect(isEmail.validator(someFields, 'asdffakemail@email. com')).toBe(false);
      });
    });

    context('when the value has a space in it', () => {
      it('returns false', () => {
        expect(isEmail.validator(someFields, 'asdf fakemail@email.com')).toBe(false);
      });
    });

    context('when the value is not a string', () => {
      it('raises an invariant', () => {
        expect(() => {
          isEmail.validator(someFields, 0);
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
