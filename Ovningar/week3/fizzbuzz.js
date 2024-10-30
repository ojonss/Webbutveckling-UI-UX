function getUserInput() {
    var userNumber = prompt("Insert number", "0");
    if (!isNaN(userNumber)) {
        var num = parseInt(userNumber);
        countFizzbuzz(num);
    }
    else {
        alert("Insertet value not a int");
    }
}

function countFizzbuzz(input) {
    var num = input;
    let fizz = "fizz";
    var fizzCount = 0;
    let buzz = "buzz";
    var buzzCount = 0;
    let fizzbuzz = "fizzbuzz";
    var fizzbuzzCount = 0;

    let i = 1;
    while (i <= num) {
        if (i % 3 === 0 && i % 5 === 0) {
            console.log(fizzbuzz);
            fizzbuzzCount++;
        }
        else if (i % 3 === 0) {
            console.log(fizz);
            fizzCount++;
        }
        else if (i % 5 === 0) {
            console.log(buzz);
            buzzCount++;
        }
        else {
            console.log(i);
        }
        i++;
    }
    console.log("Fizzbuzz: " + fizzbuzzCount + ", fizz: " + fizzCount + ", buzz: " + buzzCount);
}

function findNumber(){
    var userNumber = prompt("Insert number", "0");
    const number = [];
    let i = 0;
    
    while (i < userNumber.length) {
        if (!isNaN(userNumber[i]) && userNumber[i] !== " ") {
            number.push(userNumber[i]);
        }
        i++;
    }

    let sum = parseInt(number.join(""), 10);

    countFizzbuzz(sum);
}