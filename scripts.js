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

function updateDisplay(value) {
    if (value !==".") {
        if (document.querySelector('#display').textContent === '0') {
            document.querySelector('#display').textContent = value            
        } else {
        document.querySelector('#display').textContent += value
        }
    } else if (!document.querySelector('#display').textContent.includes(".") && value ===".") 
    document.querySelector('#display').textContent += value
}

// function initializeOperation (operation) {
//     let inputX = document.querySelector('#display').textContent
//     document.querySelector('#display').textContent = 0
//     //have a feeling we need to make an array instead.... op btns append the display to the array, the op btn is appended to the array
//     //
// }


let display = 0
let inputX
let inputY 
let currentOperation


document.querySelector('#clear').addEventListener('click', () => display = 0)
//document.querySelector('#delete').addEventListener('click', )

//generalize this if possible to a function or assign it with foreach.
//test that this thing will still add the Y input like a calc would if you keep hitting equals(or is it only with equals?)
//do nothing if you hit the same operation again, else change the operation
document.querySelector('#divide').addEventListener('click', () => display = 0)
document.querySelector('#multiply').addEventListener('click', () => display = 0)
document.querySelector('#subtract').addEventListener('click', () => display = 0)
document.querySelector('#add').addEventListener('click', () => {
    if (inputX===undefined) {
        console.log('Disp: '+document.querySelector('#display').textContent+' X: '+inputX+' Y: '+inputY+' Op: '+currentOperation)
        inputX = parseFloat(document.querySelector('#display').textContent)
        document.querySelector('#display').textContent = 0
        currentOperation = add
        console.log('Disp: '+document.querySelector('#display').textContent+' X: '+inputX+' Y: '+inputY+' Op: '+currentOperation)
    } else {
        console.log('Disp: '+document.querySelector('#display').textContent+' X: '+inputX+' Y: '+inputY+' Op: '+currentOperation)
        inputY = parseFloat(document.querySelector('#display').textContent)
        document.querySelector('#display').textContent = operate(inputX, currentOperation, inputY)
        console.log('Disp: '+document.querySelector('#display').textContent+' X: '+inputX+' Y: '+inputY+' Op: '+currentOperation)
        currentOperation = undefined
        inputY = undefined
        inputX = undefined
        console.log('Disp: '+document.querySelector('#display').textContent+' X: '+inputX+' Y: '+inputY+' Op: '+currentOperation)

    }
})

let numberBtns = document.querySelectorAll('.numberBtn') 

numberBtns.forEach( function(btn) {
    btn.addEventListener('click', () => {
        updateDisplay(btn.textContent)
    })
}
)

let operatorBtns = document.querySelectorAll('.operatorBtn')

operatorBtns.forEach( function(btn) {
    btn.addEventListener('click', () => {

    })
}



)

//when you click a number button, update display and store in memory A
//if you click another number button, append to memory A; if a period, add it but don't allow more. let delete key remove digits
//if you click an operator button, update that to the active operation - if an operator button is clicked again, set THAT to the active operation (overwrite)
//if you click a number button, start updating memory B
//if you click equals, call OPERATE with memA, mem B, and the active operation. update display, update memory A, clear memory B, clear active operation
//if you click another operator button, call OPERATE, update memory A, clear memory B, set active operation
//clear first time clears current input; clear again clears all memory (a, b, operation)