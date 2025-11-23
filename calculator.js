let a = "";
let b = "";
let store_in_a = true;
let operator = "";
let res = 0;

function displayOperation()
{
    document.getElementById("display").textContent = a + " " + operator + " " + b;
}

function displayResult()
{
    document.getElementById("result").textContent = res;
}

function storeNumber(str)
{
    if(str==".") {
        document.getElementById("comma").disabled = true;
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
    document.getElementById("comma").disabled = false;
    displayOperation();
}

function reset()
{
    a = "";
    b = "";
    operator = "";
    store_in_a = true;
    res = "0";
    displayOperation();
    displayResult();
}

function undo()
{
    if(store_in_a) {
        a = a.slice(0, a.length-1);
    } else if(b.length == 0) {
        operator = "";
    } else {
        b = b.slice(0, b.length-1);
    }
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
    a = res;
    store_in_a = true;
    b = "";
    document.getElementById("comma").disabled = false;
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
        return 0;
    } else {
        return a / b;
    }
}