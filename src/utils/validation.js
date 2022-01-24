import * as yup from 'yup';

const validationMessages = {
  requiredField: 'Este campo é obrigatório',
  invalidCPF: 'CPF inválido (formato: xxx.xxx.xxx-xx)',
  passwordTooShort: 'A senha deve ter no mínimo 8 dígitos',
  invalidEmail: 'Email inválido',
  invalidDate: 'Data inválida',
  invalidPhone: 'Formato Inválido',
  onlyNumbers: 'Apenas números são aceitos',
};

export async function requiredTextField(textValue) {
  return yup
  .string()
  .required(validationMessages.requiredField)
  .validate(textValue);
}

export async function testCpf(cpfValue) {
  return yup
  .string()
  .required(validationMessages.requiredField)
  .matches(/^\d{3}\.\d{3}\.\d{3}\-\d{2}$/, validationMessages.invalidCPF)
  .validate(cpfValue);
}

export async function testPassword(passwordValue) {
  return yup
  .string()
  .required(validationMessages.requiredField)
  .matches(/^.{8,}$/, validationMessages.passwordTooShort)
  .validate(passwordValue);
}

export async function testEmail(emailValue) {
  return yup
  .string()
  .required(validationMessages.requiredField)
  .matches(/^\S+@\S+$/, validationMessages.invalidEmail)
  .validate(emailValue);
}

export async function testDate(dateValue) {
  return yup
  .string()
  .required(validationMessages.requiredField)
  .matches(/^(0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])[- /.](19|20)\d\d$/, validationMessages.invalidDate)
  .validate(dateValue);
}

export async function testPhone(phoneValue) {
  return yup
  .string()
  .required(validationMessages.requiredField)
  .matches(/^[(][0-9]{2}[)][ ][-][ ]([0-9]{8}|[0-9]{9})$/, validationMessages.invalidPhone)
  .validate(phoneValue);
}

export async function testNumbers(rgValue) {
  return yup
  .string()
  .required(validationMessages.requiredField)
  .matches(/^\d+$/, validationMessages.onlyNumbers)
  .validate(rgValue);
}

export async function testNumberImposto(rgValue) {
  return yup
  .string()
  .matches(/^\d+$ || [.]/, validationMessages.onlyNumbers)
  .validate(rgValue);
}
