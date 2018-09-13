import '../src/playground.js';

const ws = new WebSocket('ws://localhost:4444');

const tutorialNav = document.querySelector('#tutorial-nav');
tutorialNav.style.position = 'fixed';
tutorialNav.style.margin = '40px';
tutorialNav.style.bottom = 0;
tutorialNav.style.opacity = 0;

ws.onopen = () => {
  ws.send(JSON.stringify({ action: 'handshake' }));
  tutorialNav.style.opacity = 1;
};

const nextButton = document.querySelector('#btn-next');
if (nextButton) {
  nextButton.addEventListener('click', () => {
    const to = nextButton.innerHTML;
    ws.send(JSON.stringify({ action: 'next', to: to }));
  });
}

const solutionButton = document.querySelector('#btn-solution');
if (solutionButton) {
  solutionButton.addEventListener('click', () => {
    const to = solutionButton.innerHTML;
    ws.send(JSON.stringify({ action: 'next', to: to }));
  });
}

