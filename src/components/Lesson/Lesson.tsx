import React from 'react';
import { CardList } from '../CardList/CardList';
import { LESSON_CARD_LIST, Panel } from '../../pages';
import { CardModel } from '../../Interfaces';
import { useParams } from 'react-router-dom';

import styles from './Lesson.module.css';

export interface LessonProps {
    id: Panel;
    cards: CardModel[];
}

const Lesson: React.FC<LessonProps> = ({ id, cards }) => {
  const { scheduleId } = useParams();
  const parsedScheduleId = parseInt(String(scheduleId));
  return(<>
    <div className={styles.lessonTitle}>Расписание на занятие</div>
    <div id={id}>
      <CardList parent={id} id={LESSON_CARD_LIST} scheduleId={parsedScheduleId} cards={cards}/>
    </div></>
  );
};

export { Lesson };
