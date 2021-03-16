const express = require('express');
const { v4: uuidv4 } = require('uuid');
const path = require('path');
const fs = require('fs');
const router = require('express').Router();
let jsonNotes = require('./db/db.json');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// sets public folder to be used for js, css
app.use(express.static('public'));

// html routes
app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, './public/notes.html')));

// api routes
app.get('/api/notes', (req, res) => {
    // console.log("route hit");
    res.json(jsonNotes);
});

app.post('/api/notes', (req, res) => {
    let newNote = req.body;
    let id = uuidv4();
    newNote.id = id;
    jsonNotes.push(newNote);
    fs.writeFileSync('./db/db.json', JSON.stringify(jsonNotes));
    res.json(newNote);
    console.log(jsonNotes);
});

app.delete('/api/notes/:id', (req, res) => {
    let savedNotes = jsonNotes.filter(note => note.id !== req.params.id);
    jsonNotes = savedNotes;
    fs.writeFileSync('./db/db.json', JSON.stringify(jsonNotes));
    res.json(jsonNotes);
});

// post, note is req.body, create an id and attach to note
// push the note into the jsonNotes array
// rewrite the file with the notes stringified
// res.json(new note)



app.get('*', (req, res) => res.sendFile(path.join(__dirname, './public/index.html')));

app.listen(PORT, function () {
    console.log("App listening on PORT: " + PORT);
});