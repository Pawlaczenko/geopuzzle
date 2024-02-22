export type puzzleID = 'text' | 'image';

export interface IPuzzle {
    puzzleId: puzzleID;
    puzzleDescription?: string;
}

export interface ITextPuzzle extends IPuzzle {
    text: string
}

export interface IImagePuzzle extends IPuzzle {
    image: Blob,
}

export interface IPuzzleContent {
    type: puzzleID;
    payload: unknown;
}