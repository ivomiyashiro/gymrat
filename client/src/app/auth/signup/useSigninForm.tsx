import { FormEvent, useContext, useState } from 'react';
import { useRouter } from 'next/navigation';
import { AuthContext } from '@/context';

export const useSigninForm = () => {

  const { signup } = useContext(AuthContext);

  const [nameValue, setNameValue] = useState('');
  const [emailValue, setEmailValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let error = '* All fields must be completed.';

    if (nameValue.length === 0) {
      return setError(error);
    }

    if (emailValue.length === 0) {
      return setError(error);
    }

    if (passwordValue.length < 6) {
      return setError('* Password length must be higher than 6');
    }

    setLoading(true);
    const { error: apiError } = await signup(nameValue, emailValue, passwordValue);
    setLoading(false);

    if (apiError) return setError(`* ${apiError.replace(/^Error:\s*/, '')}`);

    setError('');

    router.replace('/');
  };

  return {
    nameValue,
    emailValue,
    passwordValue,
    loading,
    error,
    handleNameValue: setNameValue,
    handleEmailValue: setEmailValue,
    handlePasswordValue: setPasswordValue,
    handleSubmit
  };
};
