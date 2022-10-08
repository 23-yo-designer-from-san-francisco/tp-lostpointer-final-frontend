import React, { useState } from 'react';
import { Button } from 'react-bootstrap';

export interface MyComponentProps {
    text?: string;
}

const MyComponent: React.FC<MyComponentProps> = ({ text }) => {
  const [counter, setCounter] = useState<number>(0);

  return(<Button className={} onClick={() => setCounter(counter+1)}>{`${text} ${counter}`}</Button>);
};

export { MyComponent };
