import React, { useContext, useMemo, useRef } from 'react';
import { Card } from '../Card/Card';
import { AppContext } from '../../AppContext';

import styles from './CardList.module.css';
import { CardModel } from '../../Interfaces';

export interface CardListProps {
    id: string;
    parent: string;
    cards: CardModel[];
}

const CardList: React.FC<CardListProps> = ({ id, parent,  cards = [] }) => {
  const appContext = useContext(AppContext);
  const listRef = useRef<any>();

  const addCardHandler = () => {
    appContext.updatePanel(parent, { cards: cards.concat({ done: false, imgUrl: '' }) });
    listRef.current.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'end' });
  };

  const renderedCards = useMemo(() => {
    return cards.map(({ done, imgUrl }, i) =>
      <li key={i}>
        <Card
          done={done}
          imgUrl={imgUrl}
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
