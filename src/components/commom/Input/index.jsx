import { useState, forwardRef, useCallback, useImperativeHandle } from "react";
import { Container, BaseInput } from "./styles";

const Input = ({ variant, label, name, validate, onChange, initialValue, ...rest }, ref) => {
    const [value, setValue] = useState(initialValue ?? '');
    const [alertMessage, setAlertMessage] = useState(null);

    const executeValidation = useCallback(
        async (valueToValidate) => {
            if (!validate) return true;
            try {
            await validate(valueToValidate);
            setAlertMessage(null);
            return true;
            } catch (validationError) {
                setAlertMessage(validationError.message);
                return false;
            }
        },
        [validate],
    );

    useImperativeHandle(
        ref,
        () => ({
            value,
            isValid: !alertMessage,
            validate: () => executeValidation(value),
            clear: () => setValue(''),
        }),
        [value, executeValidation, alertMessage]
    )

    const handleChange = useCallback((event) => {
        const { name, type, value } = event.target;

        let newValue = value;

    // Verifica se o campo é "valor" e o tipo é "number" para formatar como dinheiro
    if (name === "valorLancamento") {
      const numericValue = parseFloat(value.replace(/[^0-9]/g, "") || 0) / 100;
      newValue = numericValue.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
      });
    }

    setValue(newValue);
        onChange?.(event);
    },
    [onChange],
    );

    return(
    <Container variant={variant}>
        <div>
            {label && <label htmlFor={name}>{label}</label>}
            {alertMessage && <span>{alertMessage}</span>}
        </div>

        <BaseInput 
        id={name} 
        name={name} 
        value={value}
        onChange={handleChange}
        ref={ref}
                error={alertMessage}
        {...rest} 
        />
    </Container>
    )
};

export default forwardRef(Input);
