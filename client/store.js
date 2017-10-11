import store from 'redux';

const initialState = {
  messages: []
}


const GOT_MESSAGES_FROM_SERVER = 'GOT_MESSAGES_FROM_SERVER';


export const gotMessagesFromServer = (messages) => (
  {type: GOT_MESSAGES_FROM_SERVER,
    messages: messages}
  );


function reducer (prevState = initialState, action) {
  const newState = Object.assign({}, prevState)
  switch(action.type) {
    case GOT_MESSAGES_FROM_SERVER:
      newState.messages = action.messages;
    default:
      return prevState;
  }
}


