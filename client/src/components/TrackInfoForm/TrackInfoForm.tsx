import { Formik } from 'formik';
import { FC } from 'react'
import ButtonIcon from 'src/components/Button/ButtonIcon';
import FileInput from 'src/components/Input/FileInput';
import TagsInput from 'src/components/Input/TagsInput/TagsInput';
import TextArea from 'src/components/Input/TextArea';
import TextInput from 'src/components/Input/TextInput';
import { BREAKPOINTS } from 'src/styles/variables';
import styled from 'styled-components'
import { trackInfoValidationSchema } from './TrackInfoForm.helper';
import { CreateTrackFormData, useCreateTrackContext } from 'src/context/CreateTrackContext';
import StyledForm from '../Form.styled';

const FormNames = {
    track_name: "trackName",
    track_description: "trackDescription",
    track_thumbnail: "trackThumbnail",
    track_tags: "trackTagNames"
}

export interface TrackInfoFormValues {
    trackName: string;
    trackDescription: string;
    trackTagNames: string[];
    trackThumbnail?: string | Blob | null;
}

const TrackInfoForm : FC = () => {
    const {activeStepIndex,setActiveStepIndex,formData,setFormData} = useCreateTrackContext();
    const initialValues : TrackInfoFormValues = {
        trackName: formData.trackName, 
        trackDescription: formData.trackDescription, 
        trackTagNames: formData.trackTagNames, 
    };

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={trackInfoValidationSchema}
            onSubmit={(values) => {
                const data: CreateTrackFormData = {
                    ...formData,
                    trackName: values.trackName.trim(),
                    trackDescription: values.trackDescription.trim(),
                    trackTagNames: values.trackTagNames,
                    trackThumbnail: values.trackThumbnail
                };
                setFormData(data);
                setActiveStepIndex(activeStepIndex + 1);
            }}
        >
            {
                formik => (
                    <StyledInfoForm method="POST" onSubmit={formik.handleSubmit}>
                        <TextInput name={FormNames.track_name} label="Nazwa Trasy" placeholder='Podaj Nazwę Trasy'/>
                        <TextArea name={FormNames.track_description} label="Opis Trasy" placeholder='Podaj Opis Trasy' />
                        <FileInput  name={FormNames.track_thumbnail} label='Miniatura Trasy' />
                        <TagsInput name={FormNames.track_tags} label='Tagi' placeholder='Dodaj tagi' />
                        <ButtonIcon btnType='white' icon='create' type="submit">Następny krok</ButtonIcon>
                    </StyledInfoForm>
                )
            }
        </Formik>
    )
}

export const StyledInfoForm = styled(StyledForm)`   
    @media only screen and (${BREAKPOINTS.phone}){
        & > button {
            margin-top: 5rem;
        }
    }
`

export default TrackInfoForm