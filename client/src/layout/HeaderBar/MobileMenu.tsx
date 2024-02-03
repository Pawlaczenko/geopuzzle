import { FC } from 'react';
import Navigation from "src/components/Navigation/Navigation"
import { BREAKPOINTS } from 'src/styles/variables';
import { styled } from "styled-components"
import Container from '../Container';
import Button from 'src/components/Button/Button.styled';
import Searchbar, { StyledSearchbar } from 'src/components/Input/Searchbar';

interface IProps {
    isOpen: boolean,
}

const MobileMenu : FC<IProps> = ({isOpen}) => {
     return (
        <StyledMobileMenu $isOpen={isOpen}>
            <div>
                <Navigation />
                <Button variant='outline'>Zaloguj</Button>
                <Searchbar placeholder='Wyszukaj trasę' name={'search'}  />
            </div>
        </StyledMobileMenu>
    )
}

const StyledMobileMenu = styled(Container)<{$isOpen: boolean}>`
    position: fixed;
    z-index: 10;
    width: 100%;
    height: 100vh;
    top: 0;
    left: 0;
    background-color: var(--color-white);
    transform: ${({ $isOpen }) => ($isOpen ? 'translateX(0)' : 'translateX(100%)')};
    transition: transform 0.3s ease-in-out;
    padding-top: 14rem;

    ${StyledSearchbar} {
        margin-top: 5rem;
    }

    display: none;
    @media only screen and (${BREAKPOINTS.phone}){
        display: grid;
    }

    ${Button} {
        @media only screen and (${BREAKPOINTS.md}) {
            margin: auto;
            display: block;
        }

        @media only screen and (${BREAKPOINTS.small}) {
            width: 100%;
        }
    }
`

export default MobileMenu