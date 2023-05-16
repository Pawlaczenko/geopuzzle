import { FC } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'src/app/store';
import HideHeaderButton, { StyledHideHeaderButton } from "src/components/HideHeaderButton"
import Logo, { LogoType, StyledLogo } from "src/components/Logo"
import Navigation from "src/components/Navigation/Navigation"
import PopMenu from 'src/components/PopMenu';
import SettingsButton from 'src/components/SettingsButton';
import { flexContainer } from "src/styles/mixins"
import { BREAKPOINTS } from 'src/styles/variables';
import { styled } from "styled-components"

const HeaderBar : FC = () => {
    const isOpen = useSelector((state: RootState) => state.header);
    const logoType : LogoType = isOpen ? 'filled' : 'compact';
     return ( 
        <StyledHeaderBar isOpen={isOpen}>
            <Logo logoType={logoType} />
            <Navigation />
            <ButtonsContainer isOpen={isOpen}>
                <SettingsButton />
                <HideHeaderButton />
                <PopMenu />
            </ButtonsContainer>
        </StyledHeaderBar>
    )
}

export const StyledHeaderBar = styled.header<{isOpen: boolean}>`
    ${flexContainer('flex-start','center','column')};
    width: ${(props) => props.isOpen ? 'var(--navbar-size)' : '8rem'};

    padding:${(props) => props.isOpen ? '2.3rem' : '2rem .8rem'};
    border-right: 1px solid var(--color-grey);
    background-color: ${(props) => props.theme.header};

    ${StyledHideHeaderButton} {
        @media only screen and (${BREAKPOINTS.phone}){
            display: none;
        }
    }

    & > ${StyledLogo} {
        width: 60%;
    }

    @media only screen and (${BREAKPOINTS.phone}){
        position: fixed;
        bottom: 0;
        left: 0;
        width: 100%;
        padding: .8rem;

        ${StyledLogo} {
            display: none;
        }
    }
`

const ButtonsContainer = styled.div<{isOpen: boolean}>`
    margin-top: auto;
    position: relative;
    
    width: 100%;
    ${(props) => flexContainer(props.isOpen ? 'space-between' : 'center','center')};
    gap: 1rem;
    flex-wrap: wrap;

    @media only screen and (${BREAKPOINTS.phone}){
        position: fixed;
        top: 0;
        left: 0;

        padding: 1rem 2rem; 
        justify-content: flex-end;
        background: ${(props) => props.theme.header}
    }
`

export default HeaderBar