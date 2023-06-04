'use client';
import { ReactNode, useState } from 'react';
import { IToast, TToastType } from '@/interfaces';
import { ToastContext } from './ToastContext';

export const ToastProvider = ({ children }: { children: ReactNode }) => {

  const [toast, setToast] = useState<IToast | null>(null);

  const showToast = ({ type, title, content }: { type: TToastType, title: string, content: string }) => setToast({
    visible: true,
    type,
    title,
    content
  });

  const hideToast = () => setToast(null);

  return (
    <ToastContext.Provider value={ {
      toast,

      // Methods
      showToast,
      hideToast
    } }>
      { children }
    </ToastContext.Provider>
  );
};
