/* eslint-disable react-refresh/only-export-components */
import { css } from "styled-components";

export const BREAKPOINTS = {
    remToggle: "max-width:93.75em",
    big: "max-width: 910px",
    burger: "max-width: 750px",
    small: "max-width: 500px"
}

export const variables = css`
    html {
        //COLORS    
        --color-primary: #FFE25F;
        --color-secondary: #79AEA3;
        --color-dark: #5A5766;
        --color-grey: #E6E2E8;
        --color-white: #FFFBFF;
        --color-black: #3E3736;


        ///TYPOGRAPHY
        //FONT SIZE
        --fs-h1: 6.4rem;
        --fs-h2: 5rem;
        --fs-h3: 3.6rem;
        --fs-h4: 3rem;
        --fs-h5: 2.6rem;
        --fs-h6: 2rem;
        --fs-paragraph: 1.6rem;

        //FONT WEIGHT
        --fw-regular: 400;
        --fw-bold: 700;
        --fw-black: 900;

        //FONT FAMILY
        --family-primary: 'Montserrat', sans-serif;
        --family-secondary: 'Open Sans', sans-serif;

        //SIZE        
        --input-radius: 1.5rem;

        //BORDERS

        //ANIMATIONS
    }
`;