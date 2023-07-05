import { imageValidation, inMB, textValidation } from "src/helpers/validation.helper";
import { coordSuggestion } from "src/types/input.types";
import { puzzleID } from "src/types/puzzle.types";
import * as Yup from 'yup';

export const TRACK_WAYPOINT_CONSTRAINTS = {
    pointName: 100,
    pointDirection: 100,
    pointRadius: 10000000,
    puzzleExplanation: 500
}

export const PUZZLE_CONSTRAINTS = {
    textPuzzle: 1000,
    imagePuzzle: inMB(2)
}

const textPuzzleYup = textValidation(PUZZLE_CONSTRAINTS.textPuzzle,"Treść Zagadki",false);  
const imagePuzzleYup = imageValidation(PUZZLE_CONSTRAINTS.imagePuzzle);

const getPuzzleValidation = (puzzleId: puzzleID) : Yup.AnyObjectSchema  => {
    let puzzleYup : Yup.AnySchema;
    switch(puzzleId) {
        case 'text':
        default:
            puzzleYup = textPuzzleYup;
            break;
        case 'image':
            puzzleYup = imagePuzzleYup;
            break;
    }

    return Yup.object().shape({
        puzzleContent: puzzleYup.required('Treść zagadki jest obowiązkowa.')
    })
}

export const getTrackWaypointValidationSchema = (puzzleType: puzzleID, mapWaypoint?: coordSuggestion) => {
    const trackWaypointValidationSchema = Yup.object({
        pointName: textValidation(TRACK_WAYPOINT_CONSTRAINTS.pointName,"Nazwa Punktu"),
        pointDirection: textValidation(TRACK_WAYPOINT_CONSTRAINTS.pointDirection,"Odpowiedź")
            .test({
                message: `Zaznacz punkt na mapie.`,
                test: (file, context) => {
                    const isValid = mapWaypoint!==undefined;
                    if (!isValid) context?.createError();
                    return isValid;
                }
            }),
        pointRadius: Yup.number()
            .min(1, "Minimalny promień: 1m").max(TRACK_WAYPOINT_CONSTRAINTS.pointRadius, `Maksymalny promień: ${TRACK_WAYPOINT_CONSTRAINTS.pointRadius}m`)
            .required("Promień tolerancji jest obowiązkowy"),
        puzzleExplanation: textValidation(TRACK_WAYPOINT_CONSTRAINTS.puzzleExplanation,"Objaśnienie zagadki",false),
    });

    const puzzleValidationSchema = getPuzzleValidation(puzzleType);

    return trackWaypointValidationSchema.concat(puzzleValidationSchema);
}