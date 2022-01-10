import Image from 'next/image';

import Navigation from '../../components/commom/Nav';
import RoundImage from '../../components/commom/RoundImage';
import Table from '../../components/commom/Table';
import { Container, ContentContainer, UserTitle, SubContainer, Separator } from './styles';


const UserData = () => (
    <Container>
        <Navigation variant="logged"/>
        <ContentContainer>
            <SubContainer>
                <UserTitle>
                    <RoundImage />
                    <h1>João Martins</h1>
                    <Separator />
                </UserTitle>
                <Table
                variant="pessoal" 
                title="Informações Pessoais"
                headers={["Nome", "Data de Nascimento", "Data de Filiação", "RG", "CPF", "Profissão"]} 
                data={["João Antônio", "10/03/1992" ,"10/03/2008", "57309123-8", "071.891.123-20", "Zootecnista"]}>
                </Table>
            </SubContainer>

            <SubContainer>

            <Table
                    variant="contato"
                    title="Informações de Contato"
                    headers={["Email", "Telefone", "Endereço"]}
                    data={["joao.antonio@gmail.com", "(83) - 99991234", "Rua Doutor Marinho", "Nº 91", "Água Fria", "Em frente ao shopping."]}>
                </Table>

            <Table
                    variant="trabalho"
                    title="Informações de Trabalho"
                    headers={["Salário", "Organização Ou Empresa", "Nº de Inscrição"]}
                    data={["3.000,00 R$", "Fazenda São Caetano", "XXXXXXXXXX"]}>
            </Table>


                
            </SubContainer>
        </ContentContainer>
    </Container>
);

export default UserData;
