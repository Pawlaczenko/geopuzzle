import { createGlobalStyle } from "styled-components";
import { reset } from "./reset";
import { BREAKPOINTS, variables } from "./variables";

const GlobalStyles = createGlobalStyle`
    ${reset}
    ${variables}

    html {
        font-size: 62.5%;

        @media only screen and (${BREAKPOINTS.remToggle}){
            font-size: 50%;
        }
    }

    body {
        font-family: var(--family-secondary);
        font-size: var(--fs-paragraph);
        background: var(--color-white);
    }
`;

export default GlobalStyles;