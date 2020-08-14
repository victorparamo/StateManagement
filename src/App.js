import React from 'react';

class App extends React.Component {  
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick = () => {
    
  }

  render() {
    return (
      <div>
        <h1>Class Component</h1>
        <p>You clicked 0 times</p>
        <button onClick={this.handleClick}>
          Click me
        </button>
      </div>
    )
  }
}

export default App;
