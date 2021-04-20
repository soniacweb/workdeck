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
   if(projects.length > 0){
    res.render('allProjects', {projects})
   } else {
    res.render('createFirstProject')
   }
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
        res.redirect('/project/{{project.id}}')
    })

app.get('/project/:id/create-task', async (req, res) => {
    res.render('createTask')
})

app.post('/project/{{project.id}}/create-task', async (req, res) => {

    const projectid =  await Project.findByPk(req.params.id)
    await Task.create({
        title: req.body.title,
        description: req.body.description,
        column: 0,
        ProjectId: projectid
    })
        res.redirect('project-dashboard')
    })

app.get('/project/:id', async (req, res) => {
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

app.get('/:name/:id/delete', async (req, res) => {
    Task.findByPk(req.params.id)
        .then(task => {
            task.destroy()
                res.redirect('/')
            })
    })
// app.get('/restaurants/:id/edit', async (req, res) => {
//     const restaurant = await Restaurant.findByPk(req.params.id)
//     res.render('edit', {restaurant})
//     })
// app.post('/restaurants/:id/edit', async (req, res) => {
//     const restaurant = await Restaurant.findByPk(req.params.id)
//     await restaurant.update(req.body)
//     res.redirect(`/restaurants/${restaurant.id}`)
//     })

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`)
});