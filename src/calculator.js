let a = "";
let b = "";
let store_in_a = true;
let operator = "";
let res = 0;

// UI-related functions

function displayOperation()
{
    document.getElementById("display").textContent = a + " " + operator + " " + b;
}

function displayResult()
{
    document.getElementById("result").textContent = res;
}

function disableComma()
{
    document.getElementById("comma").disabled = true;
}

function enableComma()
{
    document.getElementById("comma").disabled = false;
}

// reset, undo

function reset()
{
    a = "";
    b = "";
    operator = "";
    store_in_a = true;
    res = 0;
    enableComma();
    displayOperation();
    displayResult();
}

function undo()
{
    if(store_in_a) {
        console.log(a[a.length-1]);
        if(a[-1] === ".") {
            enableComma();
        }
        a = a.slice(0, a.length-1);
    } else if(b.length == 0) {
        operator = "";
        store_in_a = true;
    } else {
        if(b[b.length-1] === ".") {
            enableComma();
        }
        b = b.slice(0, b.length-1);
    }
    displayOperation();
}

// calculator logic

function storeNumber(str)
{
    if(str==".") {
        disableComma();
    }
    if (store_in_a) {
        a += str;
    } else {
        b += str;
    }
    displayOperation();
}

function getOperator(str)
{
    operator = str;
    store_in_a = false;
    enableComma();
    displayOperation();
}

function operate()
{
    switch(operator) {
        case "+":
            res = add(Number(a), Number(b));
            break;
        case "−":
            res = subtract(Number(a), Number(b));
            break;
        case "×":
            res = multiply(Number(a), Number(b));
            break;
        case "÷":
            res = divide(Number(a), Number(b));
            break;
        default:
            res = 0;
    }
    a = res.toString();
    store_in_a = true;
    b = "";
    enableComma();
    res = Math.round((res + Number.EPSILON) * 100000) / 100000;
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