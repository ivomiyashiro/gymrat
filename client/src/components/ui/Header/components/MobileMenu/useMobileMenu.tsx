import { useEffect, useRef } from 'react';

export const useMobileMenu = ({ open }: { open: boolean }) => {

  const mobileMenuRef = useRef<HTMLDivElement>(null);
  
  const handleTransitionEnd = () => {
    setTimeout(() => {
      if (mobileMenuRef.current) {
        mobileMenuRef.current.style.opacity = '100';
      }
    });
  };

  useEffect(() => {
    if (!open && mobileMenuRef.current) {
      mobileMenuRef.current.style.opacity = '0';
      mobileMenuRef.current.style.pointerEvents = 'none';

    } else if (open && mobileMenuRef.current) {
      mobileMenuRef.current.style.width = '100%';
      mobileMenuRef.current.style.pointerEvents = 'all';

    }

    const timeout = setTimeout(() => {
      if (!open && mobileMenuRef.current) {
        mobileMenuRef.current.style.width = '0';
      }

    }, 700);

    return () => clearTimeout(timeout);

  }, [open]);

  return {
    mobileMenuRef,
    handleTransitionEnd,
  };
};
