'use client';
import { ReactNode, useEffect, useReducer } from 'react';
import Cookies from 'js-cookie';

import { ICartState, IProductCart } from '@/interfaces';

import { CartContext } from './CartContext';
import { cartReducer } from './cartReducer';

const CART_INIT_STATE: ICartState = { 
  cart: [],
  totalProducts: 0,
  orderPrice: 0,
  orderDiscount: 0,
  orderTotalPrice: 0,
};

export const CartProvider = ({ children }: { children: ReactNode }) => {

  const [state, dispatch] = useReducer(cartReducer, CART_INIT_STATE);

  // Load cart products from cookies
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

  // Calculates total products count
  useEffect(() => {
    if (state.cart.length > 0) {
      return dispatch({
        type: '[CART] - UPDATE TOTAL PRODUCTS QUANTITY',
        payload: state.cart.map(product => product.quantity).reduce((accumulator, quantity) => (accumulator + quantity))
      });
    }

    dispatch({
      type: '[CART] - UPDATE TOTAL PRODUCTS QUANTITY',
      payload: 0
    });

  }, [state.cart]);

  // Strigify cart cookies data
  useEffect(() => {
    Cookies.set('CART', JSON.stringify(state.cart));

  }, [state.cart]);

  // Update order summary
  useEffect(() => {
    const orderPrice = state.cart.reduce((accumulator, product) => {
      return accumulator + (product.price * product.quantity);
    }, 0);
    const orderDiscount = state.cart.reduce((accumulator, product) => {
      return accumulator + ((product.discountPrice ? product.discountPrice : 0) * product.quantity);
    }, 0);
    const orderTotalPrice = orderPrice - orderDiscount;

    const orderSummary = {
      orderPrice,
      orderDiscount,
      orderTotalPrice,
    };

    dispatch({ type: '[CART] - UPDATE ORDER SUMMARY', payload: orderSummary });

  }, [state.cart]);

  const addToCart = (product: IProductCart) => {

    const productInCart = state.cart.find(prod => prod.variant._id === product.variant._id);
    
    if (productInCart) {
      return dispatch({ 
        type: '[CART] - UPDATE PRODUCT CART QUANTITY', 
        payload: state.cart.map(prod => {
          if (prod.variant._id !== product.variant._id) return prod;

          return {
            ...prod,
            quantity: prod.quantity + 1
          };
        })
      });
    };

    dispatch({ type: '[CART] - ADD TO CART', payload: product });
  };

  const removeFromCart = (id: string) => (
    dispatch({ 
      type: '[CART] - REMOVE FROM CART', 
      payload: state.cart.filter(product => ( product.variant._id !== id)) 
    })
  );

  const updateProductQuantity = (product: IProductCart) => (
    dispatch({ 
      type: '[CART] - UPDATE PRODUCT CART QUANTITY', 
      payload: state.cart.map(cartProduct => {
        if (cartProduct._id !== product._id) return cartProduct;

        return product;
      }) 
    })
  );

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
