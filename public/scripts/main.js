/**
 * DOM Elements
 */
const titleBar = document.getElementById('titleBar');
const webView = document.getElementById('webView');
const loading = document.getElementById('loading');

/**
 * Loading Timeout
 */
let loadTimeout;

/**
 * Block Right-Click And Keyboard Shortcuts
 */
window.addEventListener('contextmenu', (e) => e.preventDefault());
window.addEventListener('keydown', (e) => {
  const key = e.key.toLowerCase();
  if (
    key === 'f12' ||
    (e.ctrlKey && e.shiftKey && ['i', 'j', 'c'].includes(key)) ||
    (e.ctrlKey && key === 'u')
  ) {
    e.preventDefault();
  }
});

/**
 * Window Control Buttons
 */
document.getElementById('button-minimum').addEventListener('click', () => {
  window.electronAPI.minimize();
});

document.getElementById('button-maximum').addEventListener('click', () => {
  window.electronAPI.maximize();
});

document.getElementById('button-close').addEventListener('click', () => {
  window.electronAPI.close();
});

/**
 * Hide Loading Screen
 */
function hideLoading() {
  clearTimeout(loadTimeout);
  loading.classList.add('hidden');
}

/**
 * Show Loading Screen
 */
function showLoading() {
  loading.classList.remove('hidden');
}

/**
 * WebView Event Listeners
 */

// Page Load Started
webView.addEventListener('did-start-loading', () => {
  showLoading();
});

// Page Load Finished
webView.addEventListener('did-stop-loading', () => {
  hideLoading();
  updateTitlebarTheme();
});

// DOM Ready
webView.addEventListener('dom-ready', () => {
  hideLoading();
  updateTitlebarTheme();
});

// In-Page Navigations
webView.addEventListener('load-commit', (e) => {
  if (e.isMainFrame) {
    showLoading();
  }
});

// Load Finished
webView.addEventListener('did-finish-load', () => {
  hideLoading();
  updateTitlebarTheme();
});

/**
 * Fallback: Force Close Loading After 8 Seconds
 */
loadTimeout = setTimeout(() => {
  hideLoading();
}, 8000);
