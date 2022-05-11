import { CreateCompletionResponse } from 'openai';
import React, { FC } from 'react';
import { Response } from '../types';
import CardHeader from './CardHeader';

interface Props {
  responses: Response[];
}

const Responses: FC<Props> = ({ responses }) => {
  const cols = responses.length < 4 ? responses.length : 3;
  return (
    <div className={`my-8 grid max-w-screen-lg grid-cols-${cols} gap-4`}>
      {responses.length > 0 &&
        responses.map(({ id, prompt, choices }) => {
          if (!choices) return null;
          return (
            <div key={id} className='flex  flex-col gap-4 rounded-lg bg-slate-50 p-8 shadow-md'>
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
        })}
    </div>
  );
};

export default Responses;
