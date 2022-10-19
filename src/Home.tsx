import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { DEFAULT_SCHEDULE_ID } from './pages';

export interface HomeProps {
  id: string;
}

export const Home: React.FC<HomeProps> = ({ id }) => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate(`day/${DEFAULT_SCHEDULE_ID}`);
  }, []);
  return (
    <div id={id}></div>
  );
};
