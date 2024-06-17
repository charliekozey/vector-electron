const noteData = await window.electronAPI.getFiles()

const noteList = document.getElementById("note-list")
const searchBar = document.getElementById("searchbar")
const noteBody = document.getElementById("note-body")
let currentNote = {}

function initialize() {
    searchBar.addEventListener("input", (e) => {
        searchNotes(e.target.value)
    })

    // noteBody.addEventListener("input", (e) => {
    //     if (currentNote.path) {
    //         window.electronAPI.saveFile(currentNote, e.target.value, currentNote.path)
    //     }
    // })

    renderNoteList(noteData)
}

function renderNoteList(notes) {
    let step = 0

    notes.forEach(note => {
        const listItem = document.createElement("input")
        const label = document.createElement("label")
        
        listItem.type = "radio"
        listItem.name = "note-list-radio"
        listItem.id = note.id
        if (step == 0 && searchBar.value !== "") listItem.checked = true
        
        label.textContent = note.title
        label.htmlFor = note.id
        label.style.borderBottom = "0.5px solid #fff"
        label.addEventListener("click", () => {
            populateNoteBody(note)
        })

        noteList.append(listItem)
        noteList.append(label)

        step += 1
    })
}

function populateNoteBody(note) {
    currentNote = note
    noteBody.value = note.body
    console.log(note.path)
}

function searchNotes(queryString) {
    const filteredNotes = noteData.filter(note => {
        return (
            note.title.toLowerCase().includes(queryString.toLowerCase()) ||
            note.body.toLowerCase().includes(queryString.toLowerCase())
        )
    })
    
    while (noteList.childNodes.length > 0) {
        noteList.lastChild.remove()
    }

    renderNoteList(filteredNotes)
    populateNoteBody(
        filteredNotes[0] ?
        filteredNotes[0].body : "!! nothing found !!"
    )
}

initialize()