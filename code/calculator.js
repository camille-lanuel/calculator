class Calculator
{
 constructor(display, result, comma) {
    this.display = display;
    this.result = result;
    this.comma = comma;

    this.left = "";
    this.right = "";
    this.operator = "";
    this.needReset = false;

    this.operations = {
        "+": (a, b) => a + b,
        "−": (a, b) => a - b,
        "×": (a, b) => a * b,
        "÷": (a, b) => this.divide(a, b),
        "": (a, b) => a
    };
}

// Calculator logic

getDigit(d)
{
    if(this.needReset) this.reset();
    if(this.operator === "") {
        if(this.left === "0") this.left = "";
        this.left += d
    } else{
        if(this.right === "0") this.right = "";
        this.right += d;
    }
    this.displayOperation();
}

getComma() {
    if(this.needReset) this.reset();
    this.operator === "" ? this.left = this.makeValid(this.left) + '.' : this.right = this.makeValid(this.right) + '.';
    this.disableComma();
    this.displayOperation();
}

getOperator(str)
{
    this.left = this.makeValid(this.left);
    if(this.operator != "") {
        let res = this.operate();
        if(Number.isNaN(res)) return;
    }
    this.needReset = false;
    this.operator = str;
    this.enableComma();
    this.displayOperation();
}

operate()
{
    if(this.operator !== "") this.right = this.makeValid(this.right);
    this.displayOperation();
    this.display.textContent += " =";

    this.left = this.operations[this.operator](Number(this.left), Number(this.right));
    if(Number.isNaN(this.left)) {
        this.reset();
        return NaN;
    }
    let res = Math.round((Number(this.left) + Number.EPSILON) * 100000) / 100000;
    this.left = (res === 0) ? "" : res.toString();
    this.right = "";
    this.operator = "";
    this.needReset = true;

    this.displayResult();
    this.left.includes('.') ? this.disableComma() : this.enableComma();
    return res;
}

// UI-related functions

displayOperation()
{
    this.display.textContent = `${this.left} ${this.operator} ${this.right}`;
}

displayResult()
{
    this.result.textContent = Number(this.left);
}

disableComma()
{
    this.comma.disabled = true;
}

enableComma()
{
    this.comma.disabled = false;
}

// Control functions

reset()
{
    this.left = "";
    this.right = "";
    this.operator = "";
    this.needReset = false;
    this.enableComma();
    this.displayOperation();
    this.displayResult();
}

del()
{
    if(this.right != "") {
        if(this.right.endsWith('.')) this.enableComma();
        this.right = this.right.slice(0, -1);
    } else if(this.operator != "") {
        this.operator = "";
    } else {
        if(this.left.endsWith('.')) this.enableComma();
        this.left = this.left.slice(0, -1);
        if(this.left === "") this.displayResult();
    }

    this.displayOperation();
}

// Auxilary functions

makeValid(str) {
    if(str === "") return "0";
    if(str.endsWith('.')) return str.slice(0, -1);
    return str;
}

divide(a, b)
{
    if(b === 0) {
        alert("Math Error");
        return NaN;
    }
    return a / b;
}

} //end Calculator

const comma = document.getElementById("comma");
const display = document.getElementById("display");
const result = document.getElementById("result");

const calculator = new Calculator(display, result, comma);