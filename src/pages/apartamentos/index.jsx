import { useEffect, useState } from "react";

import Apartamento from "../../components/Apartamento";

import Button from "../../components/commom/Button";
import { CounterInput, DropdownInput, SearchInput, SliderInput } from "../../components/SearchInputs";

import Placeholder from "../../assets/apartamento/placeholder.png";
import ReservaData from "../../assets/apartamento/reserva_data.svg";
import PeoplePartying from "../../assets/people_partying.svg";
import CaretRight from "../../assets/caret_right_white.svg";
import WomanSunglasses from "../../assets/woman_sunglasses.svg";
import SmileySad from "../../assets/smiley_sad.svg";
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
    NoResults,
    BottomPadding,
    NoMoreResults,
} from "../../styles/apartamentosStyles";
import Image from "next/image";
import { getAllApartments } from "../../services/apartments";
import { useAuth } from "../../contexts/AuthContext";

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
  const reserva = { from: "??", to: "??" };
  const proxReserva = { from: "??", to: "??" };

  const [tabIndex, setTabIndex] = useState(0);
  const [apartamentos, setApartamentos] = useState([]);
  const [areas, setAreas] = useState([]);

  const authContext = useAuth();

  useEffect(async () => {
    const req = await getAllApartments(authContext.token);
    const data = req.data;
    setApartamentos(data.map(apt => {
      const features = [];
      if (apt.wifi)
        features.push("Wifi Grátis");
      if (apt.suite)
        features.push("1 Suíte");
      if (apt.animais)
        features.push("Aceita pets");
      return {
        nome: apt.titulo,
        image: Placeholder,
        reserva,
        proxReserva,
        features,
        reservado: false,
      };
    }))
  }, [authContext.token]);

  return (
    <div>
      <Navigation selectedPage="apartamentos" variant="admin" />
      <NavSpacing />
      <Content>
        <Blue>
          <Search tabIndex={tabIndex} setTabIndex={setTabIndex} />
          <SearchHelpContainer>
            <h1>Faça sua reserva!</h1>
            { tabIndex === 0 && <p>Siga os passos abaixo para buscar o apartamento perfeito para sua hospedagem.</p> }
            { tabIndex === 1 && <p>Siga os passos abaixo para buscar as áreas de lazer perfeita para sua necessidade.</p> }
            { tabIndex === 0 && <SearchHelp>
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
            </SearchHelp> }

            { tabIndex === 1 && <SearchHelp>
              <Steps values={["Espaço", "Horário", "Pessoas"]} current={0} />
              <Image src={PeoplePartying} />
              <div>
                <p>Escolha as datas da sua chegada e saída usando o teclado ou o calendário, o qual poderá ver os dias livres</p>
                <div className="buttonContainer">
                  <div className="button">
                    Próximo <img src={CaretRight.src} />
                  </div>
                </div>
              </div>
            </SearchHelp> }

          </SearchHelpContainer>
        </Blue>

        {
          tabIndex === 0 && (apartamentos.length ? [
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
            )),
            <NoMoreResults>
              <Image src={SmileySad} /> Não há mais resultados a exibir.
            </NoMoreResults>
          ] : 
          <NoResults>
            <h1>Não há apartamentos para sua busca!</h1>
            <Image src={WomanSunglasses} />
            <p>Tente realizar a busca novamente com outras datas, outra quantidade de pessoas ou outros tipo de quarto.</p>
          </NoResults>)
        }


        {
          tabIndex === 1 && (areas.length ? [
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
            )),
            <NoMoreResults>
              <Image src={SmileySad} /> Não há mais resultados a exibir.
            </NoMoreResults>
          ] :
          <NoResults>
            <h1>Não há espaços que correspondem à sua busca!</h1>
            <Image src={WomanSunglasses} />
            <p>Tente realizar a busca novamente com outras datas, outros períodos de tempo e outra quantidade de pessoas.</p>
          </NoResults>)
        }

        <BottomPadding />
      </Content>
    </div>
  );
};

export default Page;
