import {
  useReducer,
  useContext,
  createContext,
  useState,
  useEffect,
} from 'react';
import Cookies from 'js-cookie';

const StateContext = createContext();
const DispatchStateContext = createContext();
const NotificationContext = createContext({
  activeNotification: null, // { title, message, status }
  showNotification: function (notificationData) {},
  hideNotification: function () {},
});

const initialState = {
  cart: Cookies.get('cart') ? JSON.parse(Cookies.get('cart')) : [],
  user: Cookies.get('user') ? JSON.parse(Cookies.get('user')) : null,
  shipping: Cookies.get('shipping') ? JSON.parse(Cookies.get('shipping')) : {},
  payment: Cookies.get('payment') ? Cookies.get('shipping') : null,
};

const reducer = (state, action) => {
  // console.log('GLOBAL', state);
  switch (action.type) {
    case 'PAYMENT': {
      Cookies.set('payment', action.payload);
      return { ...state, payment: action.payload };
    }
    case 'SHIPPING': {
      Cookies.set('shipping', JSON.stringify(action.payload));
      return { ...state, shipping: action.payload };
    }
    case 'SET_USER':
      // console.log(action.payload);
      Cookies.set('user', JSON.stringify(action.payload));
      return { ...state, user: action.payload };
    case 'REMOVE_USER':
      Cookies.remove('user');
      Cookies.remove('cart');
      Cookies.remove('shipping');
      Cookies.remove('payment');
      return { ...state, cart: [], user: null };
    case 'ADD_ITEM_CART':
      let newCartAdd = state.cart;
      const indexFound = newCartAdd.findIndex(
        (item) => item._id === action.payload._id
      );

      if (indexFound >= 0) {
        if (
          newCartAdd[indexFound].quantity >= newCartAdd[indexFound].countInStock
        ) {
          alert('you reached the maximum stock');
          return { ...state };
        }
        newCartAdd[indexFound].quantity += 1;

        Cookies.set('cart', JSON.stringify(newCartAdd));

        return { ...state, cart: newCartAdd };
      } else {
        action.payload.quantity = 1;

        newCartAdd.push(action.payload);

        Cookies.set('cart', JSON.stringify(newCartAdd));

        return {
          ...state,
          cart: newCartAdd,
        };
      }
    case 'REMOVE_ITEM_CART':
      let newCart2 = state.cart;
      const indexFound2 = newCart2.findIndex(
        (item) => item._id === action.payload._id
      );
      newCart2[indexFound2].quantity -= 1;
      if (Number(state.cart[indexFound2].quantity) === 0) {
        const saveCart = newCart2.filter(
          (item) => item._id !== action.payload._id
        );
        Cookies.set('cart', JSON.stringify(saveCart));
        return {
          ...state,
          cart: saveCart,
        };
      } else {
        Cookies.set('cart', JSON.stringify(newCart2));
        return { ...state, cart: newCart2 };
      }
    case 'CART_REMOVE':
      const newCart3 = state.cart;
      const saveCart3 = newCart3.filter((item) => item._id !== action.payload);
      Cookies.set('cart', JSON.stringify(saveCart3));
      return {
        ...state,
        cart: saveCart3,
      };
    case 'CART_CLEAR':
      Cookies.remove('cart');
      Cookies.remove('shipping');
      Cookies.remove('payment');
      return { ...state, cart: [], shipping: {}, payment: null };
    default:
      throw new Error(`Unknown action: ${action.type}`);
  }
};

export const StateProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [activeNotification, setActiveNotification] = useState(null);

  useEffect(() => {
    if (activeNotification) {
      const timer = setTimeout(() => {
        setActiveNotification(null);
      }, 5000);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [activeNotification]);

  function showNotificationHandler(notificationData) {
    setActiveNotification(notificationData);
  }

  function hideNotificationHandler() {
    setActiveNotification(null);
  }

  const context = {
    activeNotification,
    showNotification: showNotificationHandler,
    hideNotification: hideNotificationHandler,
  };
  return (
    <DispatchStateContext.Provider value={dispatch}>
      <StateContext.Provider value={state}>
        <NotificationContext.Provider value={context}>
          {children}
        </NotificationContext.Provider>
      </StateContext.Provider>
    </DispatchStateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
export const useDispatchStateContext = () => useContext(DispatchStateContext);
export const useNotificationCtx = () => useContext(NotificationContext);
