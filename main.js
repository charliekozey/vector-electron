require('dotenv').config()
const { app, BrowserWindow, ipcMain, dialog } = require("electron/main");
const path = require("node:path");
const fs = require('fs-extra')
const URL = process.env.URL

let window

async function handleGetFiles() {
    const directory = await fs.promises.opendir(URL)
    const noteData = []
    let counter = 1

    for await (const item of directory) {
        const notePath = `${URL}${item.name}`
        const noteBody = await fs.promises.readFile(notePath, { encoding: "utf8" })
        const note = {
            title: item.name,
            body: noteBody,
            id: counter,
            path: notePath
        }

        counter += 1
        noteData.push(note)
    }

    return noteData
}

async function handleSaveFile(e, note, content, path) {
    console.log(note)
    console.log(content)
    console.log(path)
}

async function createWindow() {
    window = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            contextIsolation: true,
            enableRemoteModule: false,
            preload: path.join(__dirname, 'preload.js')
        }
    })
    window.loadFile('index.html')
}

app.whenReady().then(() => {
    ipcMain.handle('getFiles', handleGetFiles)
    ipcMain.handle('saveFile', handleSaveFile)
    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
    createWindow()
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
})