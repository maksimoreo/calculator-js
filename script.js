const DEC_DIGITS = 6;

function operationFunc(a, b, op) {
    let result;
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

    console.log(`Expression evaluated: ${a} ${op} ${b} = ${result}`);

    return result;
}

function updateOutput(text) {
    output.textContent = text;
}

function updateOutputNumber(number) {
    text = number.toString();
    let dotIndex = text.indexOf('.');
    if (dotIndex != -1) {
        text = text.slice(0, dotIndex) + text.slice(dotIndex, dotIndex + DEC_DIGITS + 1);
    }
    updateOutput(text);
}

function writeDigit(number, digit) {
    number = number * 10 + digit;
    return number;
}

// Global variables
let currentNumber = 0;
let lastNumber = 0;

let inputToNumber = 'lastNumber';

let currentOperation = null;
let previousOperation = null;

// Event listener for digit buttons
for (let i = 0; i <= 9; i++) {
    let digitButton = document.querySelector(`#button-${i}`);
    digitButton.addEventListener('click', () => {
        lastNumber = writeDigit(lastNumber, i);
        updateOutputNumber(lastNumber);
    });
}

// Event listener for operation buttons
['add', 'sub', 'mul', 'div'].forEach(operation => {
    let operationButton = document.querySelector(`#button-${operation}`);
    operationButton.addEventListener('click', () => {
        if (currentOperation != null) {
            // evaulate previous expression first
            opResult = operationFunc(currentNumber, lastNumber, currentOperation);

            currentNumber = opResult;
            currentOperation = operation;
            lastNumber = 0;
            updateOutputNumber(lastNumber);
        } else if (previousOperation != null) {
            currentOperation = operation;
            lastNumber = 0;
            updateOutputNumber(lastNumber);
        } else {
            currentOperation = operation;
            currentNumber = lastNumber;
            lastNumber = 0;
            updateOutputNumber(lastNumber);
        }
    });
});

// Equal button
let equalButton = document.querySelector('#button-equal');
equalButton.addEventListener('click', () => {
    if (currentOperation != null) {
        opResult = operationFunc(currentNumber, lastNumber, currentOperation);
        currentNumber = opResult;
        updateOutputNumber(currentNumber);
        previousOperation = currentOperation;
        currentOperation = null;
    } else if (previousOperation != null) {
        opResult = operationFunc(currentNumber, lastNumber, previousOperation);
        currentNumber = opResult;
        updateOutputNumber(currentNumber);
    }
});

// Dot button
let dotButton = document.querySelector('#button-dot');
dotButton.addEventListener('click', () => {

})

// Clear button
let clearButton = document.querySelector('#button-clear');
clearButton.addEventListener('click', () => {
    currentNumber = 0;
    lastNumber = 0;
    currentOperation = null;
    previousOperation = null;
    updateOutput('0');
})

// Back button

// HTML Elements
let output = document.querySelector('#output-text');

updateOutput('0');
