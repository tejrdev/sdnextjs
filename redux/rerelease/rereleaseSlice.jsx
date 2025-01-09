import { createSlice } from '@reduxjs/toolkit';

const initialState = {
   value: 0,
};

const rereleaseSlice = createSlice({
   name: 'rereleasedate',
   initialState,
   reducers: {
      redate(state, action) {
         state.value = action.payload.value;
      },
      reset: (state) => {
         state.value = 0;
      }
   },
});

export const { redate, reset } = rereleaseSlice.actions;

export default rereleaseSlice.reducer;