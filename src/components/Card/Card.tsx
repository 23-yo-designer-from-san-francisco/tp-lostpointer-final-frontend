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

  return(<>
    {!imgUrl && <div onClick={createNewHandler} className={`${styles.card} ${styles.cardEmpty}`}>+</div>}
    {imgUrl && !_done && <div onClick={toggleDone} className={styles.card} {...longPressEvent}><img className={styles.cardImg} src={imgUrl}/></div>}
    {imgUrl && _done && <div onClick={toggleDone} className={`${styles.card} ${styles.transparent}`} {...longPressEvent}><img className={styles.cardImg} src={imgUrl}/></div>}
  </>);
};

export { Card };
