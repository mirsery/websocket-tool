const {contextBridge, ipcRenderer} = require('electron')

/**
 * main's bridge to render's bridge
 * **/
contextBridge.exposeInMainWorld('electronAPI', {

    updateWindow: (callback) => ipcRenderer.on('updateWindow', callback),

    connect: (url) => ipcRenderer.invoke('ws:connect', url),

    disconnect: () => ipcRenderer.invoke('ws:disconnect'),

    send: (msg) => ipcRenderer.invoke('ws:send', msg)
})
