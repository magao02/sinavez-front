import { useState, useRef, useImperativeHandle } from "react";

import Image from "next/image";
import SearchIcon from "../../../assets/search_icon.svg";

import Input from "../Input";

import { Container } from "./styles";

const SearchBar = ({ setSearch }) => {

  const handleChange = (event) => {
    setSearch(event.target.value);
  };

  return (
    <Container>
      <Image src={SearchIcon} />
      <Input
        name="pesquisa"
        placeholder="Digite o nome ou CPF do associado"
        type="text"
        onChange={handleChange}
      />
    </Container>
  );
};

export default SearchBar;
