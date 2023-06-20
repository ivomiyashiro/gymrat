'use client';
import { createContext } from 'react';
import { IUser } from '@/interfaces';

interface ContextProps {
    user: IUser | null;
    login: (email: string, password: string) => Promise<IUser | null>;
    signup: (name: string, email: string, password: string) => Promise<{
        user: IUser | null;
        error?: string;
    } | {
        user: null;
        error: string;
    }>
    signout: () => void;
}

export const AuthContext = createContext({} as ContextProps );
