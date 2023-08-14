import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/light.css";
import { CalendarWrapper, Container, ReservarButton } from "./styles";
import { useState } from "react";

const CalendarButton = ({setDatas}) => {
    const [errorMsg, setErrorMsg] = useState(false);

    const formatDate = (date) => {

        if(date != undefined){
            var formattedDate = date.toLocaleDateString('pt-BR', {
                day: 'numeric',
                month: 'numeric',
                year: 'numeric',
            })
            setErrorMsg(false)
            return formattedDate;
        }else{
            setErrorMsg(true)
        }
    }

    return (
        <Container>
            <CalendarWrapper>
                {errorMsg ?
                 <p style={{color: "red"}}>Preencha a Data Corretamente</p>
                 :
                 <p>Disponivel a partir do dia:</p>
                 }
                <Flatpickr options={{
                    mode: "range",
                    dateFormat: "d/m/Y",
                    minDate:"today",
                    locale: {
                        rangeSeparator: " ate " 
                    },
                    defaultDate: "today",
                    onClose: (e) => {
                        try{
                            var copy = []
                            copy[0] = formatDate(e[0])
                            copy[1] = formatDate(e[1])  
                        }finally{
                            setDatas(copy)
                        }
                    }
                }
                }/>
            </CalendarWrapper>
            <ReservarButton>
                RESERVAR
            </ReservarButton>
        </Container>
    )
}

export default CalendarButton;