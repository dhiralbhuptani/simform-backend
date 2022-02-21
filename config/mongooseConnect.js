const mongoose = require('mongoose');

const { MONGO_DB_HOST, MONGO_DB_NAME, MONGO_DB_PORT } = process.env;

mongoose.Promise = Promise;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

/**
 * 
 ** Mongoose Connection
 * 
*/
const mongooseConnect = async () => {  
  try {
    const MONGO_URI = `mongodb://${MONGO_DB_HOST}:${MONGO_DB_PORT}/${MONGO_DB_NAME}?retryWrites=true&w=majority`;
    mongoose.connect(MONGO_URI, options);

    const connection = mongoose.connection;
    connection.once('open', () => {
      console.log(`${chalk.blue('MongoDB Connection')} (${chalk.green(MONGO_DB_NAME)}) ${chalk.blue('has been established successfully.')}`);
    });
  } catch (error) {
    logger.error(`Connection to MongoDB failed: ${error}`);
  }
};

module.exports = mongooseConnect;