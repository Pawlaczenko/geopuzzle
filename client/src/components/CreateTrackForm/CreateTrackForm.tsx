import { Formik, useFormik } from 'formik';
import { FC, FormEvent, useRef, useState } from 'react'
import { useDispatch } from 'react-redux';
import { Form } from 'react-router-dom';
import ButtonIcon from 'src/components/Button/ButtonIcon';
import FileInput from 'src/components/Input/FileInput';
import TagsInput from 'src/components/Input/TagsInput/TagsInput';
import TextArea from 'src/components/Input/TextArea';
import TextInput from 'src/components/Input/TextInput';
import { updateTrackInfo } from 'src/features/trackCreator/trackCreatorSlice';
import { toBase64 } from 'src/helpers/toBase64.helper';
import { flexContainer } from 'src/styles/mixins';
import { BREAKPOINTS } from 'src/styles/variables';
import styled from 'styled-components'
import { trackInfoValidationSchema } from './CreateTrackForm.helper';

const FormNames = {
    track_name: "trackName",
    track_description: "trackDescription",
    track_thumbnail: "trackThumbnail",
    track_tags: "trackTagNames"
}

export interface FormValues {
    trackName: string;
    trackDescription: string;
    trackTagNames: string;
    trackThumbnail: string;
}

const CreateTrackForm : FC = () => {
    const initialValues : FormValues = {trackName: '', trackDescription: '', trackTagNames: '', trackThumbnail: ''};
    return (
        <Formik
            initialValues={initialValues}
            validationSchema={trackInfoValidationSchema}
            onSubmit={(values,{setSubmitting}) => {
                console.log(values);
            }}
        >
            {
                formik => (
                    <StyledForm method="POST" onSubmit={formik.handleSubmit}>
                        <TextInput name={FormNames.track_name} label="Nazwa Trasy" placeholder='Podaj Nazwę Trasy'/>
                        <TextArea name={FormNames.track_description} label="Opis Trasy" placeholder='Podaj Opis Trasy' />
                        <FileInput  name={FormNames.track_thumbnail} label='Miniatura Trasy' />
                        <TagsInput name={FormNames.track_tags} label='Tagi' placeholder='Dodaj tagi' />
                        <ButtonIcon btnType='white' icon='create' type="submit">Następny krok</ButtonIcon>
                    </StyledForm>
                )
            }
        </Formik>
    )
}

const StyledForm = styled(Form)`
    grid-area: form;
    ${flexContainer('flex-start','center','column')}
    gap: 2rem;
    min-width: 0;
    
    @media only screen and (${BREAKPOINTS.phone}){
        & > button {
            margin-top: 5rem;
        }
    }
`

export default CreateTrackForm