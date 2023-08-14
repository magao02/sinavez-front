import { useEffect, useMemo, useState } from "react";

import Apartamento from "../../components/Apartamento";

import Button from "../../components/commom/Button";
import { CounterInput, DropdownInput, SearchInput, SliderInput } from "../../components/SearchInputs";

import Placeholder from "../../assets/apartamento/placeholder.png";
import CaretLeft from "../../assets/caret_left_white.svg";
import CaretRight from "../../assets/caret_right_white.svg";
import WomanSunglasses from "../../assets/woman_sunglasses.svg";
import SmileySad from "../../assets/smiley_sad.svg";
import Navigation from "../../components/commom/Nav";

import ApartmentTutorialStep1 from "../../assets/apartamento/tutorial_apartment/step1.svg";
import ApartmentTutorialStep2 from "../../assets/apartamento/tutorial_apartment/step2.svg";
import ApartmentTutorialStep3 from "../../assets/apartamento/tutorial_apartment/step3.svg";

import LazerTutorialStep1 from "../../assets/apartamento/tutorial_lazer/step1.svg";
import LazerTutorialStep2 from "../../assets/apartamento/tutorial_lazer/step2.svg";
import LazerTutorialStep3 from "../../assets/apartamento/tutorial_lazer/step3.svg";

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
import { getAllRecreationAreas } from "../../services/recreationArea";

const Search = ({ tabIndex, setTabIndex, chegadaDate, setChegadaDate, saidaDate, setSaidaDate, adultos, setAdultos, criancas, setCriancas, bebes, setBebes, animais, setAnimais }) => {
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
            <SearchInput innerLabel="Data" label="Chegada" type="date" initialValue={chegadaDate} onChange={ev => setChegadaDate(ev.target.valueAsDate)} />
            <SearchInput innerLabel="Horário" type="time" />
          </div>
          <div className="column">
            <SearchInput innerLabel="Data" label="Saída" type="date" initialValue={saidaDate} onChange={ev => setSaidaDate(ev.target.valueAsDate)} />
            <SearchInput innerLabel="Horário" type="time" />
          </div>
        </Row>

        {
          tabIndex === 0 && <Row>
            <CounterInput min={0} value={adultos} onChange={setAdultos} label="Adultos" />
            <CounterInput min={0} value={criancas} onChange={setCriancas} label="Crianças" />
            <CounterInput min={0} value={bebes} onChange={setBebes} label="Bebês" />
            <CounterInput min={0} value={animais} onChange={setAnimais} label="Pets" />
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

const SearchHelpPage = ({ text, previous, next, last }) => {
  return (
    <div>
      <p>{text}</p>
      <div className="buttonContainer">
        { previous && <div className="button" onClick={previous}>
          <img src={CaretLeft.src} /> Anterior
        </div> }
        <div className="button" onClick={next}>
          { last ? "Início" : "Próximo" } <img src={CaretRight.src} />
        </div>
      </div>
    </div>
  );
}

const ApartmentSearchHelp = () => {
  const [pageIndex, setPageIndex] = useState(0);
  const previous = () => {
    if (pageIndex !== 0)
      setPageIndex(pageIndex - 1);
  };
  const next = () => {
    if (pageIndex === 2) {
      setPageIndex(0);
    } else {
      setPageIndex(pageIndex + 1);
    }
  };
  return (
    <SearchHelp>
      <Steps values={["Datas", "Pessoas", "Tipo"]} current={pageIndex} variant="contrast" />
      <Image src={[ApartmentTutorialStep1, ApartmentTutorialStep2, ApartmentTutorialStep3][pageIndex]} />
      
      { pageIndex === 0 && <SearchHelpPage next={next}
        text="Escolha as datas da sua chegada e saída usando o teclado ou o calendário, o qual poderá ver os dias livres" /> }
      
      { pageIndex === 1 && <SearchHelpPage previous={previous} next={next}
        text="Informe a quantidade de pessoas e animais de estimação que acompanharão você em sua estadia. " /> }
      
      { pageIndex === 2 && <SearchHelpPage previous={previous} next={next} last={true}
        text="Caso tenha necessidade de um quarto adaptado, selecione o tipo do apartamento “PCD”, do contrário selecione “Comum”." /> }
    </SearchHelp>
  )
}

const LazerSearchHelp = () => {
  const [pageIndex, setPageIndex] = useState(0);
  const previous = () => {
    if (pageIndex !== 0)
      setPageIndex(pageIndex - 1);
  };
  const next = () => {
    if (pageIndex === 2) {
      setPageIndex(0);
    } else {
      setPageIndex(pageIndex + 1);
    }
  };
  return (
    <SearchHelp>
      <Steps values={["Espaço", "Horário", "Pessoas"]} current={pageIndex} variant="contrast" />
      <Image src={[LazerTutorialStep1, LazerTutorialStep2, LazerTutorialStep3][pageIndex]} />
      
      { pageIndex === 0 && <SearchHelpPage next={next}
        text="Escolha o espaço que deseja reservar para o seu lazer, trabalho ou evento. " /> }
      
      { pageIndex === 1 && <SearchHelpPage previous={previous} next={next}
        text="Informe a data e o horário que começa e termina sua reserva, digitando ou selecionado o calendário." /> }
      
      { pageIndex === 2 && <SearchHelpPage previous={previous} next={next} last={true}
        text="Arraste o circulo para direita e esquerda até o balão cinza informar o número de pessoas que compareceram ao espaço. " /> }
    </SearchHelp>
  )
}

const Page = () => {
  const [tabIndex, setTabIndex] = useState(0);
  const [apartamentos, setApartamentos] = useState([]);
  const [areas, setAreas] = useState([]);

  const [chegadaDate, setChegadaDate] = useState(new Date());
  const [saidaDate, setSaidaDate] = useState(new Date());
  const [adultos, setAdultos] = useState(1);
  const [criancas, setCriancas] = useState(0);
  const [bebes, setBebes] = useState(0);
  const [animais, setAnimais] = useState(0);

  const authContext = useAuth();

  useEffect(async () => {
    const req = await getAllApartments(authContext.token);
    const data = req.data;
    setApartamentos(data);
  }, [authContext.token]);

  useEffect(async () => {
    const req = await getAllRecreationAreas(authContext.token);
    const data = req.data;
    setAreas(data);
  }, [authContext.token]);

  const queryData = useMemo(() => {
    return {
      adultos,
      criancas,
      bebes,
      animais
    }
  }, [chegadaDate, saidaDate, adultos, criancas, bebes, animais]);

  return (
    <div>
      <Navigation selectedPage="apartamentos" variant="admin" />
      <NavSpacing />
      <Content>
        <Blue>
          <Search tabIndex={tabIndex} setTabIndex={setTabIndex} chegadaDate={chegadaDate} setChegadaDate={setChegadaDate} saidaDate={saidaDate} setSaidaDate={setSaidaDate} adultos={adultos} setAdultos={setAdultos} criancas={criancas} setCriancas={setCriancas} bebes={bebes} setBebes={setBebes} animais={animais} setAnimais={setAnimais} />
          <SearchHelpContainer>
            <h1>Faça sua reserva!</h1>
            { tabIndex === 0 && <p>Siga os passos abaixo para buscar o apartamento perfeito para sua hospedagem.</p> }
            { tabIndex === 1 && <p>Siga os passos abaixo para buscar as áreas de lazer perfeita para sua necessidade.</p> }
            
            { tabIndex === 0 && <ApartmentSearchHelp /> }
            { tabIndex === 1 && <LazerSearchHelp /> }
          </SearchHelpContainer>
        </Blue>

        {
          tabIndex === 0 && (apartamentos.length ? [
            <Title>Apartamentos Disponíveis</Title>,
            apartamentos.map(apt => (
              <Apartamento
                obj={{...apt, images: [Placeholder]}}
                key={apt.urlApt}
                queryData={queryData}
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
            areas.map(apt => (
              <Apartamento
                obj={{...apt, images: [Placeholder]}}
                key={apt.urlRec}
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
