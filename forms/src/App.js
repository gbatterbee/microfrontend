import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor() {
    super()
    this.state = { value: '' };
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <div
          ref="textInput"
          contentEditable="true"
          onKeyDown={e => this.key(e)}
          onMouseUp={e => this.key(e)}
          style={{ backgroundColor: 'yellow', width: 500, height: 500 }}
        />
        <textarea ref="ta"/>
        <button onMouseUp={() => {
          var y = this.refs.ta;
          var t = y.innerText;
          var start=y.selectionStart;
          var end = y.selectionEnd;
          y.value = [y.value.slice(0, end), '*', y.value.slice(end)].join('')
          y.value = [y.value.slice(0, start), '*', y.value.slice(start)].join('')
          console.log(this.refs.ta);
          document.execCommand('bold');
        }}>c</button>
      </div>
    );
  }

  key = (event) => {
    console.log(document.getSelection());
    if (event.keyCode === 9) { // tab was pressed
      event.preventDefault();
    }

    var val = this.state.scriptString,
      start = this.refs.textInput.selectionStart,
      end = event.target.selectionEnd;

    this.setState({ value: event.target.innerText },
      () => {
        console.log(this.refs.textInput.selectionStart);
        this.refs.textInput.selectionStart = this.refs.textInput.selectionEnd = start + 1
      });
  }
}

export default App;


// onKeyDown={e => {
//   if (e.key == "Backspace")
//     this.setState({ value: this.state.value.substring(0, this.state.value.length - 1) });
//   else
//     this.setState({ value: this.state.value + e.key});
// }}