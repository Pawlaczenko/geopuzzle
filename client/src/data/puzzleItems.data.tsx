import { puzzleID } from '../types/puzzle.types';
import {BsFileText,BsCardImage} from "react-icons/bs";

export interface IPuzzleItem {
    id: puzzleID,
    label: string,
    description?: string,
    Icon: string
}

export const PUZZLES : IPuzzleItem[] = [
    {
        id: "text",
        label: "Zagadka Tekstowa",
        description: "Zagadka tekstowa Zagadka tekstowa Zagadka tekstowa",
        Icon: BsFileText
    },
    {
        id: "image",
        label: "Zagadka Obrazkowa",
        description: "Zagadka obrazkowa Zagadka tekstowa Zagadka tekstowa",
        Icon: BsCardImage
    }
] 