import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { IFormState } from 'src/components/CreateTrackForm/CreateTrackForm';

export type trackCreatorState = {
    name: string,
    description: string,
    tags: string[],
    thumbnail?: string
}

const initialState: trackCreatorState = {
    name: "",
    description: "",
    tags: [],
};

export const trackCreatorSlice = createSlice({
    name: "trackCreator",
    initialState,
    reducers: {
        updateTrackInfo: (state, action: PayloadAction<IFormState>) => {
            const thumbnail = typeof action.payload.track_thumbnail === "string" ? action.payload.track_thumbnail : undefined;
            return {
                ...state,
                name: action.payload.track_name,
                decription: action.payload.track_description,
                tags: action.payload.track_tags,
                thumbnail: thumbnail,
            };
        }
    },
});

export const {updateTrackInfo} = trackCreatorSlice.actions;
export default trackCreatorSlice.reducer;
