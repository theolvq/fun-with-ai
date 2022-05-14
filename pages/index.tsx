import type { NextPage } from 'next';
import Head from 'next/head';
import Main from '../components/Main';

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Fun with AI!</title>
        <meta name='Generate human written-like text using AI' />
      </Head>
      <Main />
    </>
  );
};

export default Home;
