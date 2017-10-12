import React, { Component } from 'react';
import axios from 'axios';
import store, {writeMessage, gotNewMessageFromServer} from '../store';
import socket from '../socket';

export default class NewMessageEntry extends Component {
  constructor(props) {
    super(props);
    this.state = store.getState();
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.unsubscribe = store.subscribe(() => this.setState(store.getState()));
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  handleChange(event) {
    const action = writeMessage(event.target.value);
    store.dispatch(action);
  }

  handleSubmit(event) {
    // console.log(this.props.channelId)
    event.preventDefault();
    axios.post('/api/messages', {
      channelId: this.props.channelId,
      content: this.state.newMessageEntry
    })
    .then(res => res.data)
    .then(message => {
      store.dispatch(gotNewMessageFromServer(message));
      socket.emit('new-message', message);
    })
    store.dispatch(writeMessage(""));
  }

  render () {

    return (
      <form onSubmit={this.handleSubmit} id="new-message-form">
        <div className="input-group input-group-lg">
          <input
            className="form-control"
            type="text"
            name="content"
            placeholder="Say something nice..."
            value={this.state.newMessageEntry}
            onChange={this.handleChange}
          />
          <span className="input-group-btn">
            <button className="btn btn-default" type="submit">Chat!</button>
          </span>
        </div>
      </form>
    );
  }
}
