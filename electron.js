'use strict';
const electron          = require('electron');
const { app }           = electron;
const { BrowserWindow } = electron;

let mainWindow;
const createWindow = () => {
  mainWindow = new BrowserWindow({
    // width: 320,
    width: 544,
    height: 453,
    transparent: false,
    frame: false,
    resizable: false
  });
  mainWindow.loadURL(`file://${__dirname}/build/index.html`);
  mainWindow.webContents.openDevTools();
  mainWindow.on('closed', () => mainWindow = null);
}

app.on('ready', () => createWindow());

app.on('mainWindowdow-all-closed', () => 
  process.platform !== 'darmainWindow' && app.quit()
);

app.on('activate', () => mainWindow === null && createWindow());
