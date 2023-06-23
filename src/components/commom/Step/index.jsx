import { StepBox, StepCircle } from "./styles"

import Done from "../../../assets/done.svg";

import Image from "next/image";

const Step = ({ done, step, children }) => {
    if (done) {
        return (
            <StepBox>
                <Image src={Done} />
                {children}
            </StepBox>
        );
    } else {
        return (
            <StepBox>
                <StepCircle>
                    {step}
                </StepCircle>
                {children}
            </StepBox>
        );
    }
}

export default Step;