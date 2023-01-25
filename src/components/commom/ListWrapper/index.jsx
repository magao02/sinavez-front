import { useCallback } from "react";
import impostoPdf from "../../../pdf/imposto";
import * as services from "../../../services/accounts";
import { useAuth } from "../../../contexts/AuthContext";

import Button from "../Button";
import List from "../List";

import { ListContainer } from "./styles";

const ListWrapper = ({
  data,
  variant,
  toggleForm,
  remove,
  edit,
  promote,
  searchTerm,
  setForm,
  view,
  yearsController,
  dataToSubmit,
  yearVariant,
}) => {
  if (data !== undefined) {
    switch (variant) {
      case "associados": {
        return (
          <ListContainer>
            {data
              .filter((value) => {
                if (searchTerm == "") {
                  return value;
                } else if (
                  value.name.toLowerCase().includes(searchTerm.toLowerCase())
                ) {
                  return value;
                } else if (value.cpf.startsWith(searchTerm)) {
                  return value;
                }
              })
              .map((dataEach, index) => (
                <List
                  variant="associados"
                  data={{
                    name: dataEach.name,
                    cpf: dataEach.cpf,
                    urlUser: dataEach.urlUser,
                  }}
                  key={index}
                  remove={remove}
                  edit={edit}
                  view={view}
                  promote={promote}
                  setForm={setForm}
                  yearsController={yearsController}
                />
              ))}
          </ListContainer>
        );
      }
      case "dependente": {
        return (
          <ListContainer>
            {data
              .filter((value) => {
                if (searchTerm == "") {
                  return value;
                } else if (
                  value.name.toLowerCase().includes(searchTerm.toLowerCase())
                ) {
                  return value;
                }
              })
              .map((dataEach, index) => (
                <List
                  variant="dependente"
                  data={{
                    name: dataEach.name,
                    nascimento: dataEach.nascimento,
                    cpf: dataEach.cpf,
                    rg: dataEach.rg,
                    emissao: dataEach.emissao,
                    urlDep: dataEach.urlDep,
                  }}
                  key={index}
                  remove={remove}
                />
              ))}
          </ListContainer>
        );
      }
      case "years": {
        switch (yearVariant) {
          case "edit": {
            const startPdfForm = (year) => {
              setForm("pdf", dataToSubmit, year);
            };

            return (
              <ListContainer>
                {data.anosUsuario.map((dataEach, index) => (
                  <Button variant="year" onClick={() => startPdfForm(dataEach)} key={index}>{dataEach}</Button>
                ))}
              </ListContainer>
            );
          };

          case "download":
            const authContext = useAuth();
            
            const getImposto = useCallback(async (year) => {
              try {
                const responseImposto = await services.getImpostos(
                  localStorage.getItem('urlAssociado'),
                  authContext.token,
                  year
                );
                return responseImposto.data;
              } catch (error) {
                console.log(error);
              }
            });

            const handleImposto = useCallback(async (year) => {
              const responseData = await getImposto(year);
              impostoPdf(responseData);
            });

            const generatePdf = async (year) => {
              handleImposto(year);
            };

            return (
              <ListContainer>
                {data.anosUsuario.map((dataEach, index) => (
                  <Button variant="year" onClick={() => generatePdf(dataEach)} key={index}>{dataEach}</Button>
                  ))}
              </ListContainer>
            );
        }
      }
    }
  } else {
    return <ListContainer />;
  }
};

export default ListWrapper;
