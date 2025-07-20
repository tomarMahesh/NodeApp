const { app, BrowserWindow } = require('electron');
const { spawn } = require('child_process');
const path = require('path');
const net = require('net');

function findFreePort(start = 3000) {
  return new Promise(resolve => {
    const server = net.createServer();
    server.listen(start, () => {
      server.close(() => resolve(start));
    });
    server.on('error', () => resolve(findFreePort(start + 1)));
  });
}

let backendProcess;

app.on('ready', async () => {
  const port = await findFreePort();

  // Start Backend as a child process
  backendProcess = spawn('node', [path.join(__dirname, 'microservices','word-meaning-service', 'dist','server.js'), port], {
    cwd: path.join(__dirname, 'microservices/word-meaning-service')
  });

  backendProcess.stdout.on('data', data => console.log(`Backend: ${data}`));
  backendProcess.stderr.on('data', data => console.error(`Backend Error: ${data}`));

const nextProcess = spawn('npm', ['run', 'start'], {
  cwd: path.join(__dirname, 'microfrontend','dictionary-frontend'),
  shell: true
});
 nextProcess.stdout.on('data', data => console.log(`frontend: ${data}`));
  nextProcess.stderr.on('data', data => console.error(`frontend Error: ${data}`));
console.log("next process started at ", path.join(__dirname, 'microfrontend','dictionary-frontend'))

  // Create Electron Window
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  });

  
    win.loadURL(`http://localhost:4002?backend=http://localhost:${port}`);
  // Pass backend URL to frontend via query params
  //win.loadURL(`file://${path.join(__dirname, 'microfrontend','dictionary-frontend', 'build', 'index.html')}?backend=http://localhost:${port}`);
});

app.on('window-all-closed', () => {
  if (backendProcess) backendProcess.kill();
  app.quit();
});
