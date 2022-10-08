import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { PANEL_DAY } from './pages';

export interface HomeProps {
  id: string;
}

export const Home: React.FC<HomeProps> = ({ id }) => {
  const navigate = useNavigate();
  useEffect(() => {
    navigate(PANEL_DAY);
  }, []);
  return (
    <div id={id}></div>
  );
};
