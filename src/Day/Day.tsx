import React from 'react';
import { CardList } from '../components/CardList/CardList';
import { DAY_CARD_LIST } from '../pages';
import { CardModel } from '../Interfaces';

import './Day.css';

export interface DayProps {
    id: string;
    scheduleId: string;
    cards: CardModel[];
}

const Day: React.FC<DayProps> = ({ id, scheduleId, cards= [] }) => {
  return(
    <div id={id}>
      <CardList parent={id} id={DAY_CARD_LIST} scheduleId={scheduleId} cards={cards}/>
    </div>
  );
};

export { Day };
