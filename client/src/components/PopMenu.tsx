import { FC, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'src/app/store';
import { flexContainer } from 'src/styles/mixins';
import { BREAKPOINTS } from 'src/styles/variables';
import styled from 'styled-components'
import ToggleThemeButton from './ToggleThemeButton';
import { setOpen } from 'src/features/popMenu/popMenuSlice';
import { useDetectOutside } from 'src/hooks/useDetectOutside';

const PopMenu : FC = () => {
    const isOpen = useSelector((state: RootState) => state.popMenu);
    const dispatch = useDispatch();
    const menuRef = useRef(null);
    useDetectOutside(menuRef,()=>{dispatch(setOpen(false))});

    return (
        <StyledPopMenu isOpen={isOpen} ref={menuRef}>
            <StyledPopMenuItem>
                Ciemny wygląd <ToggleThemeButton />
            </StyledPopMenuItem>
        </StyledPopMenu>
    )
}

const StyledPopMenu = styled.ul<{isOpen: boolean}>`
    display: ${(props) => props.isOpen ? 'block' : 'none'};
    position: absolute;
    left: 0;
    bottom: 125%;
    width: 30rem;
    padding: 2rem;

    background: ${(props) => props.theme.header};
    border: 1px solid var(--color-grey);
    box-shadow: 0 .3rem 0 0 var(--color-grey);
    border-radius: var(--radius);

    @media only screen and (${BREAKPOINTS.phone}){
        bottom: -150%;
        right: 2rem;
        left: unset;
    }

    list-style-type: none;
`;

const StyledPopMenuItem = styled.li`
    padding: 1rem;
    width: 100%;
    font-weight: bold;    
    border-bottom: var(--border-thin);
    ${flexContainer('space-between','center')}

    &:not(:last-child) {
        margin-bottom: 1.5rem;
    }
`


export default PopMenu