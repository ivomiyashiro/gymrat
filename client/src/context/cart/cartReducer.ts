import { IProductCart, ICartState } from '@/interfaces';

type CartActionType =
  | { type: '[CART] - LOAD FROM COOKIES', payload: IProductCart[] }
  | { type: '[CART] - ADD TO CART', payload: IProductCart }
  | { type: '[CART] - REMOVE FROM CART', payload: IProductCart[] }
  | { type: '[CART] - UPDATE PRODUCT CART QUANTITY', payload: IProductCart[] }
  | { 
      type: '[CART] - UPDATE ORDER SUMMARY',
      payload: {
        orderPrice: number;
        orderDiscount: number;
        orderTotalPrice: number;
      }
    }
  | { type: '[CART] - RESET CART' }
;

export const cartReducer = (state: ICartState, action: CartActionType): ICartState => {

  switch (action.type) {

  case '[CART] - LOAD FROM COOKIES':
    return {
      ...state,
      cart: action.payload
    };

  case '[CART] - ADD TO CART':
    return {
      ...state,
      cart: [
        ...state.cart,
        action.payload
      ]
    };
  
  case '[CART] - REMOVE FROM CART':
    return {
      ...state,
      cart: action.payload
    };

  case '[CART] - UPDATE PRODUCT CART QUANTITY':
    return {
      ...state,
      cart: action.payload
    };
  
  case '[CART] - UPDATE ORDER SUMMARY':
    return {
      ...state,
      ...action.payload
    };
  
  case '[CART] - RESET CART':
    return {
      cart: [],
      orderPrice: 0,
      orderDiscount: 0,
      orderTotalPrice: 0,
    };

  default:
    return state;
  }
};
