import { FC } from "react"
import Logo from "src/components/Logo"
import Navigation from "src/components/Navigation/Navigation"
import { flexContainer } from "src/styles/mixins"
import { styled } from "styled-components"

const HeaderBar : FC = () => {
  return ( 
    <StyledHeaderBar>
        <Logo />
        <Navigation />
    </StyledHeaderBar>
  )
}

export const StyledHeaderBar = styled.header`
    ${flexContainer('flex-start','center','column')};

    padding: 2.3rem;
    border-right: 1px solid var(--color-grey);
`

export default HeaderBar