import React, { Component } from 'react';
import logo from './logo.svg';
import './list-component.css';

class App extends Component {
  constructor() {
    super();
    this.state = { items: [] }
  }
  componentDidMount = () => this.setState({
    items: [{ id: 1, value: 'first element' }
      , { id: 2, value: 'second element' },
    { id: 3, value: 'third element' },
    { id: 4, value: 'fourth element' }]
  });
  //{"type":"list-component-selected","value":3}
  // componentWillReceiveProps(props) {
  //   if (props.message.type === 'list-component-selected')
  //   //this.setState({ items: [...this.state.items, { id: this.state.items.length, value: props.message}]})
  // }
  publish = (value) => {
    this.props.onSend({ type: 'list-component-selected', value })
  }
  render() {
    return (
      <div className="App">
        <img src={logo} className="App-logo" alt="logo" style={{ height: 30, width: 30 }} />
        <p>This is a list component. You can probably click on something, but it won't do a lot unless, you've loaded the content component</p>
        <ul>
          {this.state.items.map(i =>
            <li key={i.id} >
              <a href="#" onClick={() => this.publish(i.id)}>{i.value}</a>
            </li>)}
        </ul>
      </div>
    );


  }
}

export default App;