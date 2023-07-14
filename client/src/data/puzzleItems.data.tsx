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
];

export const getPuzzleById = (id: puzzleID) => {
    const res = PUZZLES.find(puzzle=>puzzle.id===id);
    return res || PUZZLES[0];
}

export const getPuzzleLabelById = (id: puzzleID) => {
    return PUZZLES.find(puzzle=>puzzle.id===id)?.label;
}