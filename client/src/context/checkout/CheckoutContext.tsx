'use client';
import { ChangeEvent, Dispatch, FormEvent, KeyboardEvent, SetStateAction, createContext } from 'react';

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
  loading: boolean;

  //Methods
  handleShippingSubmit: (e: FormEvent<HTMLFormElement>) => void;
  handlePaymentSubmit: (e: FormEvent<HTMLFormElement>) => void;
  handlePhoneNumber: Dispatch<SetStateAction<string>>;
  handleCity: Dispatch<SetStateAction<string>>;
  handleLocality: Dispatch<SetStateAction<string>>;
  handleAdress: Dispatch<SetStateAction<string>>;
  handleZip: Dispatch<SetStateAction<string>>;
  handleCardNumberChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleExpirationDateChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleExpirationDateKeyDown: (e: KeyboardEvent<HTMLInputElement>) => void
  handleNameOnCard: Dispatch<SetStateAction<string>>;
  handleCVV: Dispatch<SetStateAction<string>>;
  randomAutoFillShipping: () => void;
  randomAutoFillPayment: () => void;
}

export const CheckoutContext = createContext({} as ContextProps);
