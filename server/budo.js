const os = require('os');
const WebSocket = require('ws');
const budo = require('budo');
const babelify = require('babelify');
const childProcess = require('child_process');

function currentBranch(cb) {
  childProcess.exec("git branch | grep '*'", (err, stdout) => {
    if (err) {
      console.log('ERROR: ', err);
    } else {
      cb(stdout);
    }
  });
}

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
  childProcess.exec('git diff', (err, stdout) => {
    if (err) {
      console.log('ERROR: ', err);
    } else {
      // Nothing to commit
      if (stdout.length === 0) {
        switchBranch(name);
        budo.reload('/');
      } else {
        // Something to commit
        childProcess.exec(
          `git add -A && git commit -m ${commitMessage}`,
          (err, stdout) => {
            if (err) {
              console.log('ERROR: ', err);
            } else {
              switchBranch(name);
              budo.reload('/');
            }
          }
        );
      }
    }
  });
}

function switchBranchWithStash(name, budo) {
  childProcess.exec('git stash', (err, stdout) => {
    if (err) {
      console.log('ERROR: ', err);
    } else {
      switchBranch(name);
      budo.reload('/');
    }
  });
}

const b = budo('./server/tutorial.js', {
  live: true,
  stream: process.stdout,
  port: 8000,
  browserify: {
    transform: babelify
  }
}).on('connect', function(ev) {
  const wss = new WebSocket.Server({ port: 4444 });
  wss.on('connection', ws => {
    ws.on('message', mess => {
      const message = JSON.parse(mess);
      console.log('→ ', message);
      if (message.action === 'next') {
        currentBranch(branchName => {
          const isSolutionBranch = branchName.includes('solution');
          if (isSolutionBranch) {
            switchBranchWithStash(message.to, b);
          } else {
            switchBranchWithCommit(message.to, b);
          }
        });
      }
    });
  });
});

