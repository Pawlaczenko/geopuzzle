import { FC } from 'react'
import styled from 'styled-components'
import NavigationItem, { INavigationItem } from './NavigationItem'
import { NAV_ROUTES } from 'src/data/navigation.data'
import { ICONS } from 'src/data/icons.data'
import { BREAKPOINTS } from 'src/styles/variables'
import { flexContainer } from 'src/styles/mixins'

const Navigation : FC = () => {
    const navigationItems : INavigationItem[] = [
        {label: "Eksploruj", path: NAV_ROUTES.displayTrack, Icon: ICONS.get('explore')!},
        {label: "Utwórz Trasę", path: NAV_ROUTES.createTrack, Icon: ICONS.get('create')!},
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
    margin-left: 2.4rem;
    font-family: var(--family-primary);
    display: flex;
    align-items: center;
    justify-content: flex-start;
`;

export default Navigation