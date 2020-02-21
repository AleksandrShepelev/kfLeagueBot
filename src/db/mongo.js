const mongoose = require('mongoose');
const util = require('util');
const sleep = util.promisify(setTimeout);

class MongoConnector {
  constructor(config, logger) {
    this.config = config;
    this.logger = logger;
  }

  getUri() {
    if (this.config.mongo.user && this.config.mongo.pass) {
      return `mongodb://${this.config.mongo.user}:${this.config.mongo.pass}@${this.config.mongo.host}:${this.config.mongo.port}/${this.config.mongo.db}`
    }
    return `mongodb://${this.config.mongo.host}:${this.config.mongo.port}/${this.config.mongo.db}`
  }

  async connectToMongo() {
    mongoose.set('useCreateIndex', true);
    mongoose.set('useFindAndModify', false);
    mongoose.connection.on('error', err => {
      this.logger.error(err);
    });

    mongoose.connection.on('disconnected', () => {
      this.logger.info('Disconnected from mongodb');
    });

    mongoose.connection.on('reconnected', () => {
      this.logger.info('Reconnected to mongodb');
    });

    mongoose.connection.on('reconnectFailed', () => {
      this.logger.info('Reconnect failed to mongodb');
      process.exit(1);
    });

    mongoose.connection.once('open', () => {
      this.logger.info('Connected to mongodb');
    });
    //this.logger.debug(`connecting to ${this.getUri()}`);

    await this.tryFewTimes(() => mongoose.connect(
      this.getUri(),
      {
        useNewUrlParser: true,
        autoReconnect: true,
        reconnectInterval: this.config.mongo.sleep,
        reconnectTries: this.config.mongo.retries,
      }
    ));
  };

  async tryFewTimes(generator) {
    let retries = 0;
    while (retries < this.config.mongo.retries) {
      try {
        return await generator();
      } catch (err) {
        retries++;
        this.logger.info('Mongo connect failed. Attempt number: ${retries}. Sleep: ${sleep}', {retries, sleep: this.config.mongo.sleep});
        await sleep(this.config.mongo.sleep);
      }
    }
    this.logger.warn('Cannot connect to mongo in ${retries} attempts. Will exit', {retries});
    process.exit(1);
  };
}


module.exports = MongoConnector;
