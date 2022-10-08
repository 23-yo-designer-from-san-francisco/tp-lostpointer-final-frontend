import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Home } from './Home';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Day } from './Day/Day';
import { Lesson } from './Lesson/Lesson';
import { BeforeAfter } from './BeforeAfter/BeforeAfter';
import { Timer } from './Timer/Timer';

export const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="day" element={<Day />}/>
      <Route path="lesson" element={<Lesson />}/>
      <Route path="before-after" element={<BeforeAfter />}/>
      <Route path="timer" element={<Timer />}/>
    </Routes>
  );
};
