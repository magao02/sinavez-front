import styled, {css} from "styled-components";
import theme from "../../../styles/theme";

export const Container = styled.div`
    ${props => getStyleByVariant(props.variant)};
`;

function getStyleByVariant(variant) {
    switch(variant) {
        case 'default': { 
            return css`   
                display: flex;
                flex-direction: column;
                justify-content: center;
                width: 100%;

                label {
                    color: ${theme.colors.dark.heavy};
                    font-weight: 400;
                    padding-bottom: 1.6rem;
                }

                div {
                    display: flex;
                    justify-content: space-between;
                    width: 100%;

                    span {
                        font-weight: bold;
                        color: ${theme.colors.red}
                    }
                    span::after {
                        content: '.';
                    }
                }
                `;
            }

        case 'signup': {  
            return css`
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                width: 100%;
                gap: 0.8rem;
                }

                label {
                    color: ${theme.colors.dark.heavy};
                    font-weight: 700;
                    padding-bottom: 1.6rem;
                    }

                label::after {
                    content: '*';
                    color: ${theme.colors.red};
                }
            `;
        }
    }
};

export const BaseInput = styled.input`
    padding: 1rem 0 1rem 1.6rem;
    border-radius: 0.7rem;
    border: 1px solid ${theme.colors.dark.heavy};
    width: 100%;

    outline: none;

    &::placeholder {
        color: ${theme.colors.dark.heavy};
        opacity: 0.3;
    }
`;


