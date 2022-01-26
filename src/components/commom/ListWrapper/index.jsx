import List from "../List";

import { ListContainer } from "./styles";

const ListWrapper = ({ data, variant, toggleForm, remove }) => {
  if (data !== undefined) {
    switch (variant) {
      case "associados": {
        return (
          <ListContainer>
            {data.map((dataEach, index) => (
              <List
                variant="dependente"
                data={{
                  name: dataEach.name,
                  nascimento: dataEach.nascimento,
                  cpf: dataEach.cpf,
                  rg: dataEach.rg,
                  emissao: dataEach.emissao,
                  urlUser: dataEach.urlUser,
                }}
                key={index}
                toggleFormUp={toggleForm}
              />
            ))}
          </ListContainer>
        );
      }
      case "dependente": {
        return (
          <ListContainer>
            {data.map((dataEach, index) => (
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
