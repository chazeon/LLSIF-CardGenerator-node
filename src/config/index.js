const fs = require("fs")
module.exports = JSON.parse(fs.readFileSync("config/config.json", "utf8"))