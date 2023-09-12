import { useState } from "react"
import { Container, Option, OptionArea } from "./styles"

const MonthsOptions = ( { month ,setMonth } ) => {

    const [selectedMonth, setSelectedMonth] = useState(month)

    const handleClick = (month) => {
        setSelectedMonth(month)
        setMonth(month)
    }

    const months = [
        {name: "Janeiro", month: 1 },
        {name: "Fevereiro", month: 2 },
        {name: "Março", month: 3 },
        {name: "Abril", month: 4 },
        {name: "Maio", month: 5 },
        {name: "Junho", month: 6 },
        {name: "Julho", month: 7 },
        {name: "Agosto", month: 8 },
        {name: "Setembro", month: 9 },
        {name: "Outubro", month: 10 },
        {name: "Novembro", month: 11 },
        {name: "Dezembro", month: 12 },
    ]
    
    return (
        <Container>
            <span>Reservas do mês de:</span>
            <OptionArea onClick={(e) => handleClick(e.target.id)}>
                {months.map((item) => {
                    return (
                        <Option id={item.month} selected={selectedMonth == item.month}>{item.name}</Option>
                    )
                })}
            </OptionArea>
        </Container>
    )
}


export default MonthsOptions