import React from 'react'
import styles from './RecognizeButton.module.css';
import { useCanvas } from '../../../context/CanvasContext/CanvasContext';
import { dataURLToBlob, dataURLToFile } from 'src/utils/file';
import { useAppDispatch } from 'src/hooks/redux.hook';
import RecognizeAction from 'src/store/actions/RecognizeAction';

const RecognizeButton = () => {
    const dispatch = useAppDispatch();

    const { getImage } = useCanvas();
    const clickHandler = () => {
        const file = dataURLToFile(getImage(), "file.png");

        file && dispatch(RecognizeAction.recognizeImage(file));
    }

    return (
        <>
            <button className={styles.button} onClick={clickHandler}>Распознать</button>
        </>
    );
}

export default RecognizeButton;