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
    let inField = true;
    let notHole = true;
    let notHat = true;

    // Check field boundaries
    if (lineIndex + moveLine < 0 || lineIndex + moveLine >= myField.fieldMap.length || pathIndex + moveIndex < 0 || pathIndex + moveIndex >= myField.fieldMap[lineIndex].length ) {
        inField = false;
        console.log({inField});
        return { inField, notHole, notHat };
    }

    // Move the character
    myField.fieldMap[lineIndex][pathIndex] = fieldCharacter;
    lineIndex += moveLine;
    pathIndex += moveIndex;

    // Check if hole or hat
    if (myField.fieldMap[lineIndex][pathIndex] === hole) {
        notHole = false;
    } else if (myField.fieldMap[lineIndex][pathIndex] === hat) {
        notHat = false;
    }

    // Display character in new position
    myField.fieldMap[lineIndex][pathIndex] = pathCharacter;

    // Return an object with notHole, notHat key+value
    console.log({inField, notHole, notHat});
    return { inField, notHole, notHat };
}

initiatePosition();
myField.print();

while (true) {
    let userInput = prompt('Which way do you wanna go?').toLowerCase();
    let moveResult;

    switch (userInput) {
        case 'l':
            moveResult = moveCharacter(0, -1);
            myField.print();
            break;
        case 'r':
            moveResult = moveCharacter(0, 1);
            myField.print();
            break;
        case 'u':
            moveResult = moveCharacter(-1, 0);
            myField.print();
            break;
        case 'd':
            moveResult = moveCharacter(1, 0);
            myField.print();
            break;
    };

    let {inField, notHole, notHat} = moveResult;    

    if (!inField) {
        console.log('You can\'t go that way!');
    }else if (!notHat) {
        console.log('You win!');
        break;
    } else if (!notHole) {
        console.log('You felt in a hole! Game over');
        break;
    }
}