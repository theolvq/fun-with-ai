import type { NextPage } from 'next';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import Form from '../components/Form';
import Header from '../components/Header';
import Responses from '../components/Responses';
import { Response } from '../types';

const Home: NextPage = () => {
  const [prompt, setPrompt] = useState('');
  const [responses, setResponses] = useState<Response[]>([]);
  const [isDarkMode, setIsDarkMode] = useState(false);

  return (
    <>
      <Head>
        <title>Fun with AI!</title>
        <meta name='Generate human written-like text using AI' />
      </Head>
      <main className={isDarkMode ? 'dark' : ''}>
        <Header isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
        <div className='grid min-h-screen bg-slate-100 px-4 text-slate-600 dark:bg-gray-900 dark:text-gray-100 md:px-6 lg:px-8'>
          <div className='mx-auto w-full max-w-screen-lg space-y-16 py-12'>
            <Form prompt={prompt} setPrompt={setPrompt} setApiResponses={setResponses} />
            <Responses responses={responses} />
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;
