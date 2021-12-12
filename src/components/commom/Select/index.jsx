import { Container } from "./styles";

const Select = ({ name, profissoes, ...rest }) => (
    <Container {...rest}>
        <label>{name}</label>
        <select name={name} id={name}>
            {profissoes.map((profissao) => <option value={profissao}>{profissao}</option>)}
        </select>
    </Container>
);

export default Select;