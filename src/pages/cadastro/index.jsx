import { useState } from 'react';

import { Container, MainContent } from './styles';

import Navigation from '../../components/commom/Nav';
import SignUpFormFirst from '../../components/SignUpForm/SignUpFormFirst/SingUpFormFirst';
import SignUpFormSecond from '../../components/SignUpForm/SignUpFormSecond/SingUpFormSecond';
import SignUpFormThird from '../../components/SignUpForm/SignUpFormThird/SingUpFormThird';

const SignUpPage = () => {
    
    const [step, setStep] = useState(1);

    return(
    <Container>
        <Navigation variant="singup" />
        <MainContent>
            {step === 1 && <SignUpFormFirst/>}
            {step === 2 && <SignUpFormSecond/>}
            {step === 3 && <SignUpFormThird/>}
        </MainContent>
    </Container>
 )
};

export default SignUpPage;