import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  className?: string;
}

export const TableHeader = ({ children, className }: Props) => {
  return (
    <thead className={ className }>
      { children }
    </thead>
  );
};
