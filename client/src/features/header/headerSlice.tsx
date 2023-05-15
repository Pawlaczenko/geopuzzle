import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export type headerState = boolean;

const initialState: headerState = true;

export const headerSlice = createSlice({
    name: "header",
    initialState,
    reducers: {
        toggleOpen: (state) => !state,
        setOpen: (state, action: PayloadAction<boolean>) => {
            state = action.payload;
        }
    },
});

export const { toggleOpen,setOpen } = headerSlice.actions;
export default headerSlice.reducer;
