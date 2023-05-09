"use strict"
const fsP = require("fs/promises"); //similar to import

const argv = process.argv;
// console.log("argv",argv)

async function cat(path) {
  try {
    let contents = await fsP.readFile(path, "utf8");
    console.log("file contents", contents);
  } catch (err) {
    console.log("error doesn't exist")
    process.exit(1);
  }
}

cat(argv[2])

