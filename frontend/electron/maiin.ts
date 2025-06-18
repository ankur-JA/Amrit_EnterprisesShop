import { app, BrowserWindow } from 'electron';

function createWindow(): void {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      contextIsolation: false,
      nodeIntegration: true,
    },
  });

  // During development
  win.loadURL('http://localhost:5173');

  // In production (after build), use:
  // win.loadFile(path.join(__dirname, '../dist/index.html'));
}

app.whenReady().then(createWindow);

// Quit when all windows are closed (standard behavior)
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});
