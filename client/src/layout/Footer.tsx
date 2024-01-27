import { FC, useState } from 'react';
import Logo, { LogoType, StyledLogo } from "src/components/Logo"
import { flexContainer } from "src/styles/mixins"
import { BREAKPOINTS } from 'src/styles/variables';
import { styled } from "styled-components"
import Container from './Container';
import Button from 'src/components/Button/Button.styled';
import useMediaQuery from 'src/hooks/useMediaQuery';
import Navigation from 'src/components/Navigation/Navigation';

const Footer : FC = () => {
     return (
         <StyledFooter>
            <Container>
                <div>
                    <Logo type='white' />
                    <Paragraph>
                        Geopuzzle - Twoja podróż po wiedzy geograficznej zaczyna się tutaj! Włącz się w interaktywną platformę edukacyjną, gdzie geografia staje się nie tylko nauką, ale również ekscytującą przygodą!
                    </Paragraph>
                </div>
            </Container>
            <FooterNav>
                <Container>
                    <div>
                        <p>Copyright &copy; 2024 Geopuzzle</p>
                        <Navigation variant="footer" />
                    </div>
                </Container>
            </FooterNav>
        </StyledFooter>
    )
}

const StyledFooter = styled.footer`
    gap: 0.8rem;
    background-color: #111;

    & > ${Container} > div {
        padding: 4.8rem 0;
        ${flexContainer('center','center','column')};
    }

    ${StyledLogo} {
        width: 20rem;
        flex-shrink: 0;
    }
`
const FooterNav = styled.div`
    background-color: black;
    padding: 1.2rem 0;
    & > ${Container} > div {
        ${flexContainer('space-between','center','row')};
        @media only screen and (${BREAKPOINTS.phone}){
            ${flexContainer('center','center','column')};

            nav {
                margin-left: 0;
                width: 100%;
                margin-top: 2.4rem;
            }
        }
    }
`

const Paragraph = styled.p`
    width: 45%;
    text-align: center;
    font-size: 1.4rem;
    margin-top: 1.8rem;
    color: #aaa;

    @media only screen and (${BREAKPOINTS.phone}){
        width: 100%;
    }
`;

export default Footer