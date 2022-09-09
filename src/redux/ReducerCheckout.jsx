import {
  AUTH_FAIL,
  AUTH_START,
  AUTH_SUCCESS,
  LOGOUT_FAIL,
  LOGOUT_START,
  LOGOUT_SUCCESS,
  ADD_ITEM,
  REMOVE_ITEM,
  DELETE_ITEM,
  DELETE_ALL,
  TOGGLE_CART,
  TAKE_NAME,
  TAKE_UID,
} from './action';
const initialState = {
  isLoading: false,
  isLoggedIn: false,
  currentUser: JSON.parse(localStorage.getItem('currentUser')) || null,
  error: null,
  cartAr: JSON.parse(localStorage.getItem('cart')) || [],
  totalQuantity: JSON.parse(localStorage.getItem('totalQuantity')) || 0,
  totalAmount: JSON.parse(localStorage.getItem('totalAmount')) || 0,
  cartIsVisible: false,
  takeName: JSON.parse(localStorage.getItem('name')) || null,
  takeUid: JSON.parse(localStorage.getItem('uid')) || null,
};

const ReducerCheckout = (state = initialState, { type, payload }) => {
  switch (type) {
    case AUTH_START:
    case LOGOUT_START:
      return {
        ...state,
        isLoading: true,
      };
    case AUTH_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isLoggedIn: true,
        currentUser: payload,
      };
    case AUTH_FAIL:
      return {
        ...state,
        isLoggedIn: false,
        currentUser: null,
        isLoading: false,
        error: payload,
      };
    case LOGOUT_SUCCESS:
      return {
        ...initialState,
        currentUser: payload,
      };
    case LOGOUT_FAIL: {
      return {
        ...state,
        isLoading: false,
        error: payload,
      };
    }
    case ADD_ITEM: {
      const newItem = payload;
      console.log('stock', newItem.stock);
      const existingItem = state.cartAr.find((item) => item.id === newItem.id);
      state.totalQuantity++;
      if (!existingItem) {
        state.cartAr.push({
          idUser:newItem.idUser,
          id: newItem.id,
          title: newItem.title,
          img: newItem.img,
          price: newItem.price,
          quantity: 1,
          totalPrice: Number(newItem.price),
          stock:newItem.stock
        });
        state.totalAmount = state.cartAr.reduce(
          (total, item) => total + Number(item.price) * Number(item.quantity),
          0
        );
        return {
          ...state,
          totalQuantity: state.totalQuantity,
          totalAmount: state.totalAmount,
          cartAr: [...state.cartAr],
        };
      } else {
        existingItem.quantity++;
        existingItem.totalPrice = Number(existingItem.totalPrice) + Number(newItem.price);
      }
      state.totalAmount = state.cartAr.reduce(
        (total, item) => total + Number(item.price) * Number(item.quantity),
        0
      );
      return {
        ...state,
        totalQuantity: state.totalQuantity,
        totalAmount: state.totalAmount,
        cartAr: [...state.cartAr],
      };
    }

    case REMOVE_ITEM: {
      const id = payload;
      const existingItem = state.cartAr.find((item) => item.id === id);
      state.totalQuantity--;
      if (existingItem.quantity === 1) {
        state.cartAr = state.cartAr.filter((item) => item.id !== id);
        state.totalAmount = 0;
        return {
          ...state,
          totalQuantity: state.totalQuantity,
          totalAmount: state.totalAmount,
          cartAr: [...state.cartAr],
        };
      } else {
        existingItem.quantity--;
        existingItem.totalPrice = Number(existingItem.totalPrice) - Number(existingItem.price);
      }

      state.totalAmount = state.cartAr.reduce(
        (total, item) => total + Number(item.price) * Number(item.quantity),
        0
      );
      return {
        ...state,
        totalQuantity: state.totalQuantity,
        totalAmount: state.totalAmount,
        cartAr: [...state.cartAr],
      };
    }

    case DELETE_ITEM: {
      const id = payload;
      const existingItem = state.cartAr.find((item) => item.id === id);
      if (existingItem) {
        state.cartAr = state.cartAr.filter((item) => item.id !== id);
        state.totalQuantity = state.totalQuantity - existingItem.quantity;
      }

      state.totalAmount = state.cartAr.reduce(
        (total, item) => total + Number(item.price) * Number(item.quantity),
        0
      );
      return {
        ...state,
        totalAmount: state.totalAmount,
        totalQuantity: state.totalQuantity,
        cartAr: [...state.cartAr],
      };
    }
    case DELETE_ALL: {
      return {
        ...state,
        cartAr: [],
        totalQuantity: 0,
        totalAmount: 0,
      };
    }
    case TOGGLE_CART: {
      return {
        ...state,
        cartIsVisible: !state.cartIsVisible,
      };
    }
    case TAKE_NAME: {
      return {
        ...state,
        takeName: payload,
      };
    }
    case TAKE_UID: {
      return {
        ...state,
        takeUid: payload,
      };
    }
    default:
      return state;
  }
};

export default ReducerCheckout;
