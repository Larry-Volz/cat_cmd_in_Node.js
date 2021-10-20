const fs = require('fs');
const process = require('process');
const axios = require('axios')

function cat(path) {
    fs.readFile(path, 'utf8', function(err, data) {
    if (err) {
        // handle possible error
        console.error("cat threw this error:", err);
        // kill the process and tell the shell it errored
        process.exit(1);
  }
    // otherwise success
    console.log(`file contents: ${data}`);
});

console.log('reading file');
// file won't have been read yet at this point
}

async function webCat(path) {
    try {
        let resp = await axios.get(path);
        console.log(resp.data);
      } catch (err) {
        console.error(`Error fetching ${path}: ${err}`);
        process.exit(1);
      }
}

const argIn = process.argv[2];

if (argIn.slice(0,4) == 'http') {
    webCat(argIn)
}
else {
    cat(argIn);
}


