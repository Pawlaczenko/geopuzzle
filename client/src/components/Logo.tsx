import { FC } from 'react'
import styled from 'styled-components'
import logo_fill from 'src/assets/logo/logo-fill.svg';
import logo_compact from 'src/assets/logo/logo-compact.svg';

export type LogoType = 'filled' | 'compact'

const Logo : FC<{logoType?: LogoType}> = ({logoType = 'filled'}) => {
    const logoSources = new Map<LogoType,string>([
        ["filled",logo_fill],
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