const path = require('path')

module.exports = {
    table: path.join(__dirname, "convertTable", "table.json"),
    convert: path.join(__dirname, "convertTable", "convert.json"),
    input: path.join(__dirname, "inputFile", "input.json"),
    output: path.join(__dirname, "outputFile", "output.json"),
}