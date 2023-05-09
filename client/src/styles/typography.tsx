import { ThemedCssFunction } from "styled-components";
import { DefaultTheme, css } from "styled-components/native";

export const setFontWeight = (weight: 'bold' | 'black' | 'regular') => {
    switch(weight){
        case 'bold': return 'font-family: Montserrat_Bold';
        case 'black': return 'font-family: Montserrat_Black';
        default: return 'font-family: Montserrat';
    }
}