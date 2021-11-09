const fs = require('fs');
const path = require('path');

fs.mkdir(path.join(__dirname, "project-dist"), { recursive: true }, err => {
    if(err) throw err;
});

fs.createReadStream(path.join(__dirname, "template.html")).pipe(fs.createWriteStream(path.join(__dirname, "project-dist", "index.html")));

fs.readFile(path.join(__dirname, "template.html"), 'utf8', function(err, data) {
    let newData = data;
    let components = new Set();
    let curPos = 0;
    while (data.indexOf("{{", curPos) != -1) {
        components.add(data.slice(data.indexOf("{{", curPos), data.indexOf("}}", data.indexOf("{{", curPos)) + 2));
        curPos = data.indexOf("{{", curPos) + 1;
    }
    for (let component of components) {
        fs.readFile(path.join(__dirname, "components", `${component.slice(2, -2)}.html`), 'utf-8', (err, data) => {
            newData = newData.replace(component, data);
            fs.writeFile(path.join(__dirname, "project-dist", "index.html"), newData, "utf8", function(err) {
                if (err) throw err;
            })
        })
    }
});

var stream =  fs.createWriteStream(path.join(__dirname, 'project-dist', 'style.css'));

fs.readdir(path.join(__dirname, 'styles'), {withFileTypes: true}, (err, files) => {
    files.forEach(file => {
        const type = path.extname(path.join(__dirname, "secret-folder", file.name)).slice(1);
        if (file.isFile() && type == 'css') {
            var streamWrite = new fs.ReadStream(path.join(__dirname, 'styles', file.name), {encoding: 'utf-8'});
            streamWrite.on('readable', function(){
                var data = streamWrite.read();
                if(data != null) stream.write(data);
            });
        }
    });
});

fs.mkdir(path.join(__dirname, 'project-dist', 'assets'), { recursive: true }, (err) => {
    fs.readdir(path.join(__dirname, "assets"), {withFileTypes: true}, (err, dirs) => {
        dirs.forEach(dir => {
            fs.mkdir(path.join(__dirname, 'project-dist', 'assets', dir.name), { recursive: true }, (err) => {
                fs.readdir(path.join(__dirname, "assets", dir.name), {withFileTypes: true}, (err, files) => {
                    files.forEach(file => {
                        fs.createReadStream(path.join(__dirname, "assets", dir.name, file.name)).pipe(fs.createWriteStream(path.join(__dirname, "project-dist", "assets", dir.name, file.name)));
                    });
                });
            });
        });
    });
});