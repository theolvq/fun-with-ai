import React, { useEffect, useState } from 'react';
import { Response } from '../types';
import Form from './Form';
import Header from './Header';
import Responses from './Responses';

const Main = () => {
  const [prompt, setPrompt] = useState('');
  const [responses, setResponses] = useState<Response[]>([]);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  useEffect(() => {
    const storedResponses = localStorage.getItem('responses');
    if (storedResponses) {
      setResponses(JSON.parse(storedResponses));
    }
  }, []);

  useEffect(() => {
    if (responses.length > 0) {
      localStorage.setItem('responses', JSON.stringify(responses));
    }
  }, [responses]);

  useEffect(() => {
    if (window.matchMedia) {
      if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        setIsDarkMode(true);
      } else {
        setIsDarkMode(false);
      }
    }
  }, []);

  return (
    <main className={isDarkMode ? 'dark' : ''}>
      <Header isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
      <section className='grid min-h-screen bg-slate-100 px-4 text-slate-600 dark:bg-gray-900 dark:text-gray-100 md:px-6 lg:px-8'>
        <div className='mx-auto w-full max-w-screen-lg space-y-16 py-12'>
          <Form prompt={prompt} setPrompt={setPrompt} setApiResponses={setResponses} />
          <Responses responses={responses} />
        </div>
      </section>
    </main>
  );
};

export default Main;
