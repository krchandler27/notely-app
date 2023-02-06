const express = require('express');
const path = require('path');
const app = express();

// GET Route for homepage
app.get('/', (req, res) =>
    res.sendFile(path.join(__dirname, '../public/index.html'))
);

// GET Route for notes page
app.get('/notes', (req, res) =>
    res.sendFile(path.join(__dirname, '../public/notes.html'))
);

module.exports = app