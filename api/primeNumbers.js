const express = require('express');
const router = express.Router()

router.post("/primeNumbers",function(req,res){

    const { max } = req.body
    var array = [], upperLimit = Math.sqrt(max), output = [], median = [];

    // Make an array from 2 to (n - 1)
    for (var i = 0; i < max; i++) {
        array.push(true);
    }

    // Remove multiples of primes starting from 2, 3, 5,...
    for (var i = 2; i <= upperLimit; i++) {
        if (array[i]) {
            for (var j = i * i; j < max; j += i) {
                array[j] = false;
            }
        }
    }

    // All array[i] set to true are primes
    for (var i = 2; i < max; i++) {
        if(array[i]) {
            output.push(i);
        }
    }

    var half = Math.floor(output.length / 2);

    if (output.length % 2){
        median.push(output[half]);
    }
    else {
        median.push(output[half-1],output[half])
    }
    res.status(200).send({
        median
    });
})

module.exports = router