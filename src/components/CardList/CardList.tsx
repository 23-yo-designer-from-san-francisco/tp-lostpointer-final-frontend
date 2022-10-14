import React, { useContext, useEffect, useRef, useState } from 'react';
import { Card } from '../Card/Card';
import { AppContext } from '../../AppContext';

import styles from './CardList.module.css';
import { CardModel } from '../../Interfaces';

export interface CardListProps {
    id: string;
    parent: string;
    cards: CardModel[]
}

const CardList: React.FC<CardListProps> = ({ id, parent,  cards = [] }) => {
  const appContext = useContext(AppContext);
  const [_cards, addCard] = useState<CardModel[]>(cards);
  const listRef = useRef<any>();

  const addCardHandler = () => {
    addCard(_cards.concat({ done: false, imgUrl: '' }));
    listRef.current.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'end' });
  };

  useEffect(() => appContext.updatePanel(parent, { cards: _cards }), [_cards]);

  return(
    <div id={id} className={styles.cardList}>
      <ul ref={listRef}>
        {_cards.map(({ done, imgUrl }, i) =>
          <li key={i}>
            <Card
              done={done}
              imgUrl={imgUrl}
            />
          </li>
        )}
        <li>
          <div className={styles.newCardButton} onClick={addCardHandler}>+</div>
        </li>
      </ul>
    </div>
  );
};

export { CardList };
