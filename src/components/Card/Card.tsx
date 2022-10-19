import React, { useState } from 'react';
import styles from './Card.module.css';
import { useNavigate } from 'react-router-dom';
import useLongPress from '../../useLongPress';

export interface CardProps {
    done?: boolean;
    cardId?: number;
    imgUrl?: string;
    scheduleId?: number;
}

const Card: React.FC<CardProps> = ({ cardId, done, imgUrl, scheduleId }) => {
  const navigate = useNavigate();
  const [_done, setDone] = useState<boolean>(Boolean(done));

  const setDoneHandler = () => {
    setDone(!_done);
  };

  const onLongPress = () => {
    navigate(`card/${cardId}`);
  };

  const defaultOptions = {
    shouldPreventDefault: true,
    delay: 500,
  };
  const longPressEvent = useLongPress(onLongPress, () => {}, defaultOptions);

  const createNewHandler = () => {
    navigate('new');
  };

  return(
    <div className={styles.card}>
      {!imgUrl &&
        <div onClick={createNewHandler} className={styles.cardInner}>+</div>
      }
      {imgUrl && !_done &&
          <div className={styles.cardInner} onClick={setDoneHandler} {...longPressEvent}>
            <img src={imgUrl}/>
          </div>
      }
      {imgUrl && _done &&
          <div className={`${styles.cardInner} ${styles.transparent}`} onClick={setDoneHandler} {...longPressEvent}>
            <img src={imgUrl}/>
          </div>
      }
    </div>);
};

export { Card };
