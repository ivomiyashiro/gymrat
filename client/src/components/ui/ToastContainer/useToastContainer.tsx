import { useContext, useEffect, useState } from 'react';
import { ToastContext } from '@/context/toast';

export const useToastContainer = () => {

  const { toast, hideToast } = useContext(ToastContext);
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (toast) {
      setShow(true);

      const timeout = setTimeout(() => {
        setShow(false);
        setTimeout(hideToast, 300);
      }, 3000);

      return () => {
        clearTimeout(timeout);
      };
    }
  }, [toast, hideToast]);

  const handleCloseToast = () => {
    setShow(false);
    setTimeout(hideToast, 300);
  };

  return {
    toast,
    show,
    handleCloseToast
  };
};
