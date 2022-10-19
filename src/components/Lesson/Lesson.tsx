import React from 'react';
import { CardList } from '../CardList/CardList';
import { DEFAULT_SCHEDULE_ID, LESSON_CARD_LIST } from '../../pages';
import { CardModel } from '../../Interfaces';
import { useParams } from 'react-router-dom';

import './Lesson.css';

export interface LessonProps {
    id: string;
    cards: CardModel[];
}

const Lesson: React.FC<LessonProps> = ({ id, cards }) => {
  const { scheduleId } = useParams();
  let parsedScheduleId = parseInt(String(scheduleId));
  if (!parsedScheduleId) {
    parsedScheduleId = DEFAULT_SCHEDULE_ID;
  }
  return(
    <div id={id}>
      <CardList parent={id} id={LESSON_CARD_LIST} scheduleId={parsedScheduleId} cards={cards}/>
    </div>
  );
};

export { Lesson };
