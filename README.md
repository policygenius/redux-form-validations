# redux-form-validations
A collection of utilities for validations in redux-form V6

Note: this project is under initial development, API may change (we will follow sem-ver.

## Example

```
$ npm install --save redux-form-validations
```

```javascript
import { React } from 'react';
import { reduxForm } from 'redux-form';
import { buildValidations, isPresent, isZipCode } from 'redux-form-validations';
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

## Prior work
[redux-form-schema](https://github.com/Lighthouse-io/redux-form-schema) is the main
inspiration for this project. After redux-form moved to V6, this project was deprecated,
since a large part of its functionality was obselete. However, we still liked being able
to define our validations with a simple and declarative API. This small library aims to
supply that abstraction with some built-in validators and configuration options.

## Contributing/ Todos
This is a green project, and we are open to feature suggestions and other improvements.
Additionally, you can contribute by helping with these outstanding todos:

* Tighten up API for V1
* Add documentation
* Add more validators for common uses
* More configuration options
