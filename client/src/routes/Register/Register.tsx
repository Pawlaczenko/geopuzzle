import { FC } from 'react'
import Banner from 'src/components/Banner'
import RegisterForm from 'src/components/RegisterForm/RegisterForm'
import Page from 'src/layout/Page.styled'

const RegisterPage : FC = () => {
  return (
    <Page>
        <RegisterForm />
    </Page>
  )
}

export default RegisterPage