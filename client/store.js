import {createStore, applyMiddleware} from 'redux';
import loggerMiddleware from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import axios from 'axios';
import socket from './socket'


const initialState = {
  messages: [],
  newMessageEntry: '',
  name: ''
}

const GOT_MESSAGES_FROM_SERVER = 'GOT_MESSAGES_FROM_SERVER';
const GOT_NEW_MESSAGE_FROM_SERVER = 'GOT_NEW_MESSAGE_FROM_SERVER';
const WRITE_MESSAGE = 'WRITE_MESSAGE';
const WRITE_NAME = 'WRITE_NAME';


export const gotMessagesFromServer = (messages) => (
  {type: GOT_MESSAGES_FROM_SERVER,
    messages: messages}
  );

export const writeMessage = (inputContent) => (
  {type: WRITE_MESSAGE,
  newMessageEntry: inputContent}
)

export const gotNewMessageFromServer = (message) => (
  {type: GOT_NEW_MESSAGE_FROM_SERVER,
  message: message}
)

export const writeName = (newName) => (
  {type: WRITE_NAME,
  name: newName}
)

function reducer (prevState = initialState, action) {
  const newState = Object.assign({}, prevState)
  const {messages, newMessageEntry, message, name} = action
  switch(action.type) {
    case GOT_MESSAGES_FROM_SERVER:
      newState.messages = messages;
      return newState;
    case WRITE_MESSAGE:
      newState.newMessageEntry = newMessageEntry;
      return newState;
    case GOT_NEW_MESSAGE_FROM_SERVER:
      newState.messages = newState.messages.concat(message);
      return newState;
    case WRITE_NAME:
      newState.name = name;
      return newState;
    default:
      return prevState;
  }
}

export const fetchMessages = () => {
  return function thunk(dispatch) {
    return axios.get('/api/messages')
      .then(res => res.data)
      .then(messages => {
        const action = gotMessagesFromServer(messages);
        dispatch(action);
    })
  }
}

export const postMessage = (channelId, newMessageEntry, name) => {
  return function thunk(dispatch) {
    return axios.post('/api/messages', {
      channelId: channelId,
      content: newMessageEntry,
      name: name
    })
    .then(res => res.data)
    .then(message => {
      dispatch(gotNewMessageFromServer(message));
      socket.emit('new-message', message);
    })
  }
}

const store = createStore(reducer, applyMiddleware(loggerMiddleware, thunkMiddleware));

export default store;
