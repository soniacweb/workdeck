const express = require('express');
const { Project, Task, User } = require('./models');
const path = require('path');

const Handlebars = require('handlebars')
const expressHandlebars = require('express-handlebars')
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access')
const populateDB = require('./populateDB');
const { sequelize, DataTypes, Model } = require('./db');

const app = express();
const port = 3000;
app.use(express.static(path.join(__dirname, 'public')));

async function initialise() {
    await sequelize.sync({ force: true });
}
initialise()
// populateDB();

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

const handlebars = expressHandlebars({
    handlebars: allowInsecurePrototypeAccess(Handlebars)
})
app.engine('handlebars', handlebars)
app.set('view engine', 'handlebars')

// create if check- if projects exist, direct to allProjects, else send to createProject
app.get('/', async (req, res) => {
    const projects = await Project.findAll()
    res.render('allProjects', {projects})
})

app.get('/all-projects', async (req, res) => {
    res.render('allProjects')
})

app.get('/create-project', async (req, res) => {
    res.render('createProject')
})
// saving a new project to DB
app.post('/create-project', async (req, res) => {
    await Project.create({
        name: req.body.name,
        summary: req.body.summary,
    })
        res.redirect('project-dashboard')
    })

app.get('/create-task', async (req, res) => {
    res.render('createTask')
})

app.post('/create-task', async (req, res) => {
    await Task.create({
        title: req.body.title,
        description: req.body.description,
        column: 0,
    })
        res.redirect('project-dashboard')
    })

app.get('/project-dashboard', async (req, res) => {
    const tasks = await Task.findAll()
    res.render('projectBoard', {tasks})
})

app.get('/create-user', async (req, res) => {
    res.render('createUser')
})

app.post('/create-user', async (req, res) => {
    await User.create({
        name: req.body.name,
        avatar: req.body.avatar,
    })
        res.redirect('allProjects')
    })

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`)
});