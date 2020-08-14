import React, { useState } from 'react';

const App = () => {  
  const [count, setCount] = useState(0);

  const handleClick = () => {
    setCount((actualState) => actualState + 1);
  }

  return (
    <div>
      <h1>Functional Component</h1>
      <p>You clicked {count} times</p>
      <button onClick={handleClick}>
        Click me
      </button>
    </div>
  );
}

export default App;
