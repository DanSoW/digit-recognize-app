import os
import uuid
import numpy as np
from flask import Flask, request, jsonify
import tensorflow as tf
from PIL import Image
from flask_cors import CORS

# Путь к папке public
base_path = './public/'

# Экземпляр flask-приложения
app = Flask(__name__, static_folder="public")

# Настройка CORS-политики
cors = CORS(app, origins=["http://localhost:3000"])

# Эндпоинт для распознования цифр на изображении
@app.route('/digit-recognize', methods=['POST'])
def upload_file():
    # Получение данных о файле
    file = request.files['file']

    # Получение расширения файла
    file_ext = file.filename.rsplit('.', 1)[1].lower()

    # Генерация UUID идентификатора
    c_uuid = str(uuid.uuid4())

    # Формирование полного пути к файлу
    filename = base_path + c_uuid + '.' + file_ext

    # Сохранение файла на сервер
    file.save(filename)

    # Загрузка весов модели
    model = tf.keras.models.load_model("model.h5")

    # Загрузка изображения с конвертацией в grayscale
    img = Image.open(filename).convert("L")

    # Изменение размера изображения
    new_image = img.resize((28, 28))

    # Конвертация изображения в массив и изменение размера
    x = np.array(new_image).reshape((28, 28, 1))
    x = np.expand_dims(x, axis=0)
    images = np.vstack([x])

    # Предсказание цифры на изображении
    classes = model.predict(images, batch_size=1)

    # Выбор из результата наибольшего (выбор класса цифры)
    result = int(np.argmax(classes))

    img.close()

    # Удаление изображения
    os.remove(filename)

    # Возврат ответа
    return jsonify({'value': result})

# Запуск приложения по 5000 порту
app.run(host='0.0.0.0', port=5000)
