import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export type trackCreatorState = {
    name: string,
    description: string,
    tags: string[],
    thumbnail?: string | Blob | null;
}

const initialState: trackCreatorState = {
    name: "",
    description: "",
    tags: [],
};

interface IFormInfo {
    trackName: string;
    trackDescription: string;
    trackTagNames: string;
    trackThumbnail?: string | null;
}

export const trackCreatorSlice = createSlice({
    name: "trackCreator",
    initialState,
    reducers: {
        updateTrackInfo: (state, action: PayloadAction<IFormInfo>) => {
            const thumbnail = typeof action.payload.trackThumbnail === "string" ? action.payload.trackThumbnail : undefined;
            return {
                ...state,
                name: action.payload.trackName,
                decription: action.payload.trackDescription,
                tags: action.payload.trackTagNames.split(" "),
                thumbnail: thumbnail,
            };
        }
    },
});

export const {updateTrackInfo} = trackCreatorSlice.actions;
export default trackCreatorSlice.reducer;
