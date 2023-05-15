import { FC } from 'react'
import styled from 'styled-components'
import { MdKeyboardDoubleArrowRight as HideIcon } from "react-icons/md";
import { createCircle } from 'src/styles/mixins';
import { RootState } from 'src/app/store';
import { useDispatch, useSelector } from 'react-redux';
import { toggleOpen } from 'src/features/header/headerSlice';

const HideHeaderButton : FC = () => {
    const isOpen = useSelector((state: RootState) => state.header);
    const dispatch = useDispatch();

    const handlePanelClose = () => {
        dispatch(toggleOpen());
    }

    return (
        <StyledHideHeaderButton isOpen={isOpen} onClick={handlePanelClose}>
            <HideIcon />
        </StyledHideHeaderButton>
    )
}

export const StyledHideHeaderButton = styled.button<{isOpen: boolean}>`
    ${createCircle('3.5rem')};
    background: var(--color-grey);
    cursor: pointer;
    ${(props) => props.isOpen && 'transform: rotate(180deg)'};

    &:hover {
        background-color: var(--color-secondary);
        color: white;
    }

    & > svg {
        fill: currentColor;
        width: 100%;
        height: 100%;
        padding: .5rem;
    }
`;


export default HideHeaderButton