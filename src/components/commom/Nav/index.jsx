import Image from 'next/image';
import SinavezLogo from '../../../assets/logo_picture.svg';
import UserPicture from '../../../assets/default_user_picture.svg';

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
            <ImageContainer>
                <Image src={UserPicture} />
            </ImageContainer>
        </UserFeaturesRight>
    </NavBar>
);

export default Navigation;