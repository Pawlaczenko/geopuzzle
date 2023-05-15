import { Outlet } from 'react-router-dom'
import { StyledLogo } from 'src/components/Logo'
import HeaderBar from 'src/layout/HeaderBar/HeaderBar'
import { BREAKPOINTS } from 'src/styles/variables'
import { styled } from 'styled-components'

const Root = () => {
    return (
        <AppContainer>
            <HeaderBar />
            <Outlet /> 
        </AppContainer>
    )
}

const AppContainer  = styled.div`
    height: 100vh;
    display: grid;
    
    grid-template-columns: min-content 1fr;

    ${StyledLogo} {
        width: 50%;
    }

    @media only screen and (${BREAKPOINTS.phone}){
        grid-template-columns: 1fr;
    }
`

export default Root