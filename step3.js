const fs = require('fs'); //file system
const process = require('process'); //environment and command line variables
const axios = require('axios'); 

function handleOutput(data, outputFile){
    if (outputFile){
        fs.writeFile(outputFile, data, 'utf8', err =>{
            if(err){
                console.error(`Could not write ${outputFile}. Error: ${err}`)
            }
        })
    } else {
        console.log(data);
    }
}

function cat(path, outputFile) {
    fs.readFile(path, 'utf8', function(err, data) {
        if (err) {
            // handle possible error
            console.error("cat threw this error:", err);
            // kill the process and tell the shell it errored
            process.exit(1);
        }
        // otherwise success
        handleOutput(data, outputFile);
    });
    
 }
    
    
    async function webCat(path, outputFile) {
        try {
            let resp = await axios.get(path);
            handleOutput(resp.data, outputFile)
        } catch (err) {
            console.error(`Error fetching ${path}: ${err}`);
            process.exit(1);
        }
    }
    
    
    let path;
    let outputFile;
    
    if (process.argv[2] === '--out'){
        outputFile = process.argv[3];
        path = process.argv[4];
    } else {
        path = process.argv[2];
    }
    
    if (path.slice(0, 4) === 'http') {
        webCat(path, outputFile);
    } else {
        cat(path, outputFile);
    }
    