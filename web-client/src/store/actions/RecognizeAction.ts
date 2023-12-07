import axios from "axios";
import { recognizeSlice } from "../reducers/RecognizeSlice";
import { IValueModel } from "src/models/IValueModel";
import { Api } from "src/constants/api";

/**
 * Отправка изображения для распознавания
 * @param image Изображение
 * @returns 
 */
const recognizeImage = (image: File) => async (dispatch: any) => {
  // Начинается загрузка
  dispatch(recognizeSlice.actions.loadingStart());

  try {
    // Определение данных для загрузки изображения
    const formData = new FormData();
    // Добавление файла в FormData
    formData.append("file", image);

    // Отправка запроса на распознавание
    const response = await axios.post(
      `${Api.server}${Api.digit_recognize}`,
      formData
    );

    // Обработка ошибок
    if (response.status != 200 && response.status != 201) {
      console.log(response.data.message);
      return;
    }

    // Установка ответа слайсу
    dispatch(recognizeSlice.actions.setValue(response.data));
  } catch (e: any) {
    console.log(e);
  }

  // Окончание загрузки
  dispatch(recognizeSlice.actions.loadingEnd());
};

const clear = () => async (dispatch: any) => {
  console.log("opa");
  dispatch(recognizeSlice.actions.clear());
};

const RecognizeAction = {
  recognizeImage,
  clear,
};

export default RecognizeAction;
