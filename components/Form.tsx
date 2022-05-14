import React, {
  ChangeEvent,
  Dispatch,
  FC,
  SetStateAction,
  useState,
  KeyboardEventHandler,
  FormEventHandler,
  useRef,
  useEffect,
} from 'react';
import { Response } from '../types';

interface Props {
  setApiResponses: Dispatch<SetStateAction<Response[]>>;
  prompt: string;
  setPrompt: Dispatch<SetStateAction<string>>;
}

const Form: FC<Props> = ({ prompt, setPrompt, setApiResponses }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (!textareaRef.current) {
      return;
    }
    if (prompt === '') {
      textareaRef.current?.focus();
    }
  }, [prompt]);

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.target;
    setPrompt(value);
  };

  const handleSubmit: FormEventHandler = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
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
    } catch (error) {
      console.error(error);
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError(String(error));
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleKeyDown: KeyboardEventHandler<HTMLTextAreaElement> = async (e) => {
    if (e.ctrlKey && e.key === 'Enter') {
      handleSubmit(e);
    }
  };

  return (
    <div className='mx-auto w-full rounded-lg bg-slate-50 px-8 py-6 shadow-md dark:bg-slate-800'>
      <form
        className='grid w-full justify-items-center gap-8 dark:border-slate-50/[.08]'
        onSubmit={handleSubmit}
      >
        <label className='flex w-full flex-col gap-2'>
          <textarea
            className='animate resize-none rounded-md border border-blue-300 bg-slate-100 p-4 focus-visible:shadow-inner focus-visible:shadow-blue-300
            focus-visible:outline-2 focus-visible:outline-blue-300 disabled:bg-slate-400 dark:bg-slate-900 dark:text-slate-100 disabled:dark:bg-slate-400'
            name='prompt'
            id='prompt'
            rows={10}
            onChange={handleChange}
            value={prompt}
            onKeyDown={handleKeyDown}
            disabled={isSubmitting}
            ref={textareaRef}
          />
          <div className='px-8 text-center'>
            <p>
              Write a prompt for the AI to generate text for you. You can be as brief or descriptive
              as you&#39;d like.
            </p>
            <p> You can submit using ctrl + enter. You can also use the submit button below.</p>
          </div>
        </label>
        <button
          className='animate relative w-fit rounded-md bg-blue-800 px-8 py-2 font-semibold text-white  hover:scale-105 disabled:bg-slate-400 dark:bg-blue-600 disabled:dark:bg-slate-600'
          disabled={isSubmitting}
        >
          {isSubmitting && (
            <svg viewBox='0 0 50 50' className='absolute left-1 h-6 w-6 animate-spin-slow'>
              <circle
                cx='25'
                cy='25'
                r='20'
                fill='none'
                strokeWidth='5'
                className='animate-dash stroke-slate-100'
              />
            </svg>
          )}
          <span>Submit</span>
        </button>
        {error && (
          <div className='text-center text-red-300'>
            <p>{error}</p>
          </div>
        )}
      </form>
    </div>
  );
};

export default Form;
