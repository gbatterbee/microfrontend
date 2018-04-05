import React, { Component } from 'react';

class App extends Component {

  publish = (value) => {
    this.props.onSend({ type: 'navigate', value })
  }

  render() {
    return (
      <div className="nav-component">
        <ul style={{ listStyle: "none", padding: 0, margin: 0, cursor: "pointer" }}>
          <li onClick={() => this.publish('single-component')}>Single</li>
          <li onClick={() => this.publish('list-content-layout')}>List-Content</li>
        </ul>
      </div>
    );
  }
}

export default App;