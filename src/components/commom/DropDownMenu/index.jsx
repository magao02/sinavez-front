import { MenuBox, OpenedMenuBox, Menu, Option } from "./styles.js";

import * as services from "../../../services/accounts";

import caretUp from "../../../assets/caret_up.svg"
import caretDown from "../../../assets/caret_down.svg"
import user from "../../../assets/user.svg"
import sign_out from "../../../assets/sign_out.svg"

import Image from "next/image.js";
import { useRouter } from "next/router.js";
import { useAuth } from "../../../contexts/AuthContext.jsx";

const DropDownMenu = ({ name, opened, onClickDo, image }) => {
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
                        Olá, {name}
                        { image ? <img className="profile-pic" src={image} /> : <div className="profile-pic" /> }
                    </MenuBox>
                    <OpenedMenuBox>
                        <Option onClick={() => router.push("/usuario")}>
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
                Olá, {name}
                { image ? <img className="profile-pic" src={image} /> : <div className="profile-pic" /> }
            </MenuBox>
        )
    }
}

export default DropDownMenu;