const express = require('express');
const cors = require('cors');
const chalk = require('chalk');

const mongooseConnect = require('./config/mongooseConnect');
const userRoutes = require('./routes/user.routes');

//** Create an instance of express to serve API endpoints */
const app = express();

//** Globals */
global.chalk = chalk;

//** MongoDB connection */
mongooseConnect();

const corsOptions = {};
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded( { extended: true }));
app.use("/uploads", express.static("uploads"));

//** Routes
app.use('/api/users', userRoutes);

app.all('/*', function(req, res, next) {
  return res.status(404).json({
    message: 'This is not a valid request!'
  });
});

process.on('beforeExit', code => {
  setTimeout(() => {
    console.log(`${chalk.gray('Process will exit with code: ')}${chalk.red(code)}`);
    process.exit(code);
  }, 100);
});

process.on('exit', code => {
  // Only synchronous calls
  console.log(`${chalk.gray('Process exited with code: ')} ${chalk.red(code)}`);
});

//** Promise Handler */
process.on('unhandledRejection', error => {
  console.log(`${chalk.gray('Unhandled Rejection: ')}${chalk.red(error)}`);
});

process.on('uncaughtException', error => {
  console.log(`${chalk.gray('Uncaught Exception: ')}${chalk.red(error)}`);
  process.exit(1);
});

module.exports = app;