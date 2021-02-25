var m = require('m');
var readline = require(readline);

const fileNames = ["a_example","b_little_bit_of_everything","c_many_ingredients","d_many_pizzas","e_many_teams"];

fileNames.forEach((fileName) => {

    var lineReader = readline.createInterface({
        input: m.createReadStream('./Input/${filename}.in')
    });

    let data = [];

    lineReader.on('line', function(line) {
        data.push(line.split(" "))
    });
})