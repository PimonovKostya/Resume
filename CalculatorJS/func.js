class Calculator {
    constructor(prevOperandText, currOperandText, image) {
        this.prevOperandText = prevOperandText;
        this.currOperandText = currOperandText;
        this.image = image
        this.clear()
    }

    clear() {
        this.currOperand = ''
        this.prevOperand = ''
        this.operation = undefined
    }

    delete() {
        this.currOperand = this.currOperand.slice(0, this.currOperand.length - 1)
    }

    appendNumber(number) {
        if (number === '.' && this.currOperand.includes('.')) return
        if (number === '0' && this.currOperand[0] === '0') return
        if (this.currOperand[0] === '0' && this.currOperand[1] !== '.' && number !== '.')
            this.currOperand = this.currOperand.slice(1, this.currOperand.length)
        this.currOperand = this.currOperand.toString() + number.toString()
    }

    chooseOperation(operation) {
        if (this.operation !== undefined) {
            this.compute()
            this.updateDisplay()
            this.operation = undefined
        }
        this.operation = operation
        this.prevOperand = this.currOperand
        this.currOperand = ''
    }

    reverse() {
        this.currOperand = -this.currOperand
    }

    compute() {
        switch (this.operation) {
            case '+':
                this.currOperand = (+this.currOperand + +this.prevOperand).toString()
                break
            case '-':
                this.currOperand = (+this.prevOperand - +this.currOperand).toString()
                break
            case '*':
                this.currOperand = (+this.currOperand * +this.prevOperand).toString()
                break
            case '/':
                this.currOperand = (+this.prevOperand / +this.currOperand).toString()
                break
        }
        this.prevOperand = ''
        this.operation = undefined
    }

    updateDisplay() {
        this.currOperandText.innerText = this.currOperand
        if (this.operation !== undefined) {
            this.prevOperandText.innerText = this.prevOperand + ' ' + this.operation.toString()
        } else this.prevOperandText.innerText = this.prevOperand
    }
}


const numberButtons = document.querySelectorAll('[data-numbers]')
const operationButtons = document.querySelectorAll('[data-operations]')
const equalsButton = document.querySelectorAll('[data-equals]')
const deleteButton = document.querySelectorAll('[data-delete]')
const allClearButton = document.querySelectorAll('[data-all-clear]')
const reverseButton = document.querySelectorAll('[data-reverse]')
const prevOperandText = document.getElementById('data-prev-operand')
const currOperandText = document.getElementById('data-curr-operand')
const image = document.getElementById('img')

const calculator = new Calculator(prevOperandText, currOperandText, image)

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
    })
})

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay()
    })
})

equalsButton.forEach(button => {
    button.addEventListener('click', () => {
        calculator.compute()
        calculator.updateDisplay()
    })
})

deleteButton.forEach(button => {
    button.addEventListener('click', () => {
        calculator.delete()
        calculator.updateDisplay()
    })
})

allClearButton.forEach(button => {
    button.addEventListener('click', () => {
        calculator.clear()
        calculator.updateDisplay()
    })
})

reverseButton.forEach(button => {
    button.addEventListener('click', () => {
        calculator.reverse()
        calculator.updateDisplay()
    })
})