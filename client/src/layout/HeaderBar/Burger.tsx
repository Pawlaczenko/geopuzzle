import styled from 'styled-components';
import { FC } from 'react';
import { BREAKPOINTS } from '../../styles/variables';

interface IProps {
    isOpen: boolean,
    handleClick: React.MouseEventHandler 
}

const Burger : FC<IProps> = ({isOpen, handleClick}) => {
    return (
        <StyledBurger $isOpen={isOpen} onClick={handleClick}>
            <div></div>
            <div></div>
            <div></div>
        </StyledBurger>
    )
}

const StyledBurger = styled.button<{$isOpen:boolean}>`
    --burger-gap: 5px;
    --burger-height: 3px;
    --burger-cross-width: 4.8rem;
    --burger-color: var(--color-dark);

    &:hover {
        --burger-color: var(--color-secondary);
    }

    display: none;
    min-width: 3.5rem;
    min-height: 5rem;
    
    border: none;
    cursor: pointer;
    background: transparent;

    flex-direction: column;
    justify-content: center;
    align-items: center;
    
    & div {
        width: 100%;        
        height: var( --burger-height);
        z-index: 150;
        position: relative;
        background-color: var(--burger-color);
        transition: all .2s ease-in-out;
        border-radius: 5px;
        
        &:nth-child(1){
            ${props => props.$isOpen && `
                transform: translateY(250%) rotate(45deg);
            `};
        }

        &:nth-child(2){
            ${props => props.$isOpen && `
                background-color: transparent; 
            `};
        }

        &:nth-child(3){
            ${props => props.$isOpen && `
                transform: translateY(-250%) rotate(-45deg);
            `};
        }

        &:not(:last-child){
            margin-bottom: var(--burger-gap);
        }
    }

    @media only screen and (${BREAKPOINTS.phone}){
        display: flex;
    }
`;

export default Burger