import { FC } from 'react'
import { NavLink } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { NAV_ROUTES } from 'src/data/navigation.data';
import { flexContainer } from 'src/styles/mixins';
import { BREAKPOINTS } from 'src/styles/variables';
import styled, { css } from 'styled-components'

const Navigator : FC = () => {
    const NavigatorRoutes = [
        {
            id: 1,
            path: NAV_ROUTES.createTrack,
            label: "Informacje o Trasie"
        },
        {
            id: 2,
            path: NAV_ROUTES.createTrack+'/waypoint',
            label: "Dodaj Punkt"
        },
        {
            id: 3,
            path: NAV_ROUTES.createTrack+'/summary',
            label: "Podsumowanie"
        },
    ];
    const location = useLocation();
    const checkStatus = (id:number) : boolean => {
        const currentRoute = NavigatorRoutes.find(el => el.path === location.pathname);
        return (id <= (currentRoute ? currentRoute.id : 1));
    }
    return (
        <StyledNavigator>
            {
                NavigatorRoutes.map((route,index) => {
                    return(
                        <StyledNavigatorItem key={`${route.path}-${index}`}>
                            <StyledNavigatorLink to={route.path} $isVisited={checkStatus(route.id)}>
                                {route.label}
                            </StyledNavigatorLink>
                        </StyledNavigatorItem>
                    )
                } )
            }
        </StyledNavigator>
    )
}

const StyledNavigator = styled.ul`
    background: var(--color-grey);
    padding: 2rem;
    ${flexContainer('center','center')};
    gap: 4rem;
    list-style-type: none;

    @media only screen and (${BREAKPOINTS.phone}){
        gap: 1.5rem;
    }
`;

const StyledNavigatorItem = styled.li`
    
`

const StyledNavigatorLink = styled(NavLink)<{$isVisited: boolean}>`
    font-family: var(--family-primary);
    color: var(--color-dark);
    ${(props) => props.$isVisited ? "font-weight: bold" : "pointer-events: none"};
    @media only screen and (${BREAKPOINTS.phone}){
        font-size: 1.2rem;
    }
    
    &.active {
        font-weight: bold;
    }
`

export default Navigator