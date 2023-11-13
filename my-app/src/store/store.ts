/* eslint-disable import/no-duplicates */
/* eslint-disable import/order */
/* eslint-disable import/extensions */
import { configureStore } from '@reduxjs/toolkit';
import {
  useDispatch as useDispatchBase,
  useSelector as useSelectorBase,
} from 'react-redux';

import { auth } from './auth'; // Create an API slice (see step 3)
import { organisationsApi } from './organisations';
import StatusReducer from './toaster/slice';
import userReducer from './userSlice'; // Import your userSlice

const store = configureStore({
  reducer: {
    user: userReducer,
    toaster: StatusReducer,
    [auth.reducerPath]: auth.reducer,
    [organisationsApi.reducerPath]: organisationsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(auth.middleware),
});

export type RootState = ReturnType<typeof store.getState>;

type AppDispatch = typeof store.dispatch;

export const useDispatch = () => useDispatchBase<AppDispatch>();

export const useSelector = <TSelected = unknown>(
  selector: (state: RootState) => TSelected
): TSelected => useSelectorBase<RootState, TSelected>(selector);

export default store;
