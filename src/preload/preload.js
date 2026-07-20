const { contextBridge, ipcRenderer } = require('electron');

/**
 * Expose Window Control API
 * Called From Renderer Process
 */
contextBridge.exposeInMainWorld('electronAPI', {
  minimize: () => ipcRenderer.send('window-minimize'),
  maximize: () => ipcRenderer.send('window-maximize'),
  close: () => ipcRenderer.send('window-close'),
});
