import * as yup from "yup";

const validationMessages = {
  requiredField: "Este campo é obrigatório",
  invalidCPF: "CPF inválido (digite apenas os números)",
  passwordTooShort: "A senha deve ter no mínimo 8 dígitos",
  invalidEmail: "Email inválido",
  invalidDate: "Data inválida",
  invalidPhone:
    "Formato Inválido (digite apenas os números do ddd + número do telefone)",
  onlyNumbers: "Apenas números são aceitos",
};

export async function requiredTextField(textValue) {
  return yup
    .string()
    .required(validationMessages.requiredField)
    .validate(textValue);
}

export async function TextField(textValue) {
  return yup
    .string()
    .validate(textValue);
}

export async function testRequiredCpf(cpfValue) {
  return yup
    .string()
    .required(validationMessages.requiredField)
    .matches(/^\d{3}\d{3}\d{3}\d{2}$/, validationMessages.invalidCPF)
    .validate(cpfValue);
}

export async function testCpf(cpfValue) {
  return yup
    .string()
    .matches(/^\d{3}\d{3}\d{3}\d{2}|\s*$/, validationMessages.invalidCPF)
    .validate(cpfValue);
}

export async function testRequiredPassword(passwordValue) {
  return yup
    .string()
    .required(validationMessages.requiredField)
    .matches(/^.{8,}$/, validationMessages.passwordTooShort)
    .validate(passwordValue);
}

export async function testPassword(passwordValue) {
  if (passwordValue == "") {
    return yup
      .string()
      .validate(passwordValue);
  } else {
    return yup
      .string()
      .matches(/^.{8,}$/, validationMessages.passwordTooShort)
      .validate(passwordValue);
  }
}

export async function testRequiredEmail(emailValue) {
  return yup
    .string()
    .required(validationMessages.requiredField)
    .matches(/^\S+@\S+$/, validationMessages.invalidEmail)
    .validate(emailValue);
}

export async function testEmail(emailValue) {
  if (emailValue == "") {
    return yup
      .string()
      .validate(emailValue);
  } else {
    return yup
      .string()
      .matches(/^\S+@\S+$/, validationMessages.invalidEmail)
      .validate(emailValue);
  }
}

export async function testRequiredData(dateValue) {
  return yup
    .string()
    .required(validationMessages.requiredField)
    .matches(
      /^(0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])[- /.](19|20)\d\d$/,
      validationMessages.invalidDate
    )
    .validate(dateValue);
}

export async function testDate(dateValue) {
  if (dateValue == "") {
    return yup
      .string()
      .validate(dateValue);
  } else {
    return yup
      .string()
      .matches(
        /^(0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])[- /.](19|20)\d\d$/,
        validationMessages.invalidDate
      )
      .validate(dateValue);
  }
}

export async function testRequiredPhone(phoneValue) {
  return yup
    .string()
    .required(validationMessages.requiredField)
    .matches(/^[0-9]{2}([0-9]{8}|[0-9]{9})$/, validationMessages.invalidPhone)
    .validate(phoneValue);
}

export async function testPhone(phoneValue) {
  if (phoneValue == "") {
    return yup
      .string()
      .validate(phoneValue);
  } else {
    return yup
      .string()
      .matches(/^[0-9]{2}([0-9]{8}|[0-9]{9})$/, validationMessages.invalidPhone)
      .validate(phoneValue);
  }
}

export async function testRequiredNumbers(numberValue) {
  return yup
    .string()
    .required(validationMessages.requiredField)
    .matches(/(?:\.|,|[0-9])*/, validationMessages.onlyNumbers)
    .validate(numberValue);
}

export async function testNumbers(numberValue) {
  if (numberValue == "") {
    return yup
      .string()
      .validate(numberValue);
  } else {
    return yup
      .string()
      .matches(/(?:\.|,|[0-9])*/, validationMessages.onlyNumbers)
      .validate(numberValue);
  }
}

export async function testNumberImposto(numberValue) {
  return yup
    .string()
    .matches(/^\d+$ || [.]/, validationMessages.onlyNumbers)
    .validate(numberValue);
}
