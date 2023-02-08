const express = require('express');
const path = require('path');
const fs = require('fs');
const util = require('util');
const { v4: uuidv4 } = require('uuid');
const PORT = process.env.port || 3001;
const app = express();

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

//Read datebase file and parse it using json
const findNotes = () => {
  return readFile('db/db.json', 'utf-8')
  .then(baseNotes => [].concat(JSON.parse(baseNotes)))
}

// GET Route to display notes
notes.get('api/notes', (req, res) => {
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













app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} ;) <3`)
);
