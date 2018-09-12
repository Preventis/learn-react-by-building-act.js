const ws = new WebSocket('ws://localhost:4444');

ws.onopen = () => {
  ws.send(JSON.stringify({ action: 'handshake' }));
};

const nextButton = document.querySelector('#btn-next');
if (nextButton) {
  nextButton.addEventListener('click', () => {
    ws.send(JSON.stringify({ action: 'next', to: 'exercise-07/State' }));
  });
}

const solutionButton = document.querySelector('#btn-solution');
if (solutionButton) {
  solutionButton.addEventListener('click', () => {
    ws.send(JSON.stringify({ action: 'next', to: 'solution-06/Attributes' }));
  });
}

