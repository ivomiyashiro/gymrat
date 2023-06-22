'use client';
import { ChangeEvent, FormEvent, KeyboardEvent, ReactNode, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

import { purchaseProduct } from '@/services';

import { CheckoutContext } from './';
import { CartContext, AuthContext, ToastContext } from '../';

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

  const [loading, setLoading] = useState(false);

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

    setLoading(true);

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

  const handleCardNumberChange = (e: ChangeEvent<HTMLInputElement>) => {
    const MAX_CARD_NUMBER_LENGTH = 19;
    const value = e.target.value;

    const cardNumber = value.replace(/\D/g, '');

    const formattedCardNumber = cardNumber.replace(/(\d{4})/g, '$1 ').trim();

    const truncatedCardNumber = formattedCardNumber.slice(0, MAX_CARD_NUMBER_LENGTH);

    setCardNumber(truncatedCardNumber);
  };

  const handleExpirationDateChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    const expirationDate = value.replace(/\D/g, '');

    let formattedExpirationDate = '';

    if (expirationDate.length <= 4) {
      // Add character "/" after first 2 digits
      formattedExpirationDate = `${expirationDate.slice(0, 2)}/${expirationDate.slice(2, 4)}`;
    } else {
      formattedExpirationDate = expirationDate.slice(0, 4);
    }
    setExpDate(formattedExpirationDate);
  };

  const handleExpirationDateKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace') {
      setExpDate(expDate.slice(0, -1));
    }
  };

  const randomAutoFillShipping = () => {
    const CITIES = ['Nueva York', 'Londres', 'París', 'Tokio', 'Sídney', 'Roma'];
    const LOCALITIES_BY_CITY: any = {
      'Nueva York': ['Manhattan', 'Brooklyn', 'Queens', 'Bronx', 'Staten Island'],
      'Londres': ['Westminster', 'Camden', 'Greenwich', 'Islington', 'Kensington'],
      'París': ['Le Marais', 'Montmartre', 'Saint-Germain-des-Prés', 'Champs-Élysées', 'Le Quartier Latin'],
      'Tokio': ['Shinjuku', 'Shibuya', 'Ginza', 'Akihabara', 'Asakusa'],
      'Sídney': ['Sydney CBD', 'Surry Hills', 'Bondi Beach', 'Manly', 'Darlinghurst'],
      'Roma': ['Trastevere', 'Monti', 'Testaccio', 'Esquilino', 'Prati'],
    };
    const ZIP_CODES = [
      'C1000', 'C1038', 'C1049', 'C1063', 'C1080', 'C1100', 'C1122', 'C1136',
      'C1150', 'C1170', 'C1181', 'C1202', 'C1217', 'C1232', 'C1253', 'C1260',
      'C1282', 'C1290', 'C1306', 'C1328', 'C1345'
    ];

    let selectedCity = '';

    setCity(() => {
      const randomIndex = Math.floor(Math.random() * CITIES.length);
      const city = CITIES[randomIndex];

      selectedCity = city;
      
      return city;
    });

    setLocality(() => {
      const localities = LOCALITIES_BY_CITY[selectedCity];

      const randomLocalityIndex = Math.floor(Math.random() * localities.length);
      const locality = localities[randomLocalityIndex];
      return locality;
    });

    setAddress(() => {
      const randomNumb = Math.floor(Math.random() * 10000);
      return `Random address ${ randomNumb.toString() }`;
    });

    setZip(() => {
      const codigoPostal = ZIP_CODES[Math.floor(Math.random() * ZIP_CODES.length)];
      return codigoPostal;
    });

    setPhoneNumber(() => {
      let number = '+54 11 ';
  
      const phoneNumb = Math.floor(Math.random() * (99999999 - 10000000 + 1)) + 10000000;
      number += phoneNumb.toString().replace(/(\d{4})(\d{4})/, '$1 $2');
      
      return number;
    });
  };

  const randomAutoFillPayment = () => {
    setCardNumber(() => {
      let numero = '';
      for (let i = 0; i < 16; i++) {
        numero += Math.floor(Math.random() * 10);

        if ((i + 1) % 4 === 0 && i !== 18) {
          numero += ' ';
        }
      }

      return numero.trim();
    });

    setNameOnCard(() => {
      const nombres = ['Juan', 'María', 'Pedro', 'Ana', 'Luis', 'Laura', 'Carlos', 'Marta', 'José', 'Sofía'];
      const apellidos = ['González', 'Rodríguez', 'López', 'Martínez', 'Pérez', 'García', 'Fernández', 'Sánchez', 'Romero', 'Torres'];
      
      const nombre = nombres[Math.floor(Math.random() * nombres.length)];
      const apellido = apellidos[Math.floor(Math.random() * apellidos.length)];
      
      return `${nombre.toUpperCase()} ${apellido.toUpperCase()}`;
    });

    setExpDate(() => {
      const fecha = new Date();
      const currentYear = fecha.getFullYear();
      const currentMonth = fecha.getMonth() + 1;
    
      const randomYear = Math.floor(Math.random() * 6) + currentYear;
    
      let randomMonth;
      if (randomYear === currentYear) {
        randomMonth = Math.floor(Math.random() * (12 - currentMonth + 1)) + currentMonth;
      } else {
        randomMonth = Math.floor(Math.random() * 12) + 1;
      }
    
      const year = ('0' + (randomYear % 100)).slice(-2);
      const month = ('0' + randomMonth).slice(-2);
    
      return month + '/' + year;
    });

    setCVV(() => {
      return (Math.floor(Math.random() * 900) + 100).toString();
    });
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
      loading,

      // Methods
      handleShippingSubmit,
      handlePaymentSubmit,
      handlePhoneNumber: setPhoneNumber,
      handleCity: setCity,
      handleLocality: setLocality,
      handleAdress: setAddress,
      handleZip: setZip,
      handleNameOnCard: setNameOnCard,
      handleCVV: setCVV,
      handleCardNumberChange,
      handleExpirationDateChange,
      handleExpirationDateKeyDown,
      randomAutoFillShipping,
      randomAutoFillPayment
    } }>
      { children }
    </CheckoutContext.Provider>
  );
};
