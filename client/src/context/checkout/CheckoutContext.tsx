'use client';
import { Dispatch, FormEvent, SetStateAction, createContext } from 'react';

interface ContextProps {
  shippingInfo: {
    city: string;
    locality: string;
    address: string;
    zip: string;
    phoneNumber: string;
  };
  paymentError: string;
  shippingError: string;
  validForm: boolean;
  payment: {
    cartNumber: string,
    nameOnCard: string,
    expDate: string,
    cvv: string,
  },

  //Methods
  handleShippingSubmit: (e: FormEvent<HTMLFormElement>) => void;
  handlePaymentSubmit: (e: FormEvent<HTMLFormElement>) => void;
  handlePhoneNumber: Dispatch<SetStateAction<string>>;
  handleCity: Dispatch<SetStateAction<string>>;
  handleLocality: Dispatch<SetStateAction<string>>;
  handleAdress: Dispatch<SetStateAction<string>>;
  handleZip: Dispatch<SetStateAction<string>>;
  handleCardNumber: Dispatch<SetStateAction<string>>;
  handleNameOnCard: Dispatch<SetStateAction<string>>;
  handleExpDate: Dispatch<SetStateAction<string>>;
  handleCVV: Dispatch<SetStateAction<string>>;
}

export const CheckoutContext = createContext({} as ContextProps);
