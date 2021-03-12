const express = require('express');

const app = express();
const PORT = process.env.PORT || 4040;

// sets public folder to be used for js, css
app.use(express.static('public'));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.listen(PORT, function () {
    console.log("App listening on PORT: " + PORT);
});