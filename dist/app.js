// selecting elements

const topOutput = document.querySelector(".calculation");
const result = document.querySelector(".result");
const btns = document.querySelectorAll(".btn");
const yellowBtns = document.querySelectorAll(".yellow");
const brackets = document.querySelectorAll(".brace");

result.innerHTML = 0;
// VARIABLES
let evaluated = false;
let storedInput = [];
let currentValue;
let ans;
let equation;

// EVENT LISTENERS
brackets.forEach((brace) => {
  brace.addEventListener("click", (e) => {
    let symbol = e.currentTarget.dataset.sign;
    if (symbol === "leftBracket") {
      topOutput.innerHTML += `(`;
      storedInput.push(`(`);
    } else {
      topOutput.innerHTML += `)`;
      storedInput.push(`)`);
    }
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
      if (
        thisBtn.classList.contains("digit") ||
        thisBtn.classList.contains("delete")
      ) {
        topOutput.innerHTML = "";
        storedInput.length = 0;
      } else {
        topOutput.innerHTML = ans;
      }
    }

    if (thisBtn.classList.contains("digit")) {
      topOutput.innerHTML += value;
      storedInput.push(value);
    }

    if (thisBtn.classList.contains("yellow")) {
      topOutput.innerHTML += symbol;
      storedInput.push(symbol);
    }

    if (thisBtn.classList.contains("clear-btn")) {
      clear(topOutput);
      result.innerHTML = 0;
      storedInput.length = 0;
    }

    if (thisBtn.classList.contains("delete")) {
      storedInput.pop();
      // let lastDigit = topOutput.innerHTML.charAt(-1);
      topOutput.innerHTML = topOutput.innerHTML.slice(0, -1);
    }
    if (e.currentTarget.classList.contains("equals")) {
      calculate();
    }
  });
});

// FUNCTIONS

function calculate() {
  let answer;
  equation = storedInput.join("").replace(/(\))([0-9])/g, "$1*$2");
  equation = equation.replace(/([0-9])(\()/g, "$1*$2");
  console.log(equation);
  // console.log(equation);
  let errorFound = false;
  try {
    answer = eval(equation);
    result.innerHTML = answer;
    ans = answer;
  } catch (error) {
    error.message = `calculation error.
    check input.`;
    result.style.textAlign = "center";
    result.innerHTML = error.message;
    errorFound = true;
  }
  if (errorFound) {
    evaluated = false;
    storedInput.length = 0;
    setTimeout(() => {
      clear(topOutput);
      clear(result);
    }, 2000);
  } else {
    evaluated = true;
  }
}

function clear(item) {
  item.innerHTML = "";
}
