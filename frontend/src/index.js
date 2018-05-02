document.addEventListener("DOMContentLoaded", function(event) {

  const previewOl = document.getElementById('preview-ol')
  const fullViewDiv = document.getElementById('full-view')
  const newNoteForm = document.getElementById('form')
  const inputTitle = document.getElementById('title')
  const inputBody = document.getElementById('body')

  const foundNote = (prefix, eventTargetId) => {
    return noteStore.find((note) => eventTargetId === `${prefix}-${note.id}`)
  }

  newNoteForm.addEventListener('submit', function(event){
    event.preventDefault()
    const newId = noteStore[noteStore.length - 1].id + 1
    const newNote = new Note({id: newId, title: inputTitle.value, body: inputBody.value, user: userStore[0] })
    newNote.createNote()
    newNote.renderNote()
    fullViewDiv.innerHTML = newNote.renderFullView()
    
  })

  previewOl.addEventListener('click', function(event){
    fullViewDiv.innerHTML = foundNote('note', event.target.id).renderFullView()
  })

  fullViewDiv.addEventListener('click', function(event){
    const eventId = event.target.id
    let noteInstance;

    if(eventId.includes('delete-button')){
      noteInstance = foundNote('delete-button', eventId)
      noteInstance.removeNote()
      noteInstance.deleteNote()
      fullViewDiv.innerHTML = ''
    }
    else if(eventId.includes('edit-button')){
      noteInstance = foundNote('edit-button', eventId)
      fullViewDiv.innerHTML = noteInstance.renderEditForm()
    }
    else if(eventId.includes('submit-button')){
      noteInstance = foundNote('submit-button', eventId)
      noteInstance.title = document.getElementById('edit-title').value
      noteInstance.body = document.getElementById('edit-body').value
      noteInstance.editNote()
      noteInstance.updateNote()
      fullViewDiv.innerHTML = noteInstance.renderFullView()
    }
  })

  fetch("http://localhost:3000/api/v1/notes")
  .then(response => response.json())
  .then(data => {
    for (let i of data) {
      const newNote = new Note(i)
      newNote.renderNote();
    }
  })

});
