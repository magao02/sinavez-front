import Navigation from "../../components/commom/Nav";
import lupa from "../../assets/lupa.svg";
import {
  Container,
  FiltersArea,
  Header,
  InputArea,
  MainContent,
  SearchArea,
  Select,
  Button,
  ToggleArea,
  AmbienteTitle,
  SelectAmbient,
  AmbientsArea,
  AmbientWrapper
} from "../../styles/manageReservations";
import Input from "../../components/commom/Input";
import filter from "../../assets/filter.svg";
import { useState } from "react";
import AmbientModal from "../../components/AmbientModal";

const ManageReserVations = () => {

    const [isSelected, setIsSelected] = useState(true)

    const handleClick = () => {
        setIsSelected(!isSelected);
    };

    const [aptos, setAptos] = useState([])


  return (
    <Container>
      <Header>
        <Navigation variant={"admin"} />
      </Header>
      <MainContent>
        <h1>Gerencie as Reservas</h1>
        <SearchArea>
          <FiltersArea>
            <InputArea width={"75%"} gap={"5px"} paddingLeft={"10px"}>
              <img src={lupa.src} alt="Lupa" />
              <Input
                variant={"searchApto"}
                placeholder="Procure pelo nome"
                style={{ border: "none", outline: "none" }}
              />
            </InputArea>
            <InputArea width={"25%"} gap={"0px"} paddingLeft={"0px"}>
            <img src={filter.src}></img>
              <Select name="tipo" id="selectAmbiente">
                <option value="Filtrar Busca" disabled hidden selected>Filtrar Busca</option>
                <option value="Ocupados (neste mês)">Ocupados (neste mês)</option>
                <option value="Disponíveis (neste mês)">Disponíveis (neste mês)</option>
              </Select>
            </InputArea>
          </FiltersArea>
          <Button><span style={{fontSize:"22px"}}>+</span> ADICIONAR AMBIENTE</Button>
        </SearchArea>
        <ToggleArea>
            <SelectAmbient>
                <AmbienteTitle isSelected={isSelected} onClick={handleClick}>
                    <span>Apartamentos</span>
                </AmbienteTitle>
                <AmbienteTitle isSelected={!isSelected} onClick={handleClick}>
                    <span>Áreas de lazer</span>
                </AmbienteTitle>
            </SelectAmbient>   
            <AmbientsArea>
                <AmbientWrapper>
                    <AmbientModal>
                    </AmbientModal>
                </AmbientWrapper>
                <AmbientWrapper>
                    <AmbientModal>
                    </AmbientModal>
                </AmbientWrapper>
                <AmbientWrapper>
                    <AmbientModal>
                    </AmbientModal>
                </AmbientWrapper>
                <AmbientWrapper>
                    <AmbientModal>
                    </AmbientModal>
                </AmbientWrapper>
            </AmbientsArea>

        </ToggleArea>

      </MainContent>
    </Container>
  );
};

export default ManageReserVations;
