import { Outlet } from 'react-router-dom'
import { StyledLogo } from 'src/components/Logo'
import HeaderBar from 'src/layout/HeaderBar/HeaderBar'
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
    grid-template-columns: var(--navbar-size) 1fr;

    ${StyledLogo} {
        width: 50%;
    }
`

export default Root