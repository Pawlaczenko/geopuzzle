import textPuzzleImage from 'src/assets/puzzles/text.svg';
import imagePuzzleImage from 'src/assets/puzzles/image.svg';
import { puzzleID } from '../types/puzzle.types';

export interface IPuzzleItem {
    id: puzzleID,
    label: string,
    icon: string,
    description: string,
}

export const PUZZLES : IPuzzleItem[] = [
    {
        id: "text",
        label: "Zagadka Tekstowa",
        description: "Zagadka tekstowa Zagadka tekstowa Zagadka tekstowa",
        icon: textPuzzleImage
    },
    {
        id: "image",
        label: "Zagadka Obrazkowa",
        description: "Zagadka obrazkowa Zagadka tekstowa Zagadka tekstowa",
        icon: imagePuzzleImage
    }
] 