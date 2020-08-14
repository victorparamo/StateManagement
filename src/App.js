import React from 'react';

class App extends React.Component {  
  constructor(props) {
    super(props);
    this.state = { clicks: 0 };
    this.handleClick = this.handleClick.bind(this);
  }
  
  handleClick = () => {
    this.setState({ clicks: this.state.clicks + 1 })
  }
  
  render () {
    return (
      <div>
        {this.state.clicks}
        <button onClick={this.handleClick}>
          Press me
        </button>
      </div>
    )
  }
}

export default App;
