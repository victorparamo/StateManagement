import React, { useState, useEffect } from 'react';

class ClassCounter extends React.Component {

  constructor(props) {
    super(props);
    this.state = { count: 0 };
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidUpdate() {
    setTimeout(() => {
      console.log(`[Class] You clicked ${this.state.count} times`);
    }, 3000);
  }

  handleClick = () => {
    this.setState({ count: this.state.count + 1 })
  }

  render() {
    return (
      <div>
        <h1>Class Component</h1>
        <p>You clicked {this.state.count} times</p>
        <button onClick={this.handleClick}>
          Click me
        </button>
      </div>
    )
  }

}

function FunctionalCounter() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    setTimeout(() => {
      console.log(`[Functional] You clicked ${count} times`);
    }, 3000);
  });

  return (
    <div>
      <h1>Functional Component</h1>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}

const App = () => {    
  return (
    <div style={{ display: 'flex' }}>
      <FunctionalCounter />
      <ClassCounter />
    </div>
  );
}

export default App;
