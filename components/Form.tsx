import { CreateCompletionResponse } from 'openai';
import React, { ChangeEvent, Dispatch, FC, FormEvent, SetStateAction } from 'react';
import { Response } from '../types';

interface Props {
  setApiResponses: Dispatch<SetStateAction<Response[]>>;
  prompt: string;
  setPrompt: Dispatch<SetStateAction<string>>;
}

const Form: FC<Props> = ({ prompt, setPrompt, setApiResponses }) => {
  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.target;
    setPrompt(value);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = await fetch('/api/open-ai', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(prompt),
    });
    const json = await response.json();

    setApiResponses((prev) => [{ prompt, ...json }, ...prev]);
    setPrompt('');
  };

  return (
    <div className='mx-auto w-full rounded-lg bg-slate-50 px-8 py-4 shadow-md'>
      <form className='grid w-full justify-items-center gap-8 ' onSubmit={handleSubmit}>
        <label className='flex w-full flex-col'>
          Prompt
          <textarea
            className='resize-none rounded-md border border-blue-300 p-4 transition-all duration-300 ease-in-out
            focus-visible:shadow-inner focus-visible:shadow-blue-300 focus-visible:outline-2 focus-visible:outline-blue-300'
            name='prompt'
            id='prompt'
            rows={20}
            onChange={handleChange}
            value={prompt}
          />
        </label>
        <button className='w-fit rounded-md bg-indigo-600 px-8 py-2 text-white'>Submit</button>
      </form>
    </div>
  );
};

export default Form;
