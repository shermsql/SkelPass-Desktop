const { ipcMain } = require('electron');

/**
 * Setup Window Control IPC Event Handlers
 * @param {BrowserWindow} Win, Main Application Window
 */
function setupIpcHandlers(win) {
  ipcMain.on('window-minimize', () => {
    win.minimize();
  });

  ipcMain.on('window-maximize', () => {
    if (win.isMaximized()) {
      win.unmaximize();
    } else {
      win.maximize();
    }
  });

  ipcMain.on('window-close', () => {
    win.close();
  });
}

module.exports = { setupIpcHandlers };
