import React, { useState } from 'react';
import styles from './Card.module.css';

export interface MyComponentProps {
    executed?: boolean;
    imageUrl?: string;
}

const Card: React.FC<MyComponentProps> = ({ executed, imageUrl }) => {
  const [_executed, setExecution] = useState<boolean>(!!executed);

  return(
    <div className={styles.card} onClick={() => setExecution(!_executed)}>
      {!imageUrl && <div className={styles.cardInner}>+</div>}
      {imageUrl && !executed && <div className={styles.cardInner}><img src={imageUrl}/></div>}
      {imageUrl && executed && <div className={`${styles.cardInner} ${styles.transparent}`}><img src={imageUrl}/></div>}
    </div>);
};

export { Card };
