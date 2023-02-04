const express = require('express');
const path = require('path');
const app = express();


app.get('/', (req, res) =>
    res.sendFile(path.join(__dirname, '../public/index.html'))
);

// GET Route for feedback page
app.get('/notes', (req, res) =>
    res.sendFile(path.join(__dirname, '../public/notes.html'))
);

module.exports = app