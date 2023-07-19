import { useState } from "react";

import Apartamento from "../../components/Apartamento";

import Button from "../../components/commom/Button";
import { CounterInput, DropdownInput, SearchInput } from "../../components/SearchInputs";

import Placeholder from "../../assets/apartamento/placeholder.png";
import ReservaData from "../../assets/apartamento/reserva_data.svg";
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
          <SearchInput label="Chegada" type="date" />
          <SearchInput label="Saída" type="date" />
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
      </Card>
      <Button>BUSCAR {tabIndex === 0 ? "APARTAMENTOS" : "ÁREAS"}</Button>
    </ColumnContent>
  );
};

const Page = () => {
  const reserva = { from: "05/04/2023", to: "10/05/2023" };
  const proxReserva = { from: "07/06", to: "10/06" };

  const [tabIndex, setTabIndex] = useState(0);

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
              <p>Escolha as datas da sua chegada e saída usando o teclado ou o calendário, o qual poderá ver os dias livres</p>
            </SearchHelp>
          </SearchHelpContainer>
        </Blue>

        {
          tabIndex === 0 && [
            <Title>Apartamentos Disponíveis</Title>,
            Array(20).fill(0).map((_, i) => (
              <Apartamento
                nome="Apartamento algum ai"
                image={Placeholder}
                reserva={reserva}
                proxReserva={proxReserva}
                features={["Ar-condicionado", "Wifi Grátis", "1 Suíte", "Aceita pets"]}
                key={i}
              />
            ))
          ]
        }

        {
          tabIndex === 1 && [
            <Title>Áreas Disponíveis</Title>,
            Array(2).fill(0).map((_, i) => (
              <Apartamento
                nome="Apartamento algum ai"
                image={Placeholder}
                reserva={reserva}
                proxReserva={proxReserva}
                features={["Ar-condicionado", "Wifi Grátis", "1 Suíte", "Aceita pets"]}
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
