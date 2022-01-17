import * as yup from 'yup';

const validationMessages = {
  requiredField: 'Este campo é obrigatório',
  invalidCPF: 'O CPF deve conter 11 dígitos',
  passwordTooShort: 'A senha deve ter no mínimo 8 dígitos',
};

export async function requiredTextField(textValue) {
  return yup
  .string()
  .required(validationMessages.requiredField)
  .validate(textValue);
}

export async function requireCpfField(cpfValue, length) {
  return yup
  .string()
  .required(validationMessages.invalidCPF)
  .length(length, validationMessages.invalidCPF)
  .validate(cpfValue);
}

export async function requirePasswordField(passwordValue, minLength) {
  return yup
  .string()
  .required(validationMessages.requiredField)
  .min(minLength, validationMessages.passwordTooShort)
  .validate(passwordValue);
}

