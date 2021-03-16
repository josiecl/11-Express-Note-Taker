// Requiring dependencies/files
const express = require('express');
const { v4: uuidv4 } = require('uuid');
const path = require('path');
const fs = require('fs');
const router = require('express').Router();
let jsonNotes = require('./db/db.json');

// setting server/server port to 3000
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// sets public folder to be used for js, css, images
app.use(express.static('public'));

// html routes
app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, './public/notes.html')));

// api routes
// get notes
app.get('/api/notes', (req, res) => {
    res.json(jsonNotes);
});

// post new note and give new note a unique id
app.post('/api/notes', (req, res) => {
    let newNote = req.body;
    let id = uuidv4();
    newNote.id = id;
    jsonNotes.push(newNote);
    fs.writeFileSync('./db/db.json', JSON.stringify(jsonNotes));
    res.json(newNote);
    console.log(jsonNotes);
});

// delete notes by id
app.delete('/api/notes/:id', (req, res) => {
    let savedNotes = jsonNotes.filter(note => note.id !== req.params.id);
    jsonNotes = savedNotes;
    fs.writeFileSync('./db/db.json', JSON.stringify(jsonNotes));
    res.json(jsonNotes);
});

app.get('*', (req, res) => res.sendFile(path.join(__dirname, './public/index.html')));

app.listen(PORT, function () {
    console.log("App listening on PORT: " + PORT);
});