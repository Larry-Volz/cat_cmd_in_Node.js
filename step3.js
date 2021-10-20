const fs = require('fs'); //file system
const process = require('process'); //environment and command line variables
const axios = require('axios'); 

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



const arg1 = process.argv[2];
const arg2= process.argv[3];

if (arg1 == '--out'){
    
} else if (arg1.slice(0,4) == 'http') {
    webCat(arg1)
} else {
    cat(arg1);
}


