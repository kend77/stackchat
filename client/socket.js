import io from 'socket.io-client';

const socket = io(window.location.origin);
console.log('hii')

socket.on('connect', () => {
  console.log('I am now connected to the server!');
});

export default socket;
