import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "@/app/store";
import { UserType } from "@/components/Board/types";

export interface BoardState {
  users: UserType[];
}

const initialState: BoardState = {
  users: [],
};

export const boardSlice = createSlice({
  name: "board",
  initialState,
  reducers: {
    setBoardUsers: (state, action) => {
      console.log("setBoardUsers", action.payload);
      state.users = action.payload;
    },
  },
});

export const { setBoardUsers } = boardSlice.actions;

export const selectBoardUsers = (state: RootState) => state.board.users;

export default boardSlice.reducer;
