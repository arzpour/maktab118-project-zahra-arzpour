import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type profileTabType = "userInfo" | "orders" | "";

interface ProductState {
  profileTab: profileTabType;
}

const initialState: ProductState = {
  profileTab: "userInfo",
};

export const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setProfileTab: (state, action: PayloadAction<profileTabType>) => {
      state.profileTab = action.payload;
    },
  },
});

export const profileActions = profileSlice.actions;
export const profileReducer = profileSlice.reducer;
