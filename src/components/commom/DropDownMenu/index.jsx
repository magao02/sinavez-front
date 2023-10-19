import { MenuBox, OpenedMenuBox, Menu, Option } from "./styles.js";

import * as services from "../../../services/accounts";

import caretUp from "../../../assets/caret_up.svg"
import caretDown from "../../../assets/caret_down.svg"
import user from "../../../assets/user.svg"
import sign_out from "../../../assets/sign_out.svg"

import Image from "next/image.js";
import { useRouter } from "next/router.js";
import { useAuth } from "../../../contexts/AuthContext.jsx";
import { formatShortName } from "../../../utils/format.js";
import PlaceholderProfilePic from "../../../assets/person_filled_gray.svg";

function showDefaultProfilePic(url) {
  if (!url) return PlaceholderProfilePic.src;
  return url;
}

const DropDownMenu = ({ name, opened, onClickDo, image, showPopUpSignUp }) => {
    const authContext = useAuth();

    const router = useRouter();

    const logout = () => {
        services.logout(authContext.token);
        authContext.cleanInfos();
        router.push("/login");
    };

    if (opened) {
        return (
            <>
                <Menu>
                    <MenuBox onClick={onClickDo}>
                        <Image src={caretUp} />
                        Olá, {formatShortName(name)}
                        <img className="profile-pic" src={showDefaultProfilePic(image)} />
                    </MenuBox>
                    <OpenedMenuBox>
                        <Option onClick={() => authContext.isPendingSignUp ? showPopUpSignUp(true) : router.push("/usuario")}>
                            <Image src={user} />
                            Meus Dados
                        </Option>
                        <Option onClick={logout}>
                            <Image src={sign_out} />
                            Sair
                        </Option>
                    </OpenedMenuBox>
                </Menu>
            </>
        )
    } else {
        return (
            <MenuBox onClick={onClickDo}>
                <Image src={caretDown} />
                Olá, {formatShortName(name)}
                <img className="profile-pic" src={showDefaultProfilePic(image)} />
            </MenuBox>
        )
    }
}

export default DropDownMenu;