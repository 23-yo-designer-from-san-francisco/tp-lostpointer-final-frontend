import React from 'react';
import { CardList } from '../CardList/CardList';
import { DAY_CARD_LIST, DEFAULT_SCHEDULE_ID, Panel } from '../../pages';
import { CardModel } from '../../Interfaces';
import { useParams } from 'react-router-dom';

import styles from './Day.module.css';

export interface DayProps {
    id: Panel;
    cards: CardModel[];
}

const Day: React.FC<DayProps> = ({ id, cards= [] }) => {
  const { scheduleId } = useParams();
  let parsedScheduleId = parseInt(String(scheduleId));
  if (!parsedScheduleId) {
    parsedScheduleId = DEFAULT_SCHEDULE_ID;
  }
  return(<>
    <div className={styles.dayTitle}>Расписание на день</div>
    <div id={id}>
      <CardList parent={id} id={DAY_CARD_LIST} scheduleId={parsedScheduleId} cards={cards}/>
    </div></>
  );
};

export { Day };
