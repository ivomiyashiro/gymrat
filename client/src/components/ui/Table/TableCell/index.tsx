import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  className?: string;
}

export const TableCell = ({ children, className }: Props) => {
  return (
    <td className={ `border-t h-[57px] whitespace-nowrap text-left py-[0.5rem] pl-[1rem] ${ className }` }>
      { children }
    </td>
  );
};
