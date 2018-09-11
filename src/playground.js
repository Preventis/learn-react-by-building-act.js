// import WebSocket from 'ws';

const ws = new WebSocket('ws://localhost:1337');

ws.onopen = () => {
  ws.send('commit', { test: 1 });
};

