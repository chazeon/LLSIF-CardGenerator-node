const Promise = require('bluebird')
const walk = require('fs-walk')
const sharp = require('sharp')
const path = require('path')
const mkdirp = require('mkdirp')
const fs = require('fs')

function convertImage(basedir, filename, stat, callback) {
    let filePath = path.join(basedir, filename)
    let relativePath = path.relative('runtime/generated', filePath)
    let outputPath = path.join('runtime/generated', 'thumbnail', relativePath)
    if (fs.existsSync(outputPath)) return callback()
    sharp(filePath).resize(null, 240)
    .png({ progressive: true })
    .toFile(outputPath, callback)
}

function createFolder(basedir, foldername, stat, callback) {
    let folderPath = path.join(basedir, foldername)
    let relativePath = path.relative('runtime/generated', folderPath)
    let outputPath = path.join('runtime/generated', 'thumbnail', relativePath)
    mkdirp(outputPath, callback)
}

walk.walk('runtime/generated',
(basedir, filename, stat, next) => {
    if (basedir.indexOf('thumbnail') !== -1 || basedir.indexOf('tiny') !== -1 || basedir.indexOf('icon') !== -1) next()
    else if (stat.isDirectory()) createFolder(basedir, filename, stat, next)
    else convertImage(basedir, filename, stat, next)
}, (err) => {
    if (err) throw err
})
