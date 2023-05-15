import { FC } from 'react'
import styled from 'styled-components'
import NavigationItem, { INavigationItem } from './NavigationItem'
import { NAV_ROUTES } from 'src/data/navigation.data'
import { NAVIGATION_ICONS } from 'src/data/icons'

const Navigation : FC = () => {
    const navigationItems : INavigationItem[] = [
        {label: "Strona Główna", path: NAV_ROUTES.home, icon: NAVIGATION_ICONS.home},
        {label: "Eksploruj", path: NAV_ROUTES.createRoute, icon: NAVIGATION_ICONS.explore},
        {label: "Utwórz Trasę", path: NAV_ROUTES.createRoute, icon: NAVIGATION_ICONS.create},
        {label: "Zagadki", path: NAV_ROUTES.createRoute, icon: NAVIGATION_ICONS.puzzle},
        {label: "Zaloguj", path: NAV_ROUTES.createRoute, icon: NAVIGATION_ICONS.login},
    ]
    return (
        <StyledNavigation>
            {
                navigationItems.map((item,index) => <NavigationItem {...item} key={item.path+index} />)
            }
        </StyledNavigation>
    )
}

const StyledNavigation = styled.nav`
    font-family: var(--family-primary);
    margin-top: 2rem;
    width: 100%;
`;


export default Navigation