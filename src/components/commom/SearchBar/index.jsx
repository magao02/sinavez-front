import Image from "next/image";
import SearchIcon from "../../../assets/search_icon.svg";

import Input from "../Input";

import { Container } from "./styles";

const SearchBar = ({ setSearch, placeHolder }) => {

  const handleChange = (event) => {
    setSearch(event.target.value);
  };

  return (
    <Container>
      <Image src={SearchIcon} />
      <Input
        variant="search"
        name="pesquisa"
        placeholder={placeHolder}
        type="text"
        onChange={handleChange}
      />
    </Container>
  );
};

export default SearchBar;
