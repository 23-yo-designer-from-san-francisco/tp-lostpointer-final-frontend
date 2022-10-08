import React from 'react';
import './Lesson.css';
import { CardList } from '../components/CardList/CardList';
import { CardModel } from '../models/card';

export interface LessonProps {
    id: string;
}

const Lesson: React.FC<LessonProps> = ({ id }) => {
  return(
    <div id={id}>
      <div>Занятие</div>
      <div>
        <CardList cards={[
          new CardModel({ executed: false, imageUrl: 'https://meddynasty.ru/assets/images/14.11.16/клизма2.jpg' }),
          new CardModel({ executed: true, imageUrl: 'https://meddynasty.ru/assets/images/14.11.16/клизма2.jpg' }),
          new CardModel({})
        ]}/>
      </div>
    </div>
  );
};

export { Lesson };
