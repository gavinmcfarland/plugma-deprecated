'use strict';

/**
 * This scripts appends the current version number to every node created.
 */
// TODO: Is it too hard to try and add this after it's been minimised? I guess would run into this issue anyway, if someone used abbreviated form of declaring variables.
const fs = require('fs');
function build() {
    console.log("hello");
    var path;
    if (process.env.NODE_ENV === 'test') {
        path = process.cwd() + '/src/stub/';
    }
    else {
        path = process.cwd();
    }
    const pkg = require(path + "/package.json");
    fs.readFile(path + "/code.js", "utf8", (err, data) => {
        data = data.replace(/((\w+)\s*=\s*figma\.createRectangle\(\)\s*[;|\n|,])/gmi, `$1;\n$2.setPluginData("version", ${JSON.stringify(pkg.version)});`);
        fs.writeFile(path + "/code.js", data, (err) => {
            if (err)
                throw err;
            console.log('The file has been saved!');
        });
    });
}

module.exports = build;
