import { createSlice } from '@reduxjs/toolkit';
const usersSlice = createSlice({
  name: 'users',
  initialState: false,
  reducers: {
    login(state, action) {
      return action.payload;
    },
    logout(state, action) {
      return false;
    },
    updateUser(state, action) {
      return { ...state, ...action.payload.updateField };
    }
  }
});
// Extract the action creators object and the reducer
const { actions, reducer } = usersSlice;
// Extract and export each action creator by name
export const { login, logout, updateUser } = actions;
// Export the reducer, either as a default or named export
export default reducer;
