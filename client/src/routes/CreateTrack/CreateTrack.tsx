import { FC } from 'react'
import Banner from 'src/components/Banner'
import Page from 'src/layout/Page.styled'

const CreateTrack : FC = () => {
  return (
    <Page>
        <Banner text="Stwórz Trasę" />
    </Page>
  )
}

export default CreateTrack