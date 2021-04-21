![](https://www.generalcatalyst.com/wp-content/uploads/2021/01/Multiverse-Logo.png) 


# To-do-list-app

To-do app for Multiverse Bootcamp project 1

# Getting Started
Clone or download the repo
- npm init
- node server (to run the server)

# 💎 Brief

Initialise a relational database for Projects, Tasks for each project, and assigned Users for each tasks. 
Decide on 2 critical user journeys and encode these two journeys.
A project board must have at least 3 areas - todo, in progress, done

Add CRUD features for all three objects:
- It must be possible to view all the tasks on a project board.
- It must be possible to create a task on a project board.
- It must be possible to delete a task on a project board.
- It must be possible to edit a task on a project board.

A task must have textual description.
A task must start in the 'todo' state.
It must be possible to move tasks from one area to another. e.g. from 'todo' to 'in progress'.
A task must be either unassigned or assigned to a single user.
A user must have a name and an avatar (so we can recognise them).
Tasks that are assigned to a user need to display the user's avatar on the task.
It must be possible to create a new project board.
It must be possible to view all the project boards.
The application must have client & server-side validation in place.

Write test scripts in either Jest of Cypress to test out features (the application must have evidence of automated unit testing).

####  🚀 Timeframe - 1 week

#### 🔥 Team size - 3

## 🕹 Main Technologies Used
### Frontend & UI: 

* HTML5 (Handlebar)
* CSS3 (Bootstrap 5, Flexbox)
* JavaScript (ES6)
* Google fonts
* Figma

### Backend
- Nodemon
- Node.js
- Express
- SQLite3
- Sequelize

### Version Control
* Git
* GitHub

### Testing Suite
* Cypress


### ✔️ Approach Taken

#### 🔮 Project Plan ####
- Ideas and discussions, research, team brief, mockups
- Set up (libraries, backend and frontend basic scafolding)
- Backend functionality and database set up, testing endpoints and HTTP requests
- Frontend UI design, research, test API CRUD
- Adding new features to both ends
- Sanitize user inputs
- Styling and Troubleshooting
<!-- - Deployment (debug and deploy) -->


# Wireframing- Mockups Architecture

Our app comprises of 4 main pages: User, Project, Project Dashboard, and Tasks for single projects listing all tasks pertaining to the specific project.

We constructed a very basic mockup on figma to illustrate the user journey. The user must first select an avatar and confirm user name, before being able to view the next page to confirm the Project they will be able to create. Once a new project is created, they can view the project dashboard listing all created projects. The user is able to view tasks for each project upon clicking the link to view tasks and manage their statuses accordingly.

 <img src="https://i.imgur.com/wR8rpH3.png" style="width: 500px; display: block; margin: 0 auto;"/>

### User Page

<!-- <img src="" style="400px margin: 0 auto;" /> -->


### New Project Page

<!-- <img src="" style="400px margin: 0 auto;" /> -->

### Project Dashboard Page

<!-- <img src="" style="400px margin: 0 auto;" /> -->

### Project Tasks Page

<!-- <img src="" style="400px margin: 0 auto;" /> -->


## Sequelize - db.js, model.js, server.js

The objective was to implement a data model with Sequelize.

We first created `db.js` that sets up a connection to the database and imports sequelize types while establishing a filepath for the database.

```
const {Sequelize, DataTypes, Model} = require('sequelize');
const path = require('path');
const sequelize = new Sequelize('database', 'username', 'password', {
    dialect: 'sqlite',
    storage: path.join(__dirname, 'database.sqlite') //best practise for file paths
    
});

 module.exports={sequelize, DataTypes, Model};
```

## Defining the model in model.js

We quickly learnt models are fundamental in Sequelize and initialised 3 to represent our tables in our database.  It's represented by classes that extends Model. This format only requires us to extend from the Sequelize class Model as a method of inheritance. The addition of an `init` method defines the table columns and their types, while the `options` setting sets the `timestamps: false` to avoid a `created_at` column appearing. 

Below is an exerpt of the `Project` model:

```
class Project extends Model {

}

Project.init({
    name: DataTypes.STRING,
    summary: DataTypes.STRING,
}, options);

```

## Sequelize relationships in model.js

To connect tables in sequelize our model definitions needed to specify their relationships in order for Sequelize to generate new foreign key columns. The below lists the relational defintions between our models: 

```
Project.hasMany(Task)
User.hasMany(Task)
Task.belongsTo(User)
Task.belongsTo(Project)
```

## Handlebars

We used a templating framework called Handlebars to dynamically iterate, inject and render relevant information from our sequelize database. 
An exerpt of this is below: 

```
  <div class="row">
    {{#each projects}}
    <a href="/projects/{{this.id}}">
    <div class="col-sm-3">
      <div class="card">
        <div class="card-body">
          <h5 class="card-title">{{this.name}}</h5>
          <p class="card-text">{{this.summary}}</p>
          <a href="/projects/{{this.id}}" class="btn btn-primary">Open Project</a>
        </div>
      </div>
    </div>
    </a>
    {{/each}}
```

A Handlebars expression is content surrounded by {{ }}. When the template is executed, the expression is replaced with values from an input object.

### Handlebars File Structure

The views folder contains Handlebars templates which get rendered into layouts.

```
views
├── projects.handlebars
└── allProjects.handlebars
└── createProject.handlebars
└── createTask.handlebars
└── createUser.handlebars
└── layouts
    └── main.handlebars
```

## Drag and Drop Feature - projectBoard.js

In order to have a visual element to our task status management, we used the event listeners, `ondragstart`, `ondrop`, and the html attribute `draggable` to support our drag and drop feature from `projectBoard.js`. Below is an exerpt to identify the change in column ids depending on the position of the task the user is dragging the task between the three presented columns. We performed an async `patch` request using ajax to update and store on the server side with the change in column id. 

```
const updateColumn = await fetch(`/${draggable.id}/updatecolumn`, {
    method: 'PATCH',
    headers: {
        'Content-Type': 'application/json'
      },
    body: JSON.stringify({
    column: column.id,   
    taskId: draggable.id 
    
    })  
  })
  .then(response =>  {
      const res = response.json()    
})
.then(res => console.log(res))
}  

```



### 🧐 Challenges