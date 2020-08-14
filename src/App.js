import React from 'react';
class App extends React.Component {  
  constructor(props) {
    super(props);
    this.state = { count: 0 };
    this.handleClick = this.handleClick.bind(this);
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

export default App;
