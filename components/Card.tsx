import { RenderComponentProps } from 'masonic';
import React, { FC } from 'react';
import { Response } from '../types';
import CardHeader from './CardHeader';

const Card: FC<RenderComponentProps<Response>> = ({ index, width, data }) => {
  const { id, prompt, choices } = data;
  if (!choices) {
    return null;
  }
  return (
    <div key={id} className='flex flex-col gap-4 rounded-lg bg-slate-50 p-8 shadow-md'>
      <div>
        <CardHeader>Prompt:</CardHeader>
        <p>{prompt}</p>
      </div>
      <div>
        <CardHeader>Answer: </CardHeader>
        <p>{choices[0].text}</p>
      </div>
    </div>
  );
};

export default Card;
