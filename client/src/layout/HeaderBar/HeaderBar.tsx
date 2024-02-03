import { FC, MouseEvent, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'src/app/store';
import Logo, { LogoType, StyledLogo } from "src/components/Logo"
import Navigation from "src/components/Navigation/Navigation"
import { flexContainer } from "src/styles/mixins"
import { BREAKPOINTS } from 'src/styles/variables';
import { styled } from "styled-components"
import Container from '../Container';
import Button from 'src/components/Button/Button.styled';
import Searchbar, { StyledSearchbar } from 'src/components/Input/Searchbar';
import Burger from './Burger';
import useMediaQuery from 'src/hooks/useMediaQuery';
import MobileMenu from './MobileMenu';
import { Link, useLocation } from 'react-router-dom';

const HeaderBar : FC = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const isPhone = useMediaQuery(`(${BREAKPOINTS.phone})`);

    const location = useLocation();

    useEffect(() => {
      setIsOpen(false);
    }, [location]);

    const toggleMobileMenu = () => {
        setIsOpen(!isOpen);
    }

     return (
        <Container>
            <StyledHeaderBar $isOpen={isOpen}>
                <Logo />
                {!isPhone && <Navigation />}
                <Searchbar placeholder='Wyszukaj trasę' name={'search'}  />
                {!isPhone && <Link to="/login"><Button variant='outline'>Zaloguj</Button></Link>}
                <Burger isOpen={isOpen} handleClick={toggleMobileMenu} />
            </StyledHeaderBar>
            <MobileMenu isOpen={isOpen} />
        </Container>
    )
}

export const StyledHeaderBar = styled.header<{$isOpen: boolean}>`
    ${flexContainer('space-between','center','row')};
    gap: 0.8rem;
    padding: 1.4rem 0;
    z-index: 100;

    ${StyledLogo} {
        width: 12rem;
        flex-shrink: 0;
        @media only screen and (${BREAKPOINTS.phone}){
            margin-right: auto;
        }
    }

    ${StyledSearchbar} {
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        width: 32.5rem;

        @media only screen and (max-width: 1150px){
            position: relative;
            transform: none;
            left: unset;
        }

        @media only screen and (max-width: 870px){
            width: auto;
        }

        @media only screen and (max-width: 768px){
            display: none;
        }
    }
`

export default HeaderBar