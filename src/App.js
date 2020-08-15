import React, { 
  useState,
  useEffect,
  createContext,
  useContext,
  useReducer,
} from 'react';
import GoogleAuth from './Auth';

const initialState = {
  counter: 0,
  loading: true,
  user: null,
  loggedIn: false,
  error: false,
};

// ------TYPES------

const ADD_COUNTER = 'ADD_COUNTER';
const LOGIN_SUCCESSFUL = 'LOGIN_SUCCESSFUL';
const NOT_LOGGED_IN = 'NOT_LOGGED_IN';
const SET_ERROR = 'SET_ERROR';
const SET_LOADING = 'SET_LOADING';

// -----ACTIONS--------

const actionCreator = (type) => (payload) => ({ type, payload })

const addCounter = actionCreator(ADD_COUNTER);
const loginSuccessful = actionCreator(LOGIN_SUCCESSFUL);
const notLoggedIn = actionCreator(NOT_LOGGED_IN);
const setError = actionCreator(SET_ERROR); 
const setLoading = actionCreator(SET_LOADING); 

function reducer(state, { type, payload }) {
  switch (type) {
    case ADD_COUNTER:
      return {
        ...state,
        counter: state.counter + 1  
      }
    case LOGIN_SUCCESSFUL:
      return {
        ...state, 
        user: payload,
        loading: false,
        loggedIn: true,
      };
    case NOT_LOGGED_IN:
      return {
        ...state,
        loading: false,
        loggedIn: false,
        user: null,
      };
    case SET_ERROR:
      return { 
        ...state,
        error: payload,
        loading: false
      };
    case SET_LOADING:
      return { 
        ...state,
        loading: true 
      };
    default:
      return state;
  }
}

const Context = createContext(null);

const useAuth = () => {
  const [auth, setAuth] = useState();

  const [,dispatch] = useGlobalState();

  useEffect(() => {
    async function initGoogle() {
      try {
        await window.gapi.auth2.init({ client_id: process.env.REACT_APP_CLIENT_ID });
        await window.gapi.client.setApiKey(process.env.REACT_APP_API_KEY);

        const auth = new GoogleAuth(window.gapi);
        const currentUser = auth?.getCurrentUser()?.getBasicProfile();
        let action;
        if (currentUser) {
          action = loginSuccessful(currentUser);
        } else {
          action = notLoggedIn();
        }
        dispatch(action);

        auth.onAuthChange((signStatus, user) => {
          if (signStatus) {
            dispatch(loginSuccessful(user));
          } else {
            dispatch(action = notLoggedIn());
          }
        });
        setAuth(auth);
      } catch (e) {
        console.log('-->', e);
      }
    }
    console.log('hola')

    window.gapi.load('client:auth2', initGoogle);
  }, [dispatch]);

  const login = () => {
    const action = setLoading();
    dispatch(action);
    auth.signIn();
  };

  const logout = () => {
    const action = setLoading();
    dispatch(action);
    auth.signOut();
  };

  return {
    login,
    logout,
  }
}

const Auth = () => {
  const { login, logout } = useAuth();
  const [{ loggedIn}] = useGlobalState();

  return loggedIn ? (
    <button style={{ margin: 10 }} onClick={logout}>Logout</button>
  ) : (
    <button style={{ margin: 10 }} onClick={login}>Login</button>
  );
}

const Provider = ({ children }) => {
  const [globalState, dispatch] = useReducer(reducer, initialState);

  return (
    <Context.Provider value={[globalState, dispatch]}>
      {children}
    </Context.Provider>
  )
}

const useGlobalState = () => useContext(Context);

const Counter = () => {  
  const [ { counter }, dispatch ] = useGlobalState();

  const handleClick = () => {
    const action = addCounter();
    dispatch(action);
  }

  return (
    <div style={{ margin: 10 }}>
      <h1>Counter</h1>
      <p>You clicked {counter} times</p>
      <button onClick={handleClick}>
        Click me
      </button>
    </div>
  );
}

const Led = () => {
  const [ { counter } ] = useGlobalState();

  return (
    <div style={{
      width: 50,
      height: 50,
      backgroundColor: counter < 5 ? 'red' : 'green',
      borderRadius: '50%',
      margin: 10
    }} />
  )
}

const App = () => (
  <Provider>
    <Counter/>
    <Led />
    <Auth />
  </Provider>
)

export default App;
