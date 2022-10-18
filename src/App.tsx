import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Home } from './Home';
import { Day } from './components/Day/Day';
import { Lesson } from './components/Lesson/Lesson';
import { BeforeAfter } from './components/BeforeAfter/BeforeAfter';
import { Timer } from './components/Timer/Timer';
import { Tabbar } from './components/Tabbar/Tabbar';
import {
  DAY_SCHEDULE_ID,
  LESSON_SCHEDULE_ID,
  PANEL_BEFORE_AFTER,
  PANEL_DAY,
  PANEL_HOME,
  PANEL_LESSON,
  PANEL_TIMER
} from './pages';
import { AppContext, AppContextProps } from './AppContext';
import { CardModel } from './Interfaces';
import { apiRequest } from './services/request';
import styles from './App.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { EditCard } from './components/EditCard/EditCard';

export interface AppState {
  [PANEL_HOME]: any,
  [PANEL_DAY]: {
    cards: CardModel[]
  },
  [PANEL_LESSON]: {
    cards: CardModel[]
  },
  [PANEL_BEFORE_AFTER]: any,
  [PANEL_TIMER]: {
    remainingTime: number,
  },
  loaded: boolean,
}

export const App: React.FC = () => {
  const [state, setState] = useState<AppState>({
    [PANEL_HOME]: {},
    [PANEL_DAY]: {
      cards: [],
    },
    [PANEL_LESSON]: {
      cards: [],
    },
    [PANEL_BEFORE_AFTER]: {},
    [PANEL_TIMER]: {
      remainingTime: 0,
    },
    loaded: false,
  });

  useEffect(() => {
    (async () => {
      const dayCards = await apiRequest.get(`schedules/day/${DAY_SCHEDULE_ID}/cards`);
      const lessonCards = await apiRequest.get(`schedules/day/${LESSON_SCHEDULE_ID}/cards`);
      setState({ ...state, [PANEL_DAY]: { cards: dayCards }, [PANEL_LESSON]: { cards: lessonCards }, loaded: true });
    })();
  }, []);

  const updatePanel = ((panel: string, data: any) => {
    setState({ ...state, [panel]: data });
  });
  const getPanelData = ((panel: string) => state[panel]);

  const appContext: AppContextProps = {
    updatePanel,
    getPanelData,
  };

  const { loaded } = state;

  return (
    <AppContext.Provider value={appContext}>
      <div className={styles.app}>
        <Routes>
          <Route path="/" element={
            <Home id={PANEL_HOME} />
          } />
          {loaded && <>
            <Route path="/day/:scheduleId" element={
              <Day cards={state[PANEL_DAY].cards} id={PANEL_DAY} />
            }/>
            <Route path="/lesson/:scheduleId" element={
              <Lesson cards={state[PANEL_LESSON].cards} id={PANEL_LESSON} />
            }/>
            <Route path="/before-after" element={
              <BeforeAfter id={PANEL_BEFORE_AFTER} />
            }/>
            <Route path="timer" element={
              <Timer remainingTime={state[PANEL_TIMER].remainingTime} id={PANEL_TIMER}/>
            }/>
            <Route path="/day/:scheduleId/new" element={
              <EditCard/>
            }/>
            <Route path="/lesson/:scheduleId/new" element={
              <EditCard/>
            }/>
          </>}
        </Routes>
        <Tabbar/>
      </div>
    </AppContext.Provider>
  );
};
