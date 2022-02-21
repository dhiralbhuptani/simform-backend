require('dotenv').config();
const http = require('http');
//** Get express app instance */ 
const app = require('./app');

//** Env variables */
const { APP_PORT } = process.env;

//** Server configuration */
app.set('APP_PORT', APP_PORT);
const server = http.createServer(app);
server.listen(
  app.get('APP_PORT'), 
  () => console.log(`${chalk.blue('App listening on PORT:')} ${chalk.green(APP_PORT)}`)
);