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
const initiatePosition = () => {
    for (let i = 0; i < myField.fieldMap.length; i++) {
        if (myField.fieldMap[i].indexOf(pathCharacter) !== -1) {
            lineIndex = i;
            pathIndex = myField.fieldMap[i].indexOf(pathCharacter);
            break;
        }
    }
}

// Moving Character and updating position
const moveCharacter = (moveLine, moveIndex) => {
    myField.fieldMap[lineIndex][pathIndex] = fieldCharacter;
    lineIndex += moveLine;
    pathIndex += moveIndex;
    myField.fieldMap[lineIndex][pathIndex] = pathCharacter;
}

initiatePosition();
myField.print();

while (true) {
    let userInput = prompt('Which way do you wanna go?').toLowerCase();
    // console.log([lineIndex, pathIndex]); // For debugging

    let notHole = true;
    let notHat = true;

    switch (userInput) {
        case 'l':
            moveCharacter(0, -1);
            myField.print();
            break;
        case 'r':
            moveCharacter(0, 1);
            myField.print();
            break;
        case 'u':
            moveCharacter(-1, 0);
            myField.print();
            break;
        case 'd':
            moveCharacter(1, 0);
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
