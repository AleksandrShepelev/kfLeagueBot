const {createLogger, format, transports}  = require('winston');
const config = require('./index');

const myFormat = format.printf(({ level, message, timestamp }) => {
    return `${timestamp} ${level}: ${message}`;
});


const logger = createLogger({
    level: config.logging.level,
    format: format.combine(
      format.timestamp(),
      myFormat
    ),
    transports: [
        new transports.Console()
    ]
});

module.exports = logger;


