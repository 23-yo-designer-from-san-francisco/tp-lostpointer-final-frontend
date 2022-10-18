import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Home } from './Home';
import { Day } from './Day/Day';
import { Lesson } from './Lesson/Lesson';
import { BeforeAfter } from './BeforeAfter/BeforeAfter';
import { Timer } from './Timer/Timer';
import { Tabbar } from './Tabbar/Tabbar';
import { PANEL_BEFORE_AFTER, PANEL_DAY, PANEL_HOME, PANEL_LESSON, PANEL_TIMER } from './pages';
import { AppContext, AppContextProps } from './AppContext';
import { CardModel } from './Interfaces';
import { apiRequest } from './services/request';
import styles from './App.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const daySCheduleId = '35';
const lessonScheduleId = '36';

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
      const dayCards = await apiRequest.get(`schedules/day/${daySCheduleId}/cards`);
      const lessonCards = await apiRequest.get(`schedules/day/${lessonScheduleId}/cards`);
      setState({ ...state, [PANEL_DAY]: { cards: dayCards }, [PANEL_LESSON]: { cards: lessonCards }, loaded: true });
    })();
  }, []);

  const updatePanel = ((panel: string, data: any) => {
    setState({ ...state, [panel]: data });
  });

  const appContext: AppContextProps = {
    updatePanel,
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
            <Route path="day" element={
              <Day cards={state[PANEL_DAY].cards} scheduleId={daySCheduleId} id={PANEL_DAY} />
            }/>
            <Route path="lesson" element={
              <Lesson cards={state[PANEL_LESSON].cards} scheduleId={lessonScheduleId} id={PANEL_LESSON} />
            }/>
            <Route path="before-after" element={
              <BeforeAfter id={PANEL_BEFORE_AFTER} />
            }/>
            <Route path="timer" element={
              <Timer remainingTime={state[PANEL_TIMER].remainingTime} id={PANEL_TIMER}/>
            }/>
          </>}
        </Routes>
        <Tabbar/>
      </div>
    </AppContext.Provider>
  );
};
