// =========================
// Calculator State
// =========================

let currentInput = "";
let display = document.querySelector(".row-input");
let buttons = document.querySelectorAll(".button");

// =========================
// Utility Functions
// =========================

function updateDisplay(value) {
    display.value = value || "0";
}

function clearAll() {
    currentInput = "";
    updateDisplay("");
}

function appendValue(value) {
    currentInput += value;
    updateDisplay(currentInput);
}

function calculate() {
    try {
        // Replace visual operators if needed
        const result = Function(`"use strict"; return (${currentInput})`)();
        currentInput = result.toString();
        updateDisplay(currentInput);
    } catch {
        updateDisplay("Error");
        currentInput = "";
    }
}

// =========================
// Event Handling
// =========================

buttons.forEach((button) => {
    button.addEventListener("click", () => {
        const value = button.dataset.value;
        const operator = button.dataset.operator;
        const action = button.dataset.action;
        if (value) {
            appendValue(value);
            return;
        }
        if (operator) {
            appendValue(operator);
            return;
        }
        if (action) {
            handleAction(action);
        }
    });
});

// =========================
// Action Router
// =========================

function handleAction(action) {
    switch (action) {
        case "clear":
            clearAll();
            break;
        case "equals":
            calculate();
            break;
        case "percent":
            currentInput = (parseFloat(currentInput) / 100).toString();
            updateDisplay(currentInput);
            break;
        default:
            console.warn("Unhandled action:", action);
    }
}

// =========================
// Initial Display
// =========================

updateDisplay("0");