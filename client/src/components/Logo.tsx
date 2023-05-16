import { FC } from 'react'
import styled, { useTheme } from 'styled-components'
import logo_fill from 'src/assets/logo/logo-fill.svg';
import logo_compact from 'src/assets/logo/logo-compact.svg';
import logo_fill_white from 'src/assets/logo/logo-fill-white.svg';
import { Themes } from 'src/styles/theme';

export type LogoType = 'filled' | 'compact'

const Logo : FC<{logoType?: LogoType}> = ({logoType = 'filled'}) => {
    const theme = useTheme();
    const isDarkTheme = theme?.name === Themes.dark;

    const logoSources = new Map<LogoType,string>([
        ["filled",isDarkTheme ? logo_fill_white : logo_fill],
        ["compact",logo_compact]
    ])
    return (
        <StyledLogo>
            <img src={logoSources.get(logoType)} alt="GeoPuzzle logo" />
        </StyledLogo>
    )
}

export const StyledLogo = styled.figure`

`;


export default Logo