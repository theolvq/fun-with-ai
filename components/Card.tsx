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
    <div
      key={id}
      className='flex flex-col gap-4 rounded-lg border bg-slate-50 p-8 shadow-md dark:border-slate-50/[.08] dark:bg-slate-800 dark:text-slate-100'
    >
      <div>
        {index + 1}
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
