import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Home } from './Home';
import { Day } from './Day/Day';
import { Lesson } from './Lesson/Lesson';
import { BeforeAfter } from './BeforeAfter/BeforeAfter';
import { Timer } from './Timer/Timer';
import { Tabbar } from './Tabbar/Tabbar';
import { PANEL_BEFORE_AFTER, PANEL_DAY, PANEL_HOME, PANEL_LESSON, PANEL_TIMER } from './pages';
import { CardModel } from './models/card';
import { AppContext } from './AppContext';

import 'bootstrap/dist/css/bootstrap.min.css';

import styles from './App.module.css';
import { AppContextProps } from './AppContext';

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
    remainingTime: number
  }
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
  });

  useEffect(() => {
    (async () => {
      const response = await CardModel.getCards();
      // @ts-ignore
      const cards = response.map((card: CardModel) => new CardModel(card));
      setState( { ...state,
        [PANEL_DAY]: { cards },
        [PANEL_LESSON]: { cards }
      });
    })();
  }, []);

  const updatePanel = ((panel: string, data: any) => {
    setState({ ...state, [panel]: data });
  });

  const appContext: AppContextProps = {
    updatePanel: updatePanel,
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
