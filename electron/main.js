const { menubar } = require('menubar');
const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const url = require('url');

if (process.env.NODE_ENV === 'development') {
  require('electron-reload')(__dirname, {
    electron: require(`${__dirname}/node_modules/electron`),
  });
}

const browserWindow = {
  width: 450,    // Set the desired width for the window
  height: 550,   // Set the desired height for the window
  // Other options go here
};

const mb = menubar();
mb.setOption('browserWindow', browserWindow);

mb.on('ready', () => {
  ipcMain.on('loadPage', (event, pageName) => {
    mainWindow.loadFile(pageName);
  });
  // your app code here
});