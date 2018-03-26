import React, { Component } from 'react';
import logo from './logo.svg';
import './content-component.css';


const items = [
  { id: 1, value: 'first element', secondValue: "this is the first element", detail: "this is detail 1" },
  { id: 2, value: 'second element', secondValue: "this is the second element", detail: "this is detail 2" } ,
  { id: 3, value: 'third element', secondValue: "this is the third element", detail: "this is detail 3" } ,
  { id: 4, value: 'fourth element', secondValue: "this is the fourth element", detail: "sthis is detail 4" } ,
]

class App extends Component {
  constructor() {
    super();
    this.state = { item: null }
  }
  // componentDidMount = () =>
  //   this.setState({ item: { id: 1, value: 'first element', secondValue: "some other bit of info", detail: "some detail" } });

  componentWillReceiveProps = (props) => {
    if (props.message.type === 'list-component-selected') {
      this.setState({item:items.filter(i => i.id === props.message.value)[0]});
    }
  }

  // componentWillReceiveProps(props) {
  //   if (props.message.type === 'list-component-selected')
  //   //this.setState({ items: [...this.state.items, { id: this.state.items.length, value: props.message}]})
  // }
  render() {
    return (
      <div className="App">
        <img src={logo} className="App-logo" alt="logo" style={{ height: 30, width: 30 }} />
        {this.state.item ? <p>You've selected something</p> : <p>You probably need to choose something from the list - if it exists</p>}
        <Item item={this.state.item} />

      </div>
    );
  }
}

const Item = ({ item }) => item ? (
  <div style={{ border: "1px solid black" }}>
    <p>{item.id}</p>
    <p>{item.secondValue}</p>
    <p>{item.detail}</p>
  </div>) : null
export default App;
