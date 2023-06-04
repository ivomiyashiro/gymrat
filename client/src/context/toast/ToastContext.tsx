'use client';
import { IToast, TToastType } from '@/interfaces';
import { createContext } from 'react';

interface ContextProps {
  toast: IToast | null
  
  //Methods
  showToast:  ({ type, title, content }: {
    type: TToastType;
    title: string;
    content: string;
}) => void
  hideToast: () => void;
}

export const ToastContext = createContext({} as ContextProps);
