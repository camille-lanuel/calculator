let operation = ["", "", ""];
let i = 0;

const comma = document.getElementById("comma");
const display = document.getElementById("display");

// UI-related functions

function displayOperation()
{
    display.textContent = operation[0] + " " + operation[1] + " " + operation[2];
}

function displayResult()
{
    document.getElementById("result").textContent = getNumber(operation[0]);
}

function disableComma()
{
    comma.disabled = true;
}

function enableComma()
{
    comma.disabled = false;
}

// reset, undo

function reset()
{
    operation = ["", "", ""];
    i = 0;
    enableComma();
    displayOperation();
    displayResult();
}

function del()
{
    if(operation[i][operation[i].length-1] == '.') {
        enableComma();
    }
    operation[i] = operation[i].slice(0, -1);
    if(operation[i].length == 0 && i > 0) {
        i--;
    }
    if(operation[0].length == 0) {
        displayResult();
    }
    displayOperation();
}

// calculator logic

function getDigit(str)
{
    if(str == '.') {
        disableComma();
    }
    operation[i] += str;
    displayOperation();
}

function getOperator(str)
{
    if(operation[0] == "") {
        operation[0] = "0";
    }
    if(operation[1] != "") {
        operate();
    }   
    operation[1] = str;
    i = 2;
    enableComma();
    displayOperation();
}

function getNumber(str)
{
    if(str == ".") {
        return 0;
    }
    return Number(str);
}

function operate()
{
    displayOperation();
    switch(operation[1]) {
        case "+":
            operation[0] = getNumber(operation[0]) + getNumber(operation[2]);
            break;
        case "−":
            operation[0] = getNumber(operation[0]) - getNumber(operation[2]);
            break;
        case "×":
            operation[0] = getNumber(operation[0]) * getNumber(operation[2]);
            break;
        case "÷":
            operation[0] = divide(Number(operation[0]), Number(operation[2]));
            break;
        default:
            break;
    }

    operation[0] = Math.round((Number(operation[0]) + Number.EPSILON) * 100000) / 100000;
    if(Number.isNaN(operation[0])) {
        reset();
    }
    display.textContent += " = ";
    operation = [operation[0].toString(), "", ""];
    displayResult();

    i = 0;
    if(operation[0].includes('.')) {
        disableComma();
    } else {
        enableComma();
    }
}

function divide(a, b)
{
    if(b == 0) {
        alert("Math Error");
        return NaN;
    } else {
        return a / b;
    }
}
