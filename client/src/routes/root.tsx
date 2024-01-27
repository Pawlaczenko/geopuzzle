import { Outlet } from 'react-router-dom'
import { ThemeContext } from 'src/context/ThemeContext'
import { useCustomTheme } from 'src/hooks/useCustomTheme'
import Footer from 'src/layout/Footer'
import HeaderBar from 'src/layout/HeaderBar/HeaderBar'
import GlobalStyles from 'src/styles/globalStyles'
import { Themes } from 'src/styles/theme'
import { BREAKPOINTS } from 'src/styles/variables'
import { ThemeProvider, styled } from 'styled-components'

const Root = () => {
    const [theme, themeName, toggleTheme] = useCustomTheme(Themes.light);
    return (
        <ThemeProvider theme={theme}>
            <ThemeContext.Provider value={{themeName,toggleTheme}}>
                <AppContainer>
                    <GlobalStyles />
                    <HeaderBar />
                    <Outlet />
                    <Footer />
                </AppContainer>
            </ThemeContext.Provider>
        </ThemeProvider>
    )
}

const AppContainer  = styled.div`
    /* height: 100vh; */
    /* display: grid; */
    
    /* grid-template-columns: min-content 1fr; */

    /* @media only screen and (${BREAKPOINTS.phone}){ */
        /* grid-template-columns: 1fr; */
    /* } */
`

export default Root