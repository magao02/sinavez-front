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
import { useEffect, useState } from "react";
import AmbientModal from "../../components/AmbientModal";
import * as serviceApto from "../../services/Apto";
import * as serviceArea from "../../services/RecreationArea";
import { useAuth } from "../../contexts/AuthContext";

const ManageReserVations = () => {

    const [isSelected, setIsSelected] = useState(true)
    const [toShow, setToShow] = useState(true)
    const [aptos, setAptos] = useState([])
    const [recreationArea, setRecreationArea] = useState([])
    const [searchValue, setSearchValue] = useState("")

    const authContext = useAuth()

    const handleSelect = () => {
        setToShow(!toShow)
        setIsSelected(!isSelected);
    };

    const getAptos = async () => {
        var {data} = await serviceApto.getAllApartaments(authContext.token);
        setAptos(data)
    }

    const getRecreationAreas = async () => {
        var {data} = await serviceArea.getAllRecreationAreas(authContext.token);
        setRecreationArea(data)
    }

    const getIcons = (data) => {
        var obj = {
            "suite": data.suite,
            "wifi": data.wifi,
            "animais": data.animais
        }
        return obj;
    }

    const lowerSearch = searchValue.toLowerCase(); 

    const AptoFiltrado = aptos.filter((data) => data.titulo.toLowerCase().includes(lowerSearch))

    const RecreationAreaFiltrada = recreationArea.filter((RecreationArea) => RecreationArea.titulo. toLowerCase().includes(lowerSearch));

    useEffect(() => {
        getAptos()
        getRecreationAreas()
    },[])



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
                onChange={(e) => setSearchValue(e.target.value)}
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
                <AmbienteTitle isSelected={isSelected} onClick={handleSelect}>
                    <span>Apartamentos</span>
                </AmbienteTitle>
                <AmbienteTitle isSelected={!isSelected} onClick={handleSelect}>
                    <span>Áreas de lazer</span>
                </AmbienteTitle>
            </SelectAmbient>   
            <AmbientsArea>
                {toShow ?
                    AptoFiltrado.map((data) => {
                        return (
                            <AmbientWrapper>
                                <AmbientModal title={data.titulo} itens={getIcons(data)}>
                                </AmbientModal>
                            </AmbientWrapper>
                        )
                    })
                    :
                    RecreationAreaFiltrada.map((data) => {
                        return (
                            <AmbientWrapper>
                                <AmbientModal title={data.titulo} itens={getIcons(data)}>
                                </AmbientModal>
                            </AmbientWrapper>
                        )
                    })

                }
            </AmbientsArea>

        </ToggleArea>

      </MainContent>
    </Container>
  );
};

export default ManageReserVations;
