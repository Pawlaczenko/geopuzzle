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
    variant?: String
}

const NavigationItem : FC<INavigationItem> = ({label, path, variant}) => {

    return (
        <StyledNavigationItem variant={variant} to={path}>
            {label}
        </StyledNavigationItem>
    )
}

const StyledNavigationItem = styled(NavLink)<{variant?: String}>`
    color: ${(props) => (props.variant === 'footer' ? 'white' : 'var(--color-black)')};
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

    @media only screen and (${BREAKPOINTS.md}){
        font-size: 1.6rem;
        width: 100%;
    }
`;

export default NavigationItem