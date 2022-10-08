import React from 'react';
import './BeforeAfter.css';

export interface BeforeAfterProps {
    id: string;
}

const BeforeAfter: React.FC<BeforeAfterProps> = ({ id }) => {
  return(
    <div id={id}>Work in progress</div>
  );
};

export { BeforeAfter };
