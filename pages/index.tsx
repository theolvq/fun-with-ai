import type { NextPage } from 'next';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import Form from '../components/Form';
import Responses from '../components/Responses';
import { Response } from '../types';

const Home: NextPage = () => {
  const [prompt, setPrompt] = useState('');
  const [responses, setResponses] = useState<Response[]>([]);

  useEffect(() => {
    console.log(responses);
  }, [responses]);

  return (
    <>
      <Head>
        <title>Fun with AI!</title>
      </Head>
      <div className='grid min-h-screen  bg-slate-100'>
        <div className='mx-auto w-full max-w-xl py-12'>
          <h1 className='text-bold via-purple  via-sky6800 mb-8 bg-gradient-to-r from-sky-600 to-cyan-400 bg-clip-text text-4xl font-bold text-transparent'>
            Fun with AI!
          </h1>
          <Form prompt={prompt} setPrompt={setPrompt} setApiResponses={setResponses} />
        </div>
        <Responses responses={responses} />
      </div>
    </>
  );
};

export default Home;
