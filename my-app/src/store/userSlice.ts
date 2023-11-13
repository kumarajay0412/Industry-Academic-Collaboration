// userSlice.js
import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: null,
  reducers: {
    setUserRedux: (state, action) => {
      return action.payload;
    },
    clearUserRedux: (state) => {
      return null;
    }
  }
});

export const { setUserRedux, clearUserRedux } = userSlice.actions;
export default userSlice.reducer;
