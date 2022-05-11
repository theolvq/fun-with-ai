import { Masonry } from 'masonic';
import { CreateCompletionResponse } from 'openai';
import React, { FC } from 'react';
import { Response } from '../types';
import Card from './Card';
import CardHeader from './CardHeader';

interface Props {
  responses: Response[];
}

const Responses: FC<Props> = ({ responses }) => {
  const columnCount = responses.length < 4 ? responses.length : 3;
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
