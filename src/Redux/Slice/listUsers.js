import { createSlice } from '@reduxjs/toolkit';
const usersSlice = createSlice({
  name: 'listUsers',
  initialState: false,
  reducers: {
    getList(state, action) {
      return action.payload;
    },
    updateListUsers(state, action) {
      return state.map(el =>
        el['_id'] === action.payload.id
          ? { ...el, ...action.payload.updateField }
          : el
      );
    }
  }
});
// Extract the action creators object and the reducer
const { actions, reducer } = usersSlice;
// Extract and export each action creator by name
export const { getList, updateListUsers } = actions;
// Export the reducer, either as a default or named export
export default reducer;
