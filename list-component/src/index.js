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
        console.log('pub - ' + m);
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

export class TestHarness extends Component {
    constructor() {
        super()
        this.state = { value: '' };
    }

    render() {
        return (<div>
            <textarea value={this.state.value} onChange={e => this.setState({ value: e.target.value })} />
            <button onClick={() => this.props.raiseEvent(this.state.value)}>Send</button>
            <pre>{JSON.stringify(this.props.message)}</pre>
        </div>)
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
                    {React.cloneElement(this.props.children, { message: this.state.message,onSend: (m) => this.client.publish(m) })}
                    <div>
                        <TestHarness raiseEvent={e => this.client.publish(e)} message={this.state.message}/>
                    </div>
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

// function withMessaging(WrappedComponent) {
//     return class extends React.Component {
//         constructor(props) {
//             super(props);
//             this.client = new EventHubClient(message => this.setState(message));
//             this.state = { message: null };
//         }

//         componentWillUnmount() {
//             this.client.unsubscribe();
//         }

//         render() {
//             return <WrappedComponent lastMessage={this.state.message} {...this.props} />;
//         }
//     };
// }

ReactDOM.render(<MessagingProvider><App /></MessagingProvider>, document.getElementById('list-component'));

