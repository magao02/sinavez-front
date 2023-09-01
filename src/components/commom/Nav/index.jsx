import Image from "next/image";
import Link from "next/link";

import { useRouter } from "next/router";

import { useAuth } from "../../../contexts/AuthContext";

import { useCallback, useEffect, useState } from "react";

import * as services from "../../../services/accounts";

import Button from "../Button";
import LinkBox from "../LinkBox"
import DropDownMenu from "../DropDownMenu";

import SinavezLogo from "../../../assets/logo_picture.svg";
import SinavezName from "../../../assets/sinavez_name.svg";

import { NavBar, UserFeaturesLeft, UserFeaturesRight, LogoSinavez } from "./styles";

const Navigation = (props) => NavVariant(props);

function NavVariant({ variant, selectedPage }) {
  const [selectedHome, setSelectedHome] = useState(false);
  const [selectedAssociados, setSelectedAssociados] = useState(false);
  const [selectedApartamentos, setSelectedApartamentos] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [pdfData, setPdfData] = useState({});
  const [admin, setAdmin] = useState();
  const [name, setName] = useState("");
  const [openedMenu, setOpenedMenu] = useState(false);
  const [profilePic, setProfilePic] = useState(null);

  const authContext = useAuth();
  const router = useRouter();

  const handleSelectPage = useCallback(async () => {
    switch (selectedPage) {
      case "home":
        setSelectedHome(true);
        break;
      case "associados":
        setSelectedAssociados(true);
        break;
      case "apartamentos":
        setSelectedApartamentos(true);
        break;
    }
    setIsLoaded(true);
  })

  const getUserData = useCallback(async () => {
    const responseData = await services.getUserData(
      authContext.urlUser,
      authContext.token
    );
    return responseData.data;
  }, [authContext.token, authContext.urlUser]);

  const handleUserData = useCallback(async () => {
    try {
      const responseData = await getUserData();
      setName(responseData.name);
      setProfilePic(responseData.profilePic);
      setIsLoaded(true);
    } catch (err) {}
  }, [getUserData]);

  const handleChangeMenu = useCallback(async () => {
    setOpenedMenu((prev) => !prev);
  })

  useEffect(() => {
    handleSelectPage();
    handleUserData();
    setAdmin(authContext.admin)
  }, []);

  switch (variant) {
    case "admin": {
      return (
        <NavBar>
          {isLoaded && (
            <>
              <UserFeaturesLeft>
                <LogoSinavez>
                  <Image src={SinavezLogo} />
                  <Image src={SinavezName} />
                </LogoSinavez>
                <LinkBox linkText={"/home"} selected={selectedHome} text={"Página Inicial"}></LinkBox>
                <LinkBox linkText={"/associados"} selected={selectedAssociados} text={"Associados"}></LinkBox>
                <LinkBox linkText={"/apartamentos"} selected={selectedApartamentos} text={"Apartamentos"}></LinkBox>
              </UserFeaturesLeft>
              <UserFeaturesRight>
                <DropDownMenu name={name} image={profilePic} opened={openedMenu} onClickDo={() => handleChangeMenu()}/>
              </UserFeaturesRight>
            </>
          )}
        </NavBar>
      );
    }
    case "logged": {
      return (
        <NavBar>
          {isLoaded && (
            <>
              <UserFeaturesLeft>
                <LogoSinavez>
                  <Image src={SinavezLogo} />
                  <Image src={SinavezName} />
                </LogoSinavez>
                <LinkBox linkText={"/home"} selected={selectedHome} text={"Página Inicial"}></LinkBox>
                <LinkBox linkText={"/apartamentos"} selected={selectedApartamentos} text={"Apartamentos"}></LinkBox>
              </UserFeaturesLeft>
              <UserFeaturesRight>
                <DropDownMenu name={name} image={profilePic} opened={openedMenu} onClickDo={() => handleChangeMenu()}/>
              </UserFeaturesRight>
            </>
          )}
        </NavBar>
      );
    }

    case "signup": {
      return (
        <NavBar>
          <Image src={SinavezLogo} />
        </NavBar>
      );
    }
  }
}

export default Navigation;
