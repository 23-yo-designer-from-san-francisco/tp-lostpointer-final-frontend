import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Home } from './Home';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Day } from './Day/Day';
import { Lesson } from './Lesson/Lesson';
import { BeforeAfter } from './BeforeAfter/BeforeAfter';
import { Timer } from './Timer/Timer';
import { Tabbar } from './Tabbar/Tabbar';
import { PANEL_BEFORE_AFTER, PANEL_DAY, PANEL_HOME, PANEL_LESSON, PANEL_TIMER } from './pages';
import { CardModel } from './models/card';

import styles from './App.module.css';

export interface AppContextProps {
  updatePanel?: (panel: string, data: any) => void;
}

// @ts-ignore
export const AppContext = React.createContext<AppContextProps>({});

export const App: React.FC = () => {
  const [state, setState] = useState<any>({
    [PANEL_HOME]: {},
    [PANEL_DAY]: {
      cards: [
        new CardModel({ executed: false, imageUrl: 'https://meddynasty.ru/assets/images/14.11.16/клизма2.jpg' }),
        new CardModel({ executed: true, imageUrl: 'https://meddynasty.ru/assets/images/14.11.16/клизма2.jpg' }),
        new CardModel({})
      ],
    },
    [PANEL_LESSON]: {
      cards: [
        new CardModel({ executed: false, imageUrl: 'https://meddynasty.ru/assets/images/14.11.16/клизма2.jpg' }),
        new CardModel({ executed: true, imageUrl: 'https://meddynasty.ru/assets/images/14.11.16/клизма2.jpg' }),
        new CardModel({})
      ],
    },
    [PANEL_BEFORE_AFTER]: {},
    [PANEL_TIMER]: {
      remainingTime: 0,
    },
  });

  const updatePanel = ((panel: string, data: any) => {
    setState({ ...state, [panel]: data });
  });

  const appContext = {
    updatePanel
  };

  return (
    <AppContext.Provider value={appContext}>
      <div className={styles.app}>
        <Routes>
          <Route path="/" element={
            <Home id={PANEL_HOME} />
          } />
          <Route path="day" element={
            <Day cards={state[PANEL_DAY].cards} id={PANEL_DAY} />
          }/>
          <Route path="lesson" element={
            <Lesson cards={state[PANEL_LESSON].cards} id={PANEL_LESSON} />
          }/>
          <Route path="before-after" element={
            <BeforeAfter id={PANEL_BEFORE_AFTER} />
          }/>
          <Route path="timer" element={
            <Timer remainingTime={state[PANEL_TIMER].remainingTime} id={PANEL_TIMER}/>
          }/>
        </Routes>
        <Tabbar/>
      </div>
    </AppContext.Provider>
  );
};
