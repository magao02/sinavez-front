import Apartamento from "../../components/Apartamento";

import Button from "../../components/commom/Button";
import { CounterInput, DropdownInput, SearchInput } from "../../components/SearchInputs";

import Placeholder from "../../assets/apartamento/placeholder.png";
import Navigation from "../../components/commom/Nav";

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
} from "../../styles/apartamentosStyles";

const Search = () => {
  return (
    <ColumnContent>
      <Card>
        <Tabs>
          <Tab selected>Apartamentos</Tab>
          <Tab>Áreas de Lazer</Tab>
        </Tabs>
        <Row>
          <SearchInput label="Chegada" type="date" />
          <SearchInput label="Saída" type="date" />
        </Row>
        <Row>
          <CounterInput min={0} label="Adultos" />
          <CounterInput min={0} label="Crianças" />
          <CounterInput min={0} label="Bebês" />
          <CounterInput min={0} label="Pets" />
        </Row>
        
        <DropdownInput label="Tipo de Apartamento" options={["Comum", "PCD"]} />
      </Card>
      <Button>BUSCAR APARTAMENTOS</Button>
    </ColumnContent>
  );
};

const Page = () => {
  const reserva = { from: "05/04/2023", to: "10/05/2023" };
  const proxReserva = { from: "07/06", to: "10/06" };

  return (
    <div>
      <Navigation selectedPage="apartamentos" variant="admin" />
      <NavSpacing />
      <Content>
        <Blue>
          <Search />
          <SearchHelp>Escolha as datas da sua chegada e saída usando o teclado ou o calendário, o qual poderá ver os dias livres</SearchHelp>
        </Blue>

        <Title>Apartamentos Disponíveis</Title>

        {
          Array(20).fill(0).map(() => (
            <Apartamento
              nome="Apartamento algum ai"
              image={Placeholder}
              reserva={reserva}
              proxReserva={proxReserva}
              features={["Ar-condicionado", "Wifi Grátis", "1 Suíte", "Aceita pets"]}
            />
          ))
        }
      </Content>
    </div>
  );
};

export default Page;
