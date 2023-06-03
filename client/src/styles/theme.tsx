export enum Themes {
    light='light',
    dark='dark'
}

export interface ITheme {
    name: Themes,
    body: string,
    text: string,
    textBlue: string,
    header: string,
    primary: string,
    grey: string,
    input: string
}

export const lightTheme : ITheme = {
    name: Themes.light,
    body: 'var(--color-white)',
    text: 'var(--color-black)',
    textBlue: 'var(--color-dark)',
    header: 'var(--color-grey-light)',
    primary: 'var(--color-secondary)',
    grey: 'var(--color-grey-light)',
    input: 'var(--color-grey-light)'
};

export const darkTheme : ITheme = {
    name: Themes.dark,
    body: 'var(--color-black)',
    text: 'var(--color-white)',
    textBlue: 'var(--color-white)',
    header: 'var(--color-dark)',
    primary: 'var(--color-primary)',
    grey: 'var(--color-dark)',
    input: 'var(--color-grey-dark)'
};