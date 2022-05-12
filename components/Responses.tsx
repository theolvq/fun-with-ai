import { Masonry } from 'masonic';
import { CreateCompletionResponse } from 'openai';
import React, { FC, useEffect, useState } from 'react';
import { Response } from '../types';
import Card from './Card';
import CardHeader from './CardHeader';

interface Props {
  responses: Response[];
}

const Responses: FC<Props> = ({ responses }) => {
  const [columnCount, setColumnCount] = useState(1);
  const [windowWidth, setWindowWidth] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    if (!window) {
      return;
    }
    console.log(windowWidth);
    if (windowWidth < 600) {
      setColumnCount(1);
    }
    if (windowWidth >= 600 && windowWidth < 900) {
      if (responses.length < 3) {
        setColumnCount(responses.length);
      } else {
        setColumnCount(2);
      }
    }
    if (windowWidth >= 900) {
      setColumnCount(3);
      if (responses.length < 4) {
        setColumnCount(responses.length);
      } else {
        setColumnCount(3);
      }
    }
  }, [responses, windowWidth]);

  return (
    <Masonry
      items={responses}
      render={Card}
      columnGutter={16}
      columnCount={columnCount}
      className='masonry'
    />
  );
};

export default Responses;
