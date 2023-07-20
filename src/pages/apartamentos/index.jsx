import { useState } from "react";

import Apartamento from "../../components/Apartamento";

import Button from "../../components/commom/Button";
import { CounterInput, DropdownInput, SearchInput, SliderInput } from "../../components/SearchInputs";

import Placeholder from "../../assets/apartamento/placeholder.png";
import ReservaData from "../../assets/apartamento/reserva_data.svg";
import CaretRight from "../../assets/caret_right_white.svg";
import Navigation from "../../components/commom/Nav";

import Steps from "../../components/Steps";

import {
    Blue,
    Card,
    ColumnContent,
    Row,
    Tab,
    Tabs,
    Content,
    SearchHelp,
    NavSpacing,
    Title,
    SearchHelpContainer,
} from "../../styles/apartamentosStyles";
import Image from "next/image";

const Search = ({ tabIndex, setTabIndex }) => {
  return (
    <ColumnContent>
      <Card>
        <Tabs>
          <Tab selected={tabIndex === 0} onClick={() => setTabIndex(0)}>Apartamentos</Tab>
          <Tab selected={tabIndex === 1} onClick={() => setTabIndex(1)}>Áreas de Lazer</Tab>
        </Tabs>
        {
          tabIndex === 1 && <DropdownInput label="Espaço" options={["Piscina"]} />
        }

        <Row>
          <div className="column">
            <SearchInput innerLabel="Data" label="Chegada" type="date" />
            <SearchInput innerLabel="Horário" type="time" />
          </div>
          <div className="column">
            <SearchInput innerLabel="Data" label="Saída" type="date" />
            <SearchInput innerLabel="Horário" type="time" />
          </div>
        </Row>

        {
          tabIndex === 0 && <Row>
            <CounterInput min={0} label="Adultos" />
            <CounterInput min={0} label="Crianças" />
            <CounterInput min={0} label="Bebês" />
            <CounterInput min={0} label="Pets" />
          </Row>
        }
        
        {
          tabIndex === 0 && <DropdownInput label="Tipo de Apartamento" options={["Comum", "PCD"]} />
        }

        {
          tabIndex === 1 && <SliderInput label="Quantidade de Pessoas" min={1} max={25} value={4} />
        }
      </Card>
      <Button>BUSCAR {tabIndex === 0 ? "APARTAMENTOS" : "ÁREAS"}</Button>
    </ColumnContent>
  );
};

const Page = () => {
  const reserva = { from: "05/04/2023", to: "10/05/2023" };
  const proxReserva = { from: "07/06", to: "10/06" };

  const [tabIndex, setTabIndex] = useState(1);
  const [apartamentos, setApartamentos] = useState(Array(20).fill(0).map(() => {
    return {
      nome: "Apartamento algum ai",
      image: Placeholder,
      reserva,
      proxReserva,
      features: ["Ar-condicionado", "Wifi Grátis", "1 Suíte", "Aceita pets"],
      reservado: false,
    }
  }));
  const [areas, setAreas] = useState([]);

  return (
    <div>
      <Navigation selectedPage="apartamentos" variant="admin" />
      <NavSpacing />
      <Content>
        <Blue>
          <Search tabIndex={tabIndex} setTabIndex={setTabIndex} />
          <SearchHelpContainer>
            <h1>Faça sua reserva!</h1>
            <p>Siga os passos abaixo para buscar o apartamento perfeito para sua hospedagem.</p>
            <SearchHelp>
              <Steps values={["Datas", "Pessoas", "Tipo"]} current={0} />
              <Image src={ReservaData} />
              <div>
                <p>Escolha as datas da sua chegada e saída usando o teclado ou o calendário, o qual poderá ver os dias livres</p>
                <div className="buttonContainer">
                  <div className="button">
                    Próximo <img src={CaretRight.src} />
                  </div>
                </div>
              </div>
            </SearchHelp>
          </SearchHelpContainer>
        </Blue>

        {
          tabIndex === 0 && [
            <Title>Apartamentos Disponíveis</Title>,
            apartamentos.map((apt, i) => (
              <Apartamento
                nome={apt.nome}
                image={apt.image}
                reserva={apt.reserva}
                proxReserva={apt.proxReserva}
                features={apt.features}
                isReservado={apt.reservado}
                key={i}
              />
            ))
          ]
        }

        {
          tabIndex === 1 && [
            <Title>Áreas Disponíveis</Title>,
            areas.map((apt, i) => (
              <Apartamento
                nome={apt.nome}
                image={apt.image}
                reserva={apt.reserva}
                proxReserva={apt.proxReserva}
                features={apt.features}
                isReservado={apt.reservado}
                key={i}
              />
            ))
          ]
        }
      </Content>
    </div>
  );
};

export default Page;
