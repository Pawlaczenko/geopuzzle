import { FC } from 'react'
import { useSelector } from 'react-redux';
import { RootState } from 'src/app/store';
import { BREAKPOINTS } from 'src/styles/variables';
import styled from 'styled-components'

const PopMenu : FC = () => {
    const isOpen = useSelector((state: RootState) => state.popMenu);
    return (
        <StyledPopMenu isOpen={isOpen}>
            PopMenu
        </StyledPopMenu>
    )
}

const StyledPopMenu = styled.div<{isOpen: boolean}>`
    display: ${(props) => props.isOpen ? 'block' : 'none'};
    position: absolute;
    left: 0;
    bottom: 125%;

    width: 30rem;
    background: var(--color-white);
    border: 1px solid var(--color-grey);
    box-shadow: 0 .3rem 0 0 var(--color-grey);
    border-radius: var(--radius);
    padding: 2rem 2rem;

    @media only screen and (${BREAKPOINTS.phone}){
        bottom: -125%;
        right: 2rem;
        left: unset;
    }
`;


export default PopMenu