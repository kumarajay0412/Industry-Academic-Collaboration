/* eslint-disable import/order */
import { type AlertProps as MuiAlertProps } from '@mui/material/Alert';
import { type PayloadAction, createSlice } from '@reduxjs/toolkit';
// we can add project details here
const DEFAULT_TIMEOUT = 7000;

export type ToasterSeverityType = MuiAlertProps['severity'];
export interface StatusSlice {
  status: ToasterProps;
  loading: boolean;
}

export interface ToasterProps {
  type: ToasterSeverityType;
  message: string;
  timeout?: number;
}
const initialState: StatusSlice = {
  status: {
    type: 'success',
    message: '',
    timeout: DEFAULT_TIMEOUT,
  },
  loading: false,
};

export const statusSlice = createSlice({
  name: 'status',
  initialState,
  reducers: {
    setStatus: (state, action: PayloadAction<ToasterProps>) => {
      state.status = {
        ...state.status,
        timeout: DEFAULT_TIMEOUT,
        ...action.payload,
      };
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
});

export const { setStatus, setLoading } = statusSlice.actions;

export default statusSlice.reducer;
