import { createGlobalStyle } from "styled-components";
import { reset } from "./reset";
import { BREAKPOINTS, variables } from "./variables";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const GlobalStyles = createGlobalStyle`
    ${reset}
    ${variables}

    html {
        font-size: 62.5%;

        /* @media only screen and (${BREAKPOINTS.remToggle}){
            font-size: 50%;
        } */
    }

    body {
        font-family: var(--family-secondary);
        font-size: var(--fs-paragraph);
        background: ${(props) => props.theme.body};
        color: ${(props) => props.theme.text};
    }
`;

export default GlobalStyles;