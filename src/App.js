import React, { 
  useState,
  createContext,
  useContext,
} from 'react';

const Context = createContext(null);

const Provider = ({ children }) => {
  const [globalState, setGlobalState] = useState(0);

  return (
    <Context.Provider value={{ globalState, setGlobalState }}>
      {children}
    </Context.Provider>
  )
}

const useGlobalState = () => useContext(Context);

const Counter = () => {  
  const { globalState, setGlobalState } = useGlobalState();

  const handleClick = () => {
    setGlobalState((actualState) => actualState + 1);
  }

  return (
    <div style={{ margin: 10 }}>
      <h1>Counter</h1>
      <p>You clicked {globalState} times</p>
      <button onClick={handleClick}>
        Click me
      </button>
    </div>
  );
}

const Led = () => {
  const { globalState } = useGlobalState();

  return (
    <div style={{
      width: 50,
      height: 50,
      backgroundColor: globalState < 5 ? 'red' : 'green',
      borderRadius: '50%',
      margin: 10
    }} />
  )
}

const App = () => (
  <Provider>
    <Counter/>
    <Led />
  </Provider>
)

export default App;
