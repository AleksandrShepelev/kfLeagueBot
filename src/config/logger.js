const {createLogger, format, transports} = require('winston');
const config = require('./index');

const logger = createLogger({
    level: config.logging.level,
    format: format.combine(
        format.errors({stack: true}),
        format.timestamp({
            format: 'YYYY-MM-DD HH:mm:ss'
        }),
        format.colorize(),
    ),
    transports: [
        new transports.Console()
    ]
});

module.exports = logger;


