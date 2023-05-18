import { FC } from 'react'
import Banner from 'src/components/Banner'
import Input from 'src/components/Input/Input'
import Page from 'src/layout/Page.styled'
import Section from 'src/layout/Section.styled'

const CreateTrack : FC = () => {
  return (
    <Page>
        <Banner text="Stwórz Trasę" />
        <Section>
            <Input label='Nazwa Trasy' name='track_name' placeholder='Podaj nazwę trasy' required={true}  />
            <Input label='Opis Trasy' name='track_description' placeholder='Podaj opis trasy' required={true} type='textarea' />
        </Section>
    </Page>
  )
}

export default CreateTrack