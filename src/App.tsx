import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Info } from './Info';
import { Home } from './Home';
import '@vkontakte/vkui/dist/vkui.css';
import { AppRoot } from '@vkontakte/vkui';

export const App: React.FC = () => {
  return (
    <AppRoot>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="about" element={<Info />}/>
      </Routes>
    </AppRoot>
  );
};
