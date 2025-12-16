class CalculatorModel {
  constructor () {
    this.left = ''
    this.right = ''
    this.operator = ''
    this.needReset = false
    this.ROUNDING_FACTOR = 100000

    this.operations = {
      '+': (a, b) => a + b,
      '−': (a, b) => a - b,
      '×': (a, b) => a * b,
      '÷': (a, b) => this.#divide(a, b),
      '': (a, b) => a
    }
  }

  subscribe (onUpdate, onResult, onCommaStateChange) {
    this.onUpdate = onUpdate
    this.onResult = onResult
    this.onCommaStateChange = onCommaStateChange
  }

  // Calculator logic

  appendDigit (d) {
    if (this.needReset) this.reset()
    this.operator === ''
      ? (this.left = this.#removeFrontZero(this.left) + d)
      : (this.right = this.#removeFrontZero(this.right) + d)
    this.onUpdate(this.left, this.operator, this.right)
  }

  appendComma () {
    if (this.needReset) this.reset()
    this.operator === ''
      ? (this.left = this.#makeValid(this.left) + '.')
      : (this.right = this.#makeValid(this.right) + '.')
    this.onCommaStateChange(false)
    this.onUpdate(this.left, this.operator, this.right)
  }

  appendOperator (str) {
    this.left = this.#makeValid(this.left)
    if (this.operator !== '') {
      let res = this.operate()
      if (Number.isNaN(res)) return
    }
    this.needReset = false
    this.operator = str
    this.onCommaStateChange(true)
    this.onUpdate(this.left, this.operator, this.right)
  }

  operate () {
    this.left = this.#makeValid(this.left)
    if (this.operator !== '') this.right = this.#makeValid(this.right)
    this.onUpdate(this.left, this.operator, this.right)

    this.left = this.operations[this.operator](
      Number(this.left),
      Number(this.right)
    )
    if (Number.isNaN(this.left)) {
      this.reset()
      return NaN
    }
    let res =
      Math.round((Number(this.left) + Number.EPSILON) * this.ROUNDING_FACTOR) /
      this.ROUNDING_FACTOR
    this.left = res.toString()
    this.right = ''
    this.operator = ''
    this.needReset = true

    this.onResult(this.left)
    this.left.includes('.')
      ? this.onCommaStateChange(false)
      : this.onCommaStateChange(true)
    return res
  }

  // Control functions

  reset () {
    this.left = ''
    this.right = ''
    this.operator = ''
    this.needReset = false
    this.onCommaStateChange(true)
    this.onUpdate(this.left, this.operator, this.right)
    this.onResult(this.left)
  }

  del () {
    if (this.right != '') {
      if (this.right.endsWith('.')) this.onCommaStateChange(true)
      this.right = this.right.slice(0, -1)
    } else if (this.operator != '') {
      this.operator = ''
    } else {
      if (this.left.endsWith('.')) this.onCommaStateChange(true)
      this.left = this.left.slice(0, -1)
      if (this.left === '') this.onResult(this.left)
    }

    this.onUpdate(this.left, this.operator, this.right)
  }

  // Auxilary functions

  #removeFrontZero (str) {
    return str === '0' ? '' : str
  }

  #makeValid (str) {
    return Number(str).toString()
  }

  #divide (a, b) {
    if (b === 0) {
      alert('Math Error')
      return NaN
    }
    return a / b
  }
} //class CalculatorModel

class CalculatorView {
  constructor (domElements) {
    this.domElements = domElements
  }

  setEvents (handlers) {
    this.domElements.digits.forEach(d => {
      d.addEventListener('click', () => handlers.onDigit(d.textContent))
    })

    this.domElements.operators.forEach(op => {
      op.addEventListener('click', () => handlers.onOperator(op.textContent))
    })

    this.domElements.comma.addEventListener('click', handlers.onComma)
    this.domElements.equals.addEventListener('click', handlers.onEquals)
    this.domElements.clear.addEventListener('click', handlers.onClear)
    this.domElements.del.addEventListener('click', handlers.onDelete)
  }

  displayOperation (left, operator, right) {
    this.domElements.display.textContent = `${left} ${operator} ${right}`
  }

  displayResult (result) {
    this.domElements.display.textContent === '  '
      ? (this.domElements.display.textContent = '')
      : (this.domElements.display.textContent += ' =')
    this.domElements.result.textContent = Number(result)
  }

  disableComma () {
    this.domElements.comma.disabled = true
  }

  enableComma () {
    this.domElements.comma.disabled = false
  }
} // class CalculatorView

class CalculatorController {
  constructor (view, model) {
    this.view = view
    this.model = model

    this.model.subscribe(
      (left, operator, right) =>
        this.view.displayOperation(left, operator, right),
      result => this.view.displayResult(result),
      enabled => this.handleCommaState(enabled)
    )

    this.view.setEvents({
      onDigit: d => this.model.appendDigit(d),
      onOperator: op => this.model.appendOperator(op),
      onComma: () => this.model.appendComma(),
      onEquals: () => this.model.operate(),
      onClear: () => this.model.reset(),
      onDelete: () => this.model.del()
    })
  }

  updateDisplay (left, operator, right) {
    this.view.displayOperation(left, operator, right)
  }

  updateResult (result) {
    this.view.displayResult(result)
  }

  handleCommaState (enabled) {
    enabled ? this.view.enableComma() : this.view.disableComma()
  }
} //class CalculatorController

const digits = document.querySelectorAll('.digit')
const operators = document.querySelectorAll('.operator')
const comma = document.getElementById('comma')
const equals = document.getElementById('equals')
const clear = document.getElementById('clear')
const del = document.getElementById('delete')
const display = document.getElementById('display')
const result = document.getElementById('result')

const domElements = {
  digits,
  operators,
  comma,
  equals,
  clear,
  del,
  display,
  result
}

const view = new CalculatorView(domElements)
const model = new CalculatorModel()
const controller = new CalculatorController(view, model)
