const DEC_PRECISION = 6;
const MAX_DIGITS = 15;

// Keys that trigger input actions
// (digits are hard-coded)
const KEYS_DOT = ['.', ','];
const KEYS_OP_ADD = ['+', 'a', 'A'];
const KEYS_OP_SUB = ['-', 's', 'S'];
const KEYS_OP_MUL = ['*', 'm', 'M'];
const KEYS_OP_DIV = ['/', ':', 'd', 'D'];
const KEYS_EQUALS = ['=']; // do not use 'Enter' or 'Space', they also activate buttons!
const KEYS_CLEAR = ['Delete', 'Escape'];
const KEYS_BACK = ['Backspace'];

// Calculator function
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
            if (parseInt(b, 10) == 0) {
                alert("Division by zero! Operation canceled.");
                return a;
            }

            result = a / b; break;
        default:
            console.log(`Invalid operation: ${op}`);
            break;
    }

    result = 
        (Math.round(result * Math.pow(10, DEC_PRECISION)) / Math.pow(10, DEC_PRECISION))
        .toString();

    if (result.length >= MAX_DIGITS) {
        alert(`Result exceeded max number length (${MAX_DIGITS} digits)! Operation canceled.`);
        return a;
    }

    console.log(`Expression evaluated: ${a} ${op} ${b} = ${result}`);

    return result.toString();
}

let output = document.querySelector('#output-text');
function updateOutput(text) {
    output.textContent = text;
}

function writeDigit(number, digit) {
    if (number == '0') {
        return digit;
    } else if (number.length < MAX_DIGITS) {
        return number + digit;
    } else {
        alert(`Exceeded max number length (${MAX_DIGITS} digits)!`);
        return number;
    }
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

// Input actions
function inputWriteDigit(digit) {
    console.log(`Input Action: ${digit}`);
    setInputNumber(writeDigit(getInputNumber(), digit.toString()));
    updateOutput(getInputNumber());
}

function inputWriteDot() {
    console.log('Input Action: dot');
    setInputNumber(writeDot(getInputNumber()));
    updateOutput(getInputNumber());
}

function inputOperation(operation) {
    console.log(`Input Action: ${operation}`);
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
}

function inputEquals() {
    console.log('Input Action: equal');
    if (currentOperation != null) {
        currentNumber = operationFunc(currentNumber, lastNumber, currentOperation);
        updateOutput(currentNumber);
        previousOperation = currentOperation;
        currentOperation = null;
    } else if (previousOperation != null) {
        currentNumber = operationFunc(currentNumber, lastNumber, previousOperation);
        updateOutput(currentNumber);
    }
}

function inputClear() {
    console.log('Input Action: clear');
    currentNumber = '0';
    lastNumber = '0';
    currentOperation = null;
    previousOperation = null;
    updateOutput('0');
}

function inputBackspace() {
    console.log('Input Action: bakcspace');
    setInputNumber(backspaceNumber(getInputNumber()));
    updateOutput(getInputNumber());
}

// Bind input actions to button
// Digit buttons
for (let i = 0; i <= 9; i++) {
    document.querySelector(`#button-${i}`)
        .addEventListener('click', () => inputWriteDigit(i));
}

// Dot button
document.querySelector('#button-dot')
    .addEventListener('click', inputWriteDot);

// Event listener for operation buttons
['add', 'sub', 'mul', 'div'].forEach(operation => {
    let operationButton = document.querySelector(`#button-${operation}`);
    operationButton.addEventListener('click', () => inputOperation(operation));
});

// Equal button
document.querySelector('#button-equal')
    .addEventListener('click', inputEquals);

// Clear button
document.querySelector('#button-clear')
    .addEventListener('click', inputClear);

// Back button
document.querySelector('#button-back')
    .addEventListener('click', inputBackspace);

// Bind input actions to key presses
document.addEventListener('keydown', event => {
    //console.log(`Keydown event: .key: ${event.key}, .keyCode: ${event.keyCode}`);
    const key = event.key;
    const keyDigit = parseInt(key, 10);

    if (keyDigit !== NaN && keyDigit >= 0 && keyDigit <= 9) { // Digit
        inputWriteDigit(keyDigit);
    } else if (KEYS_DOT.includes(key)) { // Dot
        inputWriteDot();
    } else if (KEYS_OP_ADD.includes(key)) { // Add
        inputOperation('add');
    } else if (KEYS_OP_SUB.includes(key)) { // Subtract
        inputOperation('sub');
    } else if (KEYS_OP_MUL.includes(key)) { // Multiply
        inputOperation('mul');
    } else if (KEYS_OP_DIV.includes(key)) { // Divide
        inputOperation('div');
    } else if (KEYS_EQUALS.includes(key)) { // Equal
        inputEquals();
    } else if (KEYS_CLEAR.includes(key)) { // Clear
        inputClear();
    } else if (KEYS_BACK.includes(key)) { // Backspace
        inputBackspace();
    }
});

// On start
updateOutput('0');
