import React from 'react';

export interface HomeProps {
  id: string;
}

export const Home: React.FC<HomeProps> = ({ id }) => {
  return (
    <div id={id}></div>
  );
};
