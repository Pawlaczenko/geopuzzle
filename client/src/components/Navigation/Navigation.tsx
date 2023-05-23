import { FC } from 'react'
import styled from 'styled-components'
import NavigationItem, { INavigationItem } from './NavigationItem'
import { NAV_ROUTES } from 'src/data/navigation.data'
import { ICONS } from 'src/data/icons.data'
import { BREAKPOINTS } from 'src/styles/variables'
import { flexContainer } from 'src/styles/mixins'

const Navigation : FC = () => {
    const navigationItems : INavigationItem[] = [
        {label: "Strona Główna", path: NAV_ROUTES.home, Icon: ICONS.get('home')!},
        {label: "Eksploruj", path: NAV_ROUTES.placeholder, Icon: ICONS.get('explore')!},
        {label: "Utwórz Trasę", path: NAV_ROUTES.createTrack, Icon: ICONS.get('create')!},
        {label: "Zagadki", path: NAV_ROUTES.placeholder, Icon: ICONS.get('puzzle')!},
        {label: "Zaloguj", path: NAV_ROUTES.placeholder, Icon: ICONS.get('login')!},
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