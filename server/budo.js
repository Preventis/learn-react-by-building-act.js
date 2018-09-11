const os = require('os');
const WebSocket = require('ws');
const budo = require('budo');
const babelify = require('babelify');
const childProcess = require('child_process');

function switchBranch(name) {
  childProcess.exec(`git checkout ${name}`, (err, stdout) => {
    if (err) {
      console.log('ERROR: ', err);
    } else {
      console.log(`Switched to ${name}`);
    }
  });
}

function switchBranchWithCommit(name, budo) {
  const commitMessage = `EDIT-${os.hostname()}-${name}-${new Date().toISOString()}`;
  budo.reload();
  // childProcess.exec('git diff', (err, stdout) => {
  //   if (err) {
  //     console.log('ERROR: ', err);
  //   } else {
  //     // Nothing to commit
  //     if (stdout.length === 0) {
  //       switchBranch(name);
  //     } else {
  //       // Something to commit
  //       childProcess.exec(
  //         `git add -A && git commit -m ${commitMessage}`,
  //         (err, stdout) => {
  //           if (err) {
  //             console.log('ERROR: ', err);
  //           } else {
  //             switchBranch(name);
  //           }
  //         }
  //       );
  //     }
  //   }
  // })
}

function switchBranchWithStash(name) {
  childProcess.exec('git stash', (err, stdout) => {
    if (err) {
      console.log('ERROR: ', err);
    } else {
      switchBranch(name);
    }
  });
}

const budo = budo('./src/playground.js', {
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
      console.log('→ ', message);
      if (message.action === 'next') {
        switchBranchWithCommit(message.to, budo);
      }
      if (message.action === 'solution') {
        // TODO
      }
    });
  });
});

