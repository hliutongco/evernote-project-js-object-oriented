
  const noteStore = []
  class Note {
    constructor(object){
      this.id = object.id
      this.user = object.user
      this.title = object.title
      this.body = object.body
      noteStore.push(this)
    }

    createNote(){
      fetch("http://localhost:3000/api/v1/notes", {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(this)
      }).then(response => response.json())
    }

    renderNote(){
      const previewOl = document.getElementById('preview-ol')
      const note = document.createElement('li')
      note.id = `note-${this.id}`
      note.innerText = `${this.body.slice(0, 40)}...`
      previewOl.append(note)
    }

    removeNote(){
      const previewOl = document.getElementById('preview-ol')
      let note;
      previewOl.childNodes.forEach((node) => {
        if(node.id === `note-${this.id}`){
          note = node
        }
      })
      previewOl.removeChild(note);
    }

    updateNote(){
      const previewOl = document.getElementById('preview-ol')
      previewOl.childNodes.forEach((node) => {
        if(node.id === `note-${this.id}`){
          node.innerText = `${this.body.slice(0, 40)}...`
        }
      })
    }

    editNote(){
      fetch(`http://localhost:3000/api/v1/notes/${this.id}`,{
        method: 'PATCH',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(this)
      }).then(response => response.json())
    }

    deleteNote(){
      fetch(`http://localhost:3000/api/v1/notes/${this.id}`, {
        method: 'DELETE'
      })
    }

    renderFullView(){
      return `<h2>Title: "${this.title}"</h2>
      <p><strong>Body:</strong> ${this.body}</p>
      <button id="edit-button-${this.id}">Rewrite!</button>
      <button id="delete-button-${this.id}">Disappear!</button>
      `
    }

    renderEditForm(){
      return `<h2>Title:</h2>
      <input type="text" id="edit-title" value="${this.title}">
      <p>Body:</p>
      <input type="text" id="edit-body" value="${this.body}">
      <button id="submit-button-${this.id}">Submit!</button>
      `
    }
  }
