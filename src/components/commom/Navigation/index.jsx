import Link from 'next/link';
import Image from 'next/image';
import SinavezLogo from '../../../assets/logo_picture.svg';

import { NavBar } from './styles';

const Navigation = ({}) => (
    <NavBar>
        <Image src={SinavezLogo} />
    </NavBar>
);

export default Navigation;