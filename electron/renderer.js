const { ipcRenderer } = require('electron');

function loadPage(pageName) {
    ipcRenderer.send('loadPage', pageName);
}