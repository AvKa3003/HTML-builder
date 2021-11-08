const fs = require('fs');
const path = require('path');

var stream =  fs.createWriteStream(path.join(__dirname, 'project-dist', 'bundle.css'));

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