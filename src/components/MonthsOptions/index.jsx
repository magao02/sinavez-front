import { Container, Option, OptionArea } from "./styles"

const MonthsOptions = () => {
    return (
        <Container>
            <span>Reservas do mês de:</span>
            <OptionArea>
                <Option>Janeiro</Option>
                <Option>Fevereiro</Option>
                <Option>Março</Option>
                <Option>Abril</Option>
                <Option>Maio</Option>
                <Option>Junho</Option>
                <Option>Julho</Option>
                <Option>Agosto</Option>
                <Option>Setembro</Option>
                <Option>Outubro</Option>
                <Option>Novembro</Option>
                <Option>Dezembro</Option>
            </OptionArea>
        </Container>
    )
}


export default MonthsOptions