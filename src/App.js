import React, { useState } from 'react';

// class App extends React.Component {  
//   constructor(props) {
//     super(props);
//     this.state = { count: 0 };
//     this.handleClick = this.handleClick.bind(this);
//   }

//   handleClick = () => {
//     this.setState({ count: this.state.count + 1 })
//   }

//   render() {
//     return (
//       <div>
//         <h1>Class Component</h1>
//         <p>You clicked {this.state.count} times</p>
//         <button onClick={this.handleClick}>
//           Click me
//         </button>
//       </div>
//     )
//   }
// }

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
