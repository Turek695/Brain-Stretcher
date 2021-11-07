const equationDisplay = document.querySelector('.equation__display');
const input = document.querySelector('.display__input');
const numButtons = document.querySelectorAll('.num-button')
const delButton = document.querySelector('.del-button')
const enterButton = document.querySelector('.enter-button')
const easyButton = document.querySelector('#lv1')
const mediumButton = document.querySelector('#lv2')
const hardButton = document.querySelector('#lv3')
const message = document.querySelector('.message__display');

// start
let level = 1;
let equation = equationGen()
equationDisplay.textContent = `${equation[0]} ${equation[1]} ${equation[2]} =`;
message.textContent = 'Hello!';

// przyciski ekranu

easyButton.addEventListener('click', () => lvChange(1));
mediumButton.addEventListener('click', () => lvChange(2));
hardButton.addEventListener('click', () => lvChange(3));

for (let button of numButtons) {
    button.addEventListener('click', () => {
        input.value += button.id;
    })
}

delButton.addEventListener('click', () => input.value = input.value.slice(0, -1));

enterButton.addEventListener('click', () => inputCheck(input.value, equation[3]));

// przyciski klawiatury
window.addEventListener('keydown', function (evt) {
    switch (evt.key) {
        case '1':
            input.value += '1';
            break;
        case '2':
            input.value += '2';
            break;
        case '3':
            input.value += '3';
            break;
        case '4':
            input.value += '4';
            break;
        case '5':
            input.value += '5';
            break;
        case '6':
            input.value += '6';
            break;
        case '7':
            input.value += '7';
            break;
        case '8':
            input.value += '8';
            break;
        case '9':
            input.value += '9';
            break;
        case '0':
            input.value += '0';
            break;
        case 'Backspace':
            input.value = input.value.slice(0, -1);
            break;
        case 'Delete':
            input.value = input.value.slice(0, -1);
            break;
        case 'Enter':
            inputCheck(input.value, equation[3])
            evt.preventDefault();
            break;
    }
})

// funkcje
function inputCheck(value, result) {
    if (result == value) {
        message.textContent = 'good!';
        equation = equationGen();
        equationDisplay.textContent = `${equation[0]} ${equation[1]} ${equation[2]} =`;
    } else {
        message.textContent = 'wrong!';
    }
    input.value = '';
}

function equationGen() {
    let factor = Math.pow(10, level);
    let num1 = Math.floor(Math.random() * factor);
    let num2 = Math.floor(Math.random() * factor);
    let result = num1 + num2;
    return [num1, '+', num2, result];
}

function lvChange(lv) {
    level = lv;
    equation = equationGen()
    equationDisplay.textContent = `${equation[0]} ${equation[1]} ${equation[2]} =`;
    switch (lv) {
        case 1:
            message.textContent = 'Dificulty level changed to easy.';
            break;
        case 2:
            message.textContent = 'Dificulty level changed to medium.';
            break;
        case 3:
            message.textContent = 'Dificulty level changed to hard.';
            break;
        default:
            message.textContent = 'Wrong level change.';
            break;
    }

}