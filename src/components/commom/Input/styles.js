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

                gap: 0.5vh;
                margin-top: 1vh;
                margin-bottom: 1vh;

                label {
                    color: ${theme.colors.gray.default};

                    font-size: 14px;
                    font-family: Roboto;
                    font-style: normal;
                    font-weight: 400;
                    line-height: 18px;
                    width: 100%;
                }

                div {
                    display: flex;
                    justify-items: center;
                    width: 100%;

                    span {
                        width: 100%;
                        font-weight: bold;
                        color: ${theme.colors.red};
                        font-size: 14px;
                        text-align: end;
                    }
                    span::after {
                        content: '.';
                    }
                }

                input {
                    padding: 0;
                    border-radius: 0;
                    border: none;
                    background: none;

                    color: var(--text-secundary, ${theme.colors.gray.menu});
                    font-size: 18px;
                    font-family: Roboto;
                    line-height: 22px;
                    
                    border-bottom: 1px solid ${theme.colors.gray.menu};
                    padding-bottom: 5px;
                    width: 100%;
                }

                input::placeholder {
                    color: var(--text-secundary, ${theme.colors.gray.heavy});
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

        case 'search': {
            return css`
                height: 100%;
                width: 100%;
            `
        }
    }
};

export const BaseInput = styled.input`
    height: 100%;
    width: 100%;
`;


