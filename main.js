const {app, BrowserWindow} = require('electron')

function createWindow() {
    let url;
    if (process.env.ELECTRON_ENV === 'dev') {
        url = `file://${process.cwd()}/dist/index.html`
    } else {
        url = `file://${process.env.PORTABLE_EXECUTABLE_DIR}/src/index.html`
    }

    let window = new BrowserWindow()
    window.setMenu(null)
    window.maximize()
    window.loadURL(url)
}

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow()
    }
})

