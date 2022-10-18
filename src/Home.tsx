import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { DAY_SCHEDULE_ID } from './pages';

export interface HomeProps {
  id: string;
}

export const Home: React.FC<HomeProps> = ({ id }) => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate(`day/${DAY_SCHEDULE_ID}`);
  }, []);
  return (
    <div id={id}></div>
  );
};
