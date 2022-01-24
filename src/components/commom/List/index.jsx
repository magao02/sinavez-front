import Image from 'next/image';

import UserIcon from '../../../assets/user_icon.svg';
import EditIcon from '../../../assets/edit_icon.svg';
import DeleteIcon from '../../../assets/remove_icon.svg';

import { Container} from './styles'; 

const List = (props) => (
  ListVariant(props)
);

function ListVariant({ variant, data }) {
  switch(variant) {
    case 'dependente': {
      return (
        <Container>
          <Image src={UserIcon} />
          <p>{data.nome}</p>
          <p>{data.nascimento}</p>
          <p>{data.cpf}</p>
          <p>{data.rg}</p>
          <p>{data.emissao}</p>
          <Image src={EditIcon} />
          <Image src={DeleteIcon} />
        </Container>
      )
    }
    case 'associados': {
      return (
      <Container>
      </Container>
      )
    };
  };
};

export default List;