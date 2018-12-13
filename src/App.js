import React, { Component } from 'react';
import './resource/styles/index.css'
import './resource/styles/reset.css'

class App extends Component {
  render() {
    return (
      <div className="l-container clearfix">
        {this.props.children}
      </div>
    );
  }
}

export default App;
