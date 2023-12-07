/* Библиотеки */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IValueModel } from "src/models/IValueModel";

/* Локальные интерфейсы */
interface IRecognizeSlice {
  value: string;
  isLoading: boolean;
}

/* Базовое состояние текущего слайса */
const initialState: IRecognizeSlice = {
  value: "",
  isLoading: false,
};

export const recognizeSlice = createSlice({
  name: "recognize_slice",
  initialState,
  reducers: {
    loadingStart(state: IRecognizeSlice) {
      state.value = "";
      state.isLoading = true;
    },

    loadingEnd(state: IRecognizeSlice) {
      state.isLoading = false;
    },

    clear(state: IRecognizeSlice) {
      state.value = "";
      state.isLoading = false;
    },

    setValue(state: IRecognizeSlice, action: PayloadAction<IValueModel>) {
      if (action.payload) {
        state.value = action.payload.value.toString();
      }
    },
  },
});

export default recognizeSlice.reducer;
