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
  AmbientWrapper,
  LoadItens,
  VerMaisButtons,
  DropdownArea,
  AddAmbienteArea
} from "../../styles/manageReservations";
import Input from "../../components/commom/Input";
import { useEffect, useState } from "react";
import AmbientModal from "../../components/AmbientModal";
import * as serviceApto from "../../services/apartments";
import * as serviceArea from "../../services/recreationArea";
import { useAuth } from "../../contexts/AuthContext";
import { useRouter } from "next/router";
import SelectDropdown from "../../components/commom/FilterDropdown";
import AmbientDropdown from "../../components/commom/AmbientDropdown";

const ManageReserVations = () => {

    const [isSelected, setIsSelected] = useState(true)
    const [toShow, setToShow] = useState(true)
    const [aptos, setAptos] = useState([])
    const [recreationArea, setRecreationArea] = useState([])
    const [searchValue, setSearchValue] = useState("")
    const [itensPerPage, setItensPerPage] = useState(3);

    const authContext = useAuth();
    const router = useRouter();

    const handleSelect = () => {
        setToShow(!toShow)
        setIsSelected(!isSelected);
    };

    const getAptos = async () => {
        var {data} = await serviceApto.getAllApartments(authContext.token);
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
            "animais": data.animais,
            "arCondicionado": (data.itens ?? []).includes("ar condicionado") ? true : false 
        }
        return obj;
    }

    const checkBusy = (datas) => {
        const data1 = new Date("05/04/2023")
        const data2 = new Date("10/05/2023")
        const today = new Date()

        if(data1 < today && data2 > today){
          return true
        }else{
          return false
        }
    }


    const lowerSearch = searchValue.toLowerCase(); 

    const AptoFiltrado = aptos.slice(0, itensPerPage).filter((data) => data.titulo.toLowerCase().includes(lowerSearch))

    const RecreationAreaFiltrada = recreationArea.slice(0, itensPerPage).filter((RecreationArea) => RecreationArea.titulo. toLowerCase().includes(lowerSearch));

    useEffect(() => {
        getAptos()
        getRecreationAreas()

        if (!authContext.auth) {
            router.push("/login");
          return;
        }
    },[authContext.auth])




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
                style={{ border: "none", backgroundColor: "#FAFBFF", outline: "none"}}
                onChange={(e) => setSearchValue(e.target.value)}
              />
            </InputArea>
            <DropdownArea>
                <SelectDropdown></SelectDropdown>
            </DropdownArea>
          </FiltersArea>
          <AddAmbienteArea>
            <AmbientDropdown></AmbientDropdown>
          </AddAmbienteArea>
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
                                <AmbientModal title={data.titulo} itens={getIcons(data)} status={checkBusy(data.reservas)} url={data.urlApt} ambientType={"apto"} showVerMais={true}>
                                </AmbientModal>
                            </AmbientWrapper>
                        )
                    })
                    :
                    RecreationAreaFiltrada.map((data) => {
                        return (
                            <AmbientWrapper>
                                <AmbientModal title={data.titulo} itens={getIcons(data)} status={checkBusy(data.reservas)} url={data.urlRec} ambientType={"rec"} showVerMais={true}>
                                </AmbientModal>
                            </AmbientWrapper>
                        )
                    })
                }
            </AmbientsArea>
        </ToggleArea>
      </MainContent>
      <LoadItens>
        {
          toShow ?
          <>
              {AptoFiltrado.length == aptos.length ?
                <span>Nao ha mais resultados</span>
                
                :
                <>
                  <span>Exibindo {AptoFiltrado.length} itens de {aptos.length}</span>
                  <VerMaisButtons onClick={() => setItensPerPage(itensPerPage + 3)}>Ver Mais Apartamentos</VerMaisButtons>
                </>
              }
          </>
          :

          <>
            {RecreationAreaFiltrada.length == recreationArea.length ?
              <span>Nao ha mais resultados</span>
              
              :
              <>
                <span>Exibindo {RecreationAreaFiltrada.length} itens de {recreationArea.length}</span>
                <VerMaisButtons onClick={() => setItensPerPage(itensPerPage + 3)}>Ver Mais Areas</VerMaisButtons>
              </>
            }
          </>

        }
      </LoadItens>
    </Container>
  );
};

export default ManageReserVations;
