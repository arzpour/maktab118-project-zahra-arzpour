import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface FilterState {
  selectedFilters: string[];
}

const initialState: FilterState = {
  selectedFilters: [],
};

export const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setFilters: (state, action: PayloadAction<string>) => {
      if (state.selectedFilters.includes(action.payload)) {
        state.selectedFilters = state.selectedFilters.filter(
          (item) => item !== action.payload
        );
      } else {
        state.selectedFilters.push(action.payload);
      }
    },
  },
});

export const filterActions = filterSlice.actions;
export const filterReducer = filterSlice.reducer;
