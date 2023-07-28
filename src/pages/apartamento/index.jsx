import {
  NavSpacing,
  Content,
  Title1,
  Subtitle2,
  Details,
  Column,
  BlueOutlineCard,
  Body1,
  Body3,
  Title2,
} from "../../styles/apartamentoStyles";

import Navigation from "../../components/commom/Nav";
import Image from "next/image";

import MapaImage from "../../assets/apartamento/mapa.png";

const Page = () => {
  return (
    <div>
      <Navigation selectedPage="apartamentos" variant="admin" />
      <NavSpacing />
      <Content>
        <div>
          <Title1>Apartamento 03</Title1>
          <Body1>Apartamento Padrão (sem adaptação para PCD), 2 andar</Body1>
        </div>
        <Details>
          <Column>
            <BlueOutlineCard>
              <div>
                <Subtitle2>Itens do Apartamento</Subtitle2>
              </div>
            </BlueOutlineCard>

            <BlueOutlineCard>
              <div>
                <Subtitle2>Áreas comuns</Subtitle2>
                <Body3>Verifique a disponibilidade de uso das áreas comuns durante sua estadia. Caso queria usufruir de alguma em especifico faça a reserva aqui.</Body3>
              </div>
            </BlueOutlineCard>

            <BlueOutlineCard>
              <div>
                <Subtitle2>Locais Próximos</Subtitle2>
              </div>
            </BlueOutlineCard>
          </Column>

          <Column></Column>
        </Details>
        <Title2>Veja a localização no mapa</Title2>
        <Image src={MapaImage} />
      </Content>
    </div>
  );
};

export default Page;