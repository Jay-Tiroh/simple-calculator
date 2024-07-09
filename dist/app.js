// selecting elements

const topOutput = document.querySelector(".calculation");
const result = document.querySelector(".result");
const btns = document.querySelectorAll(".btn");
const yellowBtns = document.querySelectorAll(".yellow");
const brackets = document.querySelectorAll(".brace");

// mutation observer
const mutationObserver = new MutationObserver(() => {
  currentValue = topOutput.innerHTML;
  equation += currentValue;
  console.log(equation);
});

result.innerHTML = 0;
// VARIABLES
let evaluated = false;
let equation;
let storedInput = [];
let currentValue;
let ans;

// EVENT LISTENERS
brackets.forEach((brace) => {
  brace.addEventListener("click", (e) => {
    let symbol = e.currentTarget.dataset.sign;
    symbol === "leftBracket"
      ? (topOutput.innerHTML += `(`)
      : (topOutput.innerHTML += `)`);
  });
});

btns.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    const thisBtn = e.currentTarget;
    const value = thisBtn.innerHTML;
    let symbol = e.currentTarget.dataset.sign;

    if (evaluated) {
      clear(topOutput);
      evaluated = false;
      thisBtn.classList.contains("digit")
        ? (topOutput.innerHTML = "")
        : (topOutput.innerHTML = ans);
    }

    if (e.currentTarget.classList.contains("digit")) {
      topOutput.innerHTML += value;
    }

    if (e.currentTarget.classList.contains("yellow")) {
      topOutput.innerHTML += symbol;
    }

    if (e.currentTarget.classList.contains("clear-btn")) {
      clear(topOutput);
      result.innerHTML = 0;
    }

    if (e.currentTarget.classList.contains("equals")) calculate();
  });
});

// FUNCTIONS

function calculate() {
  equation = topOutput.innerHTML;
  let answer;
  let errorFound = false;
  try {
    answer = eval(equation);
    result.innerHTML = answer;
    ans = answer;
  } catch (error) {
    error.message = `calculation error.
    check input and try again`;
    result.style.textAlign = "center";
    result.innerHTML = error.message;
    errorFound = true;
  }
  if (errorFound) {
    evaluated = false;
  } else {
    evaluated = true;
  }
}

function clear(item) {
  item.innerHTML = "";
}
