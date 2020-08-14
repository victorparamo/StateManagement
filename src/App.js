import React from 'react';

const App = () => {  
  const [clicks, setClicks] = React.useState(0);
  
  const handleClick = () => {
    setClicks((actualState) => actualState + 1);
  }
  
  return (
    <div>
      {clicks}
      <button onClick={handleClick}>
        Press me
      </button>
    </div>
  );
}

export default App;
