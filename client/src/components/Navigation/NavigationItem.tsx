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
    icon: IconType
}

const NavigationItem : FC<INavigationItem> = (props) => {
    const isOpen = useSelector((state: RootState) => state.header);
    const isPhone = useMediaQuery(`(${BREAKPOINTS.phone})`);
    const isCompact =
    (isPhone && !isOpen) ? false :
    (isPhone && isOpen) ? false :
    (!isPhone && isOpen) ? true :
    false;

    return (
        <StyledNavigationItem to={props.path} isCompact={isCompact}>
            <NavigationItemIcon>
                {<props.icon />}
            </NavigationItemIcon>
            {isCompact && props.label}
        </StyledNavigationItem>
    )
}

const StyledNavigationItem = styled(NavLink)<{isCompact: boolean}>`
    color: ${(props) => props.theme.textBlue};
    font-size: var(--fs-paragraph);
    border-radius: var(--radius);

    ${(props) => flexContainer(props.isCompact ? 'flex-start' : 'center','center')}
    gap: 1.8rem;
    padding: 1rem;

    &.active {
        color: ${(props) => props.theme.primary};
        font-weight: bold;
    }

    &:hover {
        background-color: var(--color-grey);
        color: var(--color-dark);
    }
`;

const NavigationItemIcon = styled.figure`
    & > svg {
        --icon-size: 2.5rem;
        width: var(--icon-size);
        height: var(--icon-size);
        fill: currentColor;

        @media only screen and (${BREAKPOINTS.phone}){
            --icon-size: 3rem;
        }
    }
`;

export default NavigationItem