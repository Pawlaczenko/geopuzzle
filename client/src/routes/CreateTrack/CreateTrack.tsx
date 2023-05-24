import { FC } from 'react'
import { Outlet } from 'react-router-dom'
import Banner from 'src/components/Banner'
import Page from 'src/layout/Page.styled'
import Navigator from 'src/components/Navigator'

const CreateTrack : FC = () => {
  return (
    <Page>
        <Banner text="Stwórz Trasę" />
        <Navigator />
        <Outlet />
    </Page>
  )
}

export default CreateTrack