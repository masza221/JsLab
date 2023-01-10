//create note class

class Note {
  constructor(title, content, color, date, pin) {
    this.title = title;
    this.content = content;
    this.color = color;
    this.date = date;
    this.pin = pin;
  }

  //create method to display note
  displayNote() {
    return `
    <div class="note" style="background-color:${this.color};">
         <div onclick="deleteNote(this)" class="hamburger"><div></div></div>
        <div class="note-header">
            <h3>${this.title}</h3>
            <p>${this.date}</p>
        </div>
        <div class="note-body">
             <p>${this.content}</p>
        </div>  
       ${this.pin === true ? `<div onclick="pin(this)" class="pin"></div>` : ``}
       <button onclick="createPopup(this)" class="btn">Edit</button>
    </div>
    `;
  }
}

//create array to store notes
let notes = [];

//sort notes by pin vakue
function sortNotes(array) {
  const sortedNotes = array.sort((a, b) => {
    return b.pin - a.pin;
  });
  return sortedNotes;
}

//create function to display notes
function displayNotes() {
  //get notes container
  let notesContainer = document.querySelector(".notes-container");

  //clear notes container
  notesContainer.innerHTML = "";

  //get notes from local storage
  let notesFromStorage = JSON.parse(localStorage.getItem("notes"));

  //check if notes exist in local storage
  if (notesFromStorage) {
    notes = [];
    sortedNotes = sortNotes(notesFromStorage);


    sortedNotes.forEach((note) => {
      //create new note
      let newNote = new Note(
        note.title,
        note.content,
        note.color,
        note.date,
        note.pin
      );

      //add note to array
      notes.push(newNote);
    });
  }

  //loop through notes array
  notes.forEach((note) => {
    //create new note
    notesContainer.innerHTML += note.displayNote();
  });
}

//create function to add note to array
function addNote() {
  //get values from form
  let title = document.getElementById("title").value;
  let content = document.getElementById("content").value;
  let color = document.getElementById("color").value;
  let date = new Date().toLocaleDateString();
  let pin = document.getElementById("pin").checked;

  //create new note
  let newNote = new Note(title, content, color, date, pin);

  //add note to array
  notes.push(newNote);

  //add notes to local storage
  localStorage.setItem("notes", JSON.stringify(notes));

  displayNotes();
}

function getIndex(element) {
  const note = element.parentElement;

  //get note index in notes
  const noteIndex = Array.from(note.parentElement.children).indexOf(note);
  return noteIndex;
}

//create function to delete note
function deleteNote(element) {
  const noteIndex = getIndex(element);
  //remove note from notes array
  notes.splice(noteIndex, 1);
  //add notes to local storage
  localStorage.setItem("notes", JSON.stringify(notes));

  displayNotes();
}

//create function to edit note
function editNote(noteIndex) {
  try {
    let title = document.getElementById("title-edit").value;
    let content = document.getElementById("content-edit").value;
    let color = document.getElementById("color-edit").value;
    let date = notes[noteIndex].date;
    let pin = document.getElementById("pin-edit").checked ? true : false;

    //create new note
    let newNote = new Note(title, content, color, date, pin);

    //remove note from notes arrays

    notes.splice(noteIndex, 1, newNote);

    //add notes to local storage
    localStorage.setItem("notes", JSON.stringify(notes));

    displayNotes();
  } catch {
    console.log("error");
  }
}

function createPopup(element) {
  const elementIndex = getIndex(element);
  const popup = document.createElement("div");
  popup.classList.add("popup");
  popup.innerHTML = `
  <div class="popup-overlay">
  <div class="popup-content">
    <div class="popup-header">
      <h3>Edit Note</h3>
      <div onclick="closePopup()" class="hamburger"><div></div></div>
    </div>
    <div class="popup-body">
      <form>
        <div class="form-group">
          <label for="title">Title</label>
          <input type="text" id="title-edit" value="${notes[elementIndex].title}" placeholder="Title">
        </div>
        <div class="form-group">
          <label for="content">Content</label>
          <textarea id="content-edit" placeholder="Content"> ${notes[elementIndex].content}</textarea>
        </div>
        <div class="form-group">
          <label for="color">Color</label>
          <input type="color" value="${notes[elementIndex].color}" id="color-edit">
        </div>
        <div class="form-group">
          <label for="pin">Pin</label>
          ${notes[elementIndex].pin === true ? `<input type="checkbox" checked id="pin-edit">` : `<input type="checkbox"  id="pin-edit">`}
        </div>
        <div class="form-group">
          <button type="button" onclick="editNote(${elementIndex})" class="btn">Edit Note</button>
        </div>
      </form>
    </div>
  </div>
  </div>
  `;
  document.body.appendChild(popup);
}

function closePopup() {
  document.querySelector(".popup").remove();
}

displayNotes();
