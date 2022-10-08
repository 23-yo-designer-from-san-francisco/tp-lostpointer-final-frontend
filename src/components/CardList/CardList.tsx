import React, { useState } from 'react';
import styles from './CardList.module.css';
import { Card } from '../Card/Card';
import { CardModel } from '../../models/card';

export interface CardListProps {
    cards: CardModel[]
}

const CardList: React.FC<CardListProps> = ({ cards }) => {
  const [_cards, addCard] = useState<CardModel[]>(cards);

  return(
    <div className={styles.cardList}>
      <ul>
        {_cards.map((card) =>
          <li>
            <Card
              executed={card.getProps().executed}
              imageUrl={card.getProps().imageUrl}
            />
          </li>
        )}
        <li>
          <div className={styles.newCardButton} onClick={() => addCard(_cards.concat(new CardModel({})))}>+</div>
        </li>
      </ul>
    </div>
  );
};

export { CardList };
