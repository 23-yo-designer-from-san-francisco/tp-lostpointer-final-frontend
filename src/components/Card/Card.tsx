import React, { useState } from 'react';
import styles from './Card.module.css';
import { useNavigate } from 'react-router-dom';

export interface CardProps {
    done?: boolean;
    imgUrl?: string;
    scheduleId?: string;
}

const Card: React.FC<CardProps> = ({ done, imgUrl , scheduleId }) => {
  const navigate = useNavigate();
  const [_done, setDone] = useState<boolean>(Boolean(done));

  const setDoneHandler = () => {
    setDone(!_done);
  };

  const createNewHandler = () => {
    navigate('new');
  };

  return(
    <div className={styles.card} onClick={setDoneHandler}>
      {!imgUrl &&
        <div onClick={createNewHandler} className={styles.cardInner}>+</div>
      }
      {imgUrl && !_done &&
          <div className={styles.cardInner}>
            <img src={imgUrl}/>
          </div>
      }
      {imgUrl && _done &&
          <div className={`${styles.cardInner} ${styles.transparent}`}>
            <img src={imgUrl}/>
          </div>
      }
    </div>);
};

export { Card };
