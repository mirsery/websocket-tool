const {app, ipcMain, BrowserWindow} = require('electron')
const path = require('path')

function createWindow() {

    ipcMain.handle('ws:connect', async (event,url) => {
        console.log(url)
        return url;
    })

    const win = new BrowserWindow({
        minWidth: 1000,
        minHeight: 650,
        webPreferences: {
            nodeIntegration: true,
            preload: path.join(__dirname, 'preload.js')
        }
    })

    win.loadFile('index.html')

    win.on('resized', function () {
        win.webContents.send('updateWindow', "hello world")
    })

}

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
})

// app.on('activate', () => {
//     if (BrowserWindow.getAllWindows().length === 0) {
//         createWindow()
//     }
// })
