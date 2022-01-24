import List from "../List";

import { ListContainer } from "./styles";

const ListWrapper = ({ data }) => {
  if (data !== undefined) {
    return (
      <ListContainer>
        {data.map((dataEach, index) => (
          <List
            variant="dependente"
            data={{
              nome: dataEach.name,
              nascimento: dataEach.nascimento,
              cpf: dataEach.cpf,
              rg: dataEach.rg,
              emissao: dataEach.emissao,
            }}
            key={index}
          />
        ))}
      </ListContainer>
    );
  } else {
    return <ListContainer />;
  }
};

export default ListWrapper;
