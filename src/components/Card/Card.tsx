import React, { useState } from 'react';
import styles from './Card.module.css';

export interface CardProps {
    executed?: boolean;
    imageUrl?: string;
}

const Card: React.FC<CardProps> = ({ executed, imageUrl }) => {
  const [done, setDone] = useState<boolean>(Boolean(executed));
  const clickHandler = () => {
    setDone(!done);
  };

  return(
    <div className={styles.card} onClick={clickHandler}>
      {!imageUrl && <div className={styles.cardInner}>+</div>}
      {imageUrl && !done &&
          <div className={styles.cardInner}>
            <img src={imageUrl}/>
          </div>}
      {imageUrl && done &&
          <div className={`${styles.cardInner} ${styles.transparent}`}>
            <img src={imageUrl}/>
          </div>
      }
    </div>);
};

export { Card };
