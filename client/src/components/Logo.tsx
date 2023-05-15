import { FC } from 'react'
import styled from 'styled-components'
import logo_fill from 'src/assets/logo/logo-fill.svg';

const Logo : FC = () => {
    return (
        <StyledLogo>
            <img src={logo_fill} alt="GeoPuzzle logo" />
        </StyledLogo>
    )
}

export const StyledLogo = styled.figure`

`;


export default Logo