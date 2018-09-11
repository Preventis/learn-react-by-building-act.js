// import WebSocket from 'ws';

const ws = new WebSocket('ws://localhost:1337');

ws.onopen = () => {
  ws.send(JSON.stringify({ action: 'handshake' }));
};

const button = document.querySelector('#btn-next');
console.log(button);
button.addEventListener('click', () => {
  ws.send(JSON.stringify({ action: 'next', to: 'exercise-00/setup' }));
});

