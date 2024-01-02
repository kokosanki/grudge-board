import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "@/app/store";

export interface ModalData {
  modalType: ModalType;
  editedUserId: string;
  editedUserEmail: string;
}

// Define a type for the slice state
export interface PointModalState {
  isModalActive: boolean;
  modalData: ModalData;
}

export enum ModalType {
  LOVE = "love",
  HATE = "hate",
}

// Define the initial state using that type
const initialState: PointModalState = {
  isModalActive: false,
  modalData: {
    modalType: ModalType.LOVE,
    editedUserId: "",
    editedUserEmail: "",
  },
};

export const pointModalSlice = createSlice({
  name: "pointModal",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    activateModal: (state) => {
      state.isModalActive = true;
    },
    deactiveModal: (state) => {
      state.isModalActive = false;
    },
    setModalData: (state, action) => {
      state.modalData = action.payload;
    },
  },
});

export const { activateModal, deactiveModal, setModalData } =
  pointModalSlice.actions;

export const selectIsPointModalActive = (state: RootState) =>
  state.pointModal.isModalActive;
export const selectModalData = (state: RootState) => state.pointModal.modalData;

export default pointModalSlice.reducer;
