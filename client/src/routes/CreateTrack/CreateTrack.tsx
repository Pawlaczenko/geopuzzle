import { FC } from 'react'
import { Outlet } from 'react-router-dom'
import Banner from 'src/components/Banner'
import Page from 'src/layout/Page.styled'

const CreateTrack : FC = () => {
  return (
    <Page>
        <Banner text="Stwórz Trasę" />
        <Outlet />
    </Page>
  )
}

export default CreateTrack