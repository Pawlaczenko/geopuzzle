import { FC } from 'react'
import styled from 'styled-components'
import NavigationItem, { INavigationItem } from './NavigationItem'
import { NAV_ROUTES } from 'src/data/navigation.data'
import { NAVIGATION_ICONS } from 'src/data/icons'
import { BREAKPOINTS } from 'src/styles/variables'
import { flexContainer } from 'src/styles/mixins'

const Navigation : FC = () => {
    const navigationItems : INavigationItem[] = [
        {label: "Strona Główna", path: NAV_ROUTES.home, icon: NAVIGATION_ICONS.home},
        {label: "Eksploruj", path: NAV_ROUTES.placeholder, icon: NAVIGATION_ICONS.explore},
        {label: "Utwórz Trasę", path: NAV_ROUTES.createTrack, icon: NAVIGATION_ICONS.create},
        {label: "Zagadki", path: NAV_ROUTES.placeholder, icon: NAVIGATION_ICONS.puzzle},
        {label: "Zaloguj", path: NAV_ROUTES.placeholder, icon: NAVIGATION_ICONS.login},
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

    @media only screen and (${BREAKPOINTS.phone}){
        ${flexContainer('space-between', 'center')};
        margin-top: 0;
    }
`;


export default Navigation