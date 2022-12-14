import React, { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { Home } from './Home';
import { Day } from './components/Day/Day';
import { Lesson } from './components/Lesson/Lesson';
import { BeforeAfter } from './components/BeforeAfter/BeforeAfter';
import { Timer } from './components/Timer/Timer';
import { Tabbar } from './components/Tabbar/Tabbar';
import {
  PANEL_BEFORE_AFTER,
  PANEL_DAY,
  PANEL_HOME,
  PANEL_LESSON,
  PANEL_TIMER,
  Panel,
  SCHEDULES_DRAWER,
  NEW_CARD_ORDER,
  DEFAULT_CHILD_ID,
} from './pages';
import { AppContext, AppContextProps } from './AppContext';
import { CardModel, ScheduleModel } from './Interfaces';
import { apiRequest } from './services/request';
import 'bootstrap/dist/css/bootstrap.min.css';
import { EditCard } from './components/EditCard/EditCard';
import { Sidebar } from './components/Sidebar/Sidebar';
import { makeid } from './utils';

import styles from './App.module.css';

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
  },
  [NEW_CARD_ORDER]: number|null,
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
    [NEW_CARD_ORDER]: null,
    loaded: false,
  });

  const sortCards = (card1: CardModel, card2: CardModel) => {
    if (!card1.orderPlace || !card2.orderPlace) {
      return 0;
    }
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
      let scheduleId: number|string = pathname.split('/')[2];
      scheduleId = parseInt(String(scheduleId));
      let dayCards: CardModel[] = await apiRequest.get(`schedules/day/${scheduleId}/cards`);
      let lessonCards: CardModel[] = await apiRequest.get(`schedules/lesson/${scheduleId}/cards`);
      const schedules: ScheduleModel[] = await apiRequest.get(`childs/${DEFAULT_CHILD_ID}/schedules/lesson`);
      // TODO ???????? ?????????? ????????????, ?????????? ?????????????????? ???????????? uuid
      dayCards = dayCards.map((card) => {
        card.id = String(card.id);
        return card;
      });
      lessonCards = lessonCards.map((card) => {
        card.id = String(card.id);
        return card;
      });
      // ?????????????????? ???????????? ????????????????, ?????????? ?????? ?? ???????????? ????????????????????????
      if (dayCards.length < 3) {
        dayCards = [...Array(3).keys()].map((index) => {
          const card = dayCards.find((card) => card.orderPlace === index + 1);
          if (card) {
            return card;
          }
          return { id: `empty-${makeid(5)}`, orderPlace: index + 1, schedule_id: scheduleId };
        });
      }
      if (lessonCards.length < 3) {
        lessonCards = [...Array(3).keys()].map((index) => {
          const card = lessonCards.find((card) => card.orderPlace === index + 1);
          if (card) {
            return card;
          }
          return { id: `empty-${makeid(5)}`, orderPlace: index + 1, schedule_id: scheduleId };
        });
      }
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
