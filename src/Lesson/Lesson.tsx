import React from 'react';
import './Lesson.css';
import { CardList } from '../components/CardList/CardList';
import { CardModel } from '../models/card';
import { LESSON_CARD_LIST } from '../pages';

export interface LessonProps {
    id: string;
    cards: CardModel[];
}

const Lesson: React.FC<LessonProps> = ({ id, cards }) => {
  return(
    <div id={id}>
      <CardList id={LESSON_CARD_LIST}
        cards={cards}
      />
    </div>
  );
};

export { Lesson };
