import React from 'react';
import { Button } from 'react-bootstrap';

export interface InfoProps {
    text?: string;
}

export const Info: React.FC<InfoProps> = ({ text }) => {
  return (
    <Button>{text}</Button>
  );
};
