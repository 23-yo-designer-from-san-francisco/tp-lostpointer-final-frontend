import React, { useContext, useState } from 'react';
import styles from './CardList.module.css';
import { Card } from '../Card/Card';
import { CardModel } from '../../models/card';
import { AppContext } from '../../App';
import { LESSON_CARD_LIST, PANEL_DAY, PANEL_LESSON } from '../../pages';

export interface CardListProps {
    id: string;
    cards: CardModel[]
}

const CardList: React.FC<CardListProps> = ({ id, cards = [] }) => {
  const appContext = useContext(AppContext);
  const [_cards, addCard] = useState<CardModel[]>(cards);

  const addCardHandler = () => {
    addCard(_cards.concat(new CardModel({})));
    appContext.updatePanel(id === LESSON_CARD_LIST ? PANEL_LESSON : PANEL_DAY, { cards: _cards });
  };

  return(
    <div className={styles.cardList}>
      <ul>
        {_cards.map((card, i) =>
          <li key={i}>
            <Card
              executed={card.getProps().executed}
              imageUrl={card.getProps().imageUrl}
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
