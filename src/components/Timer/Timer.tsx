import React, { useState } from 'react';
// https://www.npmjs.com/package/react-countdown-circle-timer
import { CountdownCircleTimer } from 'react-countdown-circle-timer';
import { Howl } from 'howler';
// @ts-ignore тайпскрипты глючат
import tickSound from '../../../assets/tick.opus';
// @ts-ignore тайпскрипты глючат
import finishSound from '../../../assets/finished.opus';

import styles from './Timer.module.css';
import { Button, FormCheck, Table } from 'react-bootstrap';
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
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isPaused, setIsIsPaused] = useState<boolean>(false);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [tick] = useState(new Howl({
    src: [tickSound],
    loop: true,
  }));
  const [finished] = useState(new Howl({
    src: [finishSound],
    loop: true,
  }));

  const playClicked = () => {
    if (userDefinedDuration === 0 && !isPaused || isPlaying && !isPaused) {
      return;
    }
    if (soundEnabled) {
      tick.play();
    }
    if (isPaused) {
      setIsIsPaused(false);
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
    setIsIsPaused(true);
  };

  const stopClicked = () => {
    tick.stop();
    finished.stop();
    setIsPlaying(false);
    setIsIsPaused(false);
    setDuration(0);
    setKey(key + 1);
  };

  const startTimer = (e: any) => {
    stopClicked();
    const stringTime = e.currentTarget.innerHTML;
    const seconds = stringTime.split(':').reduce((res: number, time: string) => res * 60 + parseInt(time), 0);
    setDuration(seconds);
    if (soundEnabled) {
      tick.play();
    }
    setIsPlaying(true);
    setIsIsPaused(false);
    setKey(key+1);
  };

  const timerCompleteHandler = () => {
    tick.stop();
    if (soundEnabled) {
      finished.play();
    }
    finished.fade(1, 0, FINISHED_FADE_TIME);
    setTimeout(() => finished.stop(), FINISHED_FADE_TIME);
  };

  return(
    <div id={id}>
      <div className={styles.timerContainer}>
        <Table className={styles.table} bordered hover>
          <thead>
            <tr><td>Часто используемые</td></tr>
          </thead>
          <tbody>
            {
              ['0:30', '1:25', '2:30', '15:34']
                .map((time, i) =>
                  <tr
                    key={i}
                    className={styles.preset}
                  >
                    <td className={styles.td} onClick={startTimer}>
                      {time}
                    </td>
                  </tr>
                )
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
          <div className={styles.buttons}>
            <Button variant="success" className={styles.button} onClick={playClicked}>
              <Play/>
            </Button>
            <Button className={styles.button} onClick={pauseClicked}>
              <Pause/>
            </Button>
            <Button variant="danger" className={styles.button} onClick={stopClicked}>
              <Stop/>
            </Button>
          </div>
          <div className={styles.sound}>
            <span>Звук</span>
            <FormCheck checked={soundEnabled} onChange={() => setSoundEnabled(!soundEnabled)}/>
          </div>
        </form>
      </div>
    </div>
  );
};

export { Timer };
