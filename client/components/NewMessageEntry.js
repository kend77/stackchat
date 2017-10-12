import React, { Component } from 'react';
import axios from 'axios';
import store, {writeMessage, gotNewMessageFromServer, postMessage} from '../store';
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
    console.log('name is here', this.state.name)
    event.preventDefault();
    store.dispatch(postMessage(this.props.channelId, this.state.newMessageEntry, this.state.name))
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
