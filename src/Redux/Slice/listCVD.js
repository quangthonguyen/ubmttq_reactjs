import { createSlice } from '@reduxjs/toolkit';
const usersSlice = createSlice({
  name: 'listCVD',
  initialState: [],
  reducers: {
    getListCVD(state, action) {
      return action.payload;
    },
    creatCVD(state, action) {
      return [...state, action.payload];
    },
    updateCVD(state, action) {
      return state.map(el =>
        el['_id'] === action.payload.id
          ? { ...el, ...action.payload.updateField }
          : el
      );
    },
    updatedCVD(state, action) {
      return state.map(el =>
        el['_id'] === action.payload['_id']
          ? {
              ...el,
              trangThai: action.payload.trangThai,
              notification: action.payload.notification,
              notificationQLCV: action.payload.notificationQLCV
            }
          : el
      );
    },
    deleteCVD(state, action) {
      const index = state.findIndex(e => e['_id'] === action.payload);
      state.splice(index, 1);
      return state;
    }
  }
});
// Extract the action creators object and the reducer
const { actions, reducer } = usersSlice;
// Extract and export each action creator by name
export const {
  getListCVD,
  creatCVD,
  updateCVD,
  deleteCVD,
  updatedCVD
} = actions;
// Export the reducer, either as a default or named export
export default reducer;
