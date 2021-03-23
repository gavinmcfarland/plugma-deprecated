'use strict';

/**
 * This scripts appends the current version number to every node created.
 */
const fs = require('fs');
var location;
if (process.env.NODE_ENV === 'test') {
    location = process.cwd() + '/src/stub/';
}
else {
    location = process.cwd();
}
const pkg = require(location + "/package.json");
function cli(options) {
    var pathToMemory = __dirname + "/../bin/memory.json";
    var pathToPkg = location + "/package.json";
    var memory = require(pathToMemory);
    if (memory.lastIncrementedWithManifest
        && !memory.firstTimeIncrementedWithManifest
        && process.env.NODE_ENV === "manifest") ;
    // Change state of memory
    if (process.env.NODE_ENV === "manifest") {
        memory.firstTimeIncrementedWithManifest = false;
        memory.lastIncrementedWithManifest = true;
    }
    else {
        memory.lastIncrementedWithManifest = false;
    }
    var newMemory = JSON.stringify(memory, null, '\t');
    fs.writeFile(pathToMemory, newMemory, (err) => {
        if (err)
            throw err;
        console.log('Memory updated!');
    });
    // Update version number
    var versionSplit = pkg.version.split(".");
    versionSplit = versionSplit.map((item => parseInt(item)));
    switch (options.name) {
        case "patch":
            versionSplit[2] += 1;
            break;
        case "minor":
            versionSplit[1] += 1;
            break;
        case "major":
            versionSplit[0] += 1;
    }
    pkg.version = versionSplit.join(".");
    console.log(pkg.version);
    var newPkg = JSON.stringify(pkg, null, '\t');
    fs.writeFile(pathToPkg, newPkg, (err) => {
        if (err)
            throw err;
        console.log('Updated version number!');
    });
    // injectCode()
}

module.exports = cli;
