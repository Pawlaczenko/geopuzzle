import { FC } from 'react'
import Banner from 'src/components/Banner'
import Page from 'src/layout/Page.styled'

const HomePage : FC = () => {
  return (
    <Page>
        <Banner text="Witaj w GeoPuzzle" />
    </Page>
  )
}

export default HomePage