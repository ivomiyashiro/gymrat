import { FormEvent, useContext, useState } from 'react';
import { useRouter } from 'next/navigation';
import { AuthContext } from '@/context';

export const useLoginForm = () => {
  const { login } = useContext(AuthContext);
  const [emailValue, setEmailValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let error = '* Email or password incorrect.';

    if (emailValue.length === 0) {
      return setError(error);
    }

    if (passwordValue.length === 0) {
      return setError(error);
    }

    setLoading(true);
    const user = await login(emailValue, passwordValue);
    setLoading(false);

    if (!user) return setError(error);

    setError('');

    router.replace('/');
  };

  return {
    emailValue,
    passwordValue,
    loading,
    error,
    handleEmailValue: setEmailValue,
    handlePasswordValue: setPasswordValue,
    handleSubmit
  };
};
