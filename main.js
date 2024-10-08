const { app, BrowserWindow } = require('electron');
const { exec } = require('child_process');
const path = require('path');

let win;

function createWindow() {
  win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
    icon: path.join(__dirname, 'favicon.ico') 
  });
  win.loadFile('dist/electron-app/index.html');
  win.loadURL(`file://${path.join(__dirname, '/dist/gpt/browser/index.html')}`);

  win.on('closed', () => {
    win = null;
  });

   // Hide the default menu
   Menu.setApplicationMenu(null);
}



app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (win === null) {
    createWindow();
  }
});

