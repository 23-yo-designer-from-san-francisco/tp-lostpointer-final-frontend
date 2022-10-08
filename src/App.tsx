import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Home } from './Home';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Day } from './Day/Day';
import { Lesson } from './Lesson/Lesson';
import { BeforeAfter } from './BeforeAfter/BeforeAfter';
import { Timer } from './Timer/Timer';
import { Tabbar } from './Tabbar/Tabbar';

import styles from './App.module.css';
import { PANEL_BEFORE_AFTER, PANEL_DAY, PANEL_HOME, PANEL_LESSON, PANEL_TIMER } from './pages';

export interface AppContextProps {
  updatePanel: (panel: string, data: any) => void;
}

export const AppContext = React.createContext<AppContextProps>({});

export const App: React.FC = () => {
  const [state, setState] = useState<any>({
    [PANEL_HOME]: {},
    [PANEL_DAY]: {},
    [PANEL_LESSON]: {},
    [PANEL_BEFORE_AFTER]: {},
    [PANEL_TIMER]: {
      remainingTime: 0,
    },
  });

  const updatePanel = ((panel: string, data: any) => {
    setState({ [panel]: data });
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
            <Day id={PANEL_DAY} />
          }/>
          <Route path="lesson" element={
            <Lesson id={PANEL_LESSON} />
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
