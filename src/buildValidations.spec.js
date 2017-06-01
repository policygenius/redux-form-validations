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
      const values = { someEmail: null };

      it('returns an error that the field is required', () => {
        expect(buildValidations(schema).validate(values)).toEqual({
          someEmail: 'Required',
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
