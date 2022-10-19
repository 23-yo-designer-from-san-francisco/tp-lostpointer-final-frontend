import React, { useState } from 'react';
// https://www.npmjs.com/package/react-countdown-circle-timer
import { CountdownCircleTimer } from 'react-countdown-circle-timer';
import { Howl } from 'howler';

import styles from './Timer.module.css';
import { Button, Table } from 'react-bootstrap';
import { Pause, Play, Stop } from 'react-bootstrap-icons';
import formatDuration from 'format-duration';

export interface TimerProps {
  id: string;
  remainingTime?: number;
}

const FINISHED_FADE_TIME = 7000;

const Timer: React.FC<TimerProps> = ({ id, remainingTime = 0 }) => {
  const [userDefinedDuration, setUserDefinedDuration] = useState<number>(0);
  const [duration, setDuration] = useState<number>(remainingTime);
  const [key, setKey] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [paused, setIsPaused] = useState<boolean>(false);
  // const [playSound, exposedData] = useSound('../../../assets/tick.opus');
  const [tick] = useState(new Howl({
    src: ['../../../assets/tick.opus'],
    loop: true,
  }));
  const [finished] = useState(new Howl({
    src: ['../../../assets/finished.opus'],
    loop: true,
  }));

  const playClicked = () => {
    tick.play();
    if (paused) {
      setIsPaused(false);
      return setIsPlaying(true);
    }
    setDuration(userDefinedDuration);
    if (!isPlaying) {
      setIsPlaying(true);
    }
    setKey(key + 1);
  };

  const pauseClicked = () => {
    tick.stop();
    setIsPlaying(false);
    setIsPaused(true);
  };

  const stopClicked = () => {
    tick.stop();
    finished.stop();
    setIsPlaying(false);
    setIsPaused(false);
    setDuration(0);
    setKey(key + 1);
  };

  const startTimer = (e: any) => {
    const stringTime = e.currentTarget.innerHTML;
    const seconds = stringTime.split(':').reduce((res: number, time: string) => res * 60 + parseInt(time), 0);
    setDuration(seconds);
    setIsPlaying(true);
    setIsPaused(false);
    setKey(key+1);
  };

  const timerCompleteHandler = () => {
    tick.stop();
    finished.play();
    finished.fade(1, 0, FINISHED_FADE_TIME);
    setTimeout(() => finished.stop(), FINISHED_FADE_TIME);
  };

  return(
    <div id={id}>
      <div className={styles.timerContainer}>
        <Table size="30" className={styles.table} striped bordered hover>
          <thead>
            <tr>Часто используемые</tr>
          </thead>
          <tbody>
            {
              ['0:30', '1:25', '2:30', '15:34']
                .map((time, i) => <tr key={i} onClick={startTimer} className={styles.preset}>{time}</tr>)
            }
          </tbody>
        </Table>
        <CountdownCircleTimer
          key={key}
          isPlaying={isPlaying}
          onComplete={timerCompleteHandler}
          duration={duration}
          colors={['#004777', '#F7B801', '#A30000', '#A30000']}
          colorsTime={[7, 5, 2, 0]}
        >
          {({ remainingTime }) => formatDuration(remainingTime * 1000)}
        </CountdownCircleTimer>
        <form className={styles.setTimeForm}>
          <input
            type="number"
            min={0}
            onChange={(e) => setUserDefinedDuration(parseInt(e.currentTarget.value))}
          />
          <Button variant="success" className={styles.button} onClick={playClicked}>
            <Play/>
          </Button>
          <Button className={styles.button} onClick={pauseClicked}>
            <Pause/>
          </Button>
          <Button variant="danger" className={styles.button} onClick={stopClicked}>
            <Stop/>
          </Button>
        </form>
      </div>
    </div>
  );
};

export { Timer };
