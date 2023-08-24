import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/light.css";
import { CalendarWrapper, CalendarContainer, ReservarButton, BusyButton, Container, AvailableButton } from "./styles";
import { useEffect, useState } from "react";
import { ButtonArea } from "../../styles/apartamentoStyles";
import Door from "../../assets/Door.svg";
import Image from "next/image";
import open_door from "../../assets/open_door.svg"

const CalendarButton = ({ datas, setDatas }) => {
  const [errorMsg, setErrorMsg] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);

  const formatDate = (date) => {
    if (date != undefined) {
      var formattedDate = date.toLocaleDateString("pt-BR", {
        day: "numeric",
        month: "numeric",
        year: "numeric",
      });
      setErrorMsg(false);
      return formattedDate;
    } else {
      setErrorMsg(true);
    }
  };

  const verifyData = () => {
    if (datas.length > 0) {
      return datas;
    } else {
      return "today";
    }
  };

  const defaultDate = () => {
    return verifyData();
  };

  return (
    <Container>
      {
        showCalendar ?    
        <BusyButton>
          <Image src={Door} />
          OCUPADO
        </BusyButton>
        :
        <AvailableButton>
          <Image src={open_door} />
          DISPONÍVEL
        </AvailableButton>
      }
      {showCalendar ? (
        <CalendarContainer>
          <CalendarWrapper>
            {errorMsg ? (
              <p style={{ color: "red" }}>Preencha a Data Corretamente</p>
            ) : (
              <p>Disponivel a partir do dia:</p>
            )}
            <Flatpickr
              options={{
                mode: "range",
                dateFormat: "d/m/Y",
                minDate: "today",
                locale: {
                  rangeSeparator: " ate ",
                },
                defaultDate: defaultDate(),
                onClose: (e) => {
                  try {
                    var copy = [];
                    copy[0] = formatDate(e[0]);
                    copy[1] = formatDate(e[1]);
                  } finally {
                    setDatas(copy);
                  }
                },
              }}
            />
          </CalendarWrapper>
          <ReservarButton onClick={() => setShowCalendar(!showCalendar)}>RESERVAR</ReservarButton>
        </CalendarContainer>
      ) : (
          <ReservarButton
            style={{ fontSize: "18px" }}
            onClick={() => setShowCalendar(!showCalendar)}
          >
            RESERVAR
          </ReservarButton>

      )}
   </Container>
  );
};

export default CalendarButton;
