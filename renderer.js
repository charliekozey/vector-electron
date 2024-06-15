const noteData = await window.electronAPI.getFiles()
console.log(noteData)

const noteList = document.getElementById("note-list")
const searchBar = document.getElementById("searchbar")
const noteBody = document.getElementById("note-body")

function initialize() {
    searchBar.addEventListener("input", (e) => {
        searchNotes(e.target.value)
    })

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
        label.addEventListener("click", () => {
            populateNoteBody(note.body)
        })

        noteList.append(listItem)
        noteList.append(label)

        step += 1
    })
}

function populateNoteBody(text) {
    noteBody.value = text
}

function searchNotes(queryString) {
    const filteredNotes = noteData.filter(note => {
        return (
            note.title.includes(queryString) ||
            note.body.includes(queryString)
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