/* Библиотеки */
import { combineReducers, configureStore } from "@reduxjs/toolkit";

/* Контекст */
import recognizeReducer from "./reducers/RecognizeSlice";

/* Комбинация reducers */
const rootReducer = combineReducers({
    recognizeReducer,
});

// Конфигурирование общего хранилища
const store = configureStore({
  reducer: rootReducer,
});

const setupStore = () => {
  return store;
};

export default store;

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];
