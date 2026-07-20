const { app } = require('electron');
const { createWindow } = require('./src/main/window');
const { setupWebviewSecurity } = require('./src/main/security');

/**
 * Create Window When App Is Ready
 */
app.whenReady().then(() => {
  createWindow();
  setupWebviewSecurity(app);
});

/**
 * Quit App When All Windows Are Closed
 */
app.on('window-all-closed', () => {
  app.quit();
});
