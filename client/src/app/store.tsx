import { configureStore } from '@reduxjs/toolkit'
import headerReducer from 'src/features/header/headerSlice';
import popMenuReducer from 'src/features/popMenu/popMenuSlice';
import trackCreatorReducer from 'src/features/trackCreator/trackCreatorSlice';

export const store = configureStore({
  reducer: {
    header: headerReducer,
    popMenu: popMenuReducer,
    trackCreator: trackCreatorReducer
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch