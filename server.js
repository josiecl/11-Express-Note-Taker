const express = require('express');
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
    console.log("route hit");
    res.json(jsonNotes);
});




app.get('*', (req, res) => res.sendFile(path.join(__dirname, './public/index.html')));

app.listen(PORT, function () {
    console.log("App listening on PORT: " + PORT);
});