import { FC } from 'react'
import Banner from 'src/components/Banner'
import LoginForm from 'src/components/LoginForm/LoginForm'
import Page from 'src/layout/Page.styled'

const LoginPage : FC = () => {
  return (
    <Page>
        <LoginForm />
    </Page>
  )
}

export default LoginPage