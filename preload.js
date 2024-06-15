const { contextBridge, ipcRenderer } = require('electron/renderer')

contextBridge.exposeInMainWorld('electronAPI', {
  getFiles: () => ipcRenderer.invoke('getFiles')
})