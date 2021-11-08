const fs = require('fs');
const path = require('path');

fs.readdir(path.join(__dirname, 'secret-folder'), {withFileTypes: true}, (err, files) => {
    files.forEach(file => {
        if (file.isFile()) {
            const type = path.extname(path.join(__dirname, "secret-folder", file.name)).slice(1);
            const name = file.name.slice(0, -type.length - 1);
            fs.stat(path.join(__dirname, "secret-folder", file.name), (err, stats) => {
                console.log(name + " - " + type + " - " + stats.size/1024 + "kb");
            });
        }
    });
});