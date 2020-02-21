module.exports = {
    serverEnv: process.env.SERVER_ENV || 'local',
    app: {
        name: process.env.APP_NAME || 'plasma-processor'
    },
    logging: {
        level: process.env.LOG_LEVEL || 'debug',
        format: process.env.LOG_FORMAT || 'text',
    },
    mongo: {
        retries: process.env.MONGO_RETRIES || 10,
        sleep: process.env.MONGO_SLEEP || 3000,
        user: process.env.DB_USER || "",
        pass: process.env.DB_PASS || "",
        host: process.env.DB_HOST || "localhost",
        port: process.env.DB_PORT || "27017",
        db: process.env.DB || "kf-bot",
    },
    service: {
        tgToken: process.env.TG_TOKEN || "1044282259:AAGONXcJI4EX7wthv7Uuiea9eF1qiUu7VJI",
    },
};
