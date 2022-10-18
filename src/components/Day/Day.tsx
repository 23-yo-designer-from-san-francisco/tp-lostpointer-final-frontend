import React from 'react';
import { CardList } from '../CardList/CardList';
import { DAY_CARD_LIST } from '../../pages';
import { CardModel } from '../../Interfaces';
import { useParams } from 'react-router-dom';

import './Day.css';

export interface DayProps {
    id: string;
    cards: CardModel[];
}

const Day: React.FC<DayProps> = ({ id, cards= [] }) => {
  const { scheduleId } = useParams();
  return(
    <div id={id}>
      <CardList parent={id} id={DAY_CARD_LIST} scheduleId={scheduleId} cards={cards}/>
    </div>
  );
};

export { Day };
