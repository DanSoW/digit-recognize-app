import React from 'react'
import { useCanvas } from '../../../context/CanvasContext/CanvasContext';
import styles from "./ClearCanvasButton.module.css";
import { useAppDispatch } from 'src/hooks/redux.hook';
import RecognizeAction from 'src/store/actions/RecognizeAction';

const ClearCanvasButton = () => {
  const dispatch = useAppDispatch();
  const { clearCanvas } = useCanvas();
  const clickHandler = () => {
    dispatch(RecognizeAction.clear());
    clearCanvas();
  };

  return (
    <>
      <button className={styles.button} onClick={clickHandler}>Очистить</button>
    </>
  );
}

export default ClearCanvasButton;