<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [Purpose](#purpose)
- [Getting Started](#getting-started)
- [Usage](#usage)
  - [Example](#example)
  - [Custom validators](#custom-validators)
- [Contributing / Todos](#contributing--todos)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# Purpose
A collection of utilities for validations in redux-form V6.

[redux-form-schema](https://github.com/Lighthouse-io/redux-form-schema) is the main
inspiration for this project. After redux-form moved to V6, this project was deprecated,
since a large part of its functionality was obselete. However, we still liked being able
to define our validations with a simple and declarative API. This small library aims to
supply that abstraction with some built-in validators and configuration options.

# Getting Started
```
$ npm install --save redux-form-validations
```

# Usage
## Example
```javascript
import { React } from 'react';
import { reduxForm } from 'redux-form';
import { buildValidations, isPresent, isZipCode, isDateInPast, isDateAfter } from 'redux-form-validations';
import { uniq } from 'lodash';

const { warn, validate } = buildValidations({
  firstName: {
    validate: isPresent
  },
  lastName: {
    warn: {
      ...isPresent,
      errorMessage: 'Last names are helpful'
    }
  },
  zipCode: {
    validate: {
      ...isZipCode,
      required: true
    }
  },
  dateApplied: {
    validate: [
      isDateInPast,
      isDateAfter('04/19/1988'),
      {
        ...isPresent,
        validateIf: (allValues, value) => allValues.dependentField
      }
    ]
  },
  _fieldArrays: {
    hobbies: {
      _error: {
        validate: {
          validator: (fields) => {
            const names = field.map(field => field.name);
            return uniq(names).length === names.length;
          },
          errorMessage: 'Hobby names must be unique'
        }
      }
    }
  }
});

class MyForm extends React.Component { ... }

export default reduxForm({ warn, validate })(MyForm);
```

## Custom validators
Every field defined in your schema object has top-level keys `warn` and `validate` which are used to build warn and validate functions for redux-form connected components. These keys take a _validator object_, which has the shape:

`validator`: Function (allFields, value) => Boolean
If the return value is true, then the field is valid, if false, an error is added.
`errorMessage`: String || Function (allField, value) => String
The error message that is returned with the `validate` or `warn` function call when the `validator` returns false.

Alternatively, you can assign a function that returns a _validator object_ to either `warn` or `validate` that will receive `props` from your ReduxForm wrapped component. This is helpful if you need to validate based on information outside of the form state.

Example:

```javascript
const { warn, validate } = buildValidations({
  firstName: {
    validate: (props) => ({
      validator: (fields) => {
        return props.someBoolean && fields.numbers > 0,
      }
    }),
  },
});
```

# Contributing / Todos
This is a green project, and we are open to feature suggestions and other improvements.
Additionally, you can contribute by helping with these outstanding todos:

* Tighten up API for V1
* Add documentation
* Add more validators for common uses
* More configuration options
