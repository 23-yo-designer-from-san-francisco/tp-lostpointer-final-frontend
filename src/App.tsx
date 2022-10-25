import React, { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { Home } from './Home';
import { Day } from './components/Day/Day';
import { Lesson } from './components/Lesson/Lesson';
import { BeforeAfter } from './components/BeforeAfter/BeforeAfter';
import { Timer } from './components/Timer/Timer';
import { Tabbar } from './components/Tabbar/Tabbar';
import {
  DEFAULT_SCHEDULE_ID,
  PANEL_BEFORE_AFTER,
  PANEL_DAY,
  PANEL_HOME,
  PANEL_LESSON,
  PANEL_TIMER,
  Panel,
  SCHEDULES_DRAWER
} from './pages';
import { AppContext, AppContextProps } from './AppContext';
import { CardModel } from './Interfaces';
import { apiRequest } from './services/request';
import 'bootstrap/dist/css/bootstrap.min.css';
import { EditCard } from './components/EditCard/EditCard';

import styles from './App.module.css';
import { Sidebar } from './components/Sidebar/Sidebar';

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
  [SCHEDULES_DRAWER]: {
    schedules: any,
  }
  loaded: boolean,
}

export const App: React.FC = () => {
  const { pathname } = useLocation();
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
    [SCHEDULES_DRAWER]: {
      schedules: {},
    },
    loaded: false,
  });

  const sortCards = (card1: CardModel, card2: CardModel) => {
    if (card1.orderPlace < card2.orderPlace) {
      return -1;
    }
    if (card1.orderPlace > card2.orderPlace) {
      return 1;
    }
    return 0;
  };

  useEffect(() => {
    (async () => {
      const dayCards: CardModel[] = await apiRequest.get(`schedules/day/${DEFAULT_SCHEDULE_ID}/cards`);
      const lessonCards: CardModel[] = await apiRequest.get(`schedules/lesson/${DEFAULT_SCHEDULE_ID}/cards`);
      const schedules = await apiRequest.get('childs/1/schedules/lesson');
      setState({
        ...state,
        [PANEL_DAY]: { cards: dayCards.sort(sortCards) },
        [PANEL_LESSON]: { cards: lessonCards.sort(sortCards) },
        [SCHEDULES_DRAWER]: { schedules },
        loaded: true
      });
    })();
  }, []);

  const updatePanel = ((panel: string, data: any) => {
    setState({ ...state, [panel]: data });
  });

  const getPanelData = ((panel: Panel) => state[panel]);

  const appContext: AppContextProps = {
    updatePanel,
    getPanelData,
  };

  const { loaded } = state;

  return (
    <AppContext.Provider value={appContext}>
      <div className={styles.app}>
        <div className={pathname === '/timer' ? styles.timer : styles.timerHidden}>
          <Timer remainingTime={state[PANEL_TIMER].remainingTime} id={PANEL_TIMER}/>
        </div>
        <div className={styles.sidebar}>
          <Sidebar schedules={state[SCHEDULES_DRAWER].schedules} />
        </div>
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
            <Route path="timer" />
            <Route path="/day/:scheduleId/new" element={
              <EditCard parent={PANEL_DAY}/>
            }/>
            <Route path="/day/:scheduleId/card/:cardId" element={
              <EditCard parent={PANEL_DAY}/>
            }/>
            <Route path="/lesson/:scheduleId/new" element={
              <EditCard parent={PANEL_LESSON}/>
            }/>
            <Route path="/lesson/:scheduleId/card/:cardId" element={
              <EditCard parent={PANEL_LESSON}/>
            }/>
          </>}
        </Routes>
        <Tabbar/>
      </div>
    </AppContext.Provider>
  );
};
