import React, { useContext, useState } from 'react';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';

import styles from './Timer.module.css';
import { Button } from 'react-bootstrap';
import { AppContext } from '../AppContext';

export interface TimerProps {
  id: string;
  remainingTime?: number;
}

const Timer: React.FC<TimerProps> = ({ id, remainingTime = 0 }) => {
  const appContext = useContext(AppContext);
  const [userDefinedDuration, setUserDefinedDuration] = useState<number>(remainingTime);
  const [duration, setDuration] = useState<number>(remainingTime);

  const updateDurationHandler = () => {
    appContext.updatePanel?.(id, { remainingTime: userDefinedDuration });
    setDuration(userDefinedDuration);
  };

  return(
    <div id={id}>
      <div className={styles.timerContainer}>
        <div className={styles.presets}>
          <div className={styles.preset}>0:30</div>
          <div className={styles.preset}>0:30</div>
          <div className={styles.preset}>0:30</div>
          <div className={styles.preset}>0:30</div>
          <div className={styles.preset}>0:30</div>
          <div className={styles.preset}>0:30</div>
          <div className={styles.preset}>0:30</div>
          <div className={styles.preset}>0:30</div>
          <div className={styles.preset}>0:30</div>
          <div className={styles.preset}>0:30</div>
        </div>
        <CountdownCircleTimer
          isPlaying
          duration={duration}
          colors={['#004777', '#F7B801', '#A30000', '#A30000']}
          colorsTime={[7, 5, 2, 0]}
        >
          {({ remainingTime }) => remainingTime}
        </CountdownCircleTimer>
        <form className={styles.setTimeForm}>
          <input type="number" min={0} onChange={(e) => setUserDefinedDuration(parseInt(e.currentTarget.value))}/>
          <Button onClick={updateDurationHandler}>Установить</Button>
        </form>
      </div>
    </div>
  );
};

export { Timer };
