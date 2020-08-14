import React, { useState } from 'react';

const App = () => {  
  const [count, setCount] = useState(0);

  return (
    <div>
      <h1>Functional Component</h1>
      <p>You clicked {count} times</p>
      <button onClick={(actualState) => setCount(actualState + 1)}>
        Click me
      </button>
    </div>
  );
}

export default App;
