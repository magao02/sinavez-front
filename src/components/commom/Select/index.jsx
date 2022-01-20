import { useState, forwardRef, useCallback, useImperativeHandle } from "react";

import { Container } from "./styles";

const Select = ({ name, profissoes, ...rest }, ref) => {
    const [value, setValue] = useState(profissoes[0]);

    const handleChange = useCallback((event) => {
        setValue(event.target.value);
    });

    useImperativeHandle(
        ref,
        () => ({
            value,
        }),
        [value]
    )

    return (
    <Container {...rest}>
        <label>{name}</label>
        <select name={name} id={name} onChange={handleChange} value={value}>
            {profissoes.map((profissao, index) => <option value={profissao} key={index}>{profissao}</option>)}
        </select>
    </Container>
    )
};

export default forwardRef(Select);