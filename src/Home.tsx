import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export interface HomeProps {
  id: string;
}

export const Home: React.FC<HomeProps> = ({ id }) => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate('day/1');  // TODO убрать хардкод
  }, []);
  return (
    <div id={id}></div>
  );
};
