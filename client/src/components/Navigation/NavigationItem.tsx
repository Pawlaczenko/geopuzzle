import { FC } from 'react'
import { IconType } from 'react-icons'
import { NavLink } from 'react-router-dom'
import { NAV_ROUTES } from 'src/data/navigation.data'
import { flexContainer } from 'src/styles/mixins'
import styled from 'styled-components'

export interface INavigationItem {
    label: string,
    path: NAV_ROUTES,
    icon: IconType
}

const NavigationItem : FC<INavigationItem> = (props) => {
    return (
        <StyledNavigationItem to={props.path}>
            <NavigationItemIcon>
                {<props.icon />}
            </NavigationItemIcon>
            {props.label}
        </StyledNavigationItem>
    )
}

const StyledNavigationItem = styled(NavLink)`
    color: var(--color-dark);
    font-size: var(--fs-paragraph);
    border-radius: var(--radius);

    ${flexContainer('flex-start','center')}
    gap: 1.8rem;
    padding: 1rem 0;
    padding-left: 1rem;

    &.active {
        color: var(--color-secondary);
        font-weight: bold;
    }

    &:hover {
        background-color: var(--color-grey);
    }
`;

const NavigationItemIcon = styled.figure`
    & > svg {
        --icon-size: 2.5rem;
        width: var(--icon-size);
        height: var(--icon-size);
        fill: currentColor;
    }
`;

export default NavigationItem