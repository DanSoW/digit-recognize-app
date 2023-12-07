import React, { useEffect } from 'react'
import Canvas from '../Canvas';
import ClearCanvasButton from '../../components/UI/ClearCanvasButton';
import styles from './App.module.css';
import RecognizeButton from '../../components/UI/RecognizeButton';
import { useAppSelector } from 'src/hooks/redux.hook';

function App() {
  const recognizeSelector = useAppSelector((s) => s.recognizeReducer);

  return (
    <>
      <div className={styles.container}>
        <div className={styles.paint}>
          <Canvas />
          <div className={styles.buttons}>
            <ClearCanvasButton />
            <RecognizeButton />
          </div>
          <input className={styles.input} value={recognizeSelector.value} readOnly />
        </div>
      </div>
    </>
  );
}

export default App;
