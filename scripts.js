let inputX
let inputY 
let currentOperation
let clearDisplayNextInput = false
let lastButtonPressed

function add(x,y) {
    return x+y
}
function subtract(x,y) {
    return x-y
}
function multiply(x,y) {
    return x*y
}
function divide(x,y) {
    return x/y
}
function operate(x,operator,y) {
    return operator(x,y)
}
function getOperation(textInput) {
    let operationObject = {"add":add, "subtract":subtract, "multiply":multiply, "divide": divide}
    return operationObject[textInput]
}
function changeSign() {
    document.querySelector('#display').textContent = (parseFloat(document.querySelector('#display').textContent)*(-1)).toString()
}
function clearGlobalVariables() {
    currentOperation = undefined
    inputY = undefined
    inputX = undefined 
}

function displayLength() {
    //will have periods count as a space
    let currentDisplay = document.querySelector('#display').textContent
    return currentDisplay.replace('-','').length
}

function keyUpdateDisplay(value) {
    if (displayLength() <14) {
    
        if (value !==".") {
            if (document.querySelector('#display').textContent === '0') {
                document.querySelector('#display').textContent = value            
            } else {
            document.querySelector('#display').textContent += value
            }
        } else if (!document.querySelector('#display').textContent.includes(".") && value ===".") 
        document.querySelector('#display').textContent += value
    }
}

function setUpdateDisplay(inputValue) {
    let maxCharacters = 14
    let displayValue

    let floorValue = Math.floor(inputValue).toString()

    if (floorValue.toString().replace('-','').length >= maxCharacters) {
        displayValue = 'OVERFLOW'
        clearGlobalVariables()
        clearDisplayNextInput = true
    } else if (floorValue.toString().replace('-','').length < maxCharacters) {
        roundLength = Math.max(0, maxCharacters - floorValue.length)
        displayValue = parseFloat(inputValue.toFixed(roundLength))
    } else if (inputValue === Infinity) {
        displayValue = 'No Divide 0!'
        clearGlobalVariables()
        clearDisplayNextInput = true
    } else {
        displayValue = inputValue
    }

    document.querySelector('#display').textContent = displayValue
}

document.querySelector('#positiveNegative').addEventListener('click', changeSign)

function clearFunction () {
    clearGlobalVariables()
    document.querySelector('#display').textContent = 0
}

document.querySelector('#clear').addEventListener('click', () => {
    clearFunction()
    })

function deleteFunction () {
    let currentDisplay = document.querySelector('#display').textContent
    if (currentDisplay !==0 &&  currentDisplay.length > 1) {
        document.querySelector('#display').textContent = currentDisplay.slice(0,-1)
    } else if (currentDisplay.length=1) {
        document.querySelector('#display').textContent = 0
    }
}

document.querySelector('#delete').addEventListener('click', () => {
    deleteFunction()
})

function numberFunction(numberName) {
    lastButtonPressed = numberName
        if (!clearDisplayNextInput) {
            keyUpdateDisplay(numberName)
        } else {
            document.querySelector('#display').textContent = 0
            clearDisplayNextInput = false
            keyUpdateDisplay(numberName)
        }
}

let numberBtns = document.querySelectorAll('.numberBtn') 

numberBtns.forEach( function(btn) {
    btn.addEventListener('click', () => {
        numberFunction(btn.id)
    })
})

function equalsFunction() {
    const operatorArray =  ['add', 'subtract', 'multiply', 'divide']
    if (!operatorArray.includes(lastButtonPressed)) {
        if (inputX!==undefined) {
            inputY = parseFloat(document.querySelector('#display').textContent)
            console.log('Disp: '+document.querySelector('#display').textContent+' X: '+inputX+' Y: '+inputY+' Op: '+currentOperation)

            setUpdateDisplay(operate(inputX, currentOperation, inputY))

            console.log('Disp: '+document.querySelector('#display').textContent+' X: '+inputX+' Y: '+inputY+' Op: '+currentOperation)
            inputX = undefined
            clearDisplayNextInput = true
        } else if (inputX===undefined) {
            inputX = parseFloat(document.querySelector('#display').textContent)
            setUpdateDisplay(operate(inputX, currentOperation, inputY))
            inputX = undefined
        }
    }
}

document.querySelector('#equals').addEventListener('click', () => {
    equalsFunction()
})

function operatorFunction(operatorName) {
    const operatorArray =  ['add', 'subtract', 'multiply', 'divide']
    if (operatorArray.includes(lastButtonPressed)) {
        currentOperation = getOperation(operatorName)
    } else if (inputX===undefined) {
        inputX = parseFloat(document.querySelector('#display').textContent)
        clearDisplayNextInput = true
        currentOperation = getOperation(operatorName)
    } else  {
        inputY = parseFloat(document.querySelector('#display').textContent)
        setUpdateDisplay(operate(inputX, currentOperation, inputY))
        currentOperation = getOperation(operatorName)
        clearDisplayNextInput = true
        inputY = undefined
        inputX = parseFloat(document.querySelector('#display').textContent)
    }
    lastButtonPressed = operatorName
}

let operatorBtns = document.querySelectorAll('.operatorBtn')

operatorBtns.forEach( function(btn) {
    btn.addEventListener('click', () => {
        operatorFunction(btn.id)})
})

document.addEventListener('keydown', (event) => {
    if (event.key === '1') {numberFunction(1)}
    if (event.key === '2') {numberFunction(2)}
    if (event.key === '3') {numberFunction(3)}
    if (event.key === '4') {numberFunction(4)}
    if (event.key === '5') {numberFunction(5)}
    if (event.key === '6') {numberFunction(6)}
    if (event.key === '7') {numberFunction(7)}
    if (event.key === '8') {numberFunction(8)}
    if (event.key === '9') {numberFunction(9)}
    if (event.key === '0') {numberFunction(0)}
    if (event.key === '.') {numberFunction('.')}

    if (event.key === '+') {operatorFunction('add')}
    if (event.key === '-') {operatorFunction('subtract')}
    if (event.key === '*') {operatorFunction('multiply')}
    if (event.key === '/') {event.preventDefault(); operatorFunction('divide')}

    if (event.key === 'Backspace') {deleteFunction()}
    if (event.key === 'Enter') {equalsFunction()}
    if (event.key === 'Escape') {clearFunction()}
   }
)

