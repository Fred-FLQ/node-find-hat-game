const prompt = require('prompt-sync')({ sigint: true });

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';

class Field {
    constructor(fieldMap) {
        this.fieldMap = fieldMap;
    }
    print() {
        for (let i = 0; i < this.fieldMap.length; i++) {
            console.log(this.fieldMap[i].join(''));
        }
    }
};

const myField = new Field([
    ['*', '░', 'O'],
    ['░', 'O', '░'],
    ['░', '^', '░'],
]);

let lineIndex;
let pathIndex;

// Finding pathCharacter in the 2D array
const findCurrentPosition = () => {
    for (let i = 0; i < myField.fieldMap.length; i++) {
        if (myField.fieldMap[i].indexOf(pathCharacter) !== -1) {
            lineIndex = i;
            pathIndex = myField.fieldMap[i].indexOf(pathCharacter);
            break;
        }
    }
}

findCurrentPosition();
myField.print();

while (true) {
    let userInput = prompt('Which way do you wanna go?').toLowerCase();
    //console.log([lineIndex, pathIndex]); // For debugging

    const notHole = myField.fieldMap[lineIndex][pathIndex] !== hole;
    const notHat = myField.fieldMap[lineIndex][pathIndex] !== hat;

    const moveCharacter = (moveLine, moveIndex) => {
        myField.fieldMap[lineIndex + moveLine][pathIndex + moveIndex] = pathCharacter;
    }

    switch (userInput) {
        case 'l':
            myField.fieldMap[lineIndex][pathIndex] = fieldCharacter;
            moveCharacter(0, -1);
            findCurrentPosition();
            console.log('You went LEFT.');
            myField.print();
            break;
        case 'r':
            myField.fieldMap[lineIndex][pathIndex] = fieldCharacter;
            moveCharacter(0, 1);
            findCurrentPosition();
            //console.log([lineIndex, pathIndex]); // For debugging
            console.log('You went RIGHT.');
            myField.print();
            break;
        case 'u':
            console.log('You went UP.');
            myField.print();
            break;
        case 'd':
            console.log('You went DOWN.');
            myField.print();
            break;
    };

    if (!notHat) {
        console.log("You win!");
        break;
    } else if (!notHole) {
        console.log("You felt in a hole! Game over");
        break;
    }
}

// if go right:
//CHECK: if (myField.fieldMap[lineIndex][pathIndex + 1] < myField.fieldMap[lineIndex].length) {
//
//}

// function with 'move' as first parameter called inside the switch statement
