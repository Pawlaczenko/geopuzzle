import { configureStore } from '@reduxjs/toolkit'
import headerReducer from 'src/features/header/headerSlice';
import popMenuReducer from 'src/features/popMenu/popMenuSlice';

export const store = configureStore({
  reducer: {
    header: headerReducer,
    popMenu: popMenuReducer
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch