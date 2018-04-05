import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

class EventHubClient {

    constructor(callback) {
        this.onReceive = callback;

        if (window.EventHub) {
            window.EventHub.subscribe(this);
        }
    }

    onReceive = (m) => console.log('rec base - ' + m);

    publish = (m) => {
        console.log('pub - ' + JSON.stringify(m));
        if (window.EventHub) {
            window.EventHub.publish(m);
        }
    };
    unsubscribe = () => {
        if (window.EventHub) {
            window.EventHub.unsubscribe(this);
        }
    }
}

export default class MessagingProvider extends Component {
    constructor() {
        super();
        this.client = new EventHubClient(m => this.receive(m));
        this.state = { message: null };
    }

    componentWillUnmount() {
        this.client.unsubscribe();
    }

    receive(message) {
        console.log('rec - ' + message);
        this.setState({ message });
    };

    render() {
        if (window.EventHub) {
            return (
                <div>
                    {
                        React.cloneElement(this.props.children, { message: this.state.message, onSend: (m) => this.client.publish(m) })
                    }
                </div>
            );
        }
        else {
            return (
                React.cloneElement(this.props.children, {
                    message: this.state.message,
                    onSend: (m) => this.client.publish(m)
                })
            );
        }
    }
}

ReactDOM.render(<MessagingProvider><App /></MessagingProvider>, document.getElementById('nav-component'));