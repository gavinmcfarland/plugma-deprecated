'use strict';

/**
 * This scripts appends the current version number to every node created.
 */
const fs = require('fs');
const { exec } = require("child_process");
const path = require('path');
var location;
if (process.env.PWD.endsWith("bin")) {
    if (process.env.PWD.endsWith(".bin")) {
        location = path.resolve(process.env.PWD + "/../..");
    }
    else {
        location = path.resolve(process.env.PWD + "/../../..");
    }
}
else {
    location = process.cwd();
}
const pkg = require(location + "/package.json");
const getFileUpdatedDate = (path) => {
    const stats = fs.statSync(path);
    return stats.mtime;
};
function injectCode(codePath, memory) {
    fs.readFile(codePath, "utf8", (err, data) => {
        // 1. First search for variable with match.
        // 2. Then search for matches within.
        if (err) {
            throw err;
        }
        function getVersionData() {
            var match = data.match(/^\/\/ pluginVersion=(.+)[\s|\n]*/);
            if (match) {
                data = data.replace(/^\/\/ pluginVersion=(.+)[\s|\n]*/, "");
                return match[1];
            }
            else {
                return false;
            }
        }
        // Don't inject code unless different from current version
        if (getVersionData() !== pkg.version) {
            // Perform a saftey check incase file has not been rebuilt. Want to avoid adding duplicated verison numbers
            if (getFileUpdatedDate(codePath).toString() !== memory.timestamp.toString()) {
                data = `// pluginVersion=${pkg.version}\n` + data;
                data = data.replace(/((?:const|var|let)\s*\w+\s*=\s*figma\.create\w+\D+(?:;|\n))/gmi, (match, p1, p2, p3, offset, string) => {
                    var matches = [];
                    match.replace(/(\w+)\s*=\s*figma\./gmi, (match, p1, p2, p3, offset, string) => {
                        matches.push(p1);
                    });
                    matches = matches.map((item) => `${item}.setPluginData("version", ${JSON.stringify(pkg.version)})`);
                    var newString = matches.join(";") + ";";
                    return match + newString;
                });
                fs.writeFile(codePath, data, (err) => {
                    if (err)
                        throw err;
                    // console.log('Version data added');
                });
            }
        }
    });
}
function cli(options) {
    var pathToMemory = __dirname + "/../bin/memory.json";
    var pathToPkg = location + "/package.json";
    var memory = require(pathToMemory);
    var codePath = location + "/code.js";
    if (typeof options.b === "string") {
        codePath = path.resolve(location, options.b);
    }
    if (typeof options.i === "string") {
        codePath = path.resolve(location, options.b);
    }
    // Set timestamp of when build was run was last modified
    memory.timestamp = getFileUpdatedDate(codePath);
    // Should increment version number?
    var shouldIncrementVersion = false;
    if (memory.lastIncrementedWithManifest
        && !memory.firstTimeIncrementedWithManifest
        && process.env.NODE_ENV === "manifest") {
        shouldIncrementVersion = true;
    }
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
    });
    // if (memory.timestamp !== getFileUpdatedDate(location + "/code.js"))
    // We check to see if the CLI was used to incremenet version, because if it was we don't want to increment it before being published
    if (shouldIncrementVersion || memory.firstTimeIncrementedWithManifest || process.env.NODE_ENV !== "manifest") {
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
                break;
        }
        pkg.version = versionSplit.join(".");
        var newPkg = JSON.stringify(pkg, null, '\t');
        fs.writeFile(pathToPkg, newPkg, (err) => {
            if (err)
                throw err;
            if (options.b || options.build || options.i) {
                // console.log('Updated version number!');
                // We need to create a new build first so that version data doesn't get duplicated
                // function shouldReinject() {
                // 	return getFileUpdatedDate(codePath).toString() === memory.timestamp.toString()
                // }
                if (options.i) {
                    // Need to make sure not injected when code already been injected
                    injectCode(codePath, memory);
                }
                else if (options.b || options.build) {
                    exec(`export PATH="$PATH:"/usr/local/bin/ && npm run --prefix ${location} build`, (error, stdout, stderr) => {
                        if (error) {
                            console.log(`error: ${error.message}`);
                            return;
                        }
                        if (stdout) {
                            // console.log(`stdout: ${stdout}`);
                            injectCode(codePath, memory);
                        }
                    });
                }
            }
        });
        console.log(`v${pkg.version}`);
    }
}

module.exports = cli;
