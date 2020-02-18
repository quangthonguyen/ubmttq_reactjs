import { createSlice } from '@reduxjs/toolkit';
const usersSlice = createSlice({
  name: 'listCVDI',
  initialState: [],
  reducers: {
    getListCVDI(state, action) {
      return action.payload;
    },
    creatCVDI(state, action) {
      return [...state, action.payload];
    },
    updateCVDI(state, action) {
      return state.map(el =>
        el['_id'] === action.payload.id
          ? { ...el, ...action.payload.updateField }
          : el
      );
    },
    deleteCVDI(state, action) {
      const index = state.findIndex(e => e['_id'] === action.payload);
      state.splice(index, 1);
      return state;
    }
  }
});
// Extract the action creators object and the reducer
const { actions, reducer } = usersSlice;
// Extract and export each action creator by name
export const { getListCVDI, creatCVDI, updateCVDI, deleteCVDI } = actions;
// Export the reducer, either as a default or named export
export default reducer;
