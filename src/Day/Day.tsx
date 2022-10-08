import React from 'react';
import './Day.css';
import { CardList } from '../components/CardList/CardList';
import { CardModel } from '../models/card';

export interface DayProps {
    id: string;
}

const Day: React.FC<DayProps> = ({ id }) => {
  return(
    <div id={id}>
      <div>День</div>
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

export { Day };
