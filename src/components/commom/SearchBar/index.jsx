import Image from 'next/image';
import SearchIcon from '../../../assets/search_icon.svg';


import { Container } from './styles';

const SearchBar = ({}) => (
  <Container>
    <Image src={SearchIcon}/>
    <input name="pesquisa" placeholder="Nome do dependente" />
  </Container>
);

export default SearchBar;