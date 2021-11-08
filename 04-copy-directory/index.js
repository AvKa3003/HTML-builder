const fs = require('fs');
const path = require('path');

fs.mkdir(path.join(__dirname, 'files-copy'), { recursive: true }, (err) => {
    fs.readdir(path.join(__dirname, "files"), {withFileTypes: true}, (err, files) => {
        files.forEach(file => {
            fs.createReadStream(path.join(__dirname, "files", file.name)).pipe(fs.createWriteStream(path.join(__dirname, "files-copy", file.name)));
        });
    });
})