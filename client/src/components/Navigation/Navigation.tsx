import { FC } from 'react'
import styled, { css } from 'styled-components'
import NavigationItem, { INavigationItem } from './NavigationItem'
import { NAV_ROUTES } from 'src/data/navigation.data'
import { BREAKPOINTS } from 'src/styles/variables'

const Navigation : FC<{variant?: String}> = ({variant}) => {
    const navigationItems : INavigationItem[] = [
        {label: "Eksploruj", path: NAV_ROUTES.displayTrack},
        {label: "Utwórz Trasę", path: NAV_ROUTES.createTrack},
    ]
    return (
        <StyledNavigation variant={variant}>
            {
                navigationItems.map((item,index) => <NavigationItem variant={variant} {...item} key={item.path+index} />)
            }
        </StyledNavigation>
    )
}

const mobileDesktop = css`
    @media only screen and (${BREAKPOINTS.md}){
        margin-left: 0;
        flex-direction: column;
        justify-content: center;
        margin: 2rem;
    }
`

const StyledNavigation = styled.nav<{variant?: String}>`
    margin-left: 2.4rem;
    margin-right: ${(props) => (props.variant === 'footer' ? '0' : 'auto')};
    font-family: var(--family-primary);
    display: flex;
    align-items: center;
    justify-content: flex-start;

    ${(props) => (props.variant === 'footer' ? '' : mobileDesktop)};
`;

export default Navigation