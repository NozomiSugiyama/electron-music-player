const electron = require('electron');
const {app} = electron;
const {BrowserWindow} = electron;

let win;
app.on('ready', () => {
  win = new BrowserWindow({
    width: 800,
    height: 600,
    transparent: true,
    frame: false,
    resizable: false
  });
  win.loadURL(`http://localhost:3000/`);
  // win.webContents.openDevTools();
  win.on('closed', () => win = null);
});

app.on('window-all-closed', () => 
  process.platform !== 'darwin' && app.quit()
);

app.on('activate', () => win === null && createWindow());
