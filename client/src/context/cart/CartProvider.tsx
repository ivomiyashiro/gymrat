'use client';
import { ReactNode, useEffect, useReducer } from 'react';
import Cookies from 'js-cookie';

import { ICartState, IProductCart } from '@/interfaces';

import { cartReducer } from './cartReducer';
import { CartContext } from './CartContext';

const CART_INIT_STATE: ICartState = { 
  cart: [],
  orderPrice: 0,
  orderDiscount: 0,
  orderTotalPrice: 0,
};

export const CartProvider = ({ children }: { children: ReactNode }) => {

  const [state, dispatch] = useReducer(cartReducer, CART_INIT_STATE);

  useEffect(() => {
    try {
      const cookieProduct = Cookies.get('CART') ? JSON.parse(Cookies.get('CART')!) : [];
      dispatch({
        type: '[CART] - LOAD FROM COOKIES', 
        payload: cookieProduct
      });

    } catch (error) {
      dispatch({ 
        type: '[CART] - LOAD FROM COOKIES', 
        payload: []
      });
    }

  },[]);

  useEffect(() => {
    Cookies.set('CART', JSON.stringify(state.cart));

  }, [state.cart]);

  useEffect(() => {
    const orderPrice = state.cart.reduce((prev: number, { price, quantity }: IProductCart) => (price * quantity) + prev, 0);
    const orderDiscount = state.cart.reduce((prev: number, { price, discountPrice, quantity }: IProductCart) => ((price - (discountPrice ? discountPrice : 0)) * quantity) + prev, 0);
    const orderTotalPrice = state.cart.reduce((prev: number, { discountPrice, quantity }: IProductCart) => ((discountPrice ? discountPrice : 1) * quantity) + prev, 0);

    const orderSummary = {
      orderPrice,
      orderDiscount,
      orderTotalPrice,
    };

    dispatch({ type: '[CART] - UPDATE ORDER SUMMARY', payload: orderSummary });

  }, [state.cart]);

  const addToCart = (product: IProductCart) => {
    let productToAdd = product;
    let isInCart = false;

    state.cart.map((cartProduct: IProductCart) => {
      if (cartProduct._id === product._id) {
        isInCart = true;
        productToAdd = {
          ...product,
          quantity: cartProduct.quantity + 1
        };
      }
    });

    if (isInCart) {
      const newCartArr = state.cart.map((cartProduct: IProductCart)  => {
        if (cartProduct._id !== product._id) return cartProduct;
  
        return productToAdd;
      });
      dispatch({ type: '[CART] - UPDATE PRODUCT CART QUANTITY', payload: newCartArr });

    } else {
      dispatch({ type: '[CART] - ADD TO CART', payload: productToAdd });

    }
    
  };

  const removeFromCart = (id: string) => {
    const newCartArr = state.cart.filter((product: IProductCart) => {
      if (product._id !== id) return product;
    });

    dispatch({ type: '[CART] - REMOVE FROM CART', payload: newCartArr });
  };

  const updateProductQuantity = (product: IProductCart) => {
    const newCartArr = state.cart.map((cartProduct: IProductCart) => {
      if (cartProduct._id !== product._id) return cartProduct;

      return product;
    });

    dispatch({ type: '[CART] - UPDATE PRODUCT CART QUANTITY', payload: newCartArr });
  };

  const resetCart = () => dispatch({ type: '[CART] - RESET CART' });

  return (
    <CartContext.Provider value={ {
      ...state,

      // Methods
      addToCart,
      removeFromCart,
      updateProductQuantity,
      resetCart
    } }>
      { children }
    </CartContext.Provider>
  );
};
