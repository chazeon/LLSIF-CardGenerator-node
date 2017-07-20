const OSS = require('ali-oss').Wrapper
const _ = require('lodash')
const fs = require('fs')

const genTasks = require('./gen_tasks.js')
const winston = require('./winston.js')

async function getFileList(client) {
    let fileList = []
    let nextMarker = null
    do {
        let response = await client.list({
            'marker': nextMarker,
            'max-keys': 1000
        })
        nextMarker = response.nextMarker
        let objects = response.objects || []
        fileList = _.concat(fileList, objects.map(object => object.name))
    } while (nextMarker)
    return fileList
}

async function uploadTask() {
    const client = new OSS(JSON.parse(fs.readFileSync('config/oss.json', 'utf-8')))
    let fileList = await getFileList(client)
    winston.info(`This bucket has ${fileList.length} objects already.`)
    const tasks = await genTasks()
    winston.info(`${tasks.length} tasks in total.`)
    for (let task of tasks) {
        if (fileList.indexOf(task.path) === -1) {
            winston.verbose(`Processing ${task.path} started.`)
            let buffer = await task.getBuffer()
            try {
                winston.verbose(`Upload ${task.path} started.`)
                await client.put(task.path, buffer)
                fileList.push(task.path)
            }
            catch (err) {
                winston.error(err)
            }
            winston.verbose(`Upload ${task.path} finished.`)
        } else {
            winston.verbose(`Processing ${task.path} skipped.`)
        }
    }
}

uploadTask()
.then(result => {
    winston.info('Everything is done.')
})

