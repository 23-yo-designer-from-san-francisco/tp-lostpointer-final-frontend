import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { Star, StarFill } from 'react-bootstrap-icons';
import styles from './SubMenu.module.css';
import { ScheduleModel } from '../../Interfaces';

const SidebarLink = styled(Link)`
  display: flex;
  color: #e1e9fc;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  list-style: none;
  height: 60px;
  text-decoration: none;
  font-size: 18px;

  &:hover {
    background: #252831;
    border-left: 4px solid #632ce4;
    cursor: pointer;
  }
`;

const SidebarLabel = styled.span`
  margin-left: 16px;
`;

const DropdownLink = styled(Link)`
  background: #414757;
  height: 60px;
  padding-left: 3rem;
  display: flex;
  align-items: center;
  text-decoration: none;
  color: #f5f5f5;
  font-size: 18px;

  &:hover {
    background: #632ce4;
    cursor: pointer;
  }
`;

export interface SubMenuProps {
  item?: ScheduleModel;
  create?: boolean;
}

const SubMenu: React.FC<SubMenuProps> = ({ item, create }) => {
  // const [subnav, setSubnav] = useState(false);
  const [starred, setStarred] = useState(false);

  const location = useLocation();
  // const showSubnav = () => setSubnav(!subnav);
  const starClicked = (e: any) => {
    e.preventDefault();
    setStarred(!starred);
  };

  const newClicked = () => {
    alert('  Н О В И Н К А А!!! N    E W )))');
  };

  return (create ?
    <SidebarLink onClick={newClicked} to={'#'}
    >
      <div className={styles.line}>
        {/*{item.icon}*/}
        <SidebarLabel>N       E       W !!!!!</SidebarLabel>
      </div>
    </SidebarLink>
    :
    <>
      <SidebarLink to={`/${location.pathname.split('/')[1]}/${item?.id}`}
        // onClick={item.subNav && showSubnav}
      >
        <div className={styles.line}>
          {/*{item.icon}*/}
          <SidebarLabel>{item?.name}</SidebarLabel>
          {!starred && <Star data-star={'off'} onClick={starClicked}/>}
          {starred && <StarFill data-star={'on'} onClick={starClicked}/>}
        </div>
        {/*<div>*/}
        {/*  {item.subNav && subnav*/}
        {/*    ? item.iconOpened*/}
        {/*    : item.subNav*/}
        {/*      ? item.iconClosed*/}
        {/*      : null}*/}
        {/*</div>*/}
      </SidebarLink>
      {/*{subnav && item.subNav.map((item: any, index: number) => {*/}
      {/*  return (*/}
      {/*    <DropdownLink to={item.path} key={index}>*/}
      {/*      {item.icon}*/}
      {/*      <SidebarLabel>*/}
      {/*        {item.title}*/}
      {/*      </SidebarLabel>*/}
      {/*    </DropdownLink>*/}
      {/*  );*/}
      {/*})}*/}
    </>
  );
};

export { SubMenu };
