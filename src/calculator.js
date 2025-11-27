let operation = ["", "", ""];  // 1st operand, operator, 2nd operand
let i = 0;  // index for where we are in the operation

const comma = document.getElementById("comma");
const display = document.getElementById("display");

// UI-related functions

function displayOperation()
{
    display.textContent = operation[0] + " " + operation[1] + " " + operation[2];
}

function displayResult()
{
    document.getElementById("result").textContent = Number(operation[0]);
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
    if(i == 1) {
        i++;
    }
    if(str == '.') {
        disableComma();
        if(operation[i] == "") {
            operation[i] = "0";
        }
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
    i++;
    enableComma();
    displayOperation();
}

function operate()
{
    displayOperation();
    display.textContent += " =";
    switch(operation[1]) {
        case "+":
            operation[0] = Number(operation[0]) + Number(operation[2]);
            break;
        case "−":
            operation[0] = Number(operation[0]) - Number(operation[2]);
            break;
        case "×":
            operation[0] = Number(operation[0]) * Number(operation[2]);
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
    }
    return a / b;
}