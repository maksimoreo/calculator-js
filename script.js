const DEC_DIGITS = 6;

function operationFunc(a, b, op) {
    let result;
    a = parseFloat(a);
    b = parseFloat(b);
    switch (op) {
        case 'add':
            result = a + b; break;
        case 'sub':
            result = a - b; break;
        case 'mul':
            result = a * b; break;
        case 'div':
            result = a / b; break;
        default:
            console.log(`Invalid operation: ${op}`);
            break;
    }

    result = Math.round(result * Math.pow(10, DEC_DIGITS)) / Math.pow(10, DEC_DIGITS);

    console.log(`Expression evaluated: ${a} ${op} ${b} = ${result}`);

    return result.toString();
}
// Number control
function updateOutput(text) {
    output.textContent = text;
}

function writeDigit(number, digit) {
    return number == '0' ? digit : number + digit;
}

function writeDot(number) {
    return number.indexOf('.') == -1 ? number + '.' : number;
}

function backspaceNumber(number) {
    return number.length > 1 ? number.slice(0, number.length - 1) : '0';
}

// Global variables
let currentNumber = '0';
let lastNumber = '0';

let inputToNumber = 'lastNumber';

let currentOperation = null;
let previousOperation = null;

function getInputNumber() {
    return currentOperation != null ? lastNumber : currentNumber;
}

function setInputNumber(number) {
    if (currentOperation != null) {
        lastNumber = number;
    } else {
        currentNumber = number;
    }
}

function log() {
    console.log(`currentNumber: ${currentNumber}, lastNumber: ${lastNumber}, currentOperation: ${currentOperation}, previousOperation: ${previousOperation}`);
}

// Event listener for digit buttons
for (let i = 0; i <= 9; i++) {
    let digitButton = document.querySelector(`#button-${i}`);
    digitButton.addEventListener('click', () => {
        setInputNumber(writeDigit(getInputNumber(), i.toString()));
        updateOutput(getInputNumber());
    });
}

// Dot button
let dotButton = document.querySelector('#button-dot');
dotButton.addEventListener('click', () => {
    setInputNumber(writeDot(getInputNumber()));
    updateOutput(getInputNumber());
});

// Event listener for operation buttons
['add', 'sub', 'mul', 'div'].forEach(operation => {
    let operationButton = document.querySelector(`#button-${operation}`);
    operationButton.addEventListener('click', () => {
        if (currentOperation != null) {
            // evaulate previous expression first
            currentNumber = operationFunc(currentNumber, lastNumber, currentOperation);
            currentOperation = operation;
            lastNumber = '0';
            updateOutput('0');
        } else if (previousOperation != null) {
            currentOperation = operation;
            lastNumber = '0';
            updateOutput('0');
        } else {
            currentOperation = operation;
            updateOutput('0');
        }
    });
});

// Equal button
let equalButton = document.querySelector('#button-equal');
equalButton.addEventListener('click', () => {
    if (currentOperation != null) {
        currentNumber = operationFunc(currentNumber, lastNumber, currentOperation);
        updateOutput(currentNumber);
        previousOperation = currentOperation;
        currentOperation = null;
    } else if (previousOperation != null) {
        currentNumber = operationFunc(currentNumber, lastNumber, previousOperation);
        updateOutput(currentNumber);
    }
});

// Clear button
let clearButton = document.querySelector('#button-clear');
clearButton.addEventListener('click', () => {
    currentNumber = '0';
    lastNumber = '0';
    currentOperation = null;
    previousOperation = null;
    updateOutput('0');
});

// Back button
let backButton = document.querySelector('#button-back');
backButton.addEventListener('click', () => {
    setInputNumber(backspaceNumber(getInputNumber()));
    updateOutput(getInputNumber());
});

// HTML Elements
let output = document.querySelector('#output-text');

updateOutput('0');
