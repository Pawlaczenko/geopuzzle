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
    input: string,
    decoration: string
}

export const lightTheme : ITheme = {
    name: Themes.light,
    body: 'var(--color-white)',
    text: 'var(--color-black)',
    textBlue: 'var(--color-dark)',
    header: 'var(--color-grey-light)',
    primary: 'var(--color-secondary)',
    input: 'var(--color-grey-light)',
    decoration:'var(--color-grey)'
};

export const darkTheme : ITheme = {
    name: Themes.dark,
    body: 'var(--color-surface-100)',
    text: 'var(--color-white)',
    textBlue: 'var(--color-white)',
    header: 'var(--color-surface-300)',
    primary: 'var(--color-primary)',
    input: 'var(--color-surface-200)',
    decoration:'var(--color-surface-400)'
};