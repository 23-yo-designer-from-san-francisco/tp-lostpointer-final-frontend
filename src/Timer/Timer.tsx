import React, { useState } from 'react';
// https://www.npmjs.com/package/react-countdown-circle-timer
import { CountdownCircleTimer } from 'react-countdown-circle-timer';

import styles from './Timer.module.css';
import { Button } from 'react-bootstrap';
import { PauseBtn, PlayBtn, StopBtn } from 'react-bootstrap-icons';

export interface TimerProps {
  id: string;
  remainingTime?: number;
}

const Timer: React.FC<TimerProps> = ({ id, remainingTime = 0 }) => {
  const [userDefinedDuration, setUserDefinedDuration] = useState<number>(0);
  const [duration, setDuration] = useState<number>(remainingTime);
  const [key, setKey] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);

  const playClicked = () => {
    setDuration(userDefinedDuration);
    setKey(key + 1);
  };

  const pauseClicked = () => {
    setIsPlaying(false);
  };

  const stopClicked = () => {
    setIsPlaying(false);
    setDuration(0);
    setKey(key + 1);
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
          key={key}
          isPlaying={isPlaying}
          duration={duration}
          colors={['#004777', '#F7B801', '#A30000', '#A30000']}
          colorsTime={[7, 5, 2, 0]}
        >
          {({ remainingTime }) => {
            // appContext.updatePanel(id, { remainingTime });
            return remainingTime;
          }}
        </CountdownCircleTimer>
        <form className={styles.setTimeForm}>
          <input type="number" min={0} onChange={(e) => setUserDefinedDuration(parseInt(e.currentTarget.value))}/>
          <Button onClick={playClicked}>
            <PlayBtn/>
          </Button>
          <Button onClick={pauseClicked}>
            <PauseBtn/>
          </Button>
          <Button onClick={stopClicked}>
            <StopBtn/>
          </Button>
        </form>
      </div>
    </div>
  );
};

export { Timer };
