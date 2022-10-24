import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useLongPress from '../../useLongPress';
import { Panel, PANEL_DAY, PANEL_LESSON } from '../../pages';
import { apiRequest } from '../../services/request';
import { ContentType } from '../../services/requestUtils';
import { AppContext } from '../../AppContext';
import { CardModel } from '../../Interfaces';

import styles from './Card.module.css';

export interface CardProps {
  parent: Panel;
  done?: boolean;
  cardId?: number;
  cardName?: string;
  startTime?: string;
  endTime?: string;
  imgUrl?: string;
  scheduleId?: number;
}

const Card: React.FC<CardProps> = ({ parent, cardId, cardName, startTime, endTime, done, imgUrl, scheduleId }) => {
  const appContext = useContext(AppContext);
  const navigate = useNavigate();
  const [_done, setDone] = useState<boolean>(Boolean(done));

  let endpointPrefix = '';
  if (parent === PANEL_DAY) {
    endpointPrefix = 'day';
  } else if (parent === PANEL_LESSON) {
    endpointPrefix = 'lesson';
  }

  const toggleDone = () => {
    setDone(!_done);
    const { cards } = appContext.getPanelData(parent);
    const currentCard = cards.find((card: CardModel) => card.id === cardId);
    currentCard.done = !_done;
    (async () => {
      const formdata = new FormData();
      formdata.append('card', JSON.stringify({ 'done': !_done }));
      await apiRequest.post(`schedules/${endpointPrefix}/${scheduleId}/cards/${cardId}`, formdata, ContentType.FORM);
    })();
  };

  const onLongPress = () => {
    navigate(`card/${cardId}`);
  };

  const longPressEvent = useLongPress(
    onLongPress,
    () => {},
    {
      shouldPreventDefault: true,
      delay: 500,
    });

  const createNewHandler = () => {
    navigate('new');
  };

  return(<div className={styles.card}>
    {!imgUrl &&
        <>
          <div className={styles.cardTime}></div>
          <div onClick={createNewHandler} className={`${styles.cardInner} ${styles.cardInnerEmpty}`}>⊕</div>
        </>
    }
    {imgUrl && !_done &&
        <>
          <div className={styles.cardTime}>{startTime}{startTime && endTime && <> - {endTime}</>}</div>
          <div onClick={toggleDone} className={styles.cardInner} {...longPressEvent}>
            <img className={styles.cardImg} src={imgUrl}/>
          </div>
          <div className={styles.cardName}>{cardName}</div>
        </>}
    {imgUrl && _done &&
        <>
          <div className={`${styles.cardTime} ${styles.transparent}`}>{startTime}{startTime && endTime && <> - {endTime}</>}</div>
          <div onClick={toggleDone} className={`${styles.cardInner} ${styles.transparent}`} {...longPressEvent}>
            <img className={styles.cardImg} src={imgUrl}/>
          </div>
          <div className={`${styles.cardName} ${styles.transparent}`}>{cardName}</div>
        </>
    }
  </div>);
};

export { Card };
