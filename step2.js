"use strict"

const fsP = require("fs/promises"); //similar to import
const axios = require("axios");

const argv = process.argv;
// console.log("argv",argv)

async function cat(path) {
  try {
    let contents = await fsP.readFile(path, "utf8");
    console.log("file contents =>", contents);
    return contents;
  } catch (err) {
    console.log('file does not exist');
    // if error then invoke webCat with passed in arg
    await webCat(path)
    process.exit(1);
  }
}

async function webCat(url) {
    try {
        const response = await axios({url:`${url}`});
        console.log('here is the response data=>',response.data.slice(0, 80), "...");
    } catch (err) {
        console.log('error:', err.message);
    }
}


cat(argv[2]);