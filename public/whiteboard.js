const { Project, Task, User } = require('../models');
const { sequelize, DataTypes, Model } = require('../db');

async function initialise() {
  await sequelize.sync({ force: true });
    const newProject = await Project.create({
        name: 'Test Project', 
        summary: 'The team are building a new project!'
    })
    const newTask = await Task.create({
        title: 'Task Title', 
        description: 'Setting up a database',
        column: 0,

    })
    const newUser= await User.create({name: 'Sonia', avatar: 'Avatar'})
    
    await newProject.addTask(newTask)
    await newUser.addTask(newTask)
    // console.log('start: ', newProject, 'end')
    // console.log(newProject.name)
    // console.log(newProject.summary)
    
    // console.log(newTask)
    // console.log(newUser)    
}

initialise()