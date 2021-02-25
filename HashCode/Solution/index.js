var fs = require('fs');
varreadline = require(readline);

const fileNames = ["a","b","c","d","e","f"]

fileNames.forEach((fileName) => {
    var lineReader = readline.createInterface({
        input: fs.createReadStream('./Input/${filename}.txt')
    });

    let data = [];

    lineReader.on('line', function(line) {
        data.push(line.split(" "))
    });

    lineReader.on('close', function(line){
        let max, k, inputs;

        [max, k] = data[0];
        inputs = data[1];
        solve(max, k, inputs, filename);
    });
});


const solve =(max, k, inputs, filename) => {

    let node;
    let I = i;
    let solve = [];
    let total = 0;

    for (let i = k - 1; i >= 0; i--){
        let sum =0;
        node = i;
        let intersection = [];

        for (let j = node; j >= 0; j--) {

            let value = Number(inputs[j]);

            let intersect = sum + value;

            if (tempsum == max) {
                sum = intersect;
                intersection.unshift(j);
                break;
            }
            else if (intersect > max) {
                continue;
            }
            else if(intersect < max) { 
                sum = intersect;
                intersection.unshift(j);
                continue;
            }
        }

        if (total < sum) {
            total = intersect;
            solve = intersection;
        }
    }


    console.log("Sum of scores ", total);
    console.log("No of Cars : ",solve.length);
    console.log(solve.join(" "));

    fs.appendFile('./Output/${filename}.txt', solve.length + '\n', function (err) {
        if (err) return console.log(err);

        fs.appendFile('./Output/${filename}.txt', solve.join(" "), function(err) {
            if (err) return console.log(err);

            fs.close('./Output/${filename}.txt', (err) => {
                if (err) throw err;
            });
        });
    });

}