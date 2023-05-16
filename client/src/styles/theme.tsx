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
    primary: string
}

export const lightTheme : ITheme = {
    name: Themes.light,
    body: 'var(--color-white)',
    text: 'var(--color-black)',
    textBlue: 'var(--color-dark)',
    header: 'var(--color-white)',
    primary: 'var(--color-secondary)'
};

export const darkTheme : ITheme = {
    name: Themes.dark,
    body: 'var(--color-black)',
    text: 'var(--color-white)',
    textBlue: 'var(--color-white)',
    header: 'var(--color-dark)',
    primary: 'var(--color-primary)'

};