/* eslint-disable react-refresh/only-export-components */
import { css } from "styled-components";

export const BREAKPOINTS = {
    remToggle: "max-width:93.75em",
    md: "max-width: 976px",
    big: "max-width: 910px",
    phone: "max-width: 768px",
    small: "max-width: 500px",
    xs: "max-width: 370px",
}

export const variables = css`
    html {
        //COLORS
        --color-primary: #B1EDE8;
        --color-secondary: #0081AF;
        --color-black: #28262C;
        --color-white: #FFFCF9;
        --color-dark: #011638;

        --color-grey: #E6E2E8;
        --color-grey-light: #F5F5F5;
        --color-white: #FFFBFF;
        --color-black: #3E3736;
        --color-grey-dark: #666666;
        --color-error: #ff7878;
        --color-dark-100: #08090A;

        //GRADIENTS
        --color-incorrect:
            linear-gradient(
                45deg,
                hsl(0deg 100% 77%) 0%,
                hsl(2deg 85% 87%) 50%,
                hsl(26deg 26% 95%) 100%
                );
        --color-correct: 
            linear-gradient(
                45deg,
                hsl(133deg 100% 77%) 0%,
                hsl(129deg 79% 82%) 50%,
                hsl(118deg 46% 86%) 100%
            );

        --gradient-primary: linear-gradient(
            45deg,
            hsl(49deg 100% 69%) 0%,
            hsl(48deg 85% 78%) 50%,
            hsl(47deg 57% 85%) 100%
        );

        ///TYPOGRAPHY
        //FONT SIZE
        --fs-h1: 6.4rem;
        --fs-h2: 5rem;
        --fs-h3: 3.6rem;
        --fs-h4: 3rem;
        --fs-h5: 2.6rem;
        --fs-h6: 1.8rem;
        --fs-paragraph: 1.6rem;

        @media only screen and (${BREAKPOINTS.phone}){
            --fs-h1: 5rem;
        }

        //FONT WEIGHT
        --fw-regular: 400;
        --fw-bold: 700;
        --fw-black: 900;

        //FONT FAMILY
        --family-primary: 'Montserrat', sans-serif;
        --family-secondary: 'Open Sans', sans-serif;

        //SIZE
        --radius: 0.8rem;
        --navbar-size: 28rem;
        --mobile-topbar-size: 5.5rem;
        --input-height: 5.2rem;
        --website-width: 130rem;

        //BORDERS
        --border-thin: 1px solid ${({theme}) => theme.decoration};
        //SHADOWS
        --shadow-primary: 0 .4rem .4rem .1rem rgba(0,0,0,.15);
        --shadow-inset: inset 0 .0 .8rem rgba(0,0,0,.25);
    }
`;