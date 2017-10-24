export interface FormSchema {
  [fieldName: string]: FieldSchema
}

export interface FieldSchema {
  [propName: string]: FieldValidationSpec
}

export interface FieldValidationSpec {
  [propName: string]: any
}

export interface FormValidations {
  warn: (values: object) => ErrorMap;
  validate: (values: object) => ErrorMap;
}

export interface ErrorMap {
  [propName: string]: string
}

export interface Validator {
  validator: (values: object, value: any) => boolean;
  errorMessage: string
}

export function buildValidations(schema: FormSchema): FormValidations;
export function isBetween(min: number, max: number): Validator;
export function isDateAfter(date: Date | string): Validator;
export function isDateInPast(): Validator;
export function isEmail(): Validator;
export function isPresent(): Validator;
export function isZipCode(): Validator;
