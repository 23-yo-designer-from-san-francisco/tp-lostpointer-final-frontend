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
      // const response = JSON.parse('[{"id":1,"name":"card","done":false,"imgUrl":"localhost/images/e3cc7f82-cf05-4d9b-96fc-bac3fee33a36.webp","startTime":"05:00:00","endTime":"06:00:00"},{"id":2,"name":"card","done":false,"imgUrl":"https://lostpointer.tech/images/3b31dab9-f42f-41a3-ba2d-0d3649f7efd3.webp","startTime":"05:00:00","endTime":"06:00:00"},{"id":3,"name":"card","done":false,"imgUrl":"https://lostpointer.tech/images/2c55cec6-d63c-432b-b3a1-5a1b1e1f67f1.webp","startTime":"05:00:00","endTime":"06:00:00"},{"id":4,"name":"card","done":false,"imgUrl":"https://lostpointer.tech/images/c78aa42b-f5f5-40a5-9422-411f8217137c.webp","startTime":"05:00:00","endTime":"06:00:00"},{"id":5,"name":"card","done":false,"imgUrl":"https://lostpointer.tech/images/a67b9e48-880c-412a-90fc-62cb35cd63c2.webp","startTime":"05:00:00","endTime":"06:00:00"},{"id":6,"name":"card","done":false,"imgUrl":"https://lostpointer.tech/images/c125991d-eccd-4586-8a48-63a38721802e.webp","startTime":"05:00:00","endTime":"06:00:00"},{"id":7,"name":"card","done":false,"imgUrl":"https://lostpointer.tech/images/8de323d2-1691-45bd-970c-e0a3e6531860.webp","startTime":"05:00:00","endTime":"06:00:00"},{"id":8,"name":"card","done":false,"imgUrl":"https://lostpointer.tech/images/12e62eec-bc76-44c4-a382-69af88e8f7bc.webp","startTime":"05:00:00","endTime":"06:00:00"},{"id":9,"name":"card","done":false,"imgUrl":"https://lostpointer.tech/images/5d6e926f-cf67-4da9-8214-c889ff1af8e5.webp","startTime":"05:00:00","endTime":"06:00:00"},{"id":10,"name":"card","done":false,"imgUrl":"https://lostpointer.tech/images/69b041cb-a457-4a3c-b966-785633d206ec.webp","startTime":"05:00:00","endTime":"06:00:00"},{"id":11,"name":"card","done":false,"imgUrl":"https://lostpointer.tech/images/ef24b753-a133-42ea-b149-2f748900f80b.webp","startTime":"05:00:00","endTime":"06:00:00"},{"id":12,"name":"card","done":false,"imgUrl":"https://lostpointer.tech/images/90d0eeec-afb2-4141-bdf0-7519de4b2ed1.webp","startTime":"05:00:00","endTime":"06:00:00"},{"id":13,"name":"card","done":false,"imgUrl":"https://lostpointer.tech/images/e590be2e-2cf5-4b0a-b545-1565890b11a2.webp","startTime":"05:00:00","endTime":"06:00:00"},{"id":14,"name":"card","done":false,"imgUrl":"https://lostpointer.tech/images/1ef9feae-d215-4deb-883c-da73447a3f17.webp","startTime":"05:00:00","endTime":"06:00:00"},{"id":15,"name":"card","done":false,"imgUrl":"https://lostpointer.tech/images/c9ae8668-145e-46d2-9fda-a00f283eac6b.webp","startTime":"05:00:00","endTime":"06:00:00"},{"id":16,"name":"card","done":false,"imgUrl":"https://lostpointer.tech/images/793decbb-2d1f-4d6a-8624-cb0256f18516.webp","startTime":"05:00:00","endTime":"06:00:00"},{"id":17,"name":"card","done":false,"imgUrl":"https://lostpointer.tech/images/e439eba0-0953-40dd-b7df-8a279c509a79.webp","startTime":"05:00:00","endTime":"06:00:00"},{"id":18,"name":"card","done":false,"imgUrl":"https://lostpointer.tech/images/353f2991-e2ca-4cd1-93ca-fb8f6e759807.webp","startTime":"05:00:00","endTime":"06:00:00"},{"id":19,"name":"card","done":false,"imgUrl":"https://lostpointer.tech/images/6f1d1864-5cbb-4284-b1e1-176499655fda.webp","startTime":"05:00:00","endTime":"06:00:00"},{"id":20,"name":"card","done":false,"imgUrl":"https://lostpointer.tech/images/26e9065b-d49a-4c74-8eef-c3b3a9d0f5e6.webp","startTime":"05:00:00","endTime":"06:00:00"},{"id":21,"name":"card","done":false,"imgUrl":"https://lostpointer.tech/images/a0d85cf7-2ac0-4dbf-999d-3c7e0bc5c92a.webp","startTime":"05:00:00","endTime":"06:00:00"},{"id":22,"name":"card","done":false,"imgUrl":"https://lostpointer.tech/images/bd21de29-0b57-4eff-823e-4c7766dcc007.webp","startTime":"05:00:00","endTime":"06:00:00"},{"id":23,"name":"card","done":false,"imgUrl":"https://lostpointer.tech/images/d0c2b749-34b1-40ec-9fc3-81b7ea8c1cb0.webp","startTime":"05:00:00","endTime":"06:00:00"},{"id":24,"name":"card","done":false,"imgUrl":"https://lostpointer.tech/images/27f6cba7-1e6a-461a-861f-8119e9d3944d.webp","startTime":"05:00:00","endTime":"06:00:00"},{"id":25,"name":"card","done":false,"imgUrl":"https://lostpointer.tech/images/e28a79bc-f8f8-427c-9741-5f5ff1c05b2d.webp","startTime":"05:00:00","endTime":"06:00:00"},{"id":26,"name":"card","done":false,"imgUrl":"https://lostpointer.tech/images/4d45bb32-958a-4b61-b0a0-737e22d796c2.webp","startTime":"05:00:00","endTime":"06:00:00"},{"id":27,"name":"card","done":false,"imgUrl":"https://lostpointer.tech/images/12f2cc05-de97-41ac-9ca8-1873c3cf8173.webp","startTime":"05:00:00","endTime":"06:00:00"},{"id":28,"name":"card","done":false,"imgUrl":"https://lostpointer.tech/images/7bcb7321-bbd7-4e25-8c8d-2c0fafb5e840.webp","startTime":"05:00:00","endTime":"06:00:00"},{"id":29,"name":"card","done":false,"imgUrl":"https://lostpointer.tech/images/d8d37e12-4c36-45a3-8dd0-a09cbe290067.webp","startTime":"05:00:00","endTime":"06:00:00"},{"id":30,"name":"card","done":false,"imgUrl":"https://lostpointer.tech/images/5d666a80-9722-4a2e-8f1d-2184f5c5c46a.webp","startTime":"05:00:00","endTime":"06:00:00"},{"id":31,"name":"card","done":false,"imgUrl":"https://lostpointer.tech/images/2d656bc3-8704-41a5-b8cf-cc6e9e8e0803.webp","startTime":"05:00:00","endTime":"06:00:00"},{"id":32,"name":"card","done":false,"imgUrl":"https://lostpointer.tech/images/9178d33b-bc16-4891-af5d-8add08dc458e.webp","startTime":"05:00:00","endTime":"06:00:00"}]');
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
