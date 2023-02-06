const notes = require('express').Router();
const { v4: uuidv4 } = require('uuid');
let db = require('../db/db.json');
const fs = require('fs');
const util = require('util');

// GET Route for sending all notes to the db
notes.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, './db/db.json'))
});


// POST Route for adding new note to db
notes.post('/notes', (req, res) => {
  const note = JSON.parse(fs.readFileSync('./db/db.json'));
  console.log(db);
  const { title, text } = req.body;

  if (req.body) {
    const newNote = {
      title,
      text,
      id: uuidv4(),
    };

    note.push(newNote);
    console.log(db);
    res.json(`Note added successfully 👍.`)
  } else {
    res.error('Error in adding note.');
  }
  fs.writeFileSync('./db/db.json', JSON.stringify(note, "utf-8"));
  res.json(note);
});

// DELETE Route for old note
notes.delete('/api/notes/:id', (req, res) => {
  const note = JSON.parse(fs.readFileSync('./db/db.json'));
  const removeNote = note.filter((delNote) => delNote.id !== req.params.id);
  fs.writeFileSync('./db/db.json', JSON.stringify(removeNote));
  res.json(removeNote);
});

module.exports = notes;
