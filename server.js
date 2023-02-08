const express = require('express');
const path = require('path');
const fs = require('fs');
const util = require('util');
const { v4: uuidv4 } = require('uuid');
const PORT = process.env.port || 3001;
const notes = express();

// Middleware for parsing JSON and urlencoded form data
notes.use(express.json());
notes.use(express.urlencoded({ extended: true }));
notes.use(express.static('public'));

//Read database file and parse it using json
const findNotes = () => {
  return readFile('db/db.json', 'utf-8')
  .then(baseNotes => [].concat(JSON.parse(baseNotes)))
}

// GET route to display notes
notes.get('/api/notes', (req, res) => {
  console.log("getting api notes");
  res.sendFile(path.join(__dirname, './db/db.json'))
});


// POST route for adding new note to db
notes.post('/api/notes', (req, res) => {
  const note = JSON.parse(fs.readFileSync('./db/db.json'));
  const { title, text } = req.body;

  if (req.body) {
    const newNote = {
      title,
      text,
      id: uuidv4(),
    };

    note.push(newNote);
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

notes.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} ;) <3`)
);

// GET Route for notes page
notes.get('/notes', (req, res) =>
    res.sendFile(path.join(__dirname, './public/notes.html'))
);

// GET Route for homepage
notes.get('/', (req, res) =>
    res.sendFile(path.join(__dirname, './public/index.html'))
);

