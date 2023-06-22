'use client';
import { FormEvent, ReactNode, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { CheckoutContext } from './CheckoutContext';
import { purchaseProduct } from '@/services';
import { CartContext } from '../cart';
import { AuthContext } from '../auth';
import Cookies from 'js-cookie';
import { ToastContext } from '../toast';

export const CheckoutProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useContext(AuthContext);
  const { cart, orderTotalPrice } = useContext(CartContext);
  const { showToast } = useContext(ToastContext);

  const [paymentError, setPaymentError] = useState('');
  const [shippingError, setShippingError] = useState('');
  const [validForm, setValidForm] = useState(false);

  const [city, setCity] = useState('');
  const [locality, setLocality] = useState('');
  const [address, setAddress] = useState('');
  const [zip, setZip] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const [cartNumber, setCardNumber] = useState('');
  const [nameOnCard, setNameOnCard] = useState('');
  const [expDate, setExpDate] = useState('');
  const [cvv, setCVV] = useState('');

  const router = useRouter();

  useEffect(() => {
    if (shippingError) {
      return setValidForm(false);
    }

    if (phoneNumber.length === 0 || city.length === 0 || locality.length === 0 || address.length === 0 || zip.length === 0) {
      return setValidForm(false);
    }

    setValidForm(true);

  }, [phoneNumber, city, locality, address, zip, shippingError]);

  const handleShippingSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (phoneNumber.length === 0 || city.length === 0 || locality.length === 0 || address.length === 0 || zip.length === 0) {
      return setShippingError('* All fields must be completed');
    }

    setShippingError('');
    router.push('/cart/checkout?step=2');
  };

  const handlePaymentSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (cartNumber.length === 0 || nameOnCard.length === 0 || expDate.length === 0 || cvv.length === 0) {
      return setPaymentError('* All fields must be completed');
    }

    if (phoneNumber.length === 0 || city.length === 0 || locality.length === 0 || address.length === 0 || zip.length === 0) {
      router.push('/cart/checkout?step=1');
      return setShippingError('* All fields must be completed');
    }
    const items = cart.map(cartItem => ({
      product: cartItem._id,
      variant: cartItem.variant._id,
      price: cartItem.price,
      quantity: cartItem.quantity
    }));

    const customerInfo = {
      customer: user!._id,
      phoneNumber
    };

    const shippingInfo = {
      city,
      locality,
      address,
      zip
    };

    const order = await purchaseProduct(items, orderTotalPrice, customerInfo, shippingInfo);

    if (order) {
      Cookies.set('CART', '[]');
      showToast({ 
        type: 'SUCCESS',
        title: 'THANK YOU FOR YOUR PURCHASE',
        content: 'You will be redirected to the orders page.' 
      });
      router.push('/orders');
    }
  };

  return (
    <CheckoutContext.Provider value={ {
      shippingInfo: {
        city,
        locality,
        address,
        zip,
        phoneNumber,
      },
      payment: {
        cartNumber,
        nameOnCard,
        expDate,
        cvv,
      },
      validForm,
      paymentError,
      shippingError,

      // Methods
      handleShippingSubmit,
      handlePaymentSubmit,
      handlePhoneNumber: setPhoneNumber,
      handleCity: setCity,
      handleLocality: setLocality,
      handleAdress: setAddress,
      handleZip: setZip,
      handleCardNumber: setCardNumber,
      handleNameOnCard: setNameOnCard,
      handleExpDate: setExpDate,
      handleCVV: setCVV,
    } }>
      { children }
    </CheckoutContext.Provider>
  );
};
