import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  className?: string;
}

export const TableHead = ({ children, className }: Props) => {
  return (
    <th className={ `font-normal whitespace-nowrap text-left py-[0.5rem] px-[1rem] ${ className }` }>
      { children }
    </th>
  );
};
