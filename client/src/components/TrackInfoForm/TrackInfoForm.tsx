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
import { addOneTrack } from 'src/services/TrackService';

const FormNames = {
    track_name: "trackName",
    track_description: "trackDescription",
    track_thumbnail: "trackThumbnail",
    track_tags: "trackTagNames"
}

export interface TrackInfoFormValues {
    trackName: string;
    trackDescription: string;
    trackTagNames: string;
    trackThumbnail?: Blob | null;
}

const TrackInfoForm : FC = () => {
    const {activeStepIndex,setActiveStepIndex,formData,setFormData} = useCreateTrackContext();
    const initialValues : TrackInfoFormValues = {
        trackName: formData.trackName, 
        trackDescription: formData.trackDescription, 
        trackTagNames: formData.trackTagNames.join(" "),
        trackThumbnail: formData.trackThumbnail || undefined
    };

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={trackInfoValidationSchema}
            onSubmit={async (values) => {
                const data: CreateTrackFormData = {
                    ...formData,
                    trackName: values.trackName.trim(),
                    trackDescription: values.trackDescription.trim(),
                    trackTagNames: values.trackTagNames.split(" "),
                    trackThumbnail: values.trackThumbnail
                };
                setFormData(data);
                await addOneTrack(data.trackName,data.trackDescription);
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
                        <ButtonIcon btnType='regular' icon='create' type="submit">Następny krok</ButtonIcon>
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