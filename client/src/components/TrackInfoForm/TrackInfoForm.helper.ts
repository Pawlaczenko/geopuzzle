import { imageValidation, inMB, textValidation } from 'src/helpers/validation.helper';
import * as Yup from 'yup';

export const TRACK_INFO_CONSTRAINTS = {
    trackName: 50,
    trackDescription: 500,
    trackTagNames: 5,
    trackThumbnail: inMB(5),
    requiredFields: {
        trackName: true,
        trackDescription: true,
        trackTagNames: true,
        trackThumbnail: false
    }
}

export const trackInfoValidationSchema = Yup.object({
    trackName: textValidation(TRACK_INFO_CONSTRAINTS.trackName,"Nazwa Trasy"),
    trackDescription: textValidation(TRACK_INFO_CONSTRAINTS.trackDescription,"Opis Trasy"),
    trackTagNames: Yup.string()
        .test("test-ctype",`Możesz dodać maksymalnie ${TRACK_INFO_CONSTRAINTS.trackTagNames}`,(value) => {
                return value!==undefined && value.split(" ").length <= TRACK_INFO_CONSTRAINTS.trackTagNames;
        }).required("Dodaj przynajmniej jeden tag."),
    trackThumbnail: imageValidation(TRACK_INFO_CONSTRAINTS.trackThumbnail)
    }
);