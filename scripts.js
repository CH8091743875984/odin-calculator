let inputX
let inputY 
let currentOperation
let clearDisplayNextInput = false

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

document.querySelector('#clear').addEventListener('click', () => {
    clearGlobalVariables()
    document.querySelector('#display').textContent = 0
    })

document.querySelector('#delete').addEventListener('click', () => {
    let currentDisplay = document.querySelector('#display').textContent
    if (currentDisplay !==0 &&  currentDisplay.length > 1) {
        document.querySelector('#display').textContent = currentDisplay.slice(0,-1)
    } else if (currentDisplay.length=1) {
        document.querySelector('#display').textContent = 0
    }
})

let numberBtns = document.querySelectorAll('.numberBtn') 

numberBtns.forEach( function(btn) {
    btn.addEventListener('click', () => {
        if (!clearDisplayNextInput) {
            keyUpdateDisplay(btn.textContent)
        } else {
            document.querySelector('#display').textContent = 0
            clearDisplayNextInput = false
            keyUpdateDisplay(btn.textContent)
        }

    })
})


document.querySelector('#equals').addEventListener('click', () => {
    // if (clearDisplayNextInput) {
    //     document.querySelector('#display').textContent = 0
    //     clearDisplayNextInput=false

    // }
    
    if (inputX!==undefined) {
        inputY = parseFloat(document.querySelector('#display').textContent)
        console.log('Disp: '+document.querySelector('#display').textContent+' X: '+inputX+' Y: '+inputY+' Op: '+currentOperation)

        setUpdateDisplay(operate(inputX, currentOperation, inputY))

        console.log('Disp: '+document.querySelector('#display').textContent+' X: '+inputX+' Y: '+inputY+' Op: '+currentOperation)
        inputX = undefined
        clearDisplayNextInput = true
    } else if (inputX===undefined) {
        inputX = parseFloat(document.querySelector('#display').textContent)
        //document.querySelector('#display').textContent = undefined
        setUpdateDisplay(operate(inputX, currentOperation, inputY))
        inputX = undefined
    }
})




//switching operators - should be able to click an operator again after ??? input and have it change operator, not eval

let operatorBtns = document.querySelectorAll('.operatorBtn')

operatorBtns.forEach( function(btn) {
    btn.addEventListener('click', () => {
        // if (clearDisplayNextInput) {
        //     document.querySelector('#display').textContent = 0
        //     clearDisplayNextInput=false
        // }
        if (inputX===undefined) {
            // console.log('Disp: '+document.querySelector('#display').textContent+' X: '+inputX+' Y: '+inputY+' Op: '+currentOperation)
            inputX = parseFloat(document.querySelector('#display').textContent)
            clearDisplayNextInput = true
            // console.log('"'+btn.id+'"')
            currentOperation = getOperation(btn.id)
            // console.log('Disp: '+document.querySelector('#display').textContent+' X: '+inputX+' Y: '+inputY+' Op: '+currentOperation)
        } else  {
            // console.log('Disp: '+document.querySelector('#display').textContent+' X: '+inputX+' Y: '+inputY+' Op: '+currentOperation)
            inputY = parseFloat(document.querySelector('#display').textContent)
            setUpdateDisplay(operate(inputX, currentOperation, inputY))
            // console.log('Disp: '+document.querySelector('#display').textContent+' X: '+inputX+' Y: '+inputY+' Op: '+currentOperation)
            currentOperation = getOperation(btn.id)
            clearDisplayNextInput = true
            inputY = undefined
            inputX = parseFloat(document.querySelector('#display').textContent)
            // console.log('Disp: '+document.querySelector('#display').textContent+' X: '+inputX+' Y: '+inputY+' Op: '+currentOperation) 
        
    }
}
)
})



//when you click a number button, update display and store in memory A
//if you click another number button, append to memory A; if a period, add it but don't allow more. let delete key remove digits
//if you click an operator button, update that to the active operation - if an operator button is clicked again, set THAT to the active operation (overwrite)
//if you click a number button, start updating memory B
//if you click equals, call OPERATE with memA, mem B, and the active operation. update display, update memory A, clear memory B, clear active operation
//if you click another operator button, call OPERATE, update memory A, clear memory B, set active operation
//clear first time clears current input; clear again clears all memory (a, b, operation)


// document.querySelector('#divide').addEventListener('click', () => display = 0)
// document.querySelector('#multiply').addEventListener('click', () => display = 0)
// document.querySelector('#subtract').addEventListener('click', () => display = 0)
// document.querySelector('#add').addEventListener('click', () => {
//     if (inputX===undefined) {
//         console.log('Disp: '+document.querySelector('#display').textContent+' X: '+inputX+' Y: '+inputY+' Op: '+currentOperation)
//         inputX = parseFloat(document.querySelector('#display').textContent)
//         document.querySelector('#display').textContent = 0
//         console.log(this)
//         currentOperation = add
//         console.log('Disp: '+document.querySelector('#display').textContent+' X: '+inputX+' Y: '+inputY+' Op: '+currentOperation)
//     } else {
//         console.log('Disp: '+document.querySelector('#display').textContent+' X: '+inputX+' Y: '+inputY+' Op: '+currentOperation)
//         inputY = parseFloat(document.querySelector('#display').textContent)
//         document.querySelector('#display').textContent = operate(inputX, currentOperation, inputY)
//         console.log('Disp: '+document.querySelector('#display').textContent+' X: '+inputX+' Y: '+inputY+' Op: '+currentOperation)
//         currentOperation = undefined
//         inputY = undefined
//         inputX = undefined
//         console.log('Disp: '+document.querySelector('#display').textContent+' X: '+inputX+' Y: '+inputY+' Op: '+currentOperation)

//     }
// })