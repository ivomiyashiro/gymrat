import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  className?: string;
}

export const TableRow = ({ children, className }: Props) => {
  return (
    <tr className={ `hover:bg-gray-50 cursor-pointer ${ className }` }>
      { children }
    </tr>
  );
};
