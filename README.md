## Getting started

### Setting up a project

- Clone this repository: `git clone https://github.com/dhiralbhuptani/simform-backend.git`
- Move into the project directory: `cd backend-service`
- Install the dependencies: `yarn add`

### Working on the project

- Move into the project directory: `cd ~/YOUR_PROJECTS_DIRECTORY/YOUR_PROJECT_NAME`
- Add .env file and add APP_PORT, MongoDB connection details, JWT secret and expiration time in hours
- Run the development task: `npm start OR nodemon`
  - Starts a server running at http://localhost:8081
  - Automatically restarts when any of your files change

## Databases

By default, the template is configured to connect with MongoDB database.
DB dump CSV example file is in db/ directory.
