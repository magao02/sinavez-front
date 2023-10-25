import React from "react";
import { Card, ToggleCard } from "../../../styles/homeStyles";
import { ButtonCancel, CancelBox, CancelOptions, TextCancel, TitleCancel } from "../style";
import Image from "next/image";
import Button from "../../commom/Button";

import Sucess from "../../../assets/sucess.svg";
import X from "../../../assets/x.svg";

const SucessAdd = ({showFinishCad, name}) => {
    return (
        <>
            <ToggleCard/>
              <Card alt={true}>
                <CancelBox>
                  <TitleCancel>Sucesso</TitleCancel>

                  <CancelOptions>
                    <Image src={Sucess} width={'357.377px'} height={'200px'}/>
                    <TextCancel>
                      Pré-cadastro realizado com sucesso! <br/>
                      {name} agora está na lista de associados.
                    </TextCancel>
                    
                  </CancelOptions>

                  <ButtonCancel>
                    <Button variant={'cancelRemove'} onClick={showFinishCad}>
                       <Image src={X}/>
                       SAIR
                    </Button>
                  </ButtonCancel>
                </CancelBox>
            </Card>
        </>
    )
};

export default SucessAdd;