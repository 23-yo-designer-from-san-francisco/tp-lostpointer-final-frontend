import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Info } from './Info';
import { Home } from './Home';

export const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="about" element={<Info />}/>
    </Routes>
  );
};
