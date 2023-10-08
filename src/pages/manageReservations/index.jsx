import Navigation from "../../components/commom/Nav";
import lupa from "../../assets/lupa.svg";
import {
  Container,
  FiltersArea,
  Header,
  InputArea,
  MainContent,
  SearchArea,
  ToggleArea,
  AmbienteTitle,
  SelectAmbient,
  AmbientsArea,
  AmbientWrapper,
  LoadItens,
  VerMaisButtons,
  DropdownArea,
  AddAmbienteArea,
  LoadingContainer
} from "../../styles/manageReservations";
import Input from "../../components/commom/Input";
import { useEffect, useState } from "react";
import * as serviceApto from "../../services/apartments";
import * as serviceArea from "../../services/recreationArea";
import { useAuth } from "../../contexts/AuthContext";
import { useRouter } from "next/router";
import FilterDropdown from "../../components/commom/FilterDropdown";
import AmbientDropdown from "../../components/commom/AmbientDropdown";
import ApartmentCard from "../../components/commom/ApartmentCard";
import loading from "../../assets/loading_Apto.svg";

const ManageReserVations = () => {

    const [isSelected, setIsSelected] = useState(true)
    const [toShow, setToShow] = useState(true)
    const [aptos, setAptos] = useState([])
    const [recreationArea, setRecreationArea] = useState([])
    const [searchValue, setSearchValue] = useState("")
    const [itensPerPage, setItensPerPage] = useState(3);
    const [filterReserva, setFilterReserva] = useState("")

    const [isMakingRequest, setIsMakingRequest] = useState(true);

    const authContext = useAuth();
    const router = useRouter();

    const handleSelect = () => {
        setToShow(!toShow)
        setIsSelected(!isSelected);
    };

    const getAptos = async () => {
        var {data} = await serviceApto.getAllApartments(authContext.token);
        setAptos(data)
        setIsMakingRequest(false)
    }

    const getRecreationAreas = async () => {
        var {data} = await serviceArea.getAllRecreationAreas(authContext.token);
        setRecreationArea(data)
        setIsMakingRequest(false)
    }

    const filterAmbients = ( ambient) => {
      if(filterReserva == "ocupados"){
        return ambient.filter((data) => data.reservado)
      }else if(filterReserva == "disponiveis"){
        return ambient.filter((data) => !data.reservado)
      }else{
        return ambient
      }
    }

    const lowerSearch = searchValue.toLowerCase(); 

    const AptoFiltrado = filterAmbients(aptos).slice(0, itensPerPage).filter((data) => data.titulo.toLowerCase().includes(lowerSearch))

    const RecreationAreaFiltrada = filterAmbients(recreationArea).slice(0, itensPerPage).filter((RecreationArea) => RecreationArea.titulo. toLowerCase().includes(lowerSearch));

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
        <Navigation variant={"admin"} selectedPage="apartamentos" />
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
                <FilterDropdown filterReserva={setFilterReserva}></FilterDropdown>
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

            {
              isMakingRequest ? 
                <LoadingContainer>
                    <img src={loading.src}></img>
                </LoadingContainer>
              :
              
              <AmbientsArea>
                  {toShow ?
                      AptoFiltrado.map((data) => {
                          return (
                              <AmbientWrapper>
                                  <ApartmentCard obj={data} url={data.urlApt}></ApartmentCard>
                              </AmbientWrapper>
                          )
                      })
                      :
                      RecreationAreaFiltrada.map((data) => {
                          return (
                              <AmbientWrapper>
                                <ApartmentCard obj={data} url={data.urlRec}></ApartmentCard>
                              </AmbientWrapper>
                          )
                      })
                  }
              </AmbientsArea>
            }   
        </ToggleArea>
      </MainContent>
      {
        !isMakingRequest &&
          <LoadItens>
            {
              toShow ?
              <>
                  {AptoFiltrado.length == aptos.length ?
                    <span>Não há mais resultados</span>
                    
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
                  <span>Não há mais resultados</span>
                  
                  :
                  <>
                    <span>Exibindo {RecreationAreaFiltrada.length} itens de {recreationArea.length}</span>
                    <VerMaisButtons onClick={() => setItensPerPage(itensPerPage + 3)}>Ver Mais Areas</VerMaisButtons>
                  </>
                }
              </>

            }
          </LoadItens>
      }
    </Container>
  );
};

export default ManageReserVations;
