import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Tab, Tabs } from 'react-bootstrap';
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
      id="controlled-tab-example"
      activeKey={key}
      onSelect={clickHandler}
      className={styles.tabbar}
    >
      <Tab eventKey="day" title="День" />
      <Tab eventKey="lesson" title="Урок"/>
      <Tab eventKey="before-after" title="Сначала-потом"/>
      <Tab eventKey="timer" title="Таймер"/>
    </Tabs>
  );
};

export { Tabbar };
