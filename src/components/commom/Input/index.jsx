import { useState, forwardRef, useCallback, useImperativeHandle } from "react";
import { Container, BaseInput } from "./styles";

const Input = ({ variant, label, name, validate, onChange, previousValue, ...rest }, ref) => {
    const [value, setValue] = useState(previousValue);
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
        setValue(event.target.value);
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
