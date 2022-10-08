import React from 'react';
import './Day.css';
import { CardList } from '../components/CardList/CardList';
import { CardModel } from '../models/card';
import { DAY_CARD_LIST } from '../pages';

export interface DayProps {
    id: string;
    cards?: CardModel[];
}

const Day: React.FC<DayProps> = ({ id, cards= [] }) => {
  return(
    <div id={id}>
      <CardList id={DAY_CARD_LIST} cards={cards}/>
    </div>
  );
};

export { Day };
