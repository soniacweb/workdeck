const express = require('express');
const { Project, Task, User } = require('./models');
const path = require('path');

const populateDB = require('./populateDB');


const app = express();
const port = 3000;
// populateDB();

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// app.engine('handlebars', handlebars)
// app.use(express.static('views'));


app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`)
});