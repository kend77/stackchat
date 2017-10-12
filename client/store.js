import {createStore} from 'redux';

const initialState = {
  messages: [],
  newMessageEntry: ''
}

const GOT_MESSAGES_FROM_SERVER = 'GOT_MESSAGES_FROM_SERVER';
const GOT_NEW_MESSAGE_FROM_SERVER = 'GOT_NEW_MESSAGE_FROM_SERVER';
const WRITE_MESSAGE = 'WRITE_MESSAGE';

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


function reducer (prevState = initialState, action) {
  const newState = Object.assign({}, prevState)
  const {messages, newMessageEntry, message} = action
  switch(action.type) {
    case GOT_MESSAGES_FROM_SERVER:
      newState.messages = messages;
      return newState;
    case WRITE_MESSAGE:
      newState.newMessageEntry = newMessageEntry;
      return newState;
    case GOT_NEW_MESSAGE_FROM_SERVER:
      newState.messages = newState.messages.concat(message);
    default:
      return prevState;
  }
}

const store = createStore(reducer);

export default store;
