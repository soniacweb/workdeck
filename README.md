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

## 🚀 Timeframe

1 week

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
- Ideas research, team brief, Mockup
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



### 🧐 Challenges