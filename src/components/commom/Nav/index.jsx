import Image from 'next/image';
import SinavezLogo from '../../../assets/logo_picture.svg';

import RoundImage from '../RoundImage';


import { NavBar, UserFeaturesLeft, UserFeaturesRight, ImageContainer  } from './styles';

const Navigation = ({}) => (
    <NavBar>
        <UserFeaturesLeft>
            <Image src={SinavezLogo} />
            <a>Meus Dados</a>
            <a>Meus Dependentes</a>
            <a>Gerar Imposto de Renda</a>
        </UserFeaturesLeft>
        <UserFeaturesRight>
            <a>Sair</a>
            <RoundImage></RoundImage>
        </UserFeaturesRight>
    </NavBar>
);

export default Navigation;