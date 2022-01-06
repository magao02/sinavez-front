import Image from 'next/image';

import UserPicture from '../../../assets/default_user_picture.svg';
import { ImageContainer } from './styles';

const RoundImage = ({}) => (
  <ImageContainer>
    <Image src={UserPicture} />
  </ImageContainer>
);

export default RoundImage;