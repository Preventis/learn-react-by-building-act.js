const ws = new WebSocket('ws://localhost:1337');

ws.onopen = () => {
  ws.send(JSON.stringify({ action: 'handshake' }));
};

const nextButton = document.querySelector('#btn-next');
nextButton.addEventListener('click', () => {
  ws.send(JSON.stringify({ action: 'next', to: 'exercise-00/setup' }));
});

const solutionButton = document.querySelector('#btn-solution');
solutionButton.addEventListener('click', () => {
  ws.send(JSON.stringify({ action: 'solution', to: 'solution-00/setup' }));
});

