import React from 'react';
import { CardList } from '../components/CardList/CardList';
import { LESSON_CARD_LIST } from '../pages';
import { CardModel } from '../Interfaces';

import './Lesson.css';

export interface LessonProps {
    id: string;
    cards: CardModel[];
}

const Lesson: React.FC<LessonProps> = ({ id, cards }) => {
  return(
    <div id={id}>
      <CardList parent={id} id={LESSON_CARD_LIST}
        cards={cards}
      />
    </div>
  );
};

export { Lesson };
