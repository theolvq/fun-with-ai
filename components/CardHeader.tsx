import React, { FC, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

const CardHeader: FC<Props> = ({ children }) => {
  return <h2 className='text-lg font-semibold text-slate-800 dark:text-slate-300'>{children}</h2>;
};

export default CardHeader;
