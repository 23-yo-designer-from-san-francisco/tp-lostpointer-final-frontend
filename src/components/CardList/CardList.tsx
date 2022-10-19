import React, { useContext, useMemo, useRef } from 'react';
import { Card } from '../Card/Card';
import { AppContext } from '../../AppContext';
import { CardModel } from '../../Interfaces';

import styles from './CardList.module.css';

export interface CardListProps {
    id: string;
    scheduleId?: number;
    parent: string;
    cards: CardModel[];
}

const CardList: React.FC<CardListProps> = ({ id, scheduleId, parent,  cards = [] }) => {
  const appContext = useContext(AppContext);
  const listRef = useRef<any>();

  const addCardHandler = () => {
    appContext.updatePanel(parent, { cards: cards.concat({ done: false, imgUrl: '', scheduleId: scheduleId }) });
    listRef.current.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'end' });
  };

  const renderedCards = useMemo(() => {
    return cards.map(({ id, done, imgUrl, scheduleId }, i) =>
      <li key={i}>
        <Card
          cardId={id}
          done={done}
          imgUrl={imgUrl}
          scheduleId={scheduleId}
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
