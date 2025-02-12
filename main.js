const prompt = require('prompt-sync')({ sigint: true });

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';

class Field {
    constructor(fieldMap) {
        this.fieldMap = fieldMap;
        this.lineIndex = 0;
        this.pathIndex = 0;
        this.initiatePosition();
    }

    // Display fieldMap
    print() {
        for (let i = 0; i < this.fieldMap.length; i++) {
            console.log(this.fieldMap[i].join(''));
        }
    }

    // Find pathCharacter in the 2D array
    initiatePosition() {
        for (let i = 0; i < this.fieldMap.length; i++) {
            if (this.fieldMap[i].indexOf(pathCharacter) !== -1) {
                this.lineIndex = i;
                this.pathIndex = this.fieldMap[i].indexOf(pathCharacter);
                break;
            }
        }
    }

    // Generate a random field
    static generateField(fieldHeight, fieldWidth) {
        let newField = [];
        for (let i = 0; i < fieldHeight; i++) {
            newField.push([]);
            for (let j = 0; j < fieldWidth; j++) {
                newField[i].push(Math.random() >= 0.3 ? fieldCharacter : hole);
            }
        }

        // Place hat on field
        let hatPlaced = false;
        while (!hatPlaced) {
            let hatLineIndex = Math.floor(Math.random() * fieldHeight);
            let hatPathIndex = Math.floor(Math.random() * fieldWidth);
            if (newField[hatLineIndex][hatPathIndex] !== hole) {
                newField[hatLineIndex][hatPathIndex] = hat;
                hatPlaced = true;
            }
        }

        // Place pathCharacter on field
        let pathCharacterPlaced = false;
        while (!pathCharacterPlaced) {
            let pathCharLineIndex = Math.floor(Math.random() * fieldHeight);
            let pathCharPathIndex = Math.floor(Math.random() * fieldWidth);
            if (newField[pathCharLineIndex][pathCharPathIndex] !== hole && newField[pathCharLineIndex][pathCharPathIndex] !== hat) {
                newField[pathCharLineIndex][pathCharPathIndex] = pathCharacter;
                pathCharacterPlaced = true;
            }
        }

        return newField;
    }

    // Move pathCharacter and update position
    moveCharacter(moveLine, moveIndex) {
        let inField = true;
        let notHole = true;
        let notHat = true;

        // Check field boundaries
        if (this.lineIndex + moveLine < 0 || this.lineIndex + moveLine >= this.fieldMap.length || this.pathIndex + moveIndex < 0 || this.pathIndex + moveIndex >= this.fieldMap[this.lineIndex].length) {
            inField = false;
            return { inField, notHole, notHat };
        }

        // Move the character
        this.fieldMap[this.lineIndex][this.pathIndex] = fieldCharacter;
        this.lineIndex += moveLine;
        this.pathIndex += moveIndex;

        // Check if hole or hat
        if (this.fieldMap[this.lineIndex][this.pathIndex] === hole) {
            notHole = false;
        } else if (this.fieldMap[this.lineIndex][this.pathIndex] === hat) {
            notHat = false;
        }

        // Display character in new position
        this.fieldMap[this.lineIndex][this.pathIndex] = pathCharacter;

        // Return an object for use in while loop
        return { inField, notHole, notHat };
    }

    // Initiate game
    startGame() {
        this.print();

        while (true) {
            let userInput = prompt('Which way do you wanna go?').toLowerCase();
            let moveResult;

            switch (userInput) {
                case 'l':
                    moveResult = this.moveCharacter(0, -1);
                    break;
                case 'r':
                    moveResult = this.moveCharacter(0, 1);
                    break;
                case 'u':
                    moveResult = this.moveCharacter(-1, 0);
                    break;
                case 'd':
                    moveResult = this.moveCharacter(1, 0);
                    break;
                default:
                    console.log('Incorrect input: please use "l", "r", "u" or "d".');
            };

            this.print();

            let { inField, notHole, notHat } = moveResult;

            if (!inField) {
                console.log('You can\'t go that way!');
            } else if (!notHat) {
                console.log('You win!');
                break;
            } else if (!notHole) {
                console.log('You felt in a hole! Game over');
                break;
            }
        }
    }
};

const field1 = Field.generateField(5, 6);
const myField = new Field(field1);

myField.startGame();