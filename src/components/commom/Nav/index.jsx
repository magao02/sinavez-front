import Image from 'next/image';
import Link from 'next/link';

import { useRouter } from "next/router";

import { useAuth } from '../../../contexts/AuthContext';

import * as services from '../../../services/accounts';

import Button from '../Button';

import SinavezLogo from '../../../assets/logo_picture.svg';

import { NavBar, UserFeaturesLeft, UserFeaturesRight } from './styles';

const Navigation = (props) => (
    NavVariant(props)
);

function NavVariant({ variant }) {

    const router = useRouter();

    const authContext = useAuth();

    const logout = () => {
        services.logout(authContext.token);
        authContext.cleanInfos();
        router.push('/login');
    }

    switch(variant) {
        case 'logged': {
            return (<NavBar>
                <UserFeaturesLeft>
                    <Image src={SinavezLogo} />
                    <Link href="/usuario">Meus Dados</Link>
                    <Link href="/dependentes">Meus Dependentes</Link>
                    <a>Baixar Imposto de Renda</a>
                    {authContext.admin  && <Link href="/associados">Listar Associados</Link>}
                </UserFeaturesLeft>
                <UserFeaturesRight>
                    <Button variant="nav" onClick={logout}>Sair</Button>
                </UserFeaturesRight>
            </NavBar>)
        }

        case 'singup': {
            return (
                <NavBar>
                    <Image src={SinavezLogo} />
                </NavBar>
            )
        }
    }
}

export default Navigation;