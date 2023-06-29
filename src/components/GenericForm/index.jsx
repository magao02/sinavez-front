import { InputContainer, Description, InputBox } from "./styles";

import Input from "../commom/Input";

export const GenericForm = ({ children }) => {
  return (
    <InputContainer>
      {children}
    </InputContainer>
  );
};

export const GenericFormValue = ({ variant, description, ...rest }) => {
  return (
    <InputBox>
      <Input
        variant={variant ?? "default"}
        {...rest}
      />
      <Description>{description}</Description>
    </InputBox>
  );
}
