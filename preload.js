const { contextBridge, ipcRenderer } = require('electron/renderer')

contextBridge.exposeInMainWorld('electronAPI', {
  getFiles: () => ipcRenderer.invoke('getFiles'),
  saveFile: (note, content) => ipcRenderer.invoke('saveFile', note, content, path)
})