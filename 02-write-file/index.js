const fs = require('fs');
const path = require('path');
const readline = require('readline');

var stream =  fs.createWriteStream(path.join(__dirname, 'text.txt'));
console.log("Введите строку");

var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

process.openStdin().on("keypress", function(chunk, key) {
    if(key && key.name === "c" && key.ctrl) {
        console.log("Конец ввода");
        process.exit();
    }
});

function writeInFile() {
    rl.question('', (answer) => {
        if (answer == "exit"){
            rl.close();
            console.log("Конец ввода");
        } else {
            stream.write(answer + '\n');
            writeInFile();
        }
    });
}

writeInFile();