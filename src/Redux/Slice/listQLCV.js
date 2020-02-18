import { createSlice } from '@reduxjs/toolkit';
const usersSlice = createSlice({
  name: 'listQLCV',
  initialState: [],
  reducers: {
    getListQLCV(state, action) {
      return action.payload;
    },
    creatQLCV(state, action) {
      const temp = [...state];
      // alert(temp.findIndex(e => e['_id'] === action.payload['_id']));
      if (temp.findIndex(e => e['_id'] === action.payload['_id']) === -1) {
        return [...state, action.payload];
      } else {
        return [...state];
      }
    },
    updateQLCV(state, action) {
      return state.map(el =>
        el['_id'] === action.payload.id
          ? { ...el, ...action.payload.updateField }
          : el
      );
    },
    deleteQLCV(state, action) {
      const index = state.findIndex(e => e['_id'] === action.payload);
      state.splice(index, 1);
      return state;
    }
  }
});
// Extract the action creators object and the reducer
const { actions, reducer } = usersSlice;
// Extract and export each action creator by name
export const { getListQLCV, creatQLCV, updateQLCV, deleteQLCV } = actions;
// Export the reducer, either as a default or named export
export default reducer;
