import Image from 'next/image';
import Link from 'next/link';

import SinavezLogo from '../../../assets/logo_picture.svg';

import RoundImage from '../RoundImage';


import { NavBar, UserFeaturesLeft, UserFeaturesRight, ImageContainer  } from './styles';

const Navigation = (props) => (
    NavVariant(props)
);

function NavVariant({ variant }) {
    switch(variant) {
        case 'logged': {
            return (<NavBar>
                <UserFeaturesLeft>
                    <Image src={SinavezLogo} />
                    <Link href="/usuario">Meus Dados</Link>
                    <Link href="/dependentes">Meus Dependentes</Link>
                    <a>Gerar Imposto de Renda</a>
                </UserFeaturesLeft>
                <UserFeaturesRight>
                    <a>Sair</a>
                    <RoundImage></RoundImage>
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