const notes = require('express').Router();
const { readFromFile, readAndAppend } = require('../helpers/fsUtils');
const { v4: uuidv4 } = require('uuid');
let db = require('../db/db.json');

// GET Route for retrieving all the notes
notes.get('/notes', (req, res) => {

console.log(db);
res.json(db);
  // readFromFile('../db/db.json').then((data) => res.json(JSON.parse(data)));
});

// POST Route for a new UX/UI note
notes.post('/notes', (req, res) => {
  console.log(db);

  const { title, text } = req.body;

  if (req.body) {
    const newnote = {
      title,
      text,
      note_id: uuidv4(),
    };
    db.push(newnote);
    console.log(db);

    readAndAppend(newnote, '../db/db.json');
    res.json(`note added successfully 🚀`);
  } else {
    res.error('Error in adding note');
  }
});

module.exports = notes;
