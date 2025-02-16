const equationDisplay = document.querySelector(".display__equation");
const input = document.querySelector(".display__input");
const numButtons = document.querySelectorAll(".num-button");
const delButton = document.querySelector(".del-button");
const signButton = document.querySelector(".sign-button");
const comaButton = document.querySelector(".coma-button");
const enterButton = document.querySelector(".enter-button");
const easyButton = document.querySelector("#lv1");
const mediumButton = document.querySelector("#lv2");
const hardButton = document.querySelector("#lv3");
const message = document.querySelector(".display__message");
const sumButton = document.querySelector("#sum");
const multButton = document.querySelector("#mult");
const subButton = document.querySelector("#sub");
const divButton = document.querySelector("#div");

// start
let equationLevel = 1;
let equationType = "sum";
let equation = equationGen(equationLevel, equationType);
equationDisplay.textContent = `${equation[0]} ${equation[1]} ${equation[2]} =`;
message.textContent = "Hello!";

// przyciski ekranu
easyButton.addEventListener("click", () => {
    if (equationLevel !== 1) {
        lvChange(1);
    }
});
mediumButton.addEventListener("click", () => {
    if (equationLevel !== 2) {
        lvChange(2);
    }
});
hardButton.addEventListener("click", () => {
    if (equationLevel !== 3) {
        lvChange(3);
    }
});
sumButton.addEventListener("click", () => {
    if (equationType !== "sum") {
        typeChange("sum");
    }
});
subButton.addEventListener("click", () => {
    if (equationType !== "sub") {
        typeChange("sub");
    }
});
multButton.addEventListener("click", () => {
    if (equationType !== "mult") {
        typeChange("mult");
    }
});
for (let button of numButtons) {
    button.addEventListener("click", () => {
        input.value += button.id;
    });
}

delButton.addEventListener("click", () => (input.value = input.value.slice(0, -1)));
signButton.addEventListener("click", () => (input.value *= -1));
comaButton.addEventListener("click", () => (input.value += "."));
enterButton.addEventListener("click", () => inputCheck(input.value, equation[3]));

// przyciski klawiatury
window.addEventListener("keydown", function (evt) {
    switch (evt.key) {
        case "1":
            input.value += "1";
            break;
        case "2":
            input.value += "2";
            break;
        case "3":
            input.value += "3";
            break;
        case "4":
            input.value += "4";
            break;
        case "5":
            input.value += "5";
            break;
        case "6":
            input.value += "6";
            break;
        case "7":
            input.value += "7";
            break;
        case "8":
            input.value += "8";
            break;
        case "9":
            input.value += "9";
            break;
        case "0":
            input.value += "0";
            break;
        case ".":
        case ",":
            input.value += "Separator";
            break;
        case "-":
            if (input.value) {
                input.value *= -1;
            }
            break;
        case "Backspace":
            input.value = input.value.slice(0, -1);
            break;
        case "Delete":
            input.value = input.value.slice(0, -1);
            break;
        case "Enter":
            inputCheck(input.value, equation[3]);
            evt.preventDefault();
            break;
    }
});

// funkcje
function inputCheck(value, result) {
    if (result == value) {
        message.textContent = "Dobrze!";
        message.classList.add("correct");
        message.classList.remove("wrong");
        equation = equationGen(equationLevel, equationType);
        equationDisplay.textContent = `${equation[0]} ${equation[1]} ${equation[2]} =`;
    } else {
        message.textContent = "Trzeba poprawić";
        message.classList.add("wrong");
        message.classList.remove("correct");
    }
    input.value = "";
}

function equationGen(eqLevel, equationType) {
    maxNumber = { 1: 30, 2: 60, 3: 100 }[eqLevel];
    // Helper: returns a random integer between min and max (inclusive)
    if (maxNumber < 2) {
        throw new Error("maxNumber must be at least 2.");
    }

    // Helper: returns a random integer between min and max (inclusive)
    function randomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    switch (equationType) {
        case "sum": {
            // Choose a target sum uniformly in [2, maxNumber]
            const result = randomInt(2, maxNumber);
            // Pick num1 uniformly in [1, result-1] (num1 and num2 will be natural)
            const num1 = randomInt(1, result - 1);
            const num2 = result - num1;
            return [num1, "+", num2, result];
        }
        case "sub": {
            // Pick result uniformly in [1, maxNumber - 1]
            const result = randomInt(1, maxNumber - 1);
            // Pick num2 uniformly in [1, maxNumber - result] to ensure num1 = result + num2 ≤ maxNumber
            const num2 = randomInt(1, maxNumber - result);
            const num1 = result + num2;
            return [num1, "-", num2, result];
        }
        case "mult": {
            // For multiplication, num1 and num2 are natural numbers no greater than 10,
            // and their product (result) is ≤ maxNumber.
            const validPairs = [];
            for (let a = 1; a <= 10; a++) {
                for (let b = 1; b <= 10; b++) {
                    if (a * b <= maxNumber) {
                        validPairs.push([a, b]);
                    }
                }
            }
            if (validPairs.length === 0) {
                throw new Error(`No valid multiplication equations with maxNumber ${maxNumber}`);
            }
            const [num1, num2] = validPairs[randomInt(0, validPairs.length - 1)];
            const result = num1 * num2;
            return [num1, "×", num2, result];
        }
        case "div": {
            // For division, result and num2 (divisor) are natural numbers no greater than 10,
            // and num1 (dividend) = result * num2 is ≤ maxNumber.
            const validPairs = [];
            for (let res = 1; res <= 10; res++) {
                for (let divisor = 1; divisor <= 10; divisor++) {
                    const dividend = res * divisor;
                    if (dividend <= maxNumber) {
                        validPairs.push([dividend, divisor, res]);
                    }
                }
            }
            if (validPairs.length === 0) {
                throw new Error(`No valid division equations with maxNumber ${maxNumber}`);
            }
            const [num1, num2, result] = validPairs[randomInt(0, validPairs.length - 1)];
            return [num1, "÷", num2, result];
        }
        default:
            throw new Error("Invalid equation type");
    }
}

function lvChange(lv) {
    equationLevel = lv;
    equation = equationGen(equationLevel, equationType);
    equationDisplay.textContent = `${equation[0]} ${equation[1]} ${equation[2]} =`;
    
    switch (lv) {
        case 1:
            message.textContent = "Zmieniono zakres do 30";
            break;
        case 2:
            message.textContent = "Zmieniono zakres do 60";
            break;
        case 3:
            message.textContent = "Zmieniono zakres do 100";
            break;
        default:
            message.textContent = "Błąd zmiany zakresu";
            break;
    }
}

function typeChange(eqType) {
    equationType = eqType;
    equation = equationGen(equationLevel, equationType);
    equationDisplay.textContent = `${equation[0]} ${equation[1]} ${equation[2]} =`;
    switch (eqType) {
        case "sum":
            message.textContent = "Zmieniono na dodawanie";
            break;
        case "sub":
            message.textContent = "Zmieniono na odejmowanie";
            break;
        case "mult":
            message.textContent = "Zmieniono na mnożenie";
            break;
        case "div":
            message.textContent = "Zmieniono na dzielenie";
            break;
        default:
            message.textContent = "Błąd zmiany działania";
            break;
    }
}
