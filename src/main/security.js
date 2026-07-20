/**
 * User-Agent That Appears As A Normal Chrome Browser On Windows
 */
const WINDOWS_USER_AGENT =
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 ' +
  '(KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36';

/**
 * Block DevTools And Debug Shortcuts
 * @param {WebContents} Contents, Electron WebContents
 */
function blockDevtoolsShortcuts(contents) {
  contents.on('before-input-event', (event, input) => {
    const key = (input.key || '').toLowerCase();
    const blocked =
      key === 'f12' ||
      (input.control && input.shift && (key === 'i' || key === 'j' || key === 'c')) ||
      (input.control && key === 'u') ||
      (input.meta && input.alt && key === 'i'); // macOS (Cmd + Alt + I)

    if (blocked) {
      event.preventDefault();
    }
  });

  contents.on('devtools-opened', () => {
    contents.closeDevTools();
  });
}

/**
 * Apply WebView Security Settings
 * @param {Electron} App, Electron App Instance
 */
function setupWebviewSecurity(app) {
  app.on('web-contents-created', (event, contents) => {
    if (contents.getType() === 'webview') {
      // Set User-Agent To Windows Chrome
      contents.setUserAgent(WINDOWS_USER_AGENT);

      // Block DevTools
      blockDevtoolsShortcuts(contents);

      // Block Right-Click Menu
      contents.on('context-menu', (e) => e.preventDefault());

      // Block Popup Windows
      contents.setWindowOpenHandler(() => ({ action: 'deny' }));
    }
  });
}

/**
 * Apply Main Window Security Settings
 * @param {BrowserWindow} Win, Electron BrowserWindow
 */
function setupMainWindowSecurity(win) {
  blockDevtoolsShortcuts(win.webContents);
  win.webContents.on('context-menu', (e) => e.preventDefault());
}

module.exports = {
  blockDevtoolsShortcuts,
  setupWebviewSecurity,
  setupMainWindowSecurity,
  WINDOWS_USER_AGENT
};
