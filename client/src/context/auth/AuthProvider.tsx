'use client';
import { useReducer, useEffect, ReactNode } from 'react';
import Cookies from 'js-cookie';

import { IUser } from '@/interfaces';
import { loginWithCredentials, checkToken, signupWithCredentials } from '@/services';

import { AuthContext } from './AuthContext';
import { authReducer } from './authReducer';
import { useRouter } from 'next/navigation';

export interface AuthState { user: IUser | null }

const AUTH_INITIAL_STATE: AuthState = {
  user: null,
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(authReducer, AUTH_INITIAL_STATE);
  const router = useRouter();

  // Check if token is valid and login user again
  useEffect(() => {
    if (!Cookies.get('token')) return;

    const token = Cookies.get('token') || '';

    checkToken(token)
      .then((user) => {

        dispatch({
          type: '[AUTH] - Login',
          payload: user
        });
      })
      .catch(error => {
        console.log(error);

        Cookies.remove('token');
        dispatch({ type: '[AUTH] - Signout' });
      });
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const user = await loginWithCredentials(email, password);

      if (!user) return null;

      dispatch({
        type: '[AUTH] - Login',
        payload: user
      });

      return user;

    } catch (error) {
      console.log(error);

      return null;
    }
  };

  const signup = async (name: string, email: string, password: string) => {
    const { user, error } = await signupWithCredentials(name, email, password);

    if (error) {
      return { user: null, error: error.toString() };
    };

    dispatch({
      type: '[AUTH] - Login',
      payload: user!
    });
      
    return { user };
  };

  const signout = () => {
    Cookies.remove('token');
    dispatch({ type: '[AUTH] - Signout' });
    router.refresh();
  };


  return (
    <AuthContext.Provider value={ {
      ...state,

      // Methods
      login,
      signup,
      signout,
    } }>
      { children }
    </AuthContext.Provider>
  );
};
