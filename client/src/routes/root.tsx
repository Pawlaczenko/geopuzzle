import { Outlet } from 'react-router-dom'
import { ThemeContext } from 'src/context/ThemeContext'
import { useCustomTheme } from 'src/hooks/useCustomTheme'
import Footer from 'src/layout/Footer'
import HeaderBar from 'src/layout/HeaderBar/HeaderBar'
import GlobalStyles from 'src/styles/globalStyles'
import { Themes } from 'src/styles/theme'
import { ThemeProvider, styled } from 'styled-components'
import { ScrollRestoration } from "react-router-dom";

const Root = () => {
    const [theme, themeName, toggleTheme] = useCustomTheme(Themes.light);
    return (
        <ThemeProvider theme={theme}>
            <ThemeContext.Provider value={{themeName,toggleTheme}}>
                <ScrollRestoration />
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

`

export default Root