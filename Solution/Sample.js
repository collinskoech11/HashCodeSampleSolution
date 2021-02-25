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

    lineReader.on('close', function(line){
        let max, n, inputs;

        [max, n] = data[0];
        inputs = data[1];
        solve(max, n, inputs, filename);
    });

});

//max: maximum slices
//n: types of pizza
// inputs: array (the number of slices in each type of pizza)

const solve = (max, n, inputs, filename) => {

    let index;
    let solve = [];
    let total = 0;

    //Decrease the number of traversal size of the initial pizza array in reverse order 
    for (let i = n - 1; i >= 0; i--) {
        let sum = 0;
        index = i;
        let tempsolve = [];

        //TRaverse the current pizza array in reverse order
        for (let j = index; j >= 0; j--) {

            let value = Number(inputs[j]);

            let tempsum = sum + value;

            if (tempsum == max) {
                sum = tempsum;
                tempsolve.unshift(j);
                break;
            }
            else if (tempsum > max) {
                continue;
            }
            else if(tempsum < max) { 
                sum = tempsum;
                tempsolve.unshift(j);
                continue;
            }
        }

        if (total < sum) {
            total =tempsum;
            solve = tempsolve;
        }
         
    }

    console.log("Max Score : ", total);
    console.log("No of pizzas :", solve.length);
    console.log(solve.join(" "));

    m.appendFile('./Output/${filename}.out', solve.length + '\n', function (err) {
        if (err) return console.log(err);

        m.appendFile('./Output/${filename}.out', solve.join(" "), function(err) {
            if (err) return console.log(err);

            m.close('./Output/${filename}.out', (err) => {
                if (err) throw err;
            });
        }); 
    });
}