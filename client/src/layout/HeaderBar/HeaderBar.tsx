import { FC } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'src/app/store';
import HideHeaderButton, { StyledHideHeaderButton } from "src/components/HideHeaderButton"
import Logo, { StyledLogo } from "src/components/Logo"
import Navigation from "src/components/Navigation/Navigation"
import { flexContainer } from "src/styles/mixins"
import { BREAKPOINTS } from 'src/styles/variables';
import { styled } from "styled-components"

const HeaderBar : FC = () => {
    const isOpen = useSelector((state: RootState) => state.header);
     return ( 
        <StyledHeaderBar isOpen={isOpen}>
            <Logo logoType={isOpen ? 'filled' : 'compact'} />
            <Navigation />
            <HideHeaderButton />
        </StyledHeaderBar>
    )
}

export const StyledHeaderBar = styled.header<{isOpen: boolean}>`
    ${flexContainer('flex-start','center','column')};
    width: ${(props) => props.isOpen ? 'var(--navbar-size)' : '8rem'};

    padding:${(props) => props.isOpen ? '2.3rem' : '2rem .8rem'};
    border-right: 1px solid var(--color-grey);

    ${StyledHideHeaderButton} {
        align-self: ${(props) => props.isOpen ? 'flex-end' : 'center'};
        margin-top: auto;

        @media only screen and (${BREAKPOINTS.phone}){
            display: none;
        }
    }

    ${StyledLogo} {
        @media only screen and (${BREAKPOINTS.phone}){
            display: none;
        }
    }

    @media only screen and (${BREAKPOINTS.phone}){
        position: fixed;
        bottom: 0;
        left: 0;
        width: 100%;
    }
`

export default HeaderBar