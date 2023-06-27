import { IconName, ICONS } from './icons.data';
import textPuzzleImage from 'src/assets/puzzles/text.svg';
import imagePuzzleImage from 'src/assets/puzzles/image.svg';
import soundPuzzleImage from 'src/assets/puzzles/sound.svg';

export interface IPuzzle {
    id: string,
    label: string,
    icon: string,
    description: string,
}

export const PUZZLES : IPuzzle[] = [
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
    },
    {
        id: "sound",
        label: "Zagadka Dźwiękowa",
        description: "Zagadka dźwiękowa i super zagadka lorem",
        icon: soundPuzzleImage
    }
] 