import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { SubMenu } from './SubMenu';
import { IconContext } from 'react-icons/lib';
import { ScheduleModel } from '../../Interfaces';

const Nav = styled.div`
  // background: #15171c;
  height: 80px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const NavIcon = styled(Link)`
  margin-left: 2rem;
  font-size: 2rem;
  height: 80px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const SidebarNav = styled.nav`
  background: #15171c;
  width: 250px;
  height: 100vh;
  display: flex;
  justify-content: center;
  position: fixed;
  top: 0;
  left: ${( sidebar: SidebarProps ) => (sidebar.sidebar ? '0' : '-100%')};
  transition: 350ms;
  z-index: 10;
`;

const SidebarWrap = styled.div`
  width: 100%;
`;

export interface SidebarProps {
  schedules?: any;
  sidebar?: boolean;
}

export const Sidebar: React.FC<SidebarProps> = (props) => {
  const { schedules } = props;
  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);

  if (!Array.isArray(schedules)) {
    return null;
  }

  return (
    <>
      <IconContext.Provider value={{ color: sidebar ? '#fff' : '#000' }}>
        <Nav>
          <NavIcon to='#'>
            <FaIcons.FaBars onClick={showSidebar} />
          </NavIcon>
        </Nav>
        <SidebarNav sidebar={sidebar}>
          <SidebarWrap>
            <NavIcon to='#'>
              <AiIcons.AiOutlineClose onClick={showSidebar} />
            </NavIcon>
            <>
              <SubMenu create={true} key={-1}/>
              {schedules.map((item: ScheduleModel, index: number) => {
                return <SubMenu item={item} key={index} />;
              })}
            </>
          </SidebarWrap>
        </SidebarNav>
      </IconContext.Provider>
    </>
  );
};
