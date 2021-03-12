const express = require('express');
const path = require('path');
const jsonNotes = require('./db/db.json');

const app = express();
const PORT = process.env.PORT || 3000;

// sets public folder to be used for js, css
app.use(express.static('public'));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// html routes
app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, './public/notes.html')));
app.get('*', (req, res) => res.sendFile(path.join(__dirname, './public/index.html')));

// api routes
// app.get('/api/notes', (req, res) => res.json(jsonNotes));

app.listen(PORT, function () {
    console.log("App listening on PORT: " + PORT);
});