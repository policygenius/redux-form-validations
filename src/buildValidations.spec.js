import { some } from 'lodash';
import buildValidations from './buildValidations';
import isPresent from './validators/isPresent';
import isEmail from './validators/isEmail';

describe('buildErrors', () => {
  context('when there are required fields', () => {
    context('when there are no specified error messages', () => {
      const schema = {
        someRequired: {
          validate: isPresent,
        },
        anotherRequired: {
          validate: {
            validator: isPresent.validator,
          },
        },
        blankRequired: {
          validate: {
            validator: isPresent.validator,
          },
        },
        nawNotRequired: {},
      };

      const values = {
        someRequired: 'and it is there',
        anotherRequired: null,
        blankRequired: '',
        nawNotRequired: null,
      };

      it('returns an object with default field error messages', () => {
        expect(buildValidations(schema).validate(values)).toEqual(
          {
            anotherRequired: 'Another Required is not valid',
            blankRequired: 'Blank Required is not valid',
          },
        );
      });
    });

    context('when the error message is specified', () => {
      const schema = {
        requiredWithMessage: {
          validate: {
            errorMessage: 'Required sucka foo!',
            validator: isPresent.validator,
          },
        },
        undefinedRequired: {
          validate: {
            validator: isPresent.validator,
          },
        },
      };

      const values = { requiredWithMessage: '', undefinedRequired: undefined };

      it('returns an object with custom error messages', () => {
        expect(buildValidations(schema).validate(values)).toEqual(
          {
            requiredWithMessage: 'Required sucka foo!',
            undefinedRequired: 'Undefined Required is not valid',
          },
        );
      });
    });

    context('when a field is conditionally required', () => {
      const schema = {
        falseCondition: {
          validate: isPresent,
        },
        conditionallyRequiredFalse: {
          validate: {
            ...isPresent,
            validateIf: allFields => allFields.falseCondition,
          },
        },
        trueCondition: {
          validate: isPresent,
        },
        conditionallyRequiredEmail: {
          validate: {
            ...isEmail,
            validateIf: allFields => allFields.trueCondition,
          },
        },
      };

      const values = {
        falseCondition: false,
        conditionallyRequiredFalse: '',
        trueCondition: true,
        conditionallyRequiredEmail: 'foo',
      };

      it('only validates if the condition function evaluates to true', () => {
        expect(buildValidations(schema).validate(values)).toEqual({
          conditionallyRequiredEmail: 'Must be a valid email',
        });
      });
    });

    context('when a field has the required option', () => {
      const schema = {
        someEmail: {
          validate: {
            ...isEmail,
            required: true,
          },
        },
      };

      context('and the field value is not present', () => {
        const values = { someEmail: null };

        it('returns an error that the field is required', () => {
          expect(buildValidations(schema).validate(values)).toEqual({
            someEmail: 'Required',
          });
        });
      });

      context('and the field value is not present', () => {
        context('and the field is valid', () => {
          const values = { someEmail: 'email@foo.com' };

          it('does not return an error', () => {
            expect(buildValidations(schema).validate(values)).toEqual({});
          });
        });
      });

      context('and the field is not valid', () => {
        const values = { someEmail: 'not an email' };

        it('returns the error message for the validator', () => {
          expect(buildValidations(schema).validate(values)).toEqual({
            someEmail: 'Must be a valid email',
          });
        });
      });
    });

    context('when there are global form errors', () => {
      const schema = {
        _error: {
          validate: {
            validator: allFields => some(allFields, 'active'),
            errorMessage: 'At least one field must be active',
          },
        },
      };

      const values = {
        foo: 'inactive',
        bar: 'inactive',
      };

      it('returns those errors on the _error field', () => {
        expect(buildValidations(schema).validate(values)).toEqual({
          _error: 'At least one field must be active',
        });
      });
    });

    context('when there are nested fields', () => {
      const schema = {
        topLevelCondition: {
          validate: isPresent,
        },
        doesNotMatter: {},
        _fieldArrays: {
          nestedForms: {
            presentNestedInput: {
              validate: isPresent,
            },
            missingNestedInput: {
              validate: isPresent,
            },
            nestedDoesNotMatter: {},
          },
        },
      };

      const values = {
        topLevelCondition: 'heyoo',
        doesNotMatter: '',
        nestedForms: [{
          presentNestedInput: 'im here',
          missingNestedInput: '',
          nestedDoesNotMatter: '',
        }],
      };

      it('validates those nested fields', () => {
        expect(buildValidations(schema).validate(values)).toEqual({
          nestedForms: [{ missingNestedInput: 'Required' }],
        });
      });
    });

    context('when there are multiple nested field entries', () => {
      const schema = {
        topLevelCondition: {
          validate: isPresent,
        },
        doesNotMatter: {},
        _fieldArrays: {
          nestedForms: {
            someNestedInput: {
              validate: isPresent,
            },
            anotherNestedInput: {
              validate: isPresent,
            },
          },
        },
      };

      const values = {
        topLevelCondition: 'heyoo',
        doesNotMatter: '',
        nestedForms: [
          {
            someNestedInput: 'im here',
            anotherNestedInput: 'w00t',
          },
          {
            someNestedInput: '',
            anotherNestedInput: '',
          },
          {
            someNestedInput: 'i am fine',
            anotherNestedInput: '',
          },
        ],
      };

      it('validates those entries in order', () => {
        expect(buildValidations(schema).validate(values)).toEqual({
          nestedForms: [
            {},
            { someNestedInput: 'Required', anotherNestedInput: 'Required' },
            { anotherNestedInput: 'Required' },
          ],
        });
      });
    });

    context('when there are multiple nested fields within nested fields', () => {
      const schema = {
        _fieldArrays: {
          topLevelNestedForms: {
            topLevelNestedInput: {
              validate: isPresent,
            },
            _fieldArrays: {
              deeplyNestedForms: {
                deeplyNestedInput: {
                  validate: isPresent,
                },
              },
              seriouslyWhyWouldYouDoThis: {
                someRidiculousInput: {
                  validate: isPresent,
                },
              },
            },
          },
        },
      };

      const values = {
        topLevelNestedForms: [
          {
            topLevelNestedInput: 'im here',
            deeplyNestedForms: [
              {
                deeplyNestedInput: '',
              },
            ],
            seriouslyWhyWouldYouDoThis: [
              { someRidiculousInput: '' },
              { someRidiculousInput: 'booyahhhh' },
            ],
          },
        ],
      };

      it('validates those nested fields in order', () => {
        expect(buildValidations(schema).validate(values)).toEqual({
          topLevelNestedForms: [
            {
              deeplyNestedForms: [{ deeplyNestedInput: 'Required' }],
              seriouslyWhyWouldYouDoThis: [
                { someRidiculousInput: 'Required' },
                {},
              ],
            },
          ],
        });
      });
    });

    context('when there are fields with multiple validators', () => {
      context('and the validators do not have individual error messages', () => {
        const schema = {
          hasMultipleValidations: {
            validate: [
              {
                validator: (allValues, value) => value % 2,
              },
              {
                validator: (allValues, value) => value > 10,
              },
            ],
          },
        };

        const values = {
          hasMultipleValidations: 8,
        };

        it('returns a single default message for the field', () => {
          expect(buildValidations(schema).validate(values)).toEqual({
            hasMultipleValidations: 'Has Multiple Validations is not valid',
          });
        });
      });

      context('and the validators have individual error messages', () => {
        const schema = {
          hasMultipleValidations: {
            validate: [
              {
                errorMessage: 'Must be an odd number',
                validator: (allValues, value) => value % 2,
              },
              {
                errorMessage: 'Must be greater than 10',
                validator: (allValues, value) => value > 10,
              },
            ],
          },
        };

        context('and multiple validators for a given field fail', () => {
          const values = {
            hasMultipleValidations: 8,
          };

          it('returns a single default message for the field', () => {
            expect(buildValidations(schema).validate(values)).toEqual({
              hasMultipleValidations: 'Has Multiple Validations is not valid',
            });
          });
        });

        context('and one of the validators for a given field fails', () => {
          const values = {
            hasMultipleValidations: 12,
          };

          it('returns the custom error message for the failed validator', () => {
            expect(buildValidations(schema).validate(values)).toEqual({
              hasMultipleValidations: 'Must be an odd number',
            });
          });
        });
      });

      context('and the validators have individual validateIf conditions', () => {
        const schema = {
          hasMultipleValidations: {
            validate: [
              {
                errorMessage: 'The first validator failed!',
                validateIf: allValues => allValues.dependentField,
                validator: (allValues, value) => value % 2 === 0,
              },
              {
                errorMessage: 'The second validator failed!',
                validateIf: allValues => allValues.dependentField === false,
                validator: (allValues, value) => value > 10,
              },
            ],
          },
        };

        context('and one of the validators for a given field fails', () => {
          const values = {
            hasMultipleValidations: 3,
            dependentField: false,
          };

          it('returns the custom error message for the failed validator', () => {
            expect(buildValidations(schema).validate(values)).toEqual({
              hasMultipleValidations: 'The second validator failed!',
            });
          });
        });
      });

      context('and the one of the validators has a required condition', () => {
        const schema = {
          hasMultipleValidations: {
            validate: [
              {
                required: true,
                errorMessage: 'The first validator failed!',
                validateIf: allValues => allValues.dependentField,
                validator: (allValues, value) => value % 2 === 0,
              },
              {
                errorMessage: 'The second validator failed!',
                validateIf: allValues => allValues.dependentField === false,
                validator: (allValues, value) => value > 10,
              },
            ],
          },
        };

        const values = {
          hasMultipleValidations: null,
          dependentField: true,
        };

        it('returns the required error message for the field', () => {
          expect(buildValidations(schema).validate(values)).toEqual({
            hasMultipleValidations: 'Required',
          });
        });
      });
    });
  });

  context('when there are warn fields', () => {
    context('when top level', () => {
      const schema = {
        warnIfNull: {
          warn: isPresent,
        },
        warnButItIsThere: {
          warn: isPresent,
        },
        doNotWarn: {
          validate: isPresent,
        },
      };

      const values = { warnIfNull: null, doNotWarn: null, warnButItIsThere: 'i am here' };

      it('returns warnings when warn validator function evaluates false', () => {
        expect(buildValidations(schema).warn(values)).toEqual({ warnIfNull: 'Required' });
      });
    });

    context('when nested', () => {
      const schema = {
        warnIfNull: {
          warn: isPresent,
        },
        _fieldArrays: {
          nestedWarn: {
            nestedWarnField: {
              warn: isPresent,
            },
          },
        },
      };

      const values = {
        warnIfNull: null,
        nestedWarn: [{}, { nestedWarnField: 'i am here' }],
      };

      it('returns warnings when the nested warn fields validators functions evaluate false', () => {
        expect(buildValidations(schema).warn(values)).toEqual({
          warnIfNull: 'Required',
          nestedWarn: [
            { nestedWarnField: 'Required' },
            {},
          ],
        });
      });
    });
  });
});
