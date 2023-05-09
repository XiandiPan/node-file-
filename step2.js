"use strict"

const fsP = require("fs/promises"); //similar to import
const axios = require("axios");
const { stringify } = require("querystring");

const argv = process.argv;

/** determine if path is a file that exists or is url
 * log file contents if no error
 * if an error, invoke our webCat function
*/

async function cat(path) {
  try {
    let contents = await fsP.readFile(path, "utf8");
    console.log("file contents =>", contents);
    return contents;
  } catch (err) {
    console.log('file does not exist');
    process.exit(1);
  }
}

/** Axios call to get first 80 char of response data if valid url
 * if not a valid url will log an error
 */

async function webCat(url) {
    try {
        const response = await axios({url:`${url}`});
        console.log('here is the response data=>',response.data.slice(0, 80), "...");
    } catch (err) {
        console.log('error:', err.message);
    }
}

if (argv[2].startsWith('http')) {
  console.log('is URL');
  webCat(argv[2]);
} else {
  console.log('is txt file');
  cat(argv[2]);
}
