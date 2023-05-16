import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export type popMenuState = boolean;

const initialState: popMenuState = false;

export const popMenuSlice = createSlice({
    name: "popMenu",
    initialState,
    reducers: {
        toggleOpen: (state) => !state,
        setOpen: (state, action: PayloadAction<boolean>) => {
            return action.payload
        }
    },
});

export const { toggleOpen,setOpen } = popMenuSlice.actions;
export default popMenuSlice.reducer;
