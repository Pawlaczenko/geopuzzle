import { FC } from 'react'
import styled from 'styled-components'
import { MdKeyboardDoubleArrowRight as HideIcon } from "react-icons/md";
import { RootState } from 'src/app/store';
import { useDispatch, useSelector } from 'react-redux';
import { toggleOpen } from 'src/features/header/headerSlice';
import CircleButton from './CircleButton.styled';

const HideHeaderButton : FC = () => {
    const isOpen = useSelector((state: RootState) => state.header);
    const dispatch = useDispatch();

    const handlePanelClose = () => {
        dispatch(toggleOpen());
    }

    return (
        <StyledHideHeaderButton $isOpen={isOpen} onClick={handlePanelClose}>
            <HideIcon />
        </StyledHideHeaderButton>
    )
}

export const StyledHideHeaderButton = styled(CircleButton)<{$isOpen: boolean}>`
    ${(props) => props.$isOpen && 'transform: rotate(180deg)'};
`;


export default HideHeaderButton