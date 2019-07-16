const { app, BrowserWindow } = require('electron');
const path = require('path');

const isDev = process.env.NODE_ENV === 'development'

async function installDevTools() {
  try {
    /* eslint-disable */
    if (!BrowserWindow.getDevToolsExtensions().hasOwnProperty('Vue.js devtools')) {
      require('vue-devtools').install();
      console.log('vue installing', BrowserWindow.getDevToolsExtensions());
    }
    // An error occures with devtron
    // if (!BrowserWindow.getDevToolsExtensions().hasOwnProperty('devtron')) {
    //   require('devtron').install();
    //   console.log('devtron installing');
    // }
    /* eslint-enable */
  } catch (err) {
    console.log(err)
  }
}

// only allow single instance of application
if (!isDev) {
  if (gotTheLock) {
    app.on('second-instance', () => {
      // Someone tried to run a second instance, we should focus our window.
      if (mainWindow && mainWindow.isMinimized()) {
        mainWindow.restore()
      }
      mainWindow.focus()
    })
  } else {
    app.quit()
    process.exit(0)
  }
} else {
  require('electron-debug')({
    showDevTools: !(process.env.RENDERER_REMOTE_DEBUGGING === 'true'),
  })
}

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  // eslint-disable-line global-require
  app.quit();
}

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

const createWindow = () => {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    contextIsolation: true,
    webPreferences: {
      devTools: isDev,
      /** devtron specs
       * nodeIntegration: isDev,
       * nodeIntegrationInWorker: false,
       * webSecurity: false,
       * preload: path.join(__dirname, '../../preload.js')
       */
    }
  });

  // and load the index.html of the app.
  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);

  // Open the DevTools.
  mainWindow.webContents.openDevTools();

  // Emitted when the window is closed.
  mainWindow.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', async () => {
  createWindow();

  if (isDev) {
    // let installExtension = require('electron-devtools-installer')
    // installExtension.default(installExtension.VUEJS_DEVTOOLS)
    //   .then(() => { })
    //   .catch(err => {
    //     console.log('Unable to install `vue-devtools`: \n', err)
    //   });

    try {
      installDevTools()
    }
    catch (error) {
      console.log('err', error)
    }
  }
})

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
