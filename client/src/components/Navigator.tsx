import { FC } from 'react'
import { NavLink } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { flexContainer } from 'src/styles/mixins';
import { BREAKPOINTS } from 'src/styles/variables';
import styled, { css } from 'styled-components'

const Navigator : FC = () => {
    const NavigatorRoutes = [
        {
            id: 1,
            path: '/createTrack',
            label: "Informacje o Trasie"
        },
        {
            id: 2,
            path: '/createTrack/waypoint',
            label: "Dodaj Punkt"
        },
        {
            id: 3,
            path: '/createTrack/summary',
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
                        <>
                            <StyledNavigatorLink to={route.path} isVisited={checkStatus(route.id)}>{route.label}</StyledNavigatorLink>
                            {index < NavigatorRoutes.length-1 && <StyledArrow>{"-"}</StyledArrow>}
                        </>
                    )
                } )
            }
        </StyledNavigator>
    )
}

const StyledNavigator = styled.div`
    background: var(--color-grey);
    padding: 2rem;
    ${flexContainer('center','center')};
    gap: 3rem;

    @media only screen and (${BREAKPOINTS.phone}){
        gap: 1.5rem;
    }
`;

const StyledNavigatorLink = styled(NavLink)<{isVisited: boolean}>`
    font-family: var(--family-primary);
    color: var(--color-dark);
    ${(props) => props.isVisited ? "font-weight: bold" : "pointer-events: none"};
    @media only screen and (${BREAKPOINTS.phone}){
        font-size: 1.2rem;
    }
    
    &.active {
        font-weight: bold;
        text-decoration: underline;
    }
`

const StyledArrow = styled.span`
    font-weight: bold;
`

export default Navigator