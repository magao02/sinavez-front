import { InputContainer, Description, InputBox } from "./styles";

import Input from "../commom/Input";
import { forwardRef, useRef, useImperativeHandle, useEffect } from "react";

export const GenericForm = ({ children }) => {
  return (
    <InputContainer>
      {children}
    </InputContainer>
  );
};

export const GenericFormValue = forwardRef(({ variant, description, ...rest }, ref) => {
  const valueRef = useRef(null);

  useEffect(() => {
    if (ref && !ref.current) {
      ref.current = {
        validate: () => valueRef.current.validate()
      };
    }
  });

  const onChange = event => {
    if (ref)
      ref.current.value = event.target.value;
  };

  return (
    <InputBox>
      <Input
        variant={variant ?? "default"}
        ref={valueRef}
        initialValue={ref?.current?.value}
        onChange={onChange}
        {...rest}
      />
      <Description>{description}</Description>
    </InputBox>
  );
});
