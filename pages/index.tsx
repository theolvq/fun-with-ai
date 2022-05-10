import type { NextPage } from 'next';
import Head from 'next/head';
import { CreateCompletionResponse } from 'openai';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';

const Home: NextPage = () => {
  const [prompt, setPrompt] = useState('');
  const [apiResponses, setApiResponses] = useState<CreateCompletionResponse[]>([]);
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

    setApiResponses((prev) => [...prev, json]);
    setPrompt('');
  };

  useEffect(() => {
    console.log(apiResponses);
  }, [apiResponses]);

  return (
    <>
      <Head>
        <title>Fun with AI!</title>
      </Head>
      <h1>Fun with AI!</h1>
      <form onSubmit={handleSubmit}>
        <label>Prompt</label>
        <textarea
          name='prompt'
          id='prompt'
          cols={30}
          rows={10}
          onChange={handleChange}
          value={prompt}
        />
        <button>Submit</button>
        {apiResponses.length > 0 &&
          apiResponses.map(({ choices, id }) => {
            if (!choices) return null;
            return (
              <div key={id}>
                <p>{choices[0].text}</p>
              </div>
            );
          })}
      </form>
    </>
  );
};

export default Home;
