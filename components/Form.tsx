import { CreateCompletionResponse } from 'openai';
import React, {
  ChangeEvent,
  Dispatch,
  FC,
  FormEvent,
  SetStateAction,
  KeyboardEvent,
  useState,
} from 'react';
import { Response } from '../types';

interface Props {
  setApiResponses: Dispatch<SetStateAction<Response[]>>;
  prompt: string;
  setPrompt: Dispatch<SetStateAction<string>>;
}

interface KeyMap {
  [key: string]: boolean;
}

const Form: FC<Props> = ({ prompt, setPrompt, setApiResponses }) => {
  const [keyMap, setKeyMap] = useState<KeyMap>({});
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

  const handleKeyDown = async (e: KeyboardEvent<HTMLFormElement>) => {
    if (e.ctrlKey && e.key === 'Enter') {
      await handleSubmit(e);
    }
  };

  return (
    <div className='mx-auto w-full rounded-lg bg-slate-50 px-8 py-6 shadow-md dark:bg-slate-800'>
      <form
        className='grid w-full justify-items-center gap-8 dark:border-slate-50/[.08]'
        onSubmit={handleSubmit}
        onKeyDown={handleKeyDown}
      >
        <label className='flex w-full flex-col gap-2'>
          <textarea
            className='animate resize-none rounded-md border border-blue-300 bg-slate-100 p-4 focus-visible:shadow-inner focus-visible:shadow-blue-300
            focus-visible:outline-2 focus-visible:outline-blue-300 dark:bg-slate-900 dark:text-slate-100'
            name='prompt'
            id='prompt'
            rows={20}
            onChange={handleChange}
            value={prompt}
          />
          <div className='px-8 text-center'>
            <p>
              Write a prompt for the AI to generate text for you. You can be as brief or descriptive
              as you&#39;d like.
            </p>
            <p> You can submit using ctrl + enter. You can also use the submit button below.</p>
          </div>
        </label>
        <button className='animate w-fit rounded-md bg-blue-800 px-8 py-2 font-semibold text-white  hover:scale-105 dark:bg-blue-600'>
          Submit
        </button>
      </form>
    </div>
  );
};

export default Form;
