import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Tab, Tabs } from 'react-bootstrap';
import { DAY_SCHEDULE_ID, LESSON_SCHEDULE_ID } from '../../pages';

import styles from './Tabbar.module.css';

const Tabbar: React.FC = () => {
  const [key, setKey] = useState<string>('home');
  const navigate = useNavigate();
  const clickHandler = ((k: string|null) => {
    setKey(k as string);
    navigate(k as string);
  });

  return(
    <Tabs
      activeKey={key}
      onSelect={clickHandler}
      className={styles.tabbar}
    >
      <Tab eventKey={`day/${DAY_SCHEDULE_ID}`} title="День" />
      <Tab eventKey={`lesson/${LESSON_SCHEDULE_ID}`} title="Занятие"/>
      <Tab eventKey="before-after" title="Сначала-потом"/>
      <Tab eventKey="timer" title="Таймер"/>
    </Tabs>
  );
};

export { Tabbar };
