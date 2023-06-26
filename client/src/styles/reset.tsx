import { css } from "styled-components";

export const reset = css`
    // 1. Use a more-intuitive box-sizing model.
    *, *::before, *::after {
        box-sizing: border-box;
    }
    // 2. Remove default margin
    * {
        margin: 0;
    }
    //3. Allow percentage-based heights in the application
    html, body {
        /* height: 100%; */
        scroll-behavior: smooth;
    }
    // Typographic tweaks!
    // 4. Add accessible line-height
    // 5. Improve text rendering
    body {
        -webkit-font-smoothing: antialiased;
    }

    body.modal-open {
        overflow: hidden;
    }

    a {
        color: inherit; /* blue colors for links too */
        text-decoration: inherit; /* no underline */
    }   
    // 6. Improve media defaults
    img, picture, video, canvas, svg {
        display: block;
        max-width: 100%;
    }
    // 7. Remove built-in form typography styles
    input, button, textarea, select {
        font: inherit;
    }
    button {
        margin: 0;
        padding: 0;
        border: 0;
    }
    // 8. Avoid text overflows
    p, h1, h2, h3, h4, h5, h6 {
        overflow-wrap: break-word;
    }
    // 9. Create a root stacking context
    #root, #__next {
        isolation: isolate;
    }
`;