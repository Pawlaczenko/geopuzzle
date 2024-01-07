import { FC } from 'react'
import { IconType } from 'react-icons'
import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { RootState } from 'src/app/store'
import { NAV_ROUTES } from 'src/data/navigation.data'
import useMediaQuery from 'src/hooks/useMediaQuery'
import { flexContainer } from 'src/styles/mixins'
import styled from 'styled-components'
import { BREAKPOINTS } from '../../styles/variables';

export interface INavigationItem {
    label: string,
    path: NAV_ROUTES,
    Icon: IconType
}

const NavigationItem : FC<INavigationItem> = ({label, path, Icon}) => {
    // const isOpen = useSelector((state: RootState) => state.header);
    // const isPhone = useMediaQuery(`(${BREAKPOINTS.phone})`);

    return (
        <StyledNavigationItem to={path}>
            {label}
        </StyledNavigationItem>
    )
}

const StyledNavigationItem = styled(NavLink)`
    color: var(--color-black);
    font-size: 1.4rem;
    border-radius: var(--radius);

    ${flexContainer('center','center')}
    gap: 1.8rem;
    padding: 1rem;

    &.active {
        color: ${(props) => props.theme.primary};
    }

    &:hover {
        background-color: var(--color-grey);
        color: var(--color-dark);
    }
`;

export default NavigationItem