import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { NEW_CARD_ORDER, Panel, PANEL_DAY, PANEL_LESSON } from '../../pages';
import { apiRequest } from '../../services/request';
import { ContentType, defaultBackendRootURL } from '../../services/requestUtils';
import { AppContext } from '../../AppContext';
import { CardModel } from '../../Interfaces';

import styles from './Card.module.css';

export interface CardProps {
  parent: Panel;
  index: number;
  done?: boolean;
  cardId?: string;
  cardName?: string;
  startTime?: string;
  endTime?: string;
  imgUrl?: string;
  scheduleId?: number;
}

const Card: React.FC<CardProps> = ({ index, parent, cardId, cardName, startTime, endTime, done, imgUrl, scheduleId }) => {
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
      formdata.append(
        'card',
        JSON.stringify(
          {
            'done': !_done,
            'name': currentCard.name,
            'startTime': currentCard.startTime,
            'endTime': currentCard.endTime
          }
        )
      );
      await apiRequest.post(
        `schedules/${endpointPrefix}/${scheduleId}/cards/${cardId}`,
        formdata,
        ContentType.FORM
      );
    })();
  };

  const editCard = () => {
    navigate(`card/${cardId}`);
  };

  const createNewHandler = () => {
    // записываем в хранилище расположение карточки
    appContext.updatePanel(NEW_CARD_ORDER, index + 1);
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
          <div className={styles.cardInner}>
            <img onClick={toggleDone} alt={cardName} className={styles.cardImg} src={imgUrl}/>
            <div onClick={editCard} className={styles.cardEditIcon}>
              <img alt='Изменить' src={`${defaultBackendRootURL}/images/pencil.svg`}/>
            </div>
          </div>
          <div className={styles.cardName}>{cardName}</div>
        </>}
    {imgUrl && _done &&
        <>
          <div className={`${styles.cardTime} ${styles.transparent}`}>{startTime}{startTime && endTime && <> - {endTime}</>}</div>
          <div className={`${styles.cardInner} ${styles.transparent}`}>
            <img onClick={toggleDone} alt={cardName} className={styles.cardImg} src={imgUrl}/>
            <div onClick={editCard} className={styles.cardEditIcon}>
              <img alt='Изменить' src={`${defaultBackendRootURL}/images/pencil.svg`}/>
            </div>
          </div>
          <div className={`${styles.cardName} ${styles.transparent}`}>{cardName}</div>
        </>
    }
  </div>);
};

export { Card };
