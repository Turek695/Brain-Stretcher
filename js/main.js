const equationDisplay = document.querySelector('.display__equation');
const input = document.querySelector('.display__input');
const numButtons = document.querySelectorAll('.num-button');
const delButton = document.querySelector('.del-button');
const signButton = document.querySelector('.sign-button');
const comaButton = document.querySelector('.coma-button');
const enterButton = document.querySelector('.enter-button');
const easyButton = document.querySelector('#lv1');
const mediumButton = document.querySelector('#lv2');
const hardButton = document.querySelector('#lv3');
const message = document.querySelector('.display__message');
const sumButton = document.querySelector('#sum');
const multButton = document.querySelector('#mult');
const subButton = document.querySelector('#sub');
const divButton = document.querySelector('#div');

// start
let equationLevel = 1;
let equationType = 'sum';
let equation = equationGen(equationLevel, equationType)
equationDisplay.textContent = `${equation[0]} ${equation[1]} ${equation[2]} =`;
message.textContent = 'Hello!';

// przyciski ekranu
easyButton.addEventListener('click', () => {
    if (equationLevel !== 1) { lvChange(1) }
});
mediumButton.addEventListener('click', () => {
    if (equationLevel !== 2) { lvChange(2) }
});
hardButton.addEventListener('click', () => {
    if (equationLevel !== 3) { lvChange(3) }
});
sumButton.addEventListener('click', () => {
    if (equationType !== 'sum') { typeChange('sum') }
});
subButton.addEventListener('click', () => {
    if (equationType !== 'sub') { typeChange('sub') }
});
multButton.addEventListener('click', () => {
    if (equationType !== 'mult') { typeChange('mult') }
});
for (let button of numButtons) {
    button.addEventListener('click', () => {
        input.value += button.id;
    })
}

delButton.addEventListener('click', () => input.value = input.value.slice(0, -1));
signButton.addEventListener('click', () => input.value *= -1);
comaButton.addEventListener('click', () => input.value += '.');
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
        case '.':
        case ',':
            input.value += 'Separator';
            break;
        case '-':
            if (input.value) { input.value *= -1; };
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
        message.textContent = 'Correct!';
        equation = equationGen(equationLevel, equationType);
        equationDisplay.textContent = `${equation[0]} ${equation[1]} ${equation[2]} =`;
    } else {
        message.textContent = 'Wrong!';
    }
    input.value = '';
}

function equationGen(eqLevel, eqType) {
    let factor = Math.pow(10, eqLevel);
    let num1 = Math.floor(Math.random() * factor);
    let num2 = Math.floor(Math.random() * factor);
    let result;
    let sign;
    switch (eqType) {
        case 'sum':
            result = num1 + num2;
            sign = '+';
            break;
        case 'sub':
            result = num1 - num2;
            sign = '-';
            break;
        case 'mult':
            result = num1 * num2;
            sign = 'x';
            break;
        case 'div':
            result = num1 / num2;
            sign = '/';
            break;
        default:
            alert('oops, something got wrong!')
            break;
    }
    return [num1, sign, num2, result];
}

function lvChange(lv) {
    equationLevel = lv;
    equation = equationGen(equationLevel, equationType)
    equationDisplay.textContent = `${equation[0]} ${equation[1]} ${equation[2]} =`;
    switch (lv) {
        case 1:
            message.textContent = 'Dificulty equation level changed to easy.';
            break;
        case 2:
            message.textContent = 'Dificulty equation level changed to medium.';
            break;
        case 3:
            message.textContent = 'Dificulty equation level changed to hard.';
            break;
        default:
            message.textContent = 'Wrong equation level change.';
            break;
    }
}

function typeChange(eqType) {
    equationType = eqType;
    equation = equationGen(equationLevel, equationType)
    equationDisplay.textContent = `${equation[0]} ${equation[1]} ${equation[2]} =`;
    switch (eqType) {
        case 'sum':
            message.textContent = 'Equation type changed to addition.';
            break;
        case 'sub':
            message.textContent = 'Equation type changed to substraction.';
            break;
        case 'mult':
            message.textContent = 'Equation type changed to multiplication.';
            break;
        case 'div':
            message.textContent = 'Equation type changed to division.';
            break;
        default:
            message.textContent = 'Wrong equation type change.';
            break;
    }
}
