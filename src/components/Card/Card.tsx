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
  imgUrl?: string;
  scheduleId?: number;
}

const Card: React.FC<CardProps> = ({ parent, cardId, done, imgUrl, scheduleId }) => {
  const appContext = useContext(AppContext);
  const navigate = useNavigate();
  const [_done, setDone] = useState<boolean>(Boolean(done));

  let endpointPrefix = '';
  if (parent === PANEL_DAY) {
    endpointPrefix = 'day';
  } else if (parent === PANEL_LESSON) {
    endpointPrefix = 'lesson';
  }

  const setDoneHandler = () => {
    setDone(!_done);
    const { cards } = appContext.getPanelData(parent);
    const currentCard = cards.find((card: CardModel) => card.id === cardId);
    currentCard.done = !_done;
    (async () => {
      const formdata = new FormData();
      formdata.append('card', JSON.stringify({ 'done': !_done }));
      const updatedCard = await apiRequest.post(`schedules/${endpointPrefix}/${scheduleId}/cards/${cardId}`, formdata, ContentType.FORM);
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

  return(
    <div className={styles.card}>
      {!imgUrl &&
        <div onClick={createNewHandler} className={styles.cardInner}>+</div>
      }
      {imgUrl && !_done &&
          // @ts-ignore
          <div className={styles.cardInner} onClick={setDoneHandler} {...longPressEvent}>
            <img src={imgUrl}/>
          </div>
      }
      {imgUrl && _done &&
          // @ts-ignore
          <div className={`${styles.cardInner} ${styles.transparent}`} onClick={setDoneHandler} {...longPressEvent}>
            <img src={imgUrl}/>
          </div>
      }
    </div>);
};

export { Card };
