import React from 'react';
import { Info } from './Info';
import { MyComponent } from './MyComponent/MyComponent';

export const Home: React.FC = () => {
  return (
    <>
      <div>test</div>
      <Info text="TEST"/>
      <MyComponent text="KEK ))))"/>
    </>
  );
};
