import Image from 'next/image';

import AddButton from '../../assets/add_button.svg';

import Navigation from '../../components/commom/Nav';
import List from '../../components/commom/List';
import SearchBar from '../../components/commom/SearchBar';
import { Container, ContentContainer, ControllerContainer, ListContainer } from './styles';


const UserData = () => (
    <Container>
        <Navigation variant="logged"/>
        <ContentContainer>
            <ControllerContainer>
                <SearchBar />
                <Image src={AddButton} />
            </ControllerContainer>
        
            <ListContainer>
                <List variant="dependente" 
                data={{
                    nome: "Felipe Leão", 
                    aniversario: "17/03/2000", 
                    cpf: "914.134.583-82", 
                    rg: "18/11/2008", 
                    dataEmissao: "18/11/2008"
                    }}/>
                <List variant="dependente" 
                data={{
                    nome: "Felipe Leão", 
                    aniversario: "17/03/2000", 
                    cpf: "914.134.583-82", 
                    rg: "18/11/2008", 
                    dataEmissao: "18/11/2008"
                    }}/>
                <List variant="dependente" 
                data={{
                    nome: "Felipe Leão", 
                    aniversario: "17/03/2000", 
                    cpf: "914.134.583-82", 
                    rg: "18/11/2008", 
                    dataEmissao: "18/11/2008"
                    }}/>
                <List variant="dependente" 
                data={{
                    nome: "Felipe Leão", 
                    aniversario: "17/03/2000", 
                    cpf: "914.134.583-82", 
                    rg: "18/11/2008", 
                    dataEmissao: "18/11/2008"
                    }}/>
                <List variant="dependente" 
                data={{
                    nome: "Felipe Leão", 
                    aniversario: "17/03/2000", 
                    cpf: "914.134.583-82", 
                    rg: "18/11/2008", 
                    dataEmissao: "18/11/2008"
                    }}/>
                <List variant="dependente" 
                data={{
                    nome: "Felipe Leão", 
                    aniversario: "17/03/2000", 
                    cpf: "914.134.583-82", 
                    rg: "18/11/2008", 
                    dataEmissao: "18/11/2008"
                    }}/>
            </ListContainer>
        </ContentContainer>
    </Container>
);

export default UserData;
