import { AuthState } from './';
import { IUser } from '@/interfaces';

type AuthActionType = 
   | { type: '[AUTH] - Login', payload: IUser }
   | { type: '[AUTH] - Signout' }

export const authReducer = ( state: AuthState, action: AuthActionType ): AuthState => {

  switch (action.type) {

  case '[AUTH] - Login':
    return {
      ...state,
      user: action.payload
    };

  case '[AUTH] - Signout':
    return {
      ...state,
      user: null,
    };

  default:
    return state;
  }
};
