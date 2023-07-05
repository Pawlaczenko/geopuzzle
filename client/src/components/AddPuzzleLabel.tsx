import { Dispatch, FC, SetStateAction } from 'react';
import styled from 'styled-components'
import { StyledLabelText, StyledInput } from './Input/Input.styled';
import { PUZZLES } from 'src/data/puzzleItems.data';
import TextPuzzleForm from './PuzzleForms/TextPuzzleForm';
import { flexContainer } from 'src/styles/mixins';
import ImagePuzzleForm from './PuzzleForms/ImagePuzzleForm';
import { useFormikContext } from 'formik';
import { WaypointFormValues } from './TrackWaypointForm/TrackWaypointForm';
import { puzzleID } from 'src/types/puzzle.types';

const displayPuzzleForm = (puzzleId: puzzleID) => {
    switch(puzzleId) {
        case 'text':
        default:
            return <TextPuzzleForm />
        case 'image':
            return <ImagePuzzleForm />
    }
}

interface IAddPuzzleLabelProps {
    name: string,
    hadnelPuzzleTypeChange: Dispatch<SetStateAction<puzzleID>>
}

const AddPuzzleLabel : FC<IAddPuzzleLabelProps> = (props) => {
    const {values, getFieldProps, setFieldValue} = useFormikContext<WaypointFormValues>();
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        getFieldProps(props.name).onChange(e); 
        setFieldValue("puzzleContent",undefined);
        props.hadnelPuzzleTypeChange(e.target.value as puzzleID);
    }

    return (
        <StyledAddPuzzleLabel>
            <AddPuzzleBar>
                <StyledLabelText>Zagadka w tym punkcie: *</StyledLabelText>
                <StyledSelect as="select" {...getFieldProps(props.name)} onChange={handleChange}>
                    {
                        PUZZLES.map((puzzle) => <option key={puzzle.id} value={puzzle.id}>{puzzle.label}</option>)
                    }
                </StyledSelect>
            </AddPuzzleBar>
            {displayPuzzleForm(values.puzzleType)}
        </StyledAddPuzzleLabel>
    )
}

const StyledAddPuzzleLabel = styled.section`
    border: var(--border-thin);
    border-radius: 1.5rem;
    padding: 2rem 1rem;
    width: 100%;

    & > button {
        margin: 0 auto;
    }
`

const AddPuzzleBar = styled.div`
    ${flexContainer('flex-start','center')};
    gap: 2rem;
`

const StyledSelect = styled(StyledInput)`
    height: var(--input-height);
    width: auto;
    margin-bottom: 2.5rem;
`

export default AddPuzzleLabel