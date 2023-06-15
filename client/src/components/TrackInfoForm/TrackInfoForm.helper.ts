import * as Yup from 'yup';

const getExtension = (filename?: string) : string | undefined => {
    if(!filename) return undefined;
    return filename.split('.').pop();
}

export const TRACK_INFO_CONSTRAINTS = {
    trackName: 50,
    trackDescription: 500,
    trackTagNames: 5,
    trackThumbnail: 5 * 1024 * 1024,
    thumbnailExtension: ['png', 'jpg', 'JPG', 'jpeg', 'webp'],
    requiredFields: {
        trackName: true,
        trackDescription: true,
        trackTagNames: true,
        trackThumbnail: false
    }
}

export const trackInfoValidationSchema = Yup.object({
    trackName: Yup.string()
        .transform((value, originalValue) => originalValue.trim())
        .max(TRACK_INFO_CONSTRAINTS.trackName, `Nazwa trasy nie może przekraczać ${TRACK_INFO_CONSTRAINTS.trackName} znaków.`)
        .required('Nazwa trasy jest obowiązkowa.'),
    trackDescription: Yup.string()
        .transform((value, originalValue) => originalValue.trim())
        .max(TRACK_INFO_CONSTRAINTS.trackDescription,`Opis trasy nie może przekraczać ${TRACK_INFO_CONSTRAINTS.trackDescription} znaków.`)
        .required('Opis trasy jest obowiązkowy.'),
    trackTagNames: Yup.string()
        .test("test-ctype",`Możesz dodać maksymalnie ${TRACK_INFO_CONSTRAINTS.trackTagNames}`,(value) => {
                return value!==undefined && value.split(" ").length <= TRACK_INFO_CONSTRAINTS.trackTagNames;
        }).required("Dodaj przynajmniej jeden tag."),
    trackThumbnail: Yup.mixed()
        .test({
            message: `Akceptowalne rozszerzenia plików: ${TRACK_INFO_CONSTRAINTS.thumbnailExtension.join(", ")} `,
            test: (file, context) => {
                const ext = file ? getExtension((file as File).name) : undefined;
                const isValid = ext ? TRACK_INFO_CONSTRAINTS.thumbnailExtension.includes(ext) : true;
                if (!isValid) context?.createError();
                return isValid;
            }
        })
        .test({
            message: `Plik jest za duży. Maksymalny rozmiar wynosi: ${TRACK_INFO_CONSTRAINTS.trackThumbnail / 1024 / 1024}`,
            test: (file) => {
                if(file){
                    return (file as File).size < TRACK_INFO_CONSTRAINTS.trackThumbnail;
                }
                return true;
            }
        })
    }
);