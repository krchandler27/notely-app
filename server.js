const express = require('express');
const path = require('path');

const api = require('./routes/notes.js');
const html = require('./routes/htmlroutes.js');

const PORT = process.env.port || 3001;
const app = express();
app.use(express.static('public'));

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', api);
app.use('/', html);

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);
