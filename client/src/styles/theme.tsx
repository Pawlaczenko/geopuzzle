export enum Themes {
  light,
  dark
}

export interface ITheme {
    primary: string,
    primary_dark: string,
    background: string,
    text: string,
    text_accent: string,
    input: string
}

export const lightTheme : ITheme = {
    primary: '#079A4B',
    primary_dark: '#115B33',
    background: '#FFFFFF',
    text: '#1E1E1E',
    text_accent: '#747683',
    input: '#F4F4F4'
};