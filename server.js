const express = require('express');
const { Project, Task, User } = require('./models');
const path = require('path');


const Handlebars = require('handlebars')
const expressHandlebars = require('express-handlebars')
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access')
const { sequelize, DataTypes, Model } = require('./db');

const app = express();
const port = 3000;
app.use(express.static(path.join(__dirname, 'public')));

async function initialise() {
    await sequelize.sync({ force: true });
}
initialise()

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
   if(projects.length > 0){
    res.render('allProjects', {projects})
   } else {
    res.render('createFirstProject')
   }
})

app.get('/all-projects', async (req, res) => {
    const projects = await Project.findAll()
    if(projects.length > 0){
    res.render('allProjects', {projects})
    } else {
    res.render('createFirstProject')
    }
})


app.get('/create-project', async (req, res) => {
    res.render('createProject')
})

// saving a new project to DB
app.post('/create-project', async (req, res) => {
    const project = await Project.create({
        name: req.body.name,
        summary: req.body.summary,
    })
    res.redirect(`/projects/${(project.id)}`)
})


app.get('/projects/:projectid', async (req, res) => {
    const projectID =  req.params.projectid
    const project = await Project.findByPk(projectID)
    const tasks = await project.getTasks()

    const col0Task = []
    const col1Task = []
    const col2Task = []

    tasks.forEach(task => {
        if(task.column === 0){ col0Task.push(task)}
        else if(task.column === 1){ col1Task.push(task)}
        else if(task.column === 2){ col2Task.push(task)}
    })



    res.render('projectBoard', {col0Task,col1Task,col2Task, projectID})
})

app.get('/create-user', async (req, res) => {
    res.render('createUser')
})

app.post('/create-user', async (req, res) => {
    await User.create({
        name: req.body.name,
        avatar: req.body.avatar,
    })
        res.redirect('/allProjects')
    })

app.get(`/projects/:projectid/create-task`, async (req, res) => {
    const projectID =  req.params.projectid
    res.render('createTask',{projectID})
}) 

app.post('/projects/:projectid/create-task', async (req, res) => {
    const projectID =  req.params.projectid
    await Task.create({
        title: req.body.title,
        description: req.body.description,
        column: 0,
        ProjectId: projectID
    }) 
    res.redirect(`/projects/${projectID}`)
})

// updating column id based on position of draggable tasks using generic endpoint
app.patch('/:id/updatecolumn', async (req, res) => {
    const taskId = req.params.id;
    const task = await Task.findByPk(taskId)
    await task.update({
        column: req.body.column
      });  


    console.log(req.body)
    res.sendStatus(200)
})

app.get('/:id/delete', async (req, res) => {
    const id =  req.params.id
    const task = await Task.findByPk(req.params.id)
    const projectID= task.ProjectId
    await task.destroy()
    res.redirect(`/projects/${projectID}`)
})

app.get('/:id/edit', async (req, res) => {
    const task = await Task.findByPk(req.params.id)
    res.render('editTask', {task})
})

app.post('/:id/edit', async (req, res) => {
    const task = await Task.findByPk(req.params.id)
    await task.update(req.body)
    res.redirect(`/projects/${task.ProjectId}`)
})


app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`)
});