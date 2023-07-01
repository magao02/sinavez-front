import styled, { css } from "styled-components";
import theme from "../../../styles/theme";

export const Container = styled.div`
    ${props => getStyleByVariant(props.variant ?? 'default')};
`;

function getStyleByVariant(variant) {
    switch (variant) {
        case 'default-optional':
        case 'default': {
            return css`
                display: flex;
                flex-direction: column;
                justify-content: center;
                width: 100%;

                gap: 1vh;
                margin: 1vh;

                label {
                    color: ${theme.colors.blue.heavy};
                    text-align: center;
                    font-size: 18px;
                    font-family: Roboto;
                    line-height: 22px;
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

                input {
                    padding: 0;
                    border-radius: 0;
                    padding-bottom: 0.5vh;
                    border: none;
                    background: none;

                    color: var(--text-secundary, ${theme.colors.gray.default});
                    font-size: 18px;
                    font-family: Roboto;
                    line-height: 22px;
                    
                    border-bottom: 1px solid;
                }

                ${
                    variant !== 'default-optional' ? css`
                        label::after {
                            content: '*';
                            color: ${theme.colors.red};
                        }
                    ` : ""
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

        case 'signup-optional': {
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


