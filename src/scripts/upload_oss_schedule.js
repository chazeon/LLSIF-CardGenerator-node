const schedule = require('node-schedule')
const uploadTask = require('./upload_oss.js')
const winston = require('./winston.js')

schedule.scheduleJob('upload_oss', { rule: '0 10,25,45 15 5,10,20,25,30,31 * *', tz: 'Asia/Shanghai' }, function () {
    uploadTask()
    .then(() => winston.info('Everything is done!'))
})