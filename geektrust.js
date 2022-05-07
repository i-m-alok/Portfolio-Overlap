const fs = require("fs");
const source = require("./src");
const filename = process.argv[2]

fs.readFile(filename, "utf8", (err, data) => {
    // console.log(err)
    if (err) throw err
    var inputLines = data.toString().split("\n")
    // Add your code here to process input commands
    // console.log(inputLines)
    source.processInputLines(inputLines)
})
