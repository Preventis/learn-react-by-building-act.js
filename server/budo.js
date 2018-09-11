var WebSocket = require('ws');
var budo = require('budo');
var babelify = require('babelify');
var childProcess = require('child_process');

function switchBranch(name) {
  childProcess.exec(`git checkout ${name}`, (err, stdout) => {
    console.log(stdout, err);
    childProcess.exec('git branch', (err, stdout) => {
      console.log(stdout, err);
    });
  });
}

budo('./src/playground.js', {
  live: true,
  stream: process.stdout,
  port: 8000,
  browserify: {
    transform: babelify
  }
}).on('connect', function(ev) {
  const wss = new WebSocket.Server({ port: 1337 });
  wss.on('connection', ws => {
    ws.on('message', mess => {
      const message = JSON.parse(mess);
      if (message.action === 'next') {
        switchBranch(message.to);
      }
    });
  });
});

