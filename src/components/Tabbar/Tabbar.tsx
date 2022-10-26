import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Tab, Tabs } from 'react-bootstrap';

import styles from './Tabbar.module.css';

const Tabbar: React.FC = () => {
  const { pathname } = useLocation();
  const scheduleId = pathname.split('/')[2];

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
      <Tab eventKey={`day/${scheduleId}`} title="День" />
      <Tab eventKey={`lesson/${scheduleId}`} title="Занятие"/>
      <Tab eventKey="before-after" title="Сначала-потом"/>
      <Tab eventKey="timer" title="Таймер"/>
    </Tabs>
  );
};

export { Tabbar };
