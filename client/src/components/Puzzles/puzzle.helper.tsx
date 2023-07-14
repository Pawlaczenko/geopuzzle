import { IPuzzleContent } from '../../types/puzzle.types';
import ImagePuzzle from './ImagePuzzle';
import TextPuzzle from './TextPuzzle';

export const getPuzzleContent = (puzzle: IPuzzleContent) => {
    switch(puzzle.type) {
        case 'text':
        default:
            return <TextPuzzle content={puzzle.content as string} />
        case 'image':
            return <ImagePuzzle url={puzzle.content as string} />
    }
}