let operation = ["", "", ""];
let i = 0;

const comma = document.getElementById("comma");

// UI-related functions

function displayOperation()
{
    document.getElementById("display").textContent = operation[0] + " " + operation[1] + " " + operation[2];
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
    if(operation[i] === '.') {
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

function storeNumber(str)
{
    if(str == '.') {
        disableComma();
    }
    operation[i] += str;
    displayOperation();
}

function getOperator(str)
{
    operation[1] = str;
    i = 2;
    enableComma();
    displayOperation();
}

function operate()
{
    let res = 0;
    switch(operation[1]) {
        case "+":
            res = add(Number(operation[0]), Number(operation[2]));
            break;
        case "−":
            res = subtract(Number(operation[0]), Number(operation[2]));
            break;
        case "×":
            res = multiply(Number(operation[0]), Number(operation[2]));
            break;
        case "÷":
            res = divide(Number(operation[0]), Number(operation[2]));
            break;
        default:
            res = NaN;
    }
    res = Math.round((res + Number.EPSILON) * 100000) / 100000;
    operation = [res.toString(), "", ""];
    i = 0;
    enableComma();
    document.getElementById("display").textContent += " = ";
    if(Number.isNaN(res)) {
        reset();
    }
    displayResult();
}

function add(a, b)
{
    return a + b;
}

function subtract(a, b)
{
    return a - b;
}

function multiply(a, b)
{
    return a * b;
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