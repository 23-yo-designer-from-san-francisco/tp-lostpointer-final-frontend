import React, { useContext, useMemo, useRef } from 'react';
import { Card } from '../Card/Card';
import { AppContext } from '../../AppContext';
import { CardModel } from '../../Interfaces';

import styles from './CardList.module.css';
import { List, Panel } from '../../pages';

export interface CardListProps {
    id: List;
    scheduleId?: number;
    parent: Panel;
    cards: CardModel[];
}

const CardList: React.FC<CardListProps> = ({ id, scheduleId, parent,  cards = [] }) => {
  const appContext = useContext(AppContext);
  const listRef = useRef<any>();

  const addCardHandler = () => {
    appContext.updatePanel(parent, { cards: cards.concat({ orderPlace: cards.length, schedule_id: scheduleId }) });
    listRef.current.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'end' });
  };

  const renderedCards = useMemo(() => {
    return cards.map(({ id, name, startTime, endTime, done, imgUrl, schedule_id }, i) =>
      <li key={i}>
        <Card
          parent={parent}
          cardId={id}
          cardName={name}
          startTime={startTime}
          endTime={endTime}
          done={done}
          imgUrl={imgUrl}
          scheduleId={schedule_id}
        />
      </li>
    );
  }, [cards]);

  return(
    <div id={id} className={styles.cardList}>
      <ul ref={listRef}>
        <>
          {renderedCards}
          <li>
            <div className={styles.newCardButton} onClick={addCardHandler}>+</div>
          </li>
        </>
      </ul>
    </div>
  );
};

export { CardList };
