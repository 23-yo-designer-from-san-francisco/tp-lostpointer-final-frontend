import React, { useState } from 'react';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';

import styles from './Timer.module.css';
import { Button } from 'react-bootstrap';

const Timer: React.FC = () => {
  const [duration, setDuration] = useState<number>(0);
  return(<>
    <div className={styles.timerContainer}>
      <CountdownCircleTimer
        isPlaying
        duration={duration}
        colors={['#004777', '#F7B801', '#A30000', '#A30000']}
        colorsTime={[7, 5, 2, 0]}
      >
        {({ remainingTime }) => remainingTime}
      </CountdownCircleTimer>
    </div>
    <Button>Установить</Button>
  </>
  );
};

export { Timer };
