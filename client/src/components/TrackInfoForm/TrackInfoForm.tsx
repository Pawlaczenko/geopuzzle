import { Formik } from 'formik';
import { FC } from 'react'
import { useDispatch } from 'react-redux';
import { Form, useNavigate } from 'react-router-dom';
import ButtonIcon from 'src/components/Button/ButtonIcon';
import FileInput from 'src/components/Input/FileInput';
import TagsInput from 'src/components/Input/TagsInput/TagsInput';
import TextArea from 'src/components/Input/TextArea';
import TextInput from 'src/components/Input/TextInput';
import { updateTrackInfo } from 'src/features/trackCreator/trackCreatorSlice';
import { flexContainer } from 'src/styles/mixins';
import { BREAKPOINTS } from 'src/styles/variables';
import styled from 'styled-components'
import { trackInfoValidationSchema } from './TrackInfoForm.helper';
import { NAV_ROUTES } from 'src/data/navigation.data';

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
    trackThumbnail?: Blob;
}

const TrackInfoForm : FC = () => {
    const dispatch = useDispatch();
    const initialValues : TrackInfoFormValues = {trackName: 'a', trackDescription: 'a', trackTagNames: 'a', trackThumbnail: undefined};
    const navigate = useNavigate();

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={trackInfoValidationSchema}
            onSubmit={(values,{setSubmitting}) => {
                dispatch(updateTrackInfo({
                    trackDescription: values.trackDescription,
                    trackName: values.trackName.trim(),
                    trackTagNames: values.trackTagNames,
                    trackThumbnail: values.trackThumbnail ? URL.createObjectURL(values.trackThumbnail) : null
                }));
                navigate(NAV_ROUTES.createTrack+'/waypoint');
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

export const StyledForm = styled(Form)`
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

export default TrackInfoForm