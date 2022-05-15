import React, { Dispatch, FC, SetStateAction } from 'react';
import { SunIcon, MoonIcon } from '@heroicons/react/outline';

interface Props {
  isDarkMode: boolean;
  setIsDarkMode: Dispatch<SetStateAction<boolean>>;
}

const Header: FC<Props> = ({ isDarkMode, setIsDarkMode }) => {
  const handleClick = () => {
    setIsDarkMode(!isDarkMode);
  };
  return (
    <>
      <div className='absolute inset-x-0 top-0 -z-10 h-[4.5rem] w-full bg-slate-50 dark:bg-slate-800' />
      <header
        className='animate sticky top-0 z-50 border-b border-slate-900/[0.1] bg-slate-50 bg-opacity-50 px-4 
      backdrop-blur-sm dark:border-slate-50/[.25] dark:bg-slate-800 dark:bg-opacity-75 md:px-6 lg:px-8'
      >
        <nav className='mx-auto flex max-w-screen-lg items-center justify-between py-4'>
          <h1
            className='text-bold to bg-gradient-to-r from-sky-800 via-cyan-800 to-blue-800
          bg-clip-text text-4xl font-bold text-transparent
          dark:from-sky-400 dark:via-cyan-400 dark:to-blue-400'
          >
            Fun with AI
          </h1>
          <button onClick={handleClick} aria-label='Toggle dark mode'>
            {isDarkMode ? (
              <SunIcon className='h-5 w-5 text-slate-100' />
            ) : (
              <MoonIcon className='h-5 w-5 text-slate-900' />
            )}
          </button>
        </nav>
      </header>
    </>
  );
};

export default Header;
