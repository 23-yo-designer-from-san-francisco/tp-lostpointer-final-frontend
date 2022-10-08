import React, { useContext, useState } from 'react';
import styles from './CardList.module.css';
import { Card } from '../Card/Card';
import { CardModel } from '../../models/card';
import { AppContext } from '../../AppContext';

export interface CardListProps {
    id: string;
    parent: string;
    cards: CardModel[]
}

const CardList: React.FC<CardListProps> = ({ id, parent,  cards = [] }) => {
  const appContext = useContext(AppContext);
  const [_cards, addCard] = useState<CardModel[]>(cards);

  const addCardHandler = () => {
    addCard(_cards.concat(new CardModel({})));
    appContext.updatePanel?.(parent, {
      cards: _cards
    });
  };

  return(
    <div id={id} className={styles.cardList}>
      <ul>
        {_cards.map((card, i) =>
          <li key={i}>
            <Card
              done={card.getProps().done}
              imgUrl={card.getProps().imgUrl}
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
