const { BrowserWindow, Menu } = require('electron');

const { setupIpcHandlers } = require('./ipc');
const { setupMainWindowSecurity } = require('./security');

const path = require('path');

/**
 * Create The Main Application Window
 * @returns {BrowserWindow} Created Window Instance
 */
function createWindow() {
  // Remove Application Menu
  Menu.setApplicationMenu(null);

  const win = new BrowserWindow({
    width: 1280,
    height: 800,
    minWidth: 430,
    minHeight: 720,
    frame: false, // Custom Title Bar
    backgroundColor: '#0f0f0f',
    icon: path.join(__dirname, '../../assets/icon.png'),
    webPreferences: {
      preload: path.join(__dirname, '../preload/preload.js'),
      webviewTag: true,
      contextIsolation: true,
      nodeIntegration: false,
      devTools: false
    },
  });

  win.loadFile('./public/index.html');

  // Apply Security Settings
  setupMainWindowSecurity(win);

  // Setup IPC Handlers
  setupIpcHandlers(win);

  return win;
}

module.exports = { createWindow };
