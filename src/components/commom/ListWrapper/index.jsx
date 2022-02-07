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
                } else if (value.cpf.includes(searchTerm)) {
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
                  toggleFormUp={toggleForm}
                  remove={remove}
                  variant="associados"
                  edit={edit}
                  promote={promote}
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
    }
  } else {
    return <ListContainer />;
  }
};

export default ListWrapper;
