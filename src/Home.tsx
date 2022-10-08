import React from 'react';
import { CardList } from './components/CardList/CardList';
import { CardModel } from './models/card';

export const Home: React.FC = () => {
  return (
    <>
      <CardList cards={
        [
          new CardModel({ executed: false, imageUrl: 'https://meddynasty.ru/assets/images/14.11.16/клизма2.jpg' }),
          new CardModel({ executed: true, imageUrl: 'https://meddynasty.ru/assets/images/14.11.16/клизма2.jpg' }),
          new CardModel({})
        ]
      }/>
    </>
  );
};
