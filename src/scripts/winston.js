const winston = require("winston")
require('winston-daily-rotate-file')

winston.configure({
    transports: [
        new (winston.transports.DailyRotateFile)({
            name: "daily_rotate_file.debug",
            filename: "./runtime/log/debug-",
            datePattern: 'yyyyMMdd.log',
            level: "debug"
        }),
        new (winston.transports.DailyRotateFile)({
            name: "daily_rotate_file.verbose",
            filename: "./runtime/log/verbose-",
            datePattern: 'yyyyMMdd.log',
            level: "verbose"
        }),
        new (winston.transports.DailyRotateFile)({
            name: "daily_rotate_file.info",
            filename: "./runtime/log/info-",
            datePattern: 'yyyyMMdd.log',
            level: "info"
        }),
        new (winston.transports.Console)({
            colorize: true,
            timestamp: () => (new Date()).toISOString(),
            level: "verbose"
        })
    ],
    exceptionHandlers: [
        new (winston.transports.DailyRotateFile)({
            name: "daily_rotate_file.exceptions",
            filename: "./runtime/log/exceptions-",
            datePattern: 'yyyyMMdd.log',
            handleExceptions: true,
        }),
        new (winston.transports.Console)({
            colorize: true,
            timestamp: () => (new Date()).toISOString(),
            handleExceptions: true,
            humanReadableUnhandledException: true
        })

    ]
})

module.exports = winston