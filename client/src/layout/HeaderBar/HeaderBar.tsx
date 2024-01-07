import { FC } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'src/app/store';
import Logo, { LogoType, StyledLogo } from "src/components/Logo"
import Navigation from "src/components/Navigation/Navigation"
import { flexContainer } from "src/styles/mixins"
import { BREAKPOINTS } from 'src/styles/variables';
import { styled } from "styled-components"
import Container from '../Container';
import Button from 'src/components/Button/Button.styled';

const HeaderBar : FC = () => {
    const isOpen = useSelector((state: RootState) => state.header);
    const logoType : LogoType = isOpen ? 'filled' : 'compact';
     return (
        <Container>
            <StyledHeaderBar $isOpen={isOpen}>
                <Logo />
                <Navigation />

                <Button variant='outline'>Zaloguj</Button>
                <Button variant='outline'>Utwórz konto</Button>
            </StyledHeaderBar>
        </Container>
    )
}

export const StyledHeaderBar = styled.header<{$isOpen: boolean}>`
    ${flexContainer('flex-start','center','row')};
    padding: 1.4rem 0;

    ${StyledLogo} {
        width: 12rem;
    }
`

export default HeaderBar